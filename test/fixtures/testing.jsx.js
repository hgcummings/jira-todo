define([
    'some/module'
], function (
    someModule
) {
    'use strict';
    //TODO: PM-1234, X-99, PM-42

    /**
     * TODO TK-4711: Give this class a proper name!
     * @constructor
     */
    var Klass = function () {
        var classNames = 'hello jsx',
            style = '';

        return (
            <div
                className={classNames}
                style={style}
                onClick={this.props.clickHandler}
            />
        );
    };

    Klass.prototype.myMethod = function () {
        // fixme! ABC-13
        return 42;
    };

    /**
     * TODO please fix in ABC-99
     */
    Klass.prototype.whatevs = function () {
    };

    // TODO: give this method a proper name!
    Klass.prototype.foo = function () {
    };

    // TODO ABC-99: what about someModule?!
    return Klass;
});