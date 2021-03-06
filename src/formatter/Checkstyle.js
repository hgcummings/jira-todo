'use strict';

const escape = require('xml-escape');

const Formatter = require('./Formatter');

/**
 * @class jt.CheckstyleFormatter
 */
class CheckstyleFormatter extends Formatter {
    /**
     * @private
     * @param {jt.Reports} report
     */
    _report(reports) {
        reports.forEach(function (report) {
            this._writeLn([
                '<error',
                `line="${report.line}"`,
                `column="${report.column}"`,
                `severity="${report.valid ? 'info' : 'error'}"`,
                `message="${escape(report.message)}"/>`
            ].join(' '), 4);
        }, this);
    }

    /** @inheritDoc */
    start() {
        this._writeLn('<?xml version="1.0" encoding="utf-8"?>');
        this._writeLn('<checkstyle verstion="4.3">');
    }

    /** @inheritDoc */
    report(fileReport) {
        if (fileReport.reports.length === 0) {
            this._writeLn(`<file name="${escape(fileReport.file)}"/>`, 2);
        } else {
            this._writeLn(`<file name="${escape(fileReport.file)}">`, 2);
            this._report(fileReport.reports);
            this._writeLn('</file>', 2);
        }
    }

    /** @inheritDoc */
    end() {
        this._writeLn('</checkstyle>');
    }
}

module.exports = CheckstyleFormatter;
