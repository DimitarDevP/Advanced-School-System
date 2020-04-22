from flaskSQL import *

fsql = flaskSQL(Flask(__name__))
fsql.connect('root', '', '127.0.0.1', 'Advanced_School_System')
fsql.config_mail('smtp.sendgrid.net', 587, True, False, "apikey", "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")
app = fsql.get_app()