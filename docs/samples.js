var samples = (function (exports,renderer) {
    'use strict';

    var SampleProgram = /** @class */ (function () {
        function SampleProgram() {
            console.log(renderer.GraphicsRender);
        }
        return SampleProgram;
    }());
    new SampleProgram();

    exports.SampleProgram = SampleProgram;

    return exports;

}({},renderer));
