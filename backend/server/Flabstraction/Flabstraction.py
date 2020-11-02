import datetime
from flask import Flask
from flask_cors import CORS
from sqlalchemy import create_engine
from flask_request_params import bind_request_params
from flask_jwt_extended import JWTManager, create_access_token

class FlaskCFG:
    def __init__(self, app, secret_key):
        self.app = app
        self.secret_key = secret_key
        self.app.before_request(bind_request_params)
        self.jwt = JWTManager(self.app)
        self.app.config["JWT_SECRET_KEY"] = self.secret_key

    def encode(self, key):
        try:
            return create_access_token(
                key,
                expires_delta = datetime.timedelta(hours=12)
            )
        except Exception as e:
            raise e

    def config_cors(self, origins):
        config = {
            'ORIGINS': origins,
            'SECRET_KEY': self.secret_key
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

    def create_routes(self, request, obj):
        method = request.method
        if method == "POST":
            print("here1")
            return obj.create(request)
        elif method == "GET":
            print("here2")
            return obj.read(request)
        elif method == "PUT":
            return obj.update(request)
        elif method == "DELETE":
            return obj.delete(request)
        else:
            abort(405)

    def get_app(self):
        return self.app

    def get_jwt(self):
        return self.jwt


class Pysqlalchemy:
    def __init__(self, engine_name, user, password, host, database):
        uri = engine_name + "://" + user + ":" + password + "@" + host + "/" + database + "?&autocommit=false"
        self.engine = create_engine(uri, pool_size=4, max_overflow=0,  pool_recycle=1200)
    
    def prepare(self, dictionary, table, _type = "create", by = ""):
        if _type == "create":
            string_one = """INSERT INTO """ + table + """ ("""
            string_two = """) VALUES ("""

            iter_list = []
            
            n = len(dictionary)
            
            for i, obj in enumerate(dictionary):
                if i != n-1:
                    string_one = string_one + obj + """, """
                    string_two = string_two + """%s, """
                else:
                    string_one = string_one + obj
                    string_two = string_two + """%s"""
                
                if dictionary[obj] == None:
                    iter_list.append(None)
                else:
                    iter_list.append(dictionary[obj])

            query = dict()
            query["string"] = string_one + string_two + """)"""
            query["params"] = tuple(iter_list)

        elif _type == "update":
            by_value = dictionary.pop(by)

            string_one = """UPDATE """ + table + """ SET """
            string_two = """ WHERE """ + by + """ = %s"""
            iter_list = []
            n = len(dictionary)
            for i, obj in enumerate(dictionary):
                if i != n-1:
                    string_one = string_one + obj + """ = %s, """
                else:
                    string_one = string_one + obj + """ = %s"""
                
                if dictionary[obj] == None:
                    iter_list.append(None)
                else:
                    iter_list.append(dictionary[obj])
            
            iter_list.append(by_value)

            query = dict()
            query["string"] = string_one + string_two
            query["params"] = tuple(iter_list)

        return query

    def format_date(self, data):
        for row in data:
            for field in row:
                if type(row[field]) == type(datetime.datetime.now()) and not row[field] is None:
                    row[field] = row[field].strftime("%Y-%m-%d %H:%M:%S")
        
        return data

    def open(self):
        connection = self.engine.connect()
        transaction = connection.begin()
        return [connection, transaction]

    def close(self, conn):
        try:
            conn[1].commit()
            conn[0].close()
        except Exception as e:
            return False
        return True


    def execute(self, query_string, query_params = (), conn = [], autocommit = False):
        try:
            conn = self.open() if autocommit == True else conn
            try:
                conn[0].execute(query_string+""";""", query_params)
            except Exception as e:
                conn[1].rollback()
                disconnect = conn[0].close()
                return "Falty Query"
            
            disconnect = self.close(conn) if autocommit else None
        except Exception as e:
            raise Exception(e)
        finally:
            pass

    def read(self, query_string, query_params = (), conn = [], fetchall = False, autocommit = False):
        try:
            conn = self.open() if autocommit == True else conn
            try:
                result = conn[0].execute(query_string+""";""", query_params)
            except Exception as e:
                conn[1].rollback()
                disconnect = conn[0].close()
                return False

            if fetchall:
                data = result.fetchall()
                data = [dict(row) for row in data]
                _continue = False if len(data) == 0 else True
            else:
                data = result.fetchone()
                data = dict(data)
                _continue = False if data == None else True
                data = [data]

            result.close()
            disconnect = self.close(conn) if autocommit else False
            if _continue:
                data = self.format_date(data)
                data = data if fetchall else data[0]

            return data
        except Exception as e:
            raise Exception(e)
        finally:
            pass


class Helpers:
    def __init__(self):
        pass
        
    def get_random():
        _t = time.time()
        return str(_t).replace(".", "")

    def get_extension(_f):
        return str(_f.filename.split(".")[len(_f.filename.split(".")) - 1])