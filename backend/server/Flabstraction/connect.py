from Flabstraction.Flabstraction import FlaskCFG, Pysqlalchemy, Helpers
from flask import Flask, jsonify
from flask_socketio import SocketIO
import time

fcfg = FlaskCFG(Flask(__name__), "Secret Key")
STATIC_PATH = "/usr/share/nginx/html/SmartSchool/"
fcfg.config_cors(
    [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://0.0.0.0:3000',
        '*', 
    ]
)
app = fcfg.get_app()
jwt = fcfg.get_jwt()

sql = Pysqlalchemy('mysql+pymysql', 'root', '', '127.0.0.1', 'Smart_School')

helper = Helpers()