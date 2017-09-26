var assert = require('assert');

var DatabaseBuilder = require('../src/database');


describe("databaseBuilder", function () {

    var databaseBuilder = new DatabaseBuilder();

    describe('map rule variable to numbers', function () {

        it('Should return X mapped to 0, Y mapped to 1', function () {
            let rule_parameters = {rule_variables: ['X','Y'], rule_facts: [{fact_name: 'varon', rule_variables: ['Y']}, {fact_name: 'padre', rule_variables: ['Y', 'X']}]}

            let result = databaseBuilder.to_rule_parameters_with_numbers(rule_parameters)
            assert(result.toString() === [{fact_name: 'varon', fact_numbers: [1]}, {fact_name: 'padre', fact_numbers: [1,0]}].toString())

        });
    });
});


