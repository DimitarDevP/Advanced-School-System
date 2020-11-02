from Flabstraction.connect import sql, STATIC_PATH, helper, jsonify

class Abscences:
    def __init__(self):
        pass

    def create(self, request):
        absence = request.params["absence"]
        query = sql.prepare(absence, "_absences")

        conn = sql.open()

        sql.execute(query["string"], query["params"], conn)
        absence = sql.read("""SELECT * FROM _absences WHERE _id = LAST_INSERT_ID()""", (), conn)
        
        if sql.close() == False:
            abort(500)

        return jsonify({
            "absence" : absence
        })

    def read(self, request):
        absences = sql.read("""SELECT * FROM _absences""", (), [], True, True)

        return jsonify({
            "absences" : absences
        })

    def update(self, request):
        absence = request.params["absence"]
        _id = absence["_id"]
        query = sql.prepare(absence, "_absences", "update", "_id")

        sql.execute(query["string"], query["params"], [], True)
        absence["_id"] = _id

        return jsonify({
            "absence" : absence
        })

    def delete(self, request):
        _id = request.params["id"]

        if sql.execute("""DELETE * FROM _absences WHERE _id = %s""", (_id), [], True) == False:
            abort(500)

        return jsonify({
            "id" : _id
        })

class AbscenceStatuses:
    def __init__(self):
        pass

    def create(self, request):
        status = request.params["status"]
        query = sql.prepare(status, "_absence_statuses")

        conn = sql.open()

        sql.execute(query["string"], query["params"], conn)
        status = sql.read("""SELECT * FROM _absence_statuses WHERE _id = LAST_INSERT_ID()""", (), conn)
        
        if sql.close() == False:
            abort(500)

        return jsonify({
            "status" : status
        })

    def read(self, request):
        statuses = sql.read("""SELECT * FROM _absence_statuses""", (), [], True, True)

        return jsonify({
            "statuses" : statuses
        })

    def update(self, request):
        status = request.params["status"]
        _id = status["_id"]
        query = sql.prepare(status, "_absence_statuses", "update", "_id")

        sql.execute(query["string"], query["params"], [], True)
        status["_id"] = _id

        return jsonify({
            "status" : status
        })

    def delete(self, request):
        _id = request.params["id"]

        if sql.execute("""DELETE * FROM _absence_statuses WHERE _id = %s""", (_id), [], True) == False:
            abort(500)

        return jsonify({
            "id" : _id
        })