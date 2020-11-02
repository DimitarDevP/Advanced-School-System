from Flabstraction.connect import sql, STATIC_PATH, helper, jsonify

class Classes:
    def __init__(self):
        pass

    def create(self, request):
        _class = request.params["class"]
        query = sql.prepare(_class, "_classes")

        conn = sql.open()

        sql.execute(query["string"], query["params"], conn)
        _class = sql.read("""SELECT * FROM _classes WHERE _id = LAST_INSERT_ID()""", (), conn)
        
        if sql.close() == False:
            abort(500)

        return jsonify({
            "class" : _class
        })

    def read(self, request):
        classes = sql.read("""SELECT * FROM _classes""", (), [], True, True)

        return jsonify({
            "classes" : classes
        })

    def update(self, request):
        _class = request.params["class"]
        _id = _class["_id"]
        query = sql.prepare(_class, "_classes", "update", "_id")

        sql.execute(query["string"], query["params"], [], True)
        _class["_id"] = _id

        return jsonify({
            "class" : _class
        })

    def delete(self, request):
        _id = request.params["id"]

        if sql.execute("""DELETE * FROM _classes WHERE _id = %s""", (_id), [], True) == False:
            abort(500)

        return jsonify({
            "id" : _id
        })

class ClassEnrollments:
    def __init__(self):
        pass

    def create(self, request):
        enroll = request.params["entroll"]
        query = sql.prepare(enroll, "_class_enrollments")

        conn = sql.open()

        sql.execute(query["string"], query["params"], conn)
        enroll = sql.read("""SELECT * FROM _class_enrollments WHERE _id = LAST_INSERT_ID()""", (), conn)
        
        if sql.close() == False:
            abort(500)

        return jsonify({
            "enroll" : enroll
        })

    def read(self, request):
        enrolls = sql.read("""SELECT * FROM _class_enrollments""", (), [], True, True)

        return jsonify({
            "enrolls" : enrolls
        })

    def update(self, request):
        enroll = request.params["enroll"]
        _id = enroll["_id"]
        query = sql.prepare(enroll, "_class_enrollments", "update", "_id")

        sql.execute(query["string"], query["params"], [], True)
        enroll["_id"] = _id

        return jsonify({
            "enroll" : enroll
        })

    def delete(self, request):
        _id = request.params["id"]

        if sql.execute("""DELETE * FROM _class_enrollments WHERE _id = %s""", (_id), [], True) == False:
            abort(500)

        return jsonify({
            "id" : _id
        })

class Areas:
    def __init__(self):
        pass

    def create(self, request):
        area = request.params["area"]
        query = sql.prepare(area, "_areas")

        conn = sql.open()

        sql.execute(query["string"], query["params"], conn)
        area = sql.read("""SELECT * FROM _areas WHERE _id = LAST_INSERT_ID()""", (), conn)
        
        if sql.close() == False:
            abort(500)

        return jsonify({
            "area" : area
        })

    def read(self, request):
        areas = sql.read("""SELECT * FROM _areas""", (), [], True, True)

        return jsonify({
            "areas" : areas
        })

    def update(self, request):
        area = request.params["area"]
        _id = area["_id"]
        query = sql.prepare(area, "_areas", "update", "_id")

        sql.execute(query["string"], query["params"], [], True)
        area["_id"] = _id

        return jsonify({
            "area" : area
        })

    def delete(self, request):
        _id = request.params["id"]

        if sql.execute("""DELETE * FROM _areas WHERE _id = %s""", (_id), [], True) == False:
            abort(500)

        return jsonify({
            "id" : _id
        })