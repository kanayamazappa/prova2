# Segundo Teste de Desenvolvimento de API Rest com Python.

## Dependências:

Python 2.7.10

Download: https://www.python.org/downloads/

PIP 8.0.2

Instalaçao: https://pip.pypa.io/en/stable/installing/

Virtualenv 13.1.2

Instalação: https://virtualenv.readthedocs.org/en/latest/installation.html

Mysql

Download: https://dev.mysql.com/downloads/installer/

## Instalação:

Primeiro crie a virualenv:

	virtualenv prova2

Eu particularmente sempre crio uma pasta para colocar o projeto então
	
	mkdir src
	cd src

Clone o projeto:

	git clone https://github.com/kanayamazappa/prova2.git
	
Retone na pasta da virtualenv e troque de contexto:

	cd ..	
	Linux: source bin/activate
	Windows: Scripts/activate.bat

Instale as dependências, deixe o arquivo requirements.txt na raiz do projeto:
	
	cd src/prova2
	pip install -r requirements.txt

Observação no caso de Windows deixei o arquivo MySQL_python-1.2.5-cp27-none-win_amd64.whl na raiz do projeto então remove a linha MySQL-python=1.2.5 do arquivo requirements.txt e:

	pip install MySQL_python-1.2.5-cp27-none-win_amd64.whl
	pip install -r requirements.txt

Crie a base de dados Mysql para o projeto e edit o arquivo prova2/api.py:

  	app.config['MYSQL_DATABASE_USER'] = 'root'
  	app.config['MYSQL_DATABASE_PASSWORD'] = ''
  	app.config['MYSQL_DATABASE_DB'] = 'prova2'
  	app.config['MYSQL_DATABASE_HOST'] = '127.0.0.1'
  
Importe os dados, deixe o arquivo dump db.sql na raiz do projeto.

Agora apenas rode o projeto:

	python api.py

Casos de teste:

	### Pegando dados do Twitter
	curl -X GET -H "Cache-Control: no-cache" -H "Postman-Token: 31487a2f-5347-9920-f242-e573322282a5" "http://127.0.0.1:5000/person/twitter/kanayamap"

	### POST
	
	curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" -H "Postman-Token: caef224f-47dd-9faa-6984-7818b298a537" -d '{
  	"descricao": "",
  	"foto": "https://pbs.twimg.com/profile_images/311595467/kanayama_normal.jpeg",
  	"idioma": "en",
  	"local": "Cravinhos, São Paulo",
  	"nome": "Paulo Kanayama"
	}' "http://127.0.0.1:5000/person/"
	
	### PUT
	
	PUT /person/1 HTTP/1.1
	Host: 127.0.0.1:5000
	Content-Type: application/json
	Cache-Control: no-cache
	Postman-Token: bbd34284-eb35-0439-0e43-2e721162edae

	{
	  "descricao": "Testando Updade",
	  "foto": "https://pbs.twimg.com/profile_images/311595467/kanayama_normal.jpeg",
	  "idioma": "en",
	  "local": "Cravinhos, São Paulo",
	  "nome": "Paulo Kanayama"
	}
	
	### DELETE
	
	curl -X DELETE -H "Cache-Control: no-cache" -H "Postman-Token: 64f7e924-b1e8-5675-c013-b8b580581a08" "http://127.0.0.1:5000/person/4"
	
	### GET LIST
	
	curl -X GET -H "Cache-Control: no-cache" -H "Postman-Token: dcbc0791-3a3d-4468-30d2-702ea5e0dcd7" "http://127.0.0.1:5000/person/"
	
	### GET
	
	curl -X GET -H "Cache-Control: no-cache" -H "Postman-Token: e9b602e0-0f27-ac66-6f2c-cc311dcc9544" "http://127.0.0.1:5000/person/1"

### Segunda parte da prova

Fiz um html estático pois estava sem mais tempo, que se encontra em anexo ao projeto na pasta exemplo.

### Considerações

Para testar a aplicação utilizei uma extensão do Google Chrome que é Postman.


Agradeço a oportunidade e espero ter atendido as espectativas.

Grato,
Paulo Kanayama.

