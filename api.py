# -*- coding: utf-8 -*-
from flask import Flask
from flask_restful import Resource, Api, abort, reqparse
from flask.ext.cors import CORS
import twitter
from flask.ext.mysql import MySQL

app = Flask(__name__)

# Cors Domain
CORS(app)

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'prova2'
app.config['MYSQL_DATABASE_HOST'] = '127.0.0.1'

mysql = MySQL()
mysql.init_app(app)
conn = mysql.connect()

api = Api(app)

class PersonList(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('nome', required=True, help='Nome do usuário inválido.')
        self.reqparse.add_argument('local', default="", help='Localização do usuário inválida.')
        self.reqparse.add_argument('idioma', help='Idioma do usuário inválido.')
        self.reqparse.add_argument('foto', help='Foto do usuário inválida.')
        self.reqparse.add_argument('descricao', help='Descrição do usuário inválida.')
        super(PersonList, self).__init__()
        
    def get(self):
        cursor = conn.cursor()
        cursor.execute("SELECT id,nome,local,idioma,foto,descricao FROM person")
        data = []
        for item in cursor.fetchall():
            data.append({
                'id': item[0],
                'nome': item[1],
                'local': item[2],
                'idioma': item[3],
                'foto': item[4],
                'descricao': item[5],
            })
        
        return data, 200
    
    def post(self):
        try:
            args = self.reqparse.parse_args()
            cursor = conn.cursor()
            cursor.execute("INSERT INTO person(nome,local,idioma,foto,descricao) VALUES ('%s', '%s', '%s', '%s', '%s')" % (args['nome'], args['local'], args['idioma'], args['foto'], args['descricao']))
            conn.commit()
            return {"message": "Usuário inserido."}, 201
        except:
            abort(400, message="Não foi possível incluir o usuário")

api.add_resource(PersonList, '/person/')

class Person(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('nome', required=True, help='Nome do usuário inválido.')
        self.reqparse.add_argument('local', default="", help='Localização do usuário inválida.')
        self.reqparse.add_argument('idioma', help='Idioma do usuário inválido.')
        self.reqparse.add_argument('foto', help='Foto do usuário inválida.')
        self.reqparse.add_argument('descricao', help='Descrição do usuário inválida.')
        super(Person, self).__init__()

    def get(self, id):
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT id,nome,local,idioma,foto,descricao FROM person WHERE id = %d" % (id))
            data = cursor.fetchall()
            if len(data) == 0:
                abort(404, message="Usuário não encontrado.")
            
            data = {
                'id': data[0][0],
                'nome': data[0][1],
                'local': data[0][2],
                'idioma': data[0][3],
                'foto': data[0][4],
                'descricao': data[0][5],
            }
            
            return data, 200
        except:
            abort(400, message="Não foi possível alterar o usuário")

    def put(self, id):
        try:
            args = self.reqparse.parse_args()
            cursor = conn.cursor()
            cursor.execute("SELECT id,nome,local,idioma,foto,descricao FROM person WHERE id = %d" % (id))
            data = cursor.fetchall()
            if len(data) == 0:
                abort(404, message="Usuário não encontrado.")
            
            cursor.execute("UPDATE person SET nome='%s',local='%s',idioma='%s',foto='%s',descricao='%s' WHERE id = %d" % (args['nome'], args['local'], args['idioma'], args['foto'], args['descricao'], id))
            conn.commit()
            
            return {"message": "Usuário alterado."}, 201
        except:
            abort(400, message="Não foi possível alterar o usuário")

    def delete(self, id):
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT id,nome,local,idioma,foto,descricao FROM person WHERE id = %d" % (id))
            data = cursor.fetchall()
            if len(data) == 0:
                abort(404, message="Usuário não encontrado.")
            
            cursor.execute("DELETE FROM person WHERE id = %d" % (id))
            conn.commit()
            return {"message": "Usuário deletado."}, 204
        except:
            abort(400, message="Não foi possível deletar o usuário")


api.add_resource(Person, '/person/<int:id>')

class GetPesonByTwitter(Resource):
    def get(self,_screen_name):
        try:
            twitter_api = twitter.Api(
                consumer_key='qWBjh0yhWBljmk8i505ndWpBz', 
                consumer_secret='w9zUhQ1i6JapBFX8QrFoG5UKSE0CF3iAaKSVVMe5zIkut1oTxT', 
                access_token_key='40312633-gsJi4ityPPy0RtqQD4JZSG83fqJCqhiytlVZejxne', 
                access_token_secret='hQhKXTkuN8IhFKQGtVgjWEiStAza3jCads20aQiPn0cLv')
            data = twitter_api.GetUser(screen_name=_screen_name)
            return {"nome": data._name, "local": data._location, "idioma": data._lang, "foto": data._profile_image_url, "descricao": data._description}, 200
        except:
            abort(404, message="Twitter {} não encontrado".format(_screen_name))

api.add_resource(GetPesonByTwitter, '/person/twitter/<string:_screen_name>')

if __name__ == '__main__':
    app.run(debug=True)