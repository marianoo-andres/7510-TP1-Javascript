var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');


describe("Interpreter", function () {

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


});


