var assert = require('assert');

var DatabaseBuilder = require('../src/database');


describe("databaseBuilder", function () {

    var databaseBuilder = new DatabaseBuilder();

    describe('map rule variable to numbers', function () {

        it('Should return X mapped to 0, Y mapped to 1', function () {
            let rule_parameters = {rule_variables: ['X','Y'], rule_facts: [{fact_name: 'varon', fact_values: ['Y']}, {fact_name: 'padre', fact_values: ['Y', 'X']}]}
            let result = databaseBuilder.to_rule_parameters_with_numbers(rule_parameters)
            assert(result[0].fact_name === 'varon')
            assert(result[0].fact_numbers.toString() === [1].toString())
            assert(result[1].fact_name === 'padre')
            assert(result[1].fact_numbers.toString() === [1,0].toString())
        });
    });
});


