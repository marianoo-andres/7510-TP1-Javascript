var DatabaseBuilder = require('../src/database');
var Query = require('../src/query');
var Interpreter = function () {

    this.parseDB = function (db) {
        let databaseBuilder = new DatabaseBuilder()
        this.database = databaseBuilder.build_database(db)
    }

    this.checkQuery = function (query_string) {
        let query = new Query()
        return query.get_query_result(this.database, query_string)
    }

    this.database = null

}

module.exports = Interpreter;
