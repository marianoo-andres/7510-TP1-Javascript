var assert = require('assert');

var Query = require('../src/query');


describe("query", function () {

    var query = new Query();

    describe('parse query', function () {

        it('Should return query parsed into {query_name: name, query_parameters: [param1,param2..]}', function () {
            let parsed_query = query.parse_query("padre(juan,pepe)")
            assert(parsed_query.query_name === "padre")
            assert(parsed_query.query_parameters.toString() === ["juan","pepe"].toString())
        });
        it('Should return query parsed into {query_name: name, query_parameters: [param1,param2..]}', function () {
            let parsed_query = query.parse_query("varon(juan)")
            assert(parsed_query.query_name === "varon")
            assert(parsed_query.query_parameters.toString() === ["juan"].toString())
        });
    });
});


