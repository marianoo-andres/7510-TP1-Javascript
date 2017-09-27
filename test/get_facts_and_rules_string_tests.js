var assert = require('assert');

var DatabaseBuilder = require('../src/database');


describe("databaseBuilder", function () {

    var databaseBuilder = new DatabaseBuilder();

    describe('Get facts and rules string. All valid', function () {

        it('Should return the facts and rules string', function () {
            var db = [
                "varon(juan).",
                "varon(pepe).",
                "hijo(X, Y) :- varon(X), padre(Y, X).",
                "hija(X, Y) :- mujer(X), padre(Y, X)."
            ];
            let result = databaseBuilder.get_facts_and_rules_string(db)
            assert(result.facts_string.toString() === ["varon(juan)","varon(pepe)"].toString())
            assert(result.rules_string.toString() === [ 'hijo(X,Y):-varon(X),padre(Y,X)',
                'hija(X,Y):-mujer(X),padre(Y,X)' ].toString())
        });
    });

    describe('Get facts and rules string. Some invalid', function () {

        it('Should return the error object with the invalid strings', function () {
            var db = [
                "varon(juan).",
                "varonpepe).",
                "hijo(X, Y) - varon(X), padre(Y, X).",
                "hija(X, Y) :- mujer(X), padre(Y, X)"
            ];
            let result = databaseBuilder.get_facts_and_rules_string(db)
            assert(result.error.toString() === ["varonpepe).","hijo(X, Y) - varon(X), padre(Y, X).", "hija(X, Y) :- mujer(X), padre(Y, X)"].toString())
        });
    });
});


