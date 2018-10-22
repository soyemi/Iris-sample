var samples = (function (exports,renderer) {
    'use strict';

    function SampleProgram(name) {
        return function (constructor) {
            SampleRunner.registerSample(constructor.prototype, name);
        };
    }
    var SampleRunner = /** @class */ (function () {
        function SampleRunner(canvas) {
            this.m_timer = new renderer.FrameTimer(false);
            this.m_canvas = canvas;
            var grender = new renderer.GraphicsRender(canvas);
            this.m_graphicsRender = grender;
            var sname = SampleRunner.s_startSample;
            var sproto = SampleRunner.samples[sname];
            if (sproto == null)
                return;
            var program = Object.create(sproto);
            program.onInit();
            program.onSetupRender(grender);
            program.onSetupScene();
            this.m_curprogram = program;
            renderer.GLUtility.setTargetFPS(60);
            renderer.GLUtility.registerOnFrame(this.onFrame.bind(this));
        }
        SampleRunner.prototype.onFrame = function (ts) {
            var delta = this.m_timer.tick(ts);
            renderer.Input.onFrame(delta / 1000);
            var program = this.m_curprogram;
            program.onFrame(ts);
        };
        SampleRunner.registerSample = function (target, name) {
            SampleRunner.samples[name] = target;
            if (SampleRunner.s_startSample == null) {
                SampleRunner.s_startSample = name;
            }
        };
        SampleRunner.samples = {};
        return SampleRunner;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    var PathTracer = /** @class */ (function () {
        function PathTracer() {
        }
        PathTracer.prototype.onInit = function () {
        };
        PathTracer.prototype.onSetupRender = function (grender) {
        };
        PathTracer.prototype.onSetupScene = function () {
        };
        PathTracer.prototype.onFrame = function (ts) {
        };
        PathTracer.prototype.onRelease = function () {
        };
        PathTracer = __decorate([
            SampleProgram('Path Tracer')
        ], PathTracer);
        return PathTracer;
    }());

    exports.SampleProgram = SampleProgram;
    exports.SampleRunner = SampleRunner;
    exports.PathTracer = PathTracer;

    return exports;

}({},renderer));
