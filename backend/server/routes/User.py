from Flabstraction.connect import sql, STATIC_PATH, helper, jsonify, fcfg
from flask import abort

import json

class User:
    def __init__(self):
        pass

    def create(self, request):
        # Get data from request and format it
        user = json.loads(request.form["user"])
        query = sql.prepare(user, "_users")

        # Open connection
        conn = sql.open()

        # Check if user exists
        all_users = sql.read("""SELECT * FROM _users WHERE _email = %s""", (user["_email"]), conn, True)
        if len(all_users) > 0:
            sql.close()
            abort(403)
        
        # Insert
        sql.execute(query["string"], query["params"], conn)
        new_user = sql.read("""SELECT * FROM _users WHERE _id = LAST_INSERT_ID()""", (), conn)
        
        # Close connection
        if sql.close() == False:
            abort(500)

        # Format
        new_user.pop("_password")

        # Return 
        return jsonify({
            "user" : new_user,
            "token": fcfg.encode(new_user["_id"])
        })

    def read(self, request):
        # Get Users
        users = sql.read("""SELECT * FROM _users""", (), [], True, True)

        # Format
        for u in users:
            u.pop("_password")
        # Return 
        return jsonify({
            "users" : users,
        })

    def update(self, request):
        # Get data from request and format it
        user = json.loads(request.params["user"])
        _id = user["_id"]

        # Open connection
        conn = sql.open()

        # Check if user exists
        _all_users = sql.read("""SELECT * FROM _users""", (), conn, True)
        for u in _all_users:
            if u["_email"] == _user["_email"] and int(u["_id"]) != int(_id):
                sql.close()
                abort(403)

        # Prepare, Update, Read
        query = sql.prepare(user, "_users", "update", "_id")
        sql.execute(query["string"], query["params"], conn)
        user = sql.read("""SELECT * FROM _users WHERE _id = %s""", (_id), conn)

        # Close connection
        if sql.close() == False:
            abort(500)

        # Format
        user.pop("_password")

        # Return 
        return jsonify({
            "user" : user,
        })

    def delete(self, request):
        _id = request.args["_id"]

        if sql.execute("""DELETE * FROM _users WHERE _id = %s""", (_id), [], True) == False:
            abort(500)

        return jsonify({
            "id" : _id
        })


class UserAuth:
    def __init__(self):
        pass

    def login(self, request):
        user = request.params["user"]

        user = sql.read("""SELECT * FROM _users WHERE _email = %s AND _password = %s""", (_user["_email"], _user["_password"]), [], True, True)

        if user == False:
            abort(500)

        user.pop("_password")

        return jsonify({
            "user" : user,
            "token": fcfg.encode(user["_id"])
        })

    def verify(self, request):
        return jsonify({
            'success' : [True, 200],
            'ContentType':'application/json'
        })

class UserImages:
    def __init__(self):
        pass

    def create(self, request):
        _id = request.args["_id"]
        image = request.files["image"]
        
        # Save profile picture
        path = """user/image/user_""" + str(_id) + "_image_" + helper.get_random() + "." + helper.get_extension(image)
        save_path = STATIC_PATH + path
        image.save(save_path)

        conn = sql.open()

        sql.execute("""UPDATE _user_images SET _active = %s WHERE _user_id =%s""", (0, _id), conn)
        sql.execute("""INSERT INTO _user_images (_user_id, _image_path, _active) VALUES (%s, %s, %s)""", (_id, path, 1), conn)
        new_user_images = sql.read("""SELECT * FROM _user_iamges WHERE _user_id =%s""", (_id), conn, True)

        if sql.close(conn) == False:
            abort(500)

        return jsonify({
            "images" : new_user_images
        })

    def read(self, request):
        user_images = sql.read("""SELECT * FROM _user_images""", (), [], True, True)

        if user_images == False:
            abort(500)

        return jsonify({
            "images" : user_images
        })

    def update(self, request):
        image = request.params["image"]
        _id = image["_id"]
        query = sql.prepare(image, "_user_images", "update", "_id")

        if sql.execute(query["string"], query["params"], [], True) == False:
            abort(500)

        image["_id"] = _id
        
        return jsonify({
            "image" : image
        })

    def delete(self, request):
        _id = request.args["_id"]

        if sql.execute("""DELETE * FROM _user_images WHERE _id = %s""", (_id), [], True) == False:
            abort(500)

        return jsonify({
            "id" : _id
        })

class UserTypes:
    def __init__(self):
        pass

    def create(self, request):
        user_type = request.params["user_type"]
        query = sql.prepare(user_type, "_user_types")

        conn = sql.open()

        sql.execute(query["string"], query["params"], conn)
        user_type = sql.read("""SELECT * FROM _user_types WHERE _id = LAST_INSERT_ID()""", (), conn)
        
        if sql.close() == False:
            abort(500)

        return jsonify({
            "type" : user_type
        })

    def read(self, request):
        user_types = sql.read("""SELECT * FROM _user_types""", (), [], True, True)

        return jsonify({
            "types" : user_types
        })

    def update(self, request):
        user_type = request.params["user_type"]
        _id = user_type["_id"]
        query = sql.prepare(user_type, "_user_types", "update", "_id")

        sql.execute(query["string"], query["params"], [], True)
        user_type["_id"] = _id

        return jsonify({
            "type" : user_type
        })

    def delete(self, request):
        _id = request.params["id"]

        if sql.execute("""DELETE * FROM _user_types WHERE _id = %s""", (_id), [], True) == False:
            abort(500)

        return jsonify({
            "id" : _id
        })

class Genders:
    def __init__(self):
        pass

    def create(self, request):
        gender = request.params["gender"]
        query = sql.prepare(gender, "_genders")

        conn = sql.open()

        sql.execute(query["string"], query["params"], conn)
        gender = sql.read("""SELECT * FROM _genders WHERE _id = LAST_INSERT_ID()""", (), conn)
        
        if sql.close() == False:
            abort(500)

        return jsonify({
            "gender" : gender
        })

    def read(self, request):
        genders = sql.read("""SELECT * FROM _genders""", (), [], True, True)

        return jsonify({
            "genders" : genders
        })

    def update(self, request):
        gender = request.params["gender"]
        _id = gender["_id"]
        query = sql.prepare(gender, "_genders", "update", "_id")

        sql.execute(query["string"], query["params"], [], True)
        gender["_id"] = _id

        return jsonify({
            "gender" : gender
        })

    def delete(self, request):
        _id = request.params["id"]

        if sql.execute("""DELETE * FROM _genders WHERE _id = %s""", (_id), [], True) == False:
            abort(500)

        return jsonify({
            "id" : _id
        })