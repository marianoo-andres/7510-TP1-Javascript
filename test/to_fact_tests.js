var assert = require('assert');

var DatabaseBuilder = require('../src/database');


describe("databaseBuilder", function () {

    var databaseBuilder = new DatabaseBuilder();

    describe('To fact test', function () {

        it('Should map fact_string to fact object', function () {
            let result = databaseBuilder.to_fact("padre(maria,juan)")
            assert(result.fact_name === "padre")
            assert(result.fact_values.toString() === ["maria", "juan"].toString())
        });
    });
});


