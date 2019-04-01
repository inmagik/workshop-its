# FULLSTACK WEB DEV WORKSHOP

## pdfs

Presentazione: [PDF](https://github.com/inmagik/workshop-its/raw/master/FULLSTACK%20WEB%20DEVELOPMENT.pdf)

Intro git: [PDF](https://github.com/inmagik/workshop-its/raw/master/Versionamento%20del%20codice%20sorgente.pdf)

Intro sviluppo siti django: [PDF](https://github.com/inmagik/workshop-its/raw/master/Sviluppo%20siti%20con%20django.pdf)

## GETTING STARTED

- install git
- install node
- install yarn
- install python
- install virtualenv (pip install virtualenv)

### CLONARE REPOSITORY
```
git clone https://github.com/inmagik/workshop-its.git
```

### SERVER
Prima installazione
```
cd museum-server
virtualenv -p python3 env
source env/bin/activate
pip install -r requirements
cd museum_server
cp example_db.sqlite3 db.sqlite3
cp -R example_uploads uploads
```

Sviluppo:
```
cd museum-server
source env/bin/activate
cd museum_server
python manage.py runserver
```

### FRONTEND
Prima installazione:
```
cd museum-frontend
yarn install
```

Sviluppo:
```
cd museum-frontend
yarn start
```


## CONTATTI

- Mauro Bianchi - mauro.bianchi@inmagik.com 
- INMAGIK: https://www.inmagik.com
