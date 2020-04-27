# Thirdparty
from flask import Flask, jsonify, session, sessions
from flask_mysqldb import MySQL
from datetime import timedelta
from flask_cors import CORS
from flask_request_params import bind_request_params
from flask_mail import Mail
from flask_session import Session
from flask_jwt_extended import JWTManager


class flaskSQL:
    def __init__(self, app):
        self.app = app
        self.app.before_request(bind_request_params)
        self.jwt = JWTManager(self.app)

    def config_cors(self):
        config = {
            'ORIGINS': [
                'http://localhost:3000',  # React
                'http://127.0.0.1:3000',  # React
            ],
            'SECRET_KEY': '...'
        }


        self.cors = CORS(self.app, resources={
                r'/api/*': {
                    "Access-Control-Allow-Origin": config["ORIGINS"],
                    "Access-Control-Allow-Credentials": True,
                    'supports_credentials': True
                },
            },
            supports_credentials = True,
            expose_headers = "*"
        )

    def connect(self, user, password, host, database):
        self.app.config['MYSQL_HOST'] = host
        self.app.config['MYSQL_USER'] = user
        self.app.config['MYSQL_PASSWORD'] = password
        self.app.config['MYSQL_DB'] = database

        self.app.config['MYSQL_UNIX_SOCKET'] = 'TCP'
        self.app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
        
        self.mysql = MySQL(self.app)


    def config_session(self):
        self.app.config['UPLOAD_FOLDER'] = r'/*'
        self.app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024


    def config_mail(self, server, port, use_tls, use_ssl, username, password):
        self.mail = Mail(self.app)

        self.app.config['DEBUG'] = True
        self.app.config['MAIL_SERVER'] = server
        self.app.config['MAIL_PORT'] = port
        self.app.config['MAIL_USE_TLS'] = use_tls
        self.app.config['MAIL_USE_SSL'] = use_ssl
        self.app.config['MAIL_USERNAME'] = username
        self.app.config['MAIL_PASSWORD'] = password
        
        self.mail = Mail(self.app)


    def get_app(self):
        return self.app


    def create(self, query_string, query_params):
        try:
            cursor = self.mysql.connection.cursor()
            cursor.execute(query_string, query_params)
            self.mysql.connection.commit()
        except Exception as e:
            return e
        finally:
            cursor.close()


    def read(self, query_string, query_params, fetchall = 1):
        try:
            cursor = self.mysql.connection.cursor()
            cursor.execute(query_string, query_params)
            self.mysql.connection.commit()
            if fetchall: 
                row = cursor.fetchall()
            else:
                row = cursor.fetchone()
            return row
        except Exception as e:
            return e
        finally:
            cursor.close()


    def update(self, query_string, query_params):
        try:
            cursor = self.mysql.connection.cursor()
            cursor.execute(query_string, query_params)
            self.mysql.connection.commit()
        except Exception as e:
            return e
        finally:
            cursor.close()


    def delete(self, query_string, query_params):
        try:
            cursor = self.mysql.connection.cursor()
            cursor.execute(query_string, query_params)
            self.mysql.connection.commit()
        except Exception as e:
            return e
        finally:
            cursor.close()