var assert = require('assert');

var Query = require('../src/query');


describe("query", function () {

    var query = new Query();

    describe('query fact test', function () {

        it('Should return true as varon(juan) is present in fact_map', function () {
            let fact_map = new Map()
            fact_map.set("varon", [["juan"],["pepe"],["carlos"]])
            fact_map.set("padre", [["juan","pepe"],["pepe","carlos"]])
            assert(query.query_fact(fact_map, {fact_name: "varon", fact_values: ["juan"]}))
        });
        it('Should return false as varon(jorge) is not present in fact_map', function () {
            let fact_map = new Map()
            fact_map.set("varon", [["juan"],["pepe"],["carlos"]])
            fact_map.set("padre", [["juan","pepe"],["pepe","carlos"]])
            assert(!query.query_fact(fact_map, {fact_name: "varon", fact_values: ["jorge"]}))
        });

        it('Should return true as padre(juan,pepe) is present in fact_map', function () {
            let fact_map = new Map()
            fact_map.set("varon", [["juan"],["pepe"],["carlos"]])
            fact_map.set("padre", [["juan","pepe"],["pepe","carlos"]])
            assert(query.query_fact(fact_map, {fact_name: "padre", fact_values: ["juan","pepe"]}))
        });

        it('Should return false as padre(carlos,pepe) is not present in fact_map', function () {
            let fact_map = new Map()
            fact_map.set("varon", [["juan"],["pepe"],["carlos"]])
            fact_map.set("padre", [["juan","pepe"],["pepe","carlos"]])
            assert(!query.query_fact(fact_map, {fact_name: "padre", fact_values: ["carlos","pepe"]}))
        });

        it('Should return false as amigo(carlos,pepe) is not present in fact_map', function () {
            let fact_map = new Map()
            fact_map.set("varon", [["juan"],["pepe"],["carlos"]])
            fact_map.set("padre", [["juan","pepe"],["pepe","carlos"]])
            assert(!query.query_fact(fact_map, {fact_name: "amigo", fact_values: ["carlos","pepe"]}))
        });
    });
});


