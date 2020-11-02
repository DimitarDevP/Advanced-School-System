from Flabstraction.connect import sql, STATIC_PATH, helper, jsonify

class Grades:
    def __init__(self):
        pass

    def create(self, request):
        grade = request.params["grade"]
        query = sql.prepare(grade, "_grades")

        conn = sql.open()

        sql.execute(query["string"], query["params"], conn)
        grade = sql.read("""SELECT * FROM _grades WHERE _id = LAST_INSERT_ID()""", (), conn)
        
        if sql.close() == False:
            abort(500)

        return jsonify({
            "grade" : grade
        })

    def read(self, request):
        grades = sql.read("""SELECT * FROM _grades""", (), [], True, True)

        return jsonify({
            "grades" : grades
        })

    def update(self, request):
        grade = request.params["grade"]
        _id = grade["_id"]
        query = sql.prepare(grade, "_grades", "update", "_id")

        sql.execute(query["string"], query["params"], [], True)
        grade["_id"] = _id

        return jsonify({
            "grade" : grade
        })

    def delete(self, request):
        _id = request.params["id"]

        if sql.execute("""DELETE * FROM _grades WHERE _id = %s""", (_id), [], True) == False:
            abort(500)

        return jsonify({
            "id" : _id
        })