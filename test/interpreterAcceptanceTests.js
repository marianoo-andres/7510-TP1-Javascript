var expect = require("chai").expect;
var assert = require('assert');

var Interpreter = require('../src/interpreter');

describe("Interpreter parent database", function () {

    var db = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "padre(juan, pepe).",
        "padre(juan, pepa).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];

    var interpreter = null;

    beforeEach(function () {
        // runs before each test in this block
        interpreter = new Interpreter();
        interpreter.parseDB(db);
    });

    describe('Interpreter Valid Facts', function () {

        it('varon(juan) should be true', function () {
            assert(interpreter.checkQuery('varon(juan)'));
        });

        it('varon(maria) should be false', function () {
            assert(interpreter.checkQuery('varon(maria)') === false);
        });

        it('mujer(cecilia) should be true', function () {
            assert(interpreter.checkQuery('mujer(cecilia)'));
        });

        it('mujer(jorge) should be false', function () {
            assert(!interpreter.checkQuery('mujer(jorge)'));
        });

        it('mujer(josefina) should be false', function () {
            assert(!interpreter.checkQuery('mujer(josefina)'));
        });

        it('padre(juan, pepe) should be true', function () {
            assert(interpreter.checkQuery('padre(juan, pepe)') === true);
        });

        it('padre(mario, pepe) should be false', function () {
            assert(interpreter.checkQuery('padre(mario, pepe)') === false);
        });

        it('padre(marta, josefina) should be false', function () {
            assert(!interpreter.checkQuery('padre(marta, josefina)'));
        });

    });

    describe('Interpreter Invalid Facts', function () {

        it('varonjuan should throw error', function () {
            expect(function () {interpreter.checkQuery('varonjuan')}).to.throw();
        });

        it('varon(maria should throw error', function () {
            expect(function () {interpreter.checkQuery('varon(maria')}).to.throw();
        });

        it('(cecilia) should throw error', function () {
            expect(function () {interpreter.checkQuery('varon(maria')}).to.throw();
        });

        it('"" should be throw error', function () {
            expect(function () {interpreter.checkQuery('')}).to.throw();
        });
    });

    describe('Interpreter Rules', function () {

        it('hijo(pepe, juan) should be true', function () {
            assert(interpreter.checkQuery('hijo(pepe, juan)') === true);
        });

        it('hijo(pepa, juan) should be false', function () {
            assert(!interpreter.checkQuery('hijo(pepa, juan)'));
        });

        it('hijo(alejandro, juan) should be false', function () {
            assert(!interpreter.checkQuery('hijo(alejandro, juan)'));
        });

        it('hija(maria, roberto) should be false', function () {
            assert(interpreter.checkQuery('hija(maria, roberto)') === false);
        });

        it('hija(alejandro, roberto) should be false', function () {
            assert(!interpreter.checkQuery('hija(alejandro, roberto)'));
        });

        it('hija(maria, hector) should be true', function () {
            assert(interpreter.checkQuery('hija(maria, hector)'));
        });
    });

    describe('Interpreter Invalid Rules', function () {

        it('hijo(pepe, ) should throw error', function () {
            expect(function () {interpreter.checkQuery('hijo(pepe, )')}).to.throw();
        });

        it('hijo should throw error', function () {
            expect(function () {interpreter.checkQuery('hijo')}).to.throw();
        });

        it('(alejandro, juan) should throw error', function () {
            expect(function () {interpreter.checkQuery('(alejandro, juan)')}).to.throw();
        });
    });
});

describe("Interpreter numbers database", function () {

    var db = [
        "add(zero, zero, zero).",
        "add(zero, one, one).",
        "add(zero, two, two).",
        "add(one, zero, one).",
        "add(one, one, two).",
        "add(one, two, zero).",
        "add(two, zero, two).",
        "add(two, one, zero).",
        "add(two, two, one).",
        "subtract(X, Y, Z) :- add(Y, Z, X)."
    ];

    var interpreter = null;

    before(function () {
        // runs before all tests in this block
    });

    after(function () {
        // runs after all tests in this block
    });

    beforeEach(function () {
        // runs before each test in this block
        interpreter = new Interpreter();
        interpreter.parseDB(db);
    });

    afterEach(function () {
        // runs after each test in this block
    });


    describe('Interpreter Facts', function () {

        it('add(zero,zero,zero) should be true', function () {
            assert(interpreter.checkQuery('add(zero, zero, zero)'));
        });

        it('add(zero, one, one) should be true', function () {
            assert(interpreter.checkQuery('add(zero, one, one)'));
        });

        it('add(one, two, three) should be false', function () {
            assert(!interpreter.checkQuery('add(one,two,three)'));
        });

        it('NotAFact(one, two, three) should be false', function () {
            assert(!interpreter.checkQuery('NotAFact(one, two, three)'));
        });

    });

    describe('Interpreter Rules', function () {

        it('subtract(one, one, two) should be false', function () {
            assert(!interpreter.checkQuery('subtract(one, one, two)') === true);
        });

        it('subtract(two, one, one) should be true', function () {
            assert(interpreter.checkQuery('subtract(two, one, one)'));
        });
    });


});

describe("Interpreter parse invalid database", function () {

    var invalid_db = [
        "varonjuan).",
        "varon(pepe.",
        "varon(hector).",
        "roberto.",
        "",
        "mujer(maria).",
        "mujer(cecilia).",
        "padre(juan, pepe).",
        "padre(juan, pepa).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X Y) - varonX padre(Y, X).",
        "hijaX, Y :- mujer(X), padre(Y, X)."
    ];

    var interpreter = null;

    before(function () {
        // runs before all tests in this block
        interpreter = new Interpreter();
    });

    describe('Interpreter parse invalid db should return array of invalid strings that could not be parsed', function () {

        it('should return ["varonjuan)." , "varon(pepe." ,  "roberto." , "", "hijo(X Y) - varonX padre(Y, X)." ,' +
            ' "hijaX, Y :- mujer(X), padre(Y, X)."]', function () {
            assert(interpreter.parseDB(invalid_db).toString() === ["varonjuan)." , "varon(pepe." , "roberto." , "",
                "hijo(X Y) - varonX padre(Y, X).", "hijaX, Y :- mujer(X), padre(Y, X)."].toString())
        });
    });
});


