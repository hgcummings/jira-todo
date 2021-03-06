'use strict';

const expect = require('chai').expect;
const libxmljs = require('libxmljs');

const test = require('../../setup');
const helper = require('./formatter.helper');

const CheckstyleFormatter = test.requireSrc('formatter/Checkstyle');

describe('checkstyle formatter', function () {
    function formatAndParse(fileReports) {
        const string = helper.format(CheckstyleFormatter, fileReports);

        return libxmljs.parseXmlString(string);
    }

    describe('produces well-formed output', function () {
        it('for no reports', function () {
            const string = helper.format(CheckstyleFormatter, []);

            expect(() => libxmljs.parseXmlString(string)).not.to.throw(Error);
        });

        it('for several reports', function () {
            const string = helper.format(CheckstyleFormatter, helper.sampleResult);

            expect(() => libxmljs.parseXmlString(string)).not.to.throw(Error);
        });
    });

    describe('produces the correct output', function () {
        // This would be easier if there was a DTD or Schema for Checkstyle reports, but I couldn't find any :(

        it('for no reports', function () {
            const document = formatAndParse([]);

            expect(document.find('//error')).to.have.length(0);
        });

        it('for several reports', function () {
            const document = formatAndParse(helper.sampleResult);
            const errors = document.find('//error');

            expect(errors).to.have.length(4);

            expect(errors[0].attr('line').value()).to.equal('12');
            expect(errors[0].attr('column').value()).to.equal('2');
            expect(errors[0].attr('message').value()).to.equal('Oh noes');
            expect(errors[0].attr('severity').value()).to.equal('error');

            expect(errors[1].attr('line').value()).to.equal('15');
            expect(errors[1].attr('column').value()).to.equal('10');
            expect(errors[1].attr('message').value()).to.equal('No issue key given');
            expect(errors[1].attr('severity').value()).to.equal('error');

            expect(errors[2].attr('line').value()).to.equal('17');
            expect(errors[2].attr('column').value()).to.equal('1');
            expect(errors[2].attr('message').value()).to.equal('I am Groot');
            expect(errors[2].attr('severity').value()).to.equal('info');

            expect(errors[3].attr('line').value()).to.equal('42');
            expect(errors[3].attr('column').value()).to.equal('4');
            expect(errors[3].attr('message').value()).to.equal('Escape > me!');
            expect(errors[3].attr('severity').value()).to.equal('error');
        });
    });
});
