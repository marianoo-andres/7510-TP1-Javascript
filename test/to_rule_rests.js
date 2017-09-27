var assert = require('assert');

var DatabaseBuilder = require('../src/database');


describe("databaseBuilder", function () {

    var databaseBuilder = new DatabaseBuilder();

    describe('To rule test', function () {

        it('Should map rule_string to rule', function () {
            let result = databaseBuilder.to_rule("hijo(X,Y):-varon(X),padre(Y,X)")
            assert(result.rule_name === "hijo")
            assert(result.rule_variables.toString() === ["X", "Y"].toString())
            let first_fact = result.rule_facts[0]
            assert(first_fact.fact_name === "varon")
            assert(first_fact.fact_values.toString() === ["X"].toString())
            let second_fact = result.rule_facts[1]
            assert(second_fact.fact_name === "padre")
            assert(second_fact.fact_values.toString() === ["Y", "X"].toString())
        });
    });
});


