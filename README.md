# Teste de Desenvolvimento de API Rest com Python.

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
  
Importe os dados, deixe o arquivo db.json na raiz do projeto:

	python manage.py migrate
	python manage.py loaddata db.json

Agora apenas rode o projeto:

	python manage.py runserver 0.0.0.0:8080

Para executar o caso de teste:

	python manage.py test person

### Considerações

Para a criação utilizei o Django  1.9.2, Djago Rest 3.3.2, Facebook SDK, Requests 2.9.1, durante o desenvolvimento me deparei com umas dificuldades:

	O Facebook removeu a propriedade username da API então utilizei a propriedade Link  (https://developers.facebook.com/docs/apps/upgrading#upgrading_v2_0_graph_api), a propriedade Gender então utilizei uma API que retorna o sexo de acordo com o primeiro nome (https://genderize.io/).

Para testar a aplicação utilizei uma extensão do Google Chrome que é Postman, e também pela API do próprio Django Rest (http://localhost:8080/persons/).


Agradeço a oportunidade e espero ter atendido as espectativas.

Grato,
Paulo Kanayama.

