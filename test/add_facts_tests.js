var assert = require('assert');

var DatabaseBuilder = require('../src/database');


describe("databaseBuilder", function () {

    var databaseBuilder = new DatabaseBuilder();

    describe('Add fact key already exists', function () {

        it('should add the fact padre(juan, maria) to the facts_map', function () {
            let facts_map = new Map();
            facts_map.set('varon', [['juan']])
            facts_map.set('padre', [['juan', 'pedro']])
            databaseBuilder.add_fact(facts_map, {fact_name: 'padre', fact_values: ['juan', 'maria']})
            assert(facts_map.get('padre').toString() === [['juan', 'pedro'], ['juan', 'maria']].toString());
        });

        it('should add the fact varon(pedro) to the facts_map', function () {
            let facts_map = new Map();
            facts_map.set('varon', [['juan']])
            facts_map.set('padre', [['juan', 'pedro']])
            databaseBuilder.add_fact(facts_map, {fact_name: 'varon', fact_values: ['pedro']})
            assert(facts_map.get('varon').toString() === [['juan'],['pedro']].toString());
        });

    });
    describe('Add fact key doesnt exists', function () {

        it('should add the fact padre(juan, maria) to the facts_map', function () {
            let facts_map = new Map();
            facts_map.set('varon', [['juan']])
            databaseBuilder.add_fact(facts_map, {fact_name: 'padre', fact_values: ['juan', 'maria']})
            assert(facts_map.get('padre').toString() === [['juan', 'maria']].toString());
        });

        it('should add the fact varon(pedro) to the facts_map', function () {
            let facts_map = new Map();
            facts_map.set('padre', [['juan', 'pedro']])
            databaseBuilder.add_fact(facts_map, {fact_name: 'varon', fact_values: ['pedro']})
            assert(facts_map.get('varon').toString() === [['pedro']].toString());
        });

    });

});


