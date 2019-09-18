'use strict';

var Frustum = /** @class */ (function () {
    function Frustum() {
    }
    Frustum.fromPerspectiveMtx = function (mtx) {
        var frustum = new Frustum();
        var mraw = mtx.raw;
        var a = mraw[10];
        var n = mraw[14] / (a - 1);
        var n2 = n * 2;
        var f = n - (a + 1) / n2;
        var w = n2 / mraw[0];
        var h = n2 / mraw[5];
        frustum.near = n;
        frustum.far = f;
        frustum.left = w / 2.0;
        frustum.right = frustum.left;
        frustum.top = h / 2.0;
        frustum.bottom = h / 2.0;
        return frustum;
    };
    return Frustum;
}());

var DEG2RAD_HALF = Math.PI / 360.0;
var DEG2RAD = Math.PI / 180.0;
var RAD2DEG = 180.0 / Math.PI;
var glmath = /** @class */ (function () {
    function glmath() {
    }
    glmath.vec3 = function (x, y, z) {
        return new vec3([x, y, z]);
    };
    glmath.closeTo = function (v, tar) {
        return Math.abs(v - tar) < glmath.eplison;
    };
    glmath.closeToZero = function (v) {
        return Math.abs(v) < glmath.eplison;
    };
    glmath.vec4 = function (x, y, z, w) {
        return new vec4([x, y, z, w]);
    };
    glmath.vec2 = function (x, y) {
        return new vec2([x, y]);
    };
    glmath.quat = function (x, y, z, w) {
        return new quat([x, y, z, w]);
    };
    glmath.clamp = function (v, min, max) {
        return v > max ? max : (v < min ? min : v);
    };
    glmath.eplison = 0.000000001;
    glmath.Deg2Rad = DEG2RAD;
    glmath.Rad2Deg = RAD2DEG;
    return glmath;
}());
var vec2 = /** @class */ (function () {
    function vec2(v) {
        this.raw = [0, 0];
        if (v != null) {
            this.raw = [v[0], v[1]];
        }
        else {
            this.raw = [0, 0];
        }
    }
    Object.defineProperty(vec2.prototype, "x", {
        get: function () { return this.raw[0]; },
        set: function (v) { this.raw[0] = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vec2.prototype, "y", {
        get: function () { return this.raw[1]; },
        set: function (v) { this.raw[1] = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vec2.prototype, "maginatude", {
        get: function () {
            var x = this.raw[0];
            var y = this.raw[1];
            return Math.sqrt(x * x + y * y);
        },
        enumerable: true,
        configurable: true
    });
    vec2.prototype.add = function (v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    };
    vec2.prototype.addToRef = function (v, ref) {
        if (ref == null) {
            return new vec2([this.x + v.x, this.y + v.y]);
        }
        else {
            ref.x = this.x + v.x;
            ref.y = this.y + v.y;
            return ref;
        }
    };
    vec2.prototype.sub = function (v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    };
    vec2.prototype.subToRef = function (v, ref) {
        if (ref == null) {
            return new vec2([this.x - v.x, this.y - v.y]);
        }
        else {
            ref.x = this.x - v.x;
            ref.y = this.y - v.y;
            return ref;
        }
    };
    vec2.prototype.mulNum = function (v) {
        this.x *= v;
        this.y *= v;
    };
    vec2.prototype.mulNumToRef = function (v, ref) {
        if (ref) {
            ref.x = this.x * v;
            ref.y = this.y * v;
            return ref;
        }
        return new vec2([this.x * v, this.y * v]);
    };
    vec2.prototype.mul = function (v) {
        this.x *= v.x;
        this.y *= v.y;
    };
    vec2.prototype.mulToRef = function (v, ref) {
        if (ref) {
            ref.x = this.x * v.x;
            ref.y = this.y * v.y;
            return ref;
        }
        return new vec2([this.x * v.x, this.y * v.y]);
    };
    vec2.prototype.div = function (v) {
        this.x /= v.x;
        this.y /= v.y;
    };
    vec2.prototype.divToRef = function (v, ref) {
        if (ref) {
            ref.x = this.x / v.x;
            ref.y = this.y / v.y;
            return ref;
        }
        return new vec2([this.x / v.x, this.y / v.y]);
    };
    vec2.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y;
    };
    vec2.prototype.clone = function () {
        return new vec2([this.x, this.y]);
    };
    Object.defineProperty(vec2.prototype, "normalize", {
        get: function () {
            this.mulNum(1.0 / this.maginatude);
            return this;
        },
        enumerable: true,
        configurable: true
    });
    vec2.prototype.normalized = function () {
        return this.mulNumToRef(this.maginatude);
    };
    vec2.prototype.set = function (v) {
        this.x = v.x;
        this.y = v.y;
    };
    Object.defineProperty(vec2, "zero", {
        get: function () { return new vec2(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vec2, "one", {
        get: function () { return new vec2([1, 1]); },
        enumerable: true,
        configurable: true
    });
    return vec2;
}());
var vec4 = /** @class */ (function () {
    function vec4(v) {
        if (v != null) {
            this.raw = [v[0], v[1], v[2], v[3]];
        }
        else {
            this.raw = [0, 0, 0, 0];
        }
    }
    Object.defineProperty(vec4.prototype, "x", {
        get: function () { return this.raw[0]; },
        set: function (v) { this.raw[0] = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vec4.prototype, "y", {
        get: function () { return this.raw[1]; },
        set: function (v) { this.raw[1] = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vec4.prototype, "z", {
        get: function () { return this.raw[2]; },
        set: function (v) { this.raw[2] = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vec4.prototype, "w", {
        get: function () { return this.raw[3]; },
        set: function (v) { this.raw[3] = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vec4.prototype, "length", {
        get: function () {
            return Math.sqrt(this.dot(this));
        },
        enumerable: true,
        configurable: true
    });
    vec4.prototype.isValid = function () {
        var raw = this.raw;
        return !isNaN(raw[0]) && !isNaN(raw[1]) && !isNaN(raw[2]) && isNaN(raw[3]);
    };
    vec4.prototype.add = function (v) {
        if (v instanceof vec3 || v instanceof vec4) {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
            this.w += ((v instanceof vec4) ? v.w : 0);
        }
        else if (v instanceof Array) {
            this.x += v[0];
            this.y += v[1];
            this.z += v[2];
            this.w += v[3];
        }
        else {
            this.x += v;
            this.y += v;
            this.z += v;
            this.w += v;
        }
        return this;
    };
    vec4.prototype.addToRef = function (v) {
        if (v instanceof vec3 || v instanceof vec4) {
            var x = v.x + this.x;
            var y = v.y + this.y;
            var z = v.z + this.z;
            var w = ((v instanceof vec4) ? v.w : 0) + this.w;
            return glmath.vec4(x, y, z, w);
        }
        else if (v instanceof Array) {
            var x = v[0] + this.x;
            var y = v[1] + this.y;
            var z = v[2] + this.z;
            var w = v[3] + this.w;
            return glmath.vec4(x, y, z, w);
        }
        else {
            return glmath.vec4(this.x + v, this.y + v, this.z + v, this.w + v);
        }
    };
    vec4.prototype.sub = function (v) {
        if (v instanceof vec3 || v instanceof vec4) {
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
            this.w -= ((v instanceof vec4) ? v.w : 0);
        }
        else if (v instanceof Array) {
            this.x -= v[0];
            this.y -= v[1];
            this.z -= v[2];
            this.w -= v[3];
        }
        else {
            this.x -= v;
            this.y -= v;
            this.z -= v;
            this.w -= v;
        }
        return this;
    };
    vec4.prototype.subToRef = function (v) {
        if (v instanceof vec3 || v instanceof vec4) {
            var x = v.x - this.x;
            var y = v.y - this.y;
            var z = v.z - this.z;
            var w = ((v instanceof vec4) ? v.w : 0) - this.w;
            return glmath.vec4(x, y, z, w);
        }
        else if (v instanceof Array) {
            var x = v[0] - this.x;
            var y = v[1] - this.y;
            var z = v[2] - this.z;
            var w = v[3] - this.w;
            return glmath.vec4(x, y, z, w);
        }
        else {
            return glmath.vec4(this.x - v, this.y - v, this.z - v, this.w - v);
        }
    };
    vec4.prototype.mulNum = function (v) {
        this.x *= v;
        this.y *= v;
        this.z *= v;
        this.w *= v;
        return this;
    };
    vec4.prototype.mulNumToRef = function (v) {
        return glmath.vec4(this.x * v, this.y * v, this.z * v, this.w * v);
    };
    vec4.prototype.mul = function (v) {
        if (v instanceof vec4) {
            this.x *= v.x;
            this.y *= v.y;
            this.z *= v.z;
            this.w *= v.w;
        }
        else if (v instanceof Array) {
            this.x *= v[0];
            this.y *= v[1];
            this.z *= v[2];
            this.w *= v[3];
        }
        else if (v instanceof mat4) {
            this.raw = v.mulvec(this).raw;
        }
        else if (v instanceof quat) {
            this.raw = v.rota(new vec3([this.x, this.y, this.z])).raw;
        }
        else {
            this.x *= v;
            this.y *= v;
            this.z *= v;
            this.w *= v;
        }
        return this;
    };
    vec4.prototype.mulToRef = function (v) {
        if (v instanceof vec4) {
            return glmath.vec4(v.x * this.x, v.y * this.y, v.z * this.z, v.w * this.w);
        }
        else if (v instanceof Array) {
            return glmath.vec4(v[0] * this.x, v[1] * this.y, v[2] * this.z, v[3] * this.w);
        }
        else if (v instanceof mat4) {
            return v.mulvec(this);
        }
        else if (v instanceof quat) {
            return null;
        }
        else {
            return glmath.vec4(this.x * v, this.y * v, this.z * v, this.w * v);
        }
    };
    vec4.prototype.div = function (v) {
        this.x /= v;
        this.y /= v;
        this.z /= v;
        this.w /= v;
        return this;
    };
    vec4.prototype.divToRef = function (v) {
        return glmath.vec4(this.x / v, this.y / v, this.z / v, this.w / v);
    };
    vec4.prototype.vec3 = function () {
        return glmath.vec3(this.x, this.y, this.z);
    };
    vec4.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    };
    vec4.prototype.clone = function () {
        return new vec4([this.x, this.y, this.z, this.w]);
    };
    Object.defineProperty(vec4.prototype, "normalize", {
        get: function () {
            return this.div(this.length);
        },
        enumerable: true,
        configurable: true
    });
    /** return new vec4 ref */
    vec4.prototype.normalized = function () {
        return this.divToRef(this.length);
    };
    vec4.Random = function () {
        return new vec4([Math.random(), Math.random(), Math.random(), Math.random()]);
    };
    vec4.prototype.equals = function (v) {
        var r = this.raw;
        var rv = v.raw;
        for (var i = 0; i < 4; i++) {
            if (r[i] != rv[i])
                return false;
        }
        return true;
    };
    vec4.prototype.set = function (v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        this.w = v.w;
    };
    vec4.prototype.setValue = function (x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    };
    vec4.prototype.setRaw = function (a) {
        this.x = a[0];
        this.y = a[1];
        this.z = a[2];
        this.w = a[3];
    };
    Object.defineProperty(vec4, "zero", {
        get: function () { return new vec4(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vec4, "one", {
        get: function () { return new vec4([1, 1, 1, 1]); },
        enumerable: true,
        configurable: true
    });
    return vec4;
}());
var vec3 = /** @class */ (function () {
    function vec3(v) {
        if (v != null) {
            this.raw = [v[0], v[1], v[2]];
        }
        else {
            this.raw = [0, 0, 0];
        }
    }
    Object.defineProperty(vec3.prototype, "x", {
        get: function () { return this.raw[0]; },
        set: function (v) { this.raw[0] = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vec3.prototype, "y", {
        get: function () { return this.raw[1]; },
        set: function (v) { this.raw[1] = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vec3.prototype, "z", {
        get: function () { return this.raw[2]; },
        set: function (v) { this.raw[2] = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vec3.prototype, "length", {
        get: function () {
            return Math.sqrt(this.dot(this));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vec3.prototype, "length2", {
        get: function () {
            var x = this.x;
            var y = this.y;
            var z = this.z;
            return x * x + y * y + z * z;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vec3.prototype, "isValid", {
        get: function () {
            var raw = this.raw;
            return !isNaN(raw[0]) && !isNaN(raw[1]) && !isNaN(raw[2]);
        },
        enumerable: true,
        configurable: true
    });
    vec3.prototype.add = function (v) {
        if (v instanceof vec3 || v instanceof vec4) {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
        }
        else if (v instanceof Array) {
            this.x += v[0];
            this.x += v[1];
            this.x += v[2];
        }
        else {
            this.x += v;
            this.y += v;
            this.z += v;
        }
        return this;
    };
    vec3.prototype.addToRef = function (v) {
        if (v instanceof vec3 || v instanceof vec4) {
            var x = v.x + this.x;
            var y = v.y + this.y;
            var z = v.z + this.z;
            return glmath.vec3(x, y, z);
        }
        else if (v instanceof Array) {
            var x = v[0] + this.x;
            var y = v[1] + this.y;
            var z = v[2] + this.z;
            return glmath.vec3(x, y, z);
        }
        else {
            return glmath.vec3(this.x + v, this.y + v, this.z + v);
        }
    };
    vec3.prototype.sub = function (v) {
        if (v instanceof vec3 || v instanceof vec4) {
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
        }
        else if (v instanceof Array) {
            this.x -= v[0];
            this.y -= v[1];
            this.z -= v[2];
        }
        else {
            this.x -= v;
            this.y -= v;
            this.z -= v;
        }
        return this;
    };
    vec3.prototype.subToRef = function (v) {
        if (v instanceof vec3 || v instanceof vec4) {
            var x = this.x - v.x;
            var y = this.y - v.y;
            var z = this.z - v.z;
            return glmath.vec3(x, y, z);
        }
        else if (v instanceof Array) {
            var x = this.x - v[0];
            var y = this.y - v[1];
            var z = this.z - v[2];
            return glmath.vec3(x, y, z);
        }
        else {
            return glmath.vec3(this.x - v, this.y - v, this.z - v);
        }
    };
    /**
     * multiply a number
     * @param n
     */
    vec3.prototype.mulNum = function (n) {
        this.x *= n;
        this.y *= n;
        this.z *= n;
        return this;
    };
    vec3.prototype.mulNumToRef = function (n) {
        return glmath.vec3(this.x * n, this.y * n, this.z * n);
    };
    vec3.prototype.mul = function (v) {
        if (v instanceof vec3 || v instanceof vec4) {
            this.x *= v.x;
            this.y *= v.y;
            this.z *= v.z;
        }
        else if (v instanceof Array) {
            this.x *= v[0];
            this.y *= v[1];
            this.z *= v[2];
        }
        else if (v instanceof mat3) {
            this.raw = v.mulvec(this).raw;
        }
        else if (v instanceof quat) {
            this.raw = v.rota(this).raw;
        }
        else {
            this.x *= v;
            this.y *= v;
            this.z *= v;
        }
        return this;
    };
    vec3.prototype.mulToRef = function (v) {
        if (v instanceof vec3 || v instanceof vec4) {
            var x = v.x * this.x;
            var y = v.y * this.y;
            var z = v.z * this.z;
            return glmath.vec3(x, y, z);
        }
        else if (v instanceof Array) {
            var x = v[0] * this.x;
            var y = v[1] * this.y;
            var z = v[2] * this.z;
            return glmath.vec3(x, y, z);
        }
        else if (v instanceof mat3) {
            return vec3.zero;
        }
        else if (v instanceof quat) {
            return v.rota(this);
        }
        else {
            return glmath.vec3(this.x * v, this.y * v, this.z * v);
        }
    };
    vec3.prototype.div = function (v) {
        this.x /= v;
        this.y /= v;
        this.z /= v;
        return this;
    };
    vec3.prototype.divToRef = function (v) {
        return glmath.vec3(this.x / v, this.y / v, this.z / v);
    };
    vec3.prototype.vec4 = function (w) {
        if (w === void 0) { w = 0; }
        return glmath.vec4(this.x, this.y, this.z, w);
    };
    vec3.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    };
    vec3.prototype.clone = function () {
        return new vec3([this.x, this.y, this.z]);
    };
    /**
     * CrossProduct operation
     * @param rhs right hand side
     */
    vec3.prototype.cross = function (rhs) {
        return vec3.Cross(this, rhs);
    };
    /**
     * Reverse CrossProduct operation
     * @param lhs left hand side
     */
    vec3.prototype.crossRev = function (lhs) {
        return vec3.Cross(lhs, this);
    };
    vec3.prototype.crossRevSafe = function (lhs) {
        return vec3.SafeCross(lhs, this);
    };
    vec3.Cross = function (lhs, rhs) {
        return new vec3([
            lhs.y * rhs.z - lhs.z * rhs.y,
            lhs.z * rhs.x - lhs.x * rhs.z,
            lhs.x * rhs.y - lhs.y * rhs.x
        ]);
    };
    vec3.SafeCross = function (lhs, rhs) {
        var c = new vec3([
            lhs.y * rhs.z - lhs.z * rhs.y,
            lhs.z * rhs.x - lhs.x * rhs.z,
            lhs.x * rhs.y - lhs.y * rhs.x
        ]);
        if (c.x == 0 && c.y == 0 && c.z == 0) {
            return this.Cross(lhs.addToRef([0.0000001, 0.0000001, 0.0000001]), rhs);
        }
        return c;
    };
    vec3.Dot = function (v1, v2) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    };
    vec3.Add = function (v1, v2) {
        return new vec3([v1.x + v2.x, v1.y + v2.y, v1.z + v2.z]);
    };
    Object.defineProperty(vec3.prototype, "normalized", {
        get: function () {
            var len = this.length;
            if (len == 0) {
                return this;
            }
            return this.div(this.length);
        },
        enumerable: true,
        configurable: true
    });
    vec3.prototype.Normalize = function () {
        var len = this.length;
        if (len == 0)
            return vec3.zero;
        return this.divToRef(this.length);
    };
    vec3.Random = function (allpositive) {
        if (allpositive === void 0) { allpositive = false; }
        if (allpositive) {
            return new vec3([Math.random(), Math.random(), Math.random()]);
        }
        else {
            return new vec3([Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5]);
        }
    };
    vec3.RandomNorm = function () {
        return quat.Random().rota(vec3.right);
    };
    vec3.Abs = function (v) {
        return new vec3([Math.abs(v.x), Math.abs(v.y), Math.abs(v.z)]);
    };
    vec3.prototype.set = function (v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
    };
    Object.defineProperty(vec3, "zero", {
        get: function () { return new vec3([0, 0, 0]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vec3, "one", {
        get: function () { return new vec3([1, 1, 1]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vec3, "up", {
        get: function () { return new vec3([0, 1, 0]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vec3, "forward", {
        get: function () { return new vec3([0, 0, 1]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vec3, "back", {
        get: function () { return new vec3([0, 0, -1]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vec3, "left", {
        get: function () { return new vec3([-1, 0, 0]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vec3, "right", {
        get: function () { return new vec3([1, 0, 0]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vec3, "down", {
        get: function () { return new vec3([0, -1, 0]); },
        enumerable: true,
        configurable: true
    });
    return vec3;
}());
var quat = /** @class */ (function () {
    function quat(v) {
        if (v != null) {
            this.raw = v;
        }
        else {
            this.raw = [0, 0, 0, 0];
        }
    }
    Object.defineProperty(quat.prototype, "x", {
        get: function () { return this.raw[0]; },
        set: function (v) { this.raw[0] = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(quat.prototype, "y", {
        get: function () { return this.raw[1]; },
        set: function (v) { this.raw[1] = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(quat.prototype, "z", {
        get: function () { return this.raw[2]; },
        set: function (v) { this.raw[2] = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(quat.prototype, "w", {
        get: function () { return this.raw[3]; },
        set: function (v) { this.raw[3] = v; },
        enumerable: true,
        configurable: true
    });
    quat.prototype.conjugate = function () {
        return quat.Conjugate(this);
    };
    /**
     * flip all component when w is negative;
     */
    quat.prototype.fmt = function () {
        if (this.w < 0) {
            var r = this.raw;
            r[0] = -r[0];
            r[1] = -r[1];
            r[2] = -r[2];
            r[3] = -r[3];
        }
        return this;
    };
    quat.prototype.mul = function (r) {
        var l = this;
        var rw = r.w;
        var rx = r.x;
        var ry = r.y;
        var rz = r.z;
        var lx = l.x;
        var ly = l.y;
        var lz = l.z;
        var lw = l.w;
        return new quat([
            rw * lx + lw * rx + ly * rz - lz * ry,
            rw * ly + lw * ry + lz * rx - lx * rz,
            rw * lz + lw * rz + lx * ry - ly * rx,
            rw * lw - lx * rx - ly * ry - lz * rz
        ]).fmt();
    };
    /**
     * Multiply self with quat <param l>, then return self
     * @param l
     */
    quat.prototype.selfRota = function (l) {
        var rw = this.w;
        var rx = this.x;
        var ry = this.y;
        var rz = this.z;
        var lx = l.x;
        var ly = l.y;
        var lz = l.z;
        var lw = l.w;
        this.x = rw * lx + lw * rx + ly * rz - lz * ry;
        this.y = rw * ly + lw * ry + lz * rx - lx * rz;
        this.z = rw * lz + lw * rz + lx * ry - ly * rx;
        this.w = rw * lw - lx * rx - ly * ry - lz * rz;
        return this;
    };
    Object.defineProperty(quat, "Identity", {
        /**
         * Identity quaternion [0,0,0,1]
         */
        get: function () {
            return new quat([
                0, 0, 0, 1
            ]);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Rotate vector by self
     * @param v
     */
    quat.prototype.rota = function (v) {
        var q = new vec3([this.x, this.y, this.z]);
        var t = q.cross(v).mul(2);
        return v.clone().add(t.mulToRef(this.w)).add(q.cross(t));
    };
    /**
     * Convert euler angle (degree) to quaternion
     * width order Z-X-Y
     * @param degx
     * @param degy
     * @param degz
     */
    quat.fromEulerDeg = function (degx, degy, degz) {
        var rx = degx * DEG2RAD_HALF;
        var ry = degy * DEG2RAD_HALF;
        var rz = degz * DEG2RAD_HALF;
        var cosx = Math.cos(rx);
        var cosy = Math.cos(ry);
        var cosz = Math.cos(rz);
        var sinx = Math.sin(rx);
        var siny = Math.sin(ry);
        var sinz = Math.sin(rz);
        return new quat([
            sinx * cosy * cosz + cosx * siny * sinz,
            cosx * siny * cosz - sinx * cosy * sinz,
            cosx * cosy * sinz - sinx * siny * cosz,
            cosx * cosy * cosz + sinx * siny * sinz
        ]);
    };
    /**
     * Convert euler angle (radians) to quaternion
     * width order Z-X-Y
     * @param rx
     * @param ry
     * @param rz
     */
    quat.fromEuler = function (rx, ry, rz) {
        var rxh = rx / 2.0;
        var ryh = ry / 2.0;
        var rzh = rz / 2.0;
        var cosx = Math.cos(rxh);
        var cosy = Math.cos(ryh);
        var cosz = Math.cos(rzh);
        var sinx = Math.sin(rxh);
        var siny = Math.sin(ryh);
        var sinz = Math.sin(rzh);
        return new quat([
            sinx * cosy * cosz + cosx * siny * sinz,
            cosx * siny * cosz - sinx * cosy * sinz,
            cosx * cosy * sinz - sinx * siny * cosz,
            cosx * cosy * cosz + sinx * siny * sinz
        ]);
    };
    /**
     * Convert quaternion to Euler angle (radians).
     * Z-X-Y order
     */
    quat.prototype.toEuler = function () {
        var v = new vec3();
        var x = this.z;
        var y = this.x;
        var z = this.y;
        var w = this.w;
        var t0 = 2.0 * (w * x + y * z);
        var t1 = 1.0 - 2.0 * (x * x + y * y);
        v.z = Math.atan2(t0, t1);
        var t2 = 2.0 * (w * y - z * x);
        if (t2 > 1.0) {
            t2 = 1.0;
        }
        else if (t2 < -1.0) {
            t2 = -1.0;
        }
        v.x = Math.asin(t2);
        var t3 = 2.0 * (w * z + x * y);
        var t4 = 1.0 - 2.0 * (y * y + z * z);
        v.y = Math.atan2(t3, t4);
        return v;
    };
    /**
     * Covert quaternion to Euler angle (degree).
     */
    quat.prototype.toEulerDeg = function () {
        var v = new vec3();
        var x = this.z;
        var y = this.x;
        var z = this.y;
        var w = this.w;
        var t0 = 2.0 * (w * x + y * z);
        var t1 = 1.0 - 2.0 * (x * x + y * y);
        v.z = Math.atan2(t0, t1) * RAD2DEG;
        var t2 = 2.0 * (w * y - z * x);
        if (t2 > 1.0) {
            t2 = 1.0;
        }
        else if (t2 < -1.0) {
            t2 = -1.0;
        }
        v.x = Math.asin(t2) * RAD2DEG;
        var t3 = 2.0 * (w * z + x * y);
        var t4 = 1.0 - 2.0 * (y * y + z * z);
        v.y = Math.atan2(t3, t4) * RAD2DEG;
        return v;
    };
    quat.axisRotation = function (axis, angle) {
        var d = 1.0 / axis.length;
        var sin = Math.sin(angle / 2);
        var cos = Math.cos(angle / 2);
        var v4 = axis.mulToRef(d * sin).vec4(cos);
        return new quat(v4.raw);
    };
    Object.defineProperty(quat.prototype, "axis", {
        get: function () {
            var magnitude = this.magnitude2();
            if (magnitude >= 1.0000001) {
                throw new Error();
            }
            var w = this.w;
            var sin = Math.sqrt(1.0 - w * w);
            return glmath.vec3(this.x / sin, this.y / sin, this.z / sin);
        },
        enumerable: true,
        configurable: true
    });
    quat.axisRotationDeg = function (axis, deg) {
        var angle = deg * DEG2RAD;
        var d = 1.0 / axis.length;
        var sin = Math.sin(angle / 2);
        var cos = Math.cos(angle / 2);
        var v4 = axis.mulToRef(d * sin).vec4(cos);
        return new quat(v4.raw);
    };
    /**
     * Calculate quaternion of rotation of vec3[from] -> vec3[to]
     * @param from
     * @param to
     * @param normal
     */
    quat.FromToNormal = function (from, to, normal) {
        var f = from.Normalize();
        var t = to.Normalize();
        var n = normal.Normalize();
        var cross = vec3.Cross(f, t);
        var croosLen2 = cross.length2;
        if (croosLen2 == 0) {
            var dot = f.dot(t);
            if (dot == 1) {
                return quat.Identity;
            }
            var cr = vec3.Cross(n, f);
            var cu = vec3.Cross(f, cr);
            var nor = cu.normalized;
            return new quat([nor.x, nor.y, nor.z, 0]);
        }
        cross.div(Math.sqrt(croosLen2));
        var cos = f.dot(t);
        var cosh = Math.sqrt((1 + cos) / 2.0);
        var sinh = Math.sqrt((1 - cos) / 2.0);
        var cdotn = cross.dot(n);
        if (cdotn < 0) {
            cross.mul(-1.0);
            cosh *= -1.0;
        }
        return new quat([cross.x * sinh, cross.y * sinh, cross.z * sinh, cosh]);
    };
    quat.Coordinate = function (forward, up) {
        if (forward.dot(up) > Number.EPSILON) {
            throw new Error("<forward> must be perpendicular ot <up>");
        }
        var f = forward.Normalize();
        var u = up.Normalize();
        var qf = quat.FromToNormal(vec3.forward, f, u);
        var u1 = qf.rota(vec3.up);
        var qu = quat.FromToNormal(u1, up, f);
        return qu.mul(qf);
    };
    quat.QuatToMtx = function (q) {
        var x = q.x;
        var y = q.y;
        var z = q.z;
        var w = q.w;
        var x2 = 2 * x * x;
        var y2 = 2 * y * y;
        var z2 = 2 * z * z;
        var xy2 = x * y * 2;
        var yz2 = y * z * 2;
        var zx2 = z * x * 2;
        var wx2 = w * x * 2;
        var wy2 = w * y * 2;
        var wz2 = w * z * 2;
        return new mat3([
            1 - y2 - z2, xy2 + wz2, zx2 - wy2,
            xy2 - wz2, 1 - x2 - z2, yz2 + wx2,
            zx2 + wy2, yz2 - wx2, 1 - x2 - y2
        ]);
    };
    quat.Conjugate = function (q) {
        return new quat([-q.x, -q.y, -q.z, q.w]);
    };
    /**
     * Flip coordinate axis of quaternion
     * @param q
     * @param xaxis
     * @param yaxis
     * @param zaxis
     */
    quat.Flip = function (q, xaxis, yaxis, zaxis) {
        var r = q.clone();
        var c = 0;
        if (xaxis) {
            r.x = -r.x;
            c++;
        }
        if (yaxis) {
            r.y = -r.y;
            c++;
        }
        if (zaxis) {
            r.z = -r.z;
            c++;
        }
        if (c % 2 == 1) {
            r.x = -r.x;
            r.y = -r.y;
            r.z = -r.z;
        }
        return r;
    };
    /**
     * div LHS quat by default
     * @param p
     * @param q
     * @param rhs false: p = rq, true: p =qr
     */
    quat.Div = function (p, q, rhs) {
        if (rhs === void 0) { rhs = false; }
        if (rhs) {
            return p.mul(q.conjugate());
        }
        else {
            return q.conjugate().mul(p);
        }
    };
    quat.MtxToQuat = function (mtx) {
        var raw = mtx.raw;
        var a1 = raw[1];
        var a2 = raw[2];
        var a3 = raw[3];
        var a5 = raw[5];
        var a7 = raw[7];
        var a8 = raw[8];
        var a0 = raw[0];
        var a4 = raw[4];
        var a6 = raw[6];
        var w2 = (a0 + a4 + 1 + a8) / 4;
        var x2 = (a0 + 1 - 2 * w2) / 2;
        var x = Math.sqrt(x2);
        var y = 0;
        var z = 0;
        var w = 0;
        if (x < 0.000001) {
            x = 0;
            var y2 = 1 - a8;
            if (y2 == 0) {
                y = 0;
                var zw = -a3 / 2.0;
                w = Math.sqrt((a0 + 1) / 2.0);
                z = w == 0 ? 1.0 : zw / w;
            }
            else {
                y = Math.sqrt(y2 / 2.0);
                z = a7 / 2.0 / y;
                w = a6 / 2.0 / y;
            }
        }
        else {
            y = (a1 + a3) / 4.0 / x;
            if (y == 0) {
                z = a2 / 2.0 / x;
                w = a7 / -2.0 / x;
            }
            else {
                z = (a5 + a7) / 4.0 / y;
                w = z == 0 ? (a7 / -2.0 / x) : ((a1 - a3) / 4.0 / z);
            }
        }
        return new quat([x, y, z, w]);
    };
    quat.prototype.equals = function (q) {
        var qraw = (q.w * this.w < 0) ? [-q.x, -q.y, -q.z, -q.w] : q.raw;
        for (var i = 0; i < 4; i++) {
            if (Math.abs(qraw[i] - this.raw[i]) > 0.001)
                return false;
        }
        return true;
    };
    quat.prototype.magnitude2 = function () {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        var w = this.w;
        return x * x + y * y + z * z + w * w;
    };
    quat.prototype.magnitude = function () {
        return Math.sqrt(this.magnitude2());
    };
    quat.prototype.clone = function () {
        return new quat([this.x, this.y, this.z, this.w]);
    };
    quat.Random = function () {
        var q = quat.axisRotation(glmath.vec3(Math.random(), Math.random(), Math.random()), Math.PI * 2 * Math.random());
        q.fmt();
        return q;
    };
    quat.prototype.set = function (q) {
        this.x = q.x;
        this.y = q.y;
        this.z = q.z;
        this.w = q.w;
    };
    return quat;
}());
var mat4 = /** @class */ (function () {
    function mat4(v) {
        if (v != null) {
            this.raw = v;
        }
        else {
            this.raw = new Array(16);
        }
    }
    mat4.prototype.column = function (index) {
        var raw = this.raw;
        var o = index * 4;
        return new vec4([raw[o], raw[o + 1], raw[o + 2], raw[o + 3]]);
    };
    mat4.prototype.row = function (index) {
        var raw = this.raw;
        var o = index;
        return new vec4([raw[o], raw[o + 4], raw[o + 8], raw[o + 12]]);
    };
    Object.defineProperty(mat4, "Identity", {
        get: function () {
            return new mat4([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ]);
        },
        enumerable: true,
        configurable: true
    });
    mat4.lookAt = function (eye, target, up) {
        var vz = eye.subToRef(target).normalized;
        var vx = up.cross(vz).normalized;
        var vy = vz.cross(vx).normalized;
        return mat4.inverse(new mat4([
            vx.x, vx.y, vx.z, 0,
            vy.x, vy.y, vy.z, 0,
            vz.x, vz.y, vz.z, 0,
            -vx.dot(eye),
            -vy.dot(eye),
            -vz.dot(eye),
            1
        ]));
    };
    Object.defineProperty(mat4.prototype, "isValid", {
        get: function () {
            var raw = this.raw;
            var len = raw.length;
            for (var t = 0; t < len; t++) {
                if (isNaN(raw[t]))
                    return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Build coordinate change matrix RH->RH LH->LH
     * @param pos pos
     * @param forward dir
     * @param up dir
     */
    mat4.coord = function (pos, forward, up) {
        var f = forward.Normalize();
        var u = up.Normalize();
        var r = u.cross(f).normalized;
        u = f.cross(r).normalized;
        return new mat4([
            r.x, u.x, f.x, 0,
            r.y, u.y, f.y, 0,
            r.z, u.z, f.z, 0,
            -r.dot(pos), -u.dot(pos), -f.dot(pos), 1
        ]);
    };
    /**
     * Build matrix for coordinate conversion RH->LH LH->RH
     * @param pos pos
     * @param forward dir
     * @param up dir
     */
    mat4.coordCvt = function (pos, forward, up) {
        var f = forward.Normalize();
        var u = up.Normalize();
        var r = u.crossRevSafe(f).normalized;
        u = f.crossRevSafe(r).normalized;
        return new mat4([
            r.x, u.x, f.x, 0,
            r.y, u.y, f.y, 0,
            r.z, u.z, f.z, 0,
            -r.dot(pos), -u.dot(pos), -f.dot(pos), 1
        ]);
    };
    /**
     * Left Hand Coordinate
     * @param w
     * @param h
     * @param n
     * @param f
     */
    mat4.perspective = function (w, h, n, f) {
        return new mat4([
            2 * n / w, 0, 0, 0,
            0, 2 * n / h, 0, 0,
            0, 0, (n + f) / (n - f), -1,
            0, 0, 2 * n * f / (n - f), 0
        ]);
    };
    /**
     * Left Hand Coordinate
     * @param fov
     * @param aspect
     * @param n
     * @param f
     */
    mat4.perspectiveFoV = function (fov, aspect, n, f) {
        var h = Math.tan(fov / 360.0 * Math.PI) * n * 2;
        var w = h * aspect;
        return this.perspective(w, h, n, f);
    };
    /**
     * Left Hand coordinate
     * @param w
     * @param h
     * @param n
     * @param f
     */
    mat4.orthographic = function (w, h, n, f) {
        var d = f - n;
        return new mat4([
            2.0 / w, 0, 0, 0,
            0, 2.0 / h, 0, 0,
            0, 0, 2.0 / d, 0,
            0, 0, -(n + f) / d, 1
        ]);
    };
    mat4.prototype.inverse = function () {
        return mat4.inverse(this);
    };
    mat4.inverse = function (mtx) {
        var m = mtx.raw;
        var dst = new Array(16);
        var m00 = m[0 * 4 + 0];
        var m01 = m[0 * 4 + 1];
        var m02 = m[0 * 4 + 2];
        var m03 = m[0 * 4 + 3];
        var m10 = m[1 * 4 + 0];
        var m11 = m[1 * 4 + 1];
        var m12 = m[1 * 4 + 2];
        var m13 = m[1 * 4 + 3];
        var m20 = m[2 * 4 + 0];
        var m21 = m[2 * 4 + 1];
        var m22 = m[2 * 4 + 2];
        var m23 = m[2 * 4 + 3];
        var m30 = m[3 * 4 + 0];
        var m31 = m[3 * 4 + 1];
        var m32 = m[3 * 4 + 2];
        var m33 = m[3 * 4 + 3];
        var tmp_0 = m22 * m33;
        var tmp_1 = m32 * m23;
        var tmp_2 = m12 * m33;
        var tmp_3 = m32 * m13;
        var tmp_4 = m12 * m23;
        var tmp_5 = m22 * m13;
        var tmp_6 = m02 * m33;
        var tmp_7 = m32 * m03;
        var tmp_8 = m02 * m23;
        var tmp_9 = m22 * m03;
        var tmp_10 = m02 * m13;
        var tmp_11 = m12 * m03;
        var tmp_12 = m20 * m31;
        var tmp_13 = m30 * m21;
        var tmp_14 = m10 * m31;
        var tmp_15 = m30 * m11;
        var tmp_16 = m10 * m21;
        var tmp_17 = m20 * m11;
        var tmp_18 = m00 * m31;
        var tmp_19 = m30 * m01;
        var tmp_20 = m00 * m21;
        var tmp_21 = m20 * m01;
        var tmp_22 = m00 * m11;
        var tmp_23 = m10 * m01;
        var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
            (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
        var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
            (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
        var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
            (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
        var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
            (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
        var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
        dst[0] = d * t0;
        dst[1] = d * t1;
        dst[2] = d * t2;
        dst[3] = d * t3;
        dst[4] = d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
            (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
        dst[5] = d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
            (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
        dst[6] = d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
            (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
        dst[7] = d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
            (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
        dst[8] = d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
            (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
        dst[9] = d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
            (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
        dst[10] = d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
            (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
        dst[11] = d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
            (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
        dst[12] = d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
            (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
        dst[13] = d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
            (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
        dst[14] = d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
            (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
        dst[15] = d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
            (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));
        return new mat4(dst);
    };
    mat4.Translate = function (v) {
        return new mat4([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            v.x, v.y, v.z, 1
        ]);
    };
    mat4.mul = function (mtx, v) {
        return new vec4([
            v.dot(mtx.row(0)),
            v.dot(mtx.row(1)),
            v.dot(mtx.row(2)),
            v.dot(mtx.row(3))
        ]);
    };
    mat4.prototype.add = function (m) {
        return mat4.add(this, m);
    };
    mat4.add = function (m1, m2) {
        var ary = [];
        var raw1 = m1.raw;
        var raw2 = m2.raw;
        for (var i = 0; i < 16; i++) {
            ary.push(raw1[i] + raw2[i]);
        }
        return new mat4(ary);
    };
    mat4.prototype.mulvec = function (v) {
        return mat4.mul(this, v);
    };
    mat4.prototype.mulnum = function (n) {
        var nary = [];
        var raw = this.raw;
        for (var i = 0; i < 16; i++) {
            nary.push(raw[i] * n);
        }
        return new mat4(nary);
    };
    mat4.Scale = function (scale) {
        return new mat4([
            scale.x, 0, 0, 0,
            0, scale.y, 0, 0,
            0, 0, scale.z, 0,
            0, 0, 0, 1
        ]);
    };
    mat4.Rotation = function (q) {
        var mtx = quat.QuatToMtx(q).toMat4();
        return mtx;
    };
    mat4.RotationEler = function (rad) {
        return mat3.Rotation(quat.fromEuler(rad.x, rad.y, rad.z)).toMat4();
    };
    mat4.TRS = function (translate, rota, scale) {
        var mtxr = quat.QuatToMtx(rota).raw;
        var x = scale.x;
        var y = scale.y;
        var z = scale.z;
        return new mat4([
            mtxr[0] * x, mtxr[1] * x, mtxr[2] * x, 0,
            mtxr[3] * y, mtxr[4] * y, mtxr[5] * y, 0,
            mtxr[6] * z, mtxr[7] * z, mtxr[8] * z, 0,
            translate.x, translate.y, translate.z, 1
        ]);
    };
    mat4.prototype.setTRS = function (translate, rota, scale) {
        var raw = this.raw;
        var r = quat.QuatToMtx(rota).raw;
        var x = scale.x;
        var y = scale.y;
        var z = scale.z;
        raw[0] = r[0] * x;
        raw[1] = r[1] * x;
        raw[2] = r[2] * x;
        raw[3] = 0;
        raw[4] = r[3] * y;
        raw[5] = r[4] * y;
        raw[6] = r[5] * y;
        raw[7] = 0;
        raw[8] = r[6] * z;
        raw[9] = r[7] * z;
        raw[10] = r[8] * z;
        raw[11] = 0;
        raw[12] = translate.x;
        raw[13] = translate.y;
        raw[14] = translate.z;
        raw[15] = 1;
    };
    mat4.prototype.set = function (mtx) {
        var raw = this.raw;
        var mraw = mtx.raw;
        for (var i = 0; i < 16; i++) {
            raw[i] = mraw[i];
        }
    };
    mat4.prototype.mul = function (rhs) {
        var m0 = this.row(0);
        var m1 = this.row(1);
        var m2 = this.row(2);
        var m3 = this.row(3);
        var n0 = rhs.column(0);
        var n1 = rhs.column(1);
        var n2 = rhs.column(2);
        var n3 = rhs.column(3);
        return new mat4([
            m0.dot(n0), m1.dot(n0), m2.dot(n0), m3.dot(n0),
            m0.dot(n1), m1.dot(n1), m2.dot(n1), m3.dot(n1),
            m0.dot(n2), m1.dot(n2), m2.dot(n2), m3.dot(n2),
            m0.dot(n3), m1.dot(n3), m2.dot(n3), m3.dot(n3)
        ]);
    };
    mat4.prototype.transpose = function () {
        return mat4.Transpose(this);
    };
    mat4.Transpose = function (m) {
        var raw = m.raw;
        return new mat4([
            raw[0], raw[4], raw[8], raw[10],
            raw[1], raw[5], raw[7], raw[11],
            raw[2], raw[6], raw[8], raw[12],
            raw[3], raw[7], raw[9], raw[13],
        ]);
    };
    /**
     * Decompose mat4 into translation rotation and scale, No shear
     * @param mat
     * @param hasNegativeScale optimize when scale components all positive.
     * @returns [T,R,S]
     */
    mat4.Decompose = function (mat, hasNegativeScale) {
        var raw = mat.raw;
        var t = glmath.vec3(raw[12], raw[13], raw[14]);
        var r0 = raw[0];
        var r1 = raw[1];
        var r2 = raw[2];
        var r4 = raw[4];
        var r5 = raw[5];
        var r6 = raw[6];
        var r8 = raw[8];
        var r9 = raw[9];
        var r10 = raw[10];
        var c0 = glmath.vec3(r0, r1, r2);
        var c1 = glmath.vec3(r4, r5, r6);
        var c2 = glmath.vec3(r8, r9, r10);
        var scale = glmath.vec3(c0.length, c1.length, c2.length);
        if (hasNegativeScale == null || hasNegativeScale == true) {
            var determinant = r0 * (r5 * r10 - r6 * r9) - r1 * (r4 * r10 - r8 * r6) + r2 * (r4 * r9 - r5 * r8);
            if (determinant < 0) {
                scale.z = -scale.z; //set z to negative ensures that MtxToQuat not get the NaN value.
            }
        }
        var mtx3 = mat3.fromColumns(c0.div(scale.x), c1.div(scale.y), c2.div(scale.z));
        var rota = quat.MtxToQuat(mtx3);
        if (isNaN(rota.w) || isNaN(rota.x) || isNaN(rota.y) || isNaN(rota.z)) {
            throw new Error("quat is NaN, " + mtx3.raw);
        }
        return [t, rota, scale];
    };
    mat4.DecomposeTRS = function (mat, t, q, s) {
        var smtx = new mat3();
        mat4.DecomposeAffine(mat, t, smtx, s);
        q.set(quat.MtxToQuat(smtx));
    };
    /**
     * Decompose Affine Matrix
     * https://matthew-brett.github.io/transforms3d/reference/transforms3d.affines.html#decompose44?tdsourcetag=s_pctim_aiomsg
     * @param mat
     * @param t translate
     * @param q rotation
     * @param s zoom [sx,sy,sz]
     * @param sk skew [sxy,sxz,syz]
     */
    mat4.DecomposeAffine = function (mat, t, q, s, sk) {
        var raw = mat.raw;
        t.x = raw[12];
        t.y = raw[13];
        t.z = raw[14];
        var mtx3 = mat.toMat3();
        mat3.DecomposeAffine(mtx3, q, s, sk);
    };
    mat4.prototype.clone = function () {
        var ary = this.raw.slice(0);
        return new mat4(ary);
    };
    mat4.RandomTRS = function () {
        return mat4.TRS(vec3.Random(), quat.Random(), vec3.Random());
    };
    mat4.prototype.mat3Determinant = function () {
        var raw = this.raw;
        return raw[0] * (raw[5] * raw[10] - raw[6] * raw[9]) -
            raw[4] * (raw[1] * raw[10] - raw[2] * raw[9]) +
            raw[8] * (raw[1] * raw[6] - raw[2] * raw[5]);
    };
    mat4.prototype.toMat3 = function () {
        var raw = this.raw;
        return new mat3([raw[0], raw[1], raw[2],
            raw[4], raw[5], raw[6],
            raw[8], raw[9], raw[10]]);
    };
    return mat4;
}());
var mat3 = /** @class */ (function () {
    function mat3(v) {
        if (v != null) {
            this.raw = v;
        }
        else {
            this.raw = new Array(9);
        }
    }
    /**
     * Get column of matrix
     * @param index
     */
    mat3.prototype.column = function (index) {
        var raw = this.raw;
        var o = index * 3;
        return new vec3([raw[o], raw[o + 1], raw[o + 2]]);
    };
    mat3.prototype.setColumn = function (c, index) {
        var raw = this.raw;
        var o = index * 3;
        raw[o] = c.x;
        raw[o + 1] = c.y;
        raw[o + 2] = c.z;
    };
    /**
     * Get row of matrix
     * @param index
     */
    mat3.prototype.row = function (index) {
        var raw = this.raw;
        var o = index;
        return new vec3([raw[o], raw[o + 3], raw[o + 6]]);
    };
    mat3.prototype.setRow = function (r, index) {
        var raw = this.raw;
        raw[index] = r.x;
        raw[index + 3] = r.y;
        raw[index + 6] = r.z;
    };
    Object.defineProperty(mat3, "Identity", {
        get: function () {
            return new mat3([1, 0, 0, 0, 1, 0, 0, 0, 1]);
        },
        enumerable: true,
        configurable: true
    });
    mat3.Transpose = function (m) {
        var raw = m.raw;
        return new mat3([
            raw[0], raw[3], raw[6],
            raw[1], raw[4], raw[7],
            raw[2], raw[5], raw[8]
        ]);
    };
    mat3.prototype.transpose = function () {
        return mat3.Transpose(this);
    };
    mat3.prototype.toMat4 = function () {
        return mat3.ToMat4(this);
    };
    mat3.ToMat4 = function (m) {
        var r = m.raw;
        return new mat4([
            r[0], r[1], r[2], 0,
            r[3], r[4], r[5], 0,
            r[6], r[7], r[8], 0,
            0, 0, 0, 1
        ]);
    };
    mat3.Cross = function (lhs) {
        return new mat3([
            0, lhs.z, -lhs.y,
            -lhs.z, 0, lhs.x,
            lhs.y, -lhs.x, 0
        ]);
    };
    mat3.Diagonal = function (v) {
        return new mat3([
            v.x, 0, 0,
            0, v.y, 0,
            0, 0, v.z
        ]);
    };
    mat3.UpperTri = function (v) {
        return new mat3([
            1, v.x, v.y,
            0, 1, v.z,
            0, 0, 1
        ]);
    };
    /**
     * Create mat3 from composition of scaling and rotation.
     * @param rota
     * @param s
     */
    mat3.fromRS = function (rota, s) {
        return mat3.Mul(quat.QuatToMtx(rota), mat3.Scale(s.x, s.y, s.z));
    };
    mat3.Mul = function (lhs, rhs) {
        var m0 = lhs.row(0);
        var m1 = lhs.row(1);
        var m2 = lhs.row(2);
        var n0 = rhs.column(0);
        var n1 = rhs.column(1);
        var n2 = rhs.column(2);
        return new mat3([
            m0.dot(n0), m1.dot(n0), m2.dot(n0),
            m0.dot(n1), m1.dot(n1), m2.dot(n1),
            m0.dot(n2), m1.dot(n2), m2.dot(n2)
        ]);
    };
    mat3.fromRows = function (r0, r1, r2) {
        return new mat3([
            r0.x, r1.x, r2.x,
            r0.y, r1.y, r2.y,
            r0.z, r1.z, r2.z
        ]);
    };
    mat3.fromColumns = function (c0, c1, c2) {
        return new mat3([
            c0.x, c0.y, c0.z,
            c1.x, c1.y, c1.z,
            c2.x, c2.y, c2.z,
        ]);
    };
    mat3.prototype.mul = function (rhs) {
        return mat3.Mul(this, rhs);
    };
    mat3.CrossRHS = function (rhs) {
        return new mat3([
            0, -rhs.z, rhs.y,
            rhs.z, 0, -rhs.x,
            -rhs.y, rhs.x, 0
        ]);
    };
    mat3.prototype.mulvec = function (v) {
        return mat3.MulVec(this, v);
    };
    mat3.MulVec = function (mat, v) {
        return new vec3([
            mat.row(0).dot(v),
            mat.row(1).dot(v),
            mat.row(2).dot(v),
        ]);
    };
    mat3.Scale = function (sx, sy, sz) {
        return new mat3([
            sx, 0, 0,
            0, sy, 0,
            0, 0, sz
        ]);
    };
    mat3.Shear = function (sk) {
        return new mat3([
            1, sk.x, sk.y,
            0, 1, sk.z,
            0, 0, 1
        ]);
    };
    /**
     * Scale(s) * Shear(sk)
     * @param s
     * @param sk
     */
    mat3.ScaleShear = function (s, sk) {
        var sx = s.x;
        var sy = s.y;
        return new mat3([
            sx, sx * sk.x, sx * sk.y,
            0, sy, sy * sk.z,
            0, 0, s.z
        ]);
    };
    /**
     * Convert quaternion rotation to Matrix
     * @param q
     */
    mat3.Rotation = function (q) {
        return quat.QuatToMtx(q);
    };
    mat3.prototype.clone = function () {
        var ary = this.raw.slice(0);
        return new mat3(ary);
    };
    mat3.prototype.determinant = function () {
        var raw = this.raw;
        return raw[0] * (raw[4] * raw[8] - raw[5] * raw[7]) -
            raw[3] * (raw[1] * raw[8] - raw[2] * raw[7]) +
            raw[6] * (raw[1] * raw[5] - raw[2] * raw[4]);
    };
    /**
     * Decompose Affine matrix
     * @param mat
     * @param q Rotation matrix
     * @param s Diagonal matrix
     * @param sk Shear matrix
     */
    mat3.DecomposeAffine = function (mat, q, s, sk) {
        var raw = mat.raw;
        var r0 = raw[0];
        var r1 = raw[1];
        var r2 = raw[2];
        var r3 = raw[3];
        var r4 = raw[4];
        var r5 = raw[5];
        var r6 = raw[6];
        var r7 = raw[7];
        var r8 = raw[8];
        var m0 = glmath.vec3(r0, r1, r2);
        var m1 = glmath.vec3(r3, r4, r5);
        var m2 = glmath.vec3(r6, r7, r8);
        var M0 = m0.clone();
        var M1 = m1.clone();
        var M2 = m2.clone();
        var sx = M0.length;
        M0.div(sx);
        var sx_sxy = M0.dot(M1);
        M1.sub(M0.mulNumToRef(sx_sxy));
        var sy = M1.length;
        M1.div(sy);
        var sx_sxz = M0.dot(M2);
        var sy_syz = M1.dot(M2);
        M2.sub(M0.mulNumToRef(sx_sxz).add(M1.mulNumToRef(sy_syz)));
        var sz = M2.length;
        M2.div(sz);
        q.setColumn(M0, 0);
        q.setColumn(M1, 1);
        q.setColumn(M2, 2);
        if (q.determinant() < 0) {
            var raw_1 = q.raw;
            for (var i = 0; i < 9; i++) {
                raw_1[i] = -raw_1[i];
            }
            M0.mulNum(-1);
            M1.mulNum(-1);
            M2.mulNum(-1);
        }
        s.x = M0.dot(m0);
        s.y = M1.dot(m1);
        s.z = M2.dot(m2);
        if (sk != null) {
            var invsx = 1.0 / s.x;
            sk.x = M0.dot(m1) * invsx;
            sk.y = M0.dot(m2) * invsx;
            sk.z = M1.dot(m2) / s.y;
        }
    };
    mat3.DecomposeRS = function (mat, q, s) {
        var smtx = new mat3();
        mat3.DecomposeAffine(mat, smtx, s);
        q.set(quat.MtxToQuat(smtx));
        q.fmt();
    };
    return mat3;
}());

var Ray = /** @class */ (function () {
    function Ray(origin, dir) {
        this.origin = origin != null ? origin.clone() : vec3.zero;
        this.direction = dir != null ? dir.Normalize() : vec3.forward;
    }
    Ray.prototype.getPoint = function (d) {
        return this.direction.mulNumToRef(d).add(this.origin);
    };
    Ray.prototype.distantToPointSq = function (p) {
        var toPoint = p.subToRef(this.origin);
        var cos = toPoint.dot(this.direction);
        return toPoint.length2 - cos * cos;
    };
    Ray.fromTo = function (from, to) {
        var dir = to.subToRef(from).normalized;
        return new Ray(from, dir);
    };
    Ray.fromPointDir = function (origin, dir) {
        return new Ray(origin, dir);
    };
    Ray.prototype.distantToPoint = function (p) {
        return Math.sqrt(this.distantToPointSq(p));
    };
    /**
     * return true when ray has any pointer intersects with the sphere
     * @param pos
     * @param radius
     */
    Ray.prototype.sphereIntersect = function (pos, radius) {
        var v = this.distantToPointSq(pos) - radius * radius;
        return v <= 0;
    };
    Object.defineProperty(Ray.prototype, "isValid", {
        get: function () {
            return this.direction.isValid && this.origin.isValid;
        },
        enumerable: true,
        configurable: true
    });
    return Ray;
}());

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Plane = /** @class */ (function (_super) {
    __extends(Plane, _super);
    function Plane() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Plane.fromNormalD = function (nor, D) {
        var nd = nor.Normalize();
        return new Plane([nd.x, nd.y, nd.z, D]);
    };
    Plane.fromPointDir = function (dir, point) {
        var nd = dir.Normalize();
        var d = point.dot(nd);
        return new Plane([nd.x, nd.y, nd.z, -d]);
    };
    Object.defineProperty(Plane.prototype, "point", {
        get: function () {
            return new vec3(this.raw).mul(-this.w);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Plane.prototype, "dir", {
        get: function () {
            return new vec3(this.raw);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * return null when two plane are parallel
     * @param p
     */
    Plane.prototype.getIntersectionWithPlane = function (p) {
        var sdir = this.dir;
        var pdir = p.dir;
        var crossdir = sdir.cross(pdir);
        if (Math.abs(crossdir.length2) < glmath.eplison)
            return null;
        var cross = crossdir.normalized;
        var point = this.point;
        var dir = sdir.cross(cross).normalized;
        var ipoint = p.getIntersectionWithLine(Ray.fromPointDir(point, dir));
        return Ray.fromPointDir(ipoint, cross);
    };
    /**
     * return null when line is parallel to the plaen.
     * @param r
     */
    Plane.prototype.getIntersectionWithLine = function (r) {
        var dir = this.dir;
        var rdotdir = dir.dot(r.direction);
        if (glmath.closeToZero(rdotdir))
            return null;
        var off = r.origin.subToRef(this.point);
        var d = off.dot(dir) / rdotdir;
        return r.getPoint(-d);
    };
    Plane.prototype.getIntersectionWithPlanes = function (p1, p2) {
        var line = p1.getIntersectionWithPlane(p2);
        if (line == null)
            return null;
        return this.getIntersectionWithLine(line);
    };
    Plane.prototype.isPointAtPlane = function (p) {
        return Math.abs(p.dot(this.dir) + this.raw[3]) < glmath.eplison;
    };
    return Plane;
}(vec4));

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Delayter = /** @class */ (function () {
    function Delayter(time) {
        this.m_newEmit = false;
        this.m_ondelay = false;
        this.m_time = 300;
        this.m_time;
    }
    Object.defineProperty(Delayter.prototype, "delaytime", {
        set: function (t) {
            this.m_time = t;
        },
        enumerable: true,
        configurable: true
    });
    Delayter.prototype.emit = function (f) {
        if (f == null)
            return;
        this.m_f = f;
        if (this.m_ondelay == true) {
            this.m_newEmit = true;
        }
        else {
            this.m_newEmit = false;
            this.m_ondelay = true;
            this.delayExec();
        }
    };
    Delayter.prototype.delayExec = function () {
        var self = this;
        setTimeout(function () {
            if (self.m_newEmit) {
                self.m_newEmit = false;
                self.delayExec();
            }
            else {
                self.m_f();
                self.m_ondelay = false;
            }
        }, this.m_time);
    };
    return Delayter;
}());
var Utility = /** @class */ (function () {
    function Utility() {
    }
    /**
     * Simple hash function
     * @param str
     */
    Utility.Hashfnv32a = function (str) {
        var FNV1_32A_INIT = 0x811c9dc5;
        var hval = FNV1_32A_INIT;
        for (var i = 0; i < str.length; ++i) {
            hval ^= str.charCodeAt(i);
            hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
        }
        return hval >>> 0;
    };
    /**
     * Deep clone map object
     * @param map
     */
    Utility.cloneMap = function (map, itemclone) {
        if (map == null)
            return null;
        var ret = {};
        if (itemclone) {
            for (var key in map) {
                var val = map[key];
                ret[key] = itemclone(val);
            }
        }
        else {
            for (var key in map) {
                ret[key] = map[key];
            }
        }
        return ret;
    };
    Utility.randomColor = function () {
        return glmath.vec4(Math.random(), Math.random(), Math.random(), 1);
    };
    Utility.colorRGBAVec4 = function (r, g, b, a) {
        return glmath.vec4(r, g, b, a).div(255.0);
    };
    Utility.colorRGBA = function (r, g, b, a) {
        return [r / 255.0, g / 255.0, b / 255.0, a / 255.0];
    };
    Utility.byteDataToImageData = function (width, height, data) {
        var tempcanvas = document.createElement('canvas');
        tempcanvas.width = width;
        tempcanvas.height = height;
        var ctx2d = tempcanvas.getContext('2d');
        var imgdata = ctx2d.createImageData(width, height);
        imgdata.data.set(data);
        ctx2d.putImageData(imgdata, 0, 0);
        return tempcanvas.toDataURL();
    };
    Utility.byteDataToImage = function (width, height, data, cb) {
        var src = Utility.byteDataToImageData(width, height, data);
        var img = new Image();
        img.onload = function () {
            cb(img);
        };
        img.onerror = function () {
            cb(null);
        };
        img.src = src;
    };
    Utility.loadImage = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (url == null)
                    return [2 /*return*/, null];
                return [2 /*return*/, new Promise(function (res, rej) {
                        var img = new Image();
                        img.onload = function () {
                            res(img);
                        };
                        img.onerror = function () {
                            rej('image load failed');
                        };
                        img.src = url;
                    })];
            });
        });
    };
    Utility.StrAddLineNum = function (str) {
        return str.split('\n').map(function (line, index) { return index + 1 + ". " + line; }).join('\n');
    };
    return Utility;
}());
var WindowUtility = /** @class */ (function () {
    function WindowUtility() {
    }
    WindowUtility.setOnResizeFunc = function (callback) {
        WindowUtility.onResizeFunc = callback;
        if (this.s_windowResizeRegisted) {
            return;
        }
        WindowUtility.s_windowResizeRegisted = true;
        window.addEventListener('resize', WindowUtility.onWindowResize);
    };
    WindowUtility.onWindowResize = function () {
        var cb = WindowUtility.onResizeFunc;
        if (cb != null) {
            cb();
        }
    };
    WindowUtility.s_windowResizeRegisted = false;
    return WindowUtility;
}());
function undefinedOr(x, y) {
    return x == undefined ? y : x;
}

var ShaderPreprocessor = /** @class */ (function () {
    function ShaderPreprocessor() {
    }
    ShaderPreprocessor.processVariantInclude = function (line, lineindex) {
        var match = ShaderPreprocessor.REGEX_INCLUDE;
        var matchInc = line.match(match);
        if (matchInc != null) {
            return { key: matchInc[1], line: lineindex };
        }
        return null;
    };
    ShaderPreprocessor.processUnifiedSource = function (unified, name) {
        var _a, _b, _c, _d;
        var pattern_pragma = /#pragma ([\w]+) ([\w]+)/g;
        var pattern_entry = /void ([\w\d]+)[\s]*\(/g;
        var vs_entry = null;
        var ps_entry = null;
        var matchPragma = unified.match(pattern_pragma);
        if (matchPragma != null) {
            for (var i = 0, mlen = matchPragma.length; i < mlen; i++) {
                var pragmastr = matchPragma[i];
                var splits = pragmastr.split(/\s+/);
                var key = splits[1];
                var val = splits[2];
                if (key === 'vs')
                    vs_entry = val;
                if (key === 'ps')
                    ps_entry = val;
            }
        }
        if (vs_entry == null)
            throw new Error("vs entry is not definded, shader:" + name);
        if (ps_entry == null)
            throw new Error("ps entry is not definded, shader:" + name);
        var vs_func = null;
        var ps_func = null;
        var matchEntry = unified.match(pattern_entry);
        if (matchEntry != null) {
            var len = matchEntry.length;
            for (var i = 0; i < len; i++) {
                var entry = matchEntry[i];
                var part = entry.split(/\s+/)[1].replace('(', '').trim();
                if (part === vs_entry) {
                    vs_func = ShaderPreprocessor.getFunctionPosIndex(unified, entry);
                    continue;
                }
                if (part === ps_entry) {
                    ps_func = ShaderPreprocessor.getFunctionPosIndex(unified, entry);
                    continue;
                }
            }
        }
        //porcess lines
        var main = unified;
        var vs_main = null;
        var ps_main = null;
        if (vs_func[0] > ps_func[0]) {
            _a = ShaderPreprocessor.Seperate(main, vs_func[0], vs_func[1]), main = _a[0], vs_main = _a[1];
            _b = ShaderPreprocessor.Seperate(main, ps_func[0], ps_func[1]), main = _b[0], ps_main = _b[1];
        }
        else {
            _c = ShaderPreprocessor.Seperate(main, ps_func[0], ps_func[1]), main = _c[0], ps_main = _c[1];
            _d = ShaderPreprocessor.Seperate(main, vs_func[0], vs_func[1]), main = _d[0], vs_main = _d[1];
        }
        var lines = main.split('\n');
        var vs_lines = [];
        var ps_lines = [];
        var pattern_varying = /^(inout|in|out)\s+[\d\w]+\s+/;
        for (var i = 0, len = lines.length; i < len; i++) {
            var line = lines[i].trimLeft();
            if (line == null || line === '')
                continue;
            var match = line.match(pattern_varying);
            if (match != null) {
                var decorator = match[1];
                if (decorator === 'inout') {
                    line = line.substr(5);
                    vs_lines.push('out' + line);
                    ps_lines.push('in' + line);
                }
                else if (decorator === 'in') {
                    vs_lines.push(line);
                }
                else if (decorator === 'out') {
                    ps_lines.push(line);
                }
            }
            else {
                vs_lines.push(line);
                ps_lines.push(line);
            }
        }
        vs_main = vs_main.replace(vs_entry, 'main');
        ps_main = ps_main.replace(ps_entry, 'main');
        var vs_final = vs_lines.join('\n') + '\n' + vs_main;
        var ps_final = ps_lines.join('\n') + '\n' + ps_main;
        return [vs_final, ps_final];
    };
    ShaderPreprocessor.getFunctionPosIndex = function (text, entry) {
        var startindex = text.indexOf(entry);
        var len = entry.length + startindex;
        var subtext = text.substr(len);
        var slen = subtext.length;
        var endpos = -1;
        var t = 0;
        for (var i = 0; i < slen; i++) {
            var c = subtext[i];
            if (c === '{') {
                t++;
            }
            else if (c === '}') {
                t--;
                if (t == 0) {
                    endpos = i;
                    break;
                }
            }
        }
        if (endpos == -1)
            throw new Error('invalid function');
        return [startindex, len + endpos + 1];
    };
    ShaderPreprocessor.Seperate = function (str, spos, epos) {
        var f = str.substr(0, spos);
        var c = str.substr(spos, epos - spos);
        var e = str.substr(epos);
        return [f + e, c];
    };
    ShaderPreprocessor.TrimEmptyLine = function (str) {
        return str.replace(/^([\s]*)$/gm, '');
    };
    /**
     * Process shader source #include macros
     * @param line
     * @param variants
     * @returns line:string variantName:string
     */
    ShaderPreprocessor.processSourceInclude = function (line, variants) {
        var match = /#include ([\w]+)/;
        var matchInc = line.match(match);
        if (matchInc != null) {
            var vname = matchInc[1];
            var variant = variants[vname];
            if (variant == null) {
                throw new Error("shader variant [" + vname + "] not found!");
            }
            if (!variant.linked)
                throw new Error("shader variant [" + vname + "] not linked!");
            return [variant.sources, vname];
        }
        return null;
    };
    ShaderPreprocessor.processOptions = function (line) {
        var match = ShaderPreprocessor.REGEX_OPTIONS;
        if (!line.match(match)) {
            return null;
        }
        var linet = line.trim();
        var options = linet.substr(8);
        var parts = options.split(' ');
        if (parts == null || parts.length == 0)
            throw new Error("invalid #options " + line);
        var validopts = [];
        for (var i = 0, len = parts.length; i < len; i++) {
            var item = parts[i].trim();
            if (item == '')
                continue;
            validopts.push(item);
        }
        var validlen = validopts.length;
        if (validlen == 0 || validlen == 1)
            throw new Error("invalid #options " + line);
        if (validlen == 2) {
            var val = validopts[1];
            if (val != 'ON' && val != 'OFF')
                throw new Error("invalid #options " + line);
            var opt = new ShaderOptions();
            opt.flag = validopts[0];
            opt.default = val;
            opt.values = ['ON', 'OFF'];
            return ['//' + line, opt];
        }
        else {
            var opt = new ShaderOptions();
            opt.flag = validopts[0];
            opt.default = validopts[1];
            opt.values = validopts.slice(1);
            return ['//' + line, opt];
        }
    };
    ShaderPreprocessor.REGEX_INCLUDE = /#include ([\w]+)/;
    ShaderPreprocessor.REGEX_OPTIONS = /^[\s]*#options/;
    return ShaderPreprocessor;
}());

var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$1 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var GLUtility = /** @class */ (function () {
    function GLUtility() {
    }
    GLUtility.registerOnFrame = function (f) {
        if (!GLUtility.s_animationFrameRegisted) {
            window.requestAnimationFrame(GLUtility.onAnimationFrame);
            GLUtility.s_animationFrameRegisted = true;
        }
        GLUtility.s_animationFrameFunc.push(f);
    };
    GLUtility.removeOnFrame = function (f) {
        var func = GLUtility.s_animationFrameFunc;
        var index = func.indexOf(f);
        if (index >= 0) {
            GLUtility.s_animationFrameFunc = func.splice(index, 1);
        }
    };
    GLUtility.setTargetFPS = function (fps) {
        GLUtility.s_targetFPS = fps;
        GLUtility.s_frameInterval = 1000.0 / fps;
    };
    GLUtility.onAnimationFrame = function (t) {
        var interval = GLUtility.s_frameInterval;
        var elapsed = t - GLUtility.s_lastTime;
        if (elapsed >= interval) {
            GLUtility.s_lastTime = t - elapsed % interval;
            var func = GLUtility.s_animationFrameFunc;
            for (var i = 0, len = func.length; i < len; i++) {
                func[i](t);
            }
        }
        window.requestAnimationFrame(GLUtility.onAnimationFrame);
    };
    GLUtility.HttpGet = function (url, type) {
        return __awaiter$1(this, void 0, void 0, function () {
            return __generator$1(this, function (_a) {
                return [2 /*return*/, new Promise(function (res, rej) {
                        var xhr = new XMLHttpRequest();
                        xhr.responseType = type;
                        xhr.onload = function (evt) {
                            if (type == "blob" || type == "arraybuffer") {
                                res(xhr.response);
                            }
                            else {
                                res(xhr.responseText);
                            }
                        };
                        xhr.onerror = function (evt) {
                            rej(evt.target);
                        };
                        xhr.open("GET", url, true);
                        xhr.send();
                    })];
            });
        });
    };
    GLUtility.loadImage = function (url) {
        return __awaiter$1(this, void 0, void 0, function () {
            return __generator$1(this, function (_a) {
                if (url == null)
                    return [2 /*return*/, null];
                return [2 /*return*/, new Promise(function (res, rej) {
                        var img = new Image();
                        img.onload = function () {
                            res(img);
                        };
                        img.onerror = function () {
                            rej('image load failed');
                        };
                        img.src = url;
                    })];
            });
        });
    };
    GLUtility.saveTextureToImage = function (gl, texture, tempframebfufer) {
        if (texture == null || tempframebfufer == null)
            return null;
        var curfb = gl.getParameter(gl.FRAMEBUFFER_BINDING);
        var curtex = gl.getParameter(gl.TEXTURE_BINDING_2D);
        gl.bindFramebuffer(gl.FRAMEBUFFER, tempframebfufer);
        var rawtex = texture.getRawTexture();
        gl.bindTexture(gl.TEXTURE_2D, rawtex);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, rawtex, 0);
        var image = GLUtility.saveFrameBufferToImage(texture.width, texture.height, gl, tempframebfufer);
        gl.bindTexture(gl.TEXTURE_2D, curtex);
        gl.bindFramebuffer(gl.FRAMEBUFFER, curfb);
        return image;
    };
    GLUtility.saveFrameBufferToImageData = function (width, height, gl, targetframebuffer) {
        var w = width;
        var h = height;
        var data = new Uint8Array(w * h * 4);
        gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, data);
        var tempcanvas = document.createElement('canvas');
        tempcanvas.width = w;
        tempcanvas.height = h;
        var ctx2d = tempcanvas.getContext('2d');
        var imgdata = ctx2d.createImageData(w, h);
        imgdata.data.set(data);
        ctx2d.putImageData(imgdata, 0, 0);
        return tempcanvas.toDataURL();
    };
    GLUtility.saveFrameBufferToImage = function (width, height, gl, targetframebuffer) {
        var image = new Image();
        image.src = GLUtility.saveFrameBufferToImageData(width, height, gl, targetframebuffer);
        return image;
    };
    GLUtility.s_animationFrameRegisted = false;
    GLUtility.s_animationFrameFunc = [];
    GLUtility.s_lastTime = 0;
    GLUtility.s_targetFPS = 60;
    GLUtility.s_frameInterval = 1000 / 60.0;
    return GLUtility;
}());

var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$2 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ShaderVariant = /** @class */ (function () {
    function ShaderVariant(variantName, source) {
        this.includes = [];
        this.linked = false;
        this.options = [];
        this.variantName = variantName;
        this.process(variantName, source);
    }
    ShaderVariant.load = function (url, variantName) {
        return __awaiter$2(this, void 0, void 0, function () {
            var _this = this;
            return __generator$2(this, function (_a) {
                if (url == null || url === '')
                    return [2 /*return*/, null];
                return [2 /*return*/, new Promise(function (res, rej) { return __awaiter$2(_this, void 0, void 0, function () {
                        var glsl, source;
                        return __generator$2(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, GLUtility.HttpGet(url, "text")];
                                case 1:
                                    glsl = _a.sent();
                                    source = new ShaderVariant(variantName, glsl);
                                    res(source);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Object.defineProperty(ShaderVariant.prototype, "sources", {
        get: function () {
            return this.m_sources;
        },
        enumerable: true,
        configurable: true
    });
    ShaderVariant.prototype.link = function (variances) {
        if (this.linked)
            return;
        var includes = this.includes;
        if (includes.length == 0) {
            this.linked = true;
        }
        else {
            for (var i = 0, len = includes.length; i < len; i++) {
                var inc = includes[i];
                var lib = variances[inc.key];
                if (lib == null) {
                    throw new Error("can't find variant : [" + inc.key + "]");
                }
                if (!lib.linked) {
                    lib.link(variances);
                }
                if (!lib.linked) {
                    throw new Error("variance [" + lib.variantName + "] link: failed");
                }
                this.lines[inc.line] = lib.sources;
            }
            this.linked = true;
        }
        this.m_sources = this.lines.join('\n');
        //console.log(`link success ${this.variantName}`);
    };
    ShaderVariant.prototype.process = function (variantName, source) {
        source = "\n        #ifndef " + variantName + "\n        #define " + variantName + "\n        " + source + "\n        #endif\n        ";
        var lines = source.split('\n');
        for (var i = 0, len = lines.length; i < len; i++) {
            var line = lines[i];
            var pinclude = ShaderPreprocessor.processVariantInclude(line, i);
            if (pinclude != null) {
                this.includes.push(pinclude);
                continue;
            }
            var poptions = ShaderPreprocessor.processOptions(line);
            if (poptions != null) {
                lines[i] = poptions[0];
                this.options.push(poptions[1]);
                continue;
            }
        }
        this.lines = lines;
    };
    return ShaderVariant;
}());
var ShaderOptions = /** @class */ (function () {
    function ShaderOptions(flag, val) {
        this.flag = flag;
        this.default = val;
    }
    return ShaderOptions;
}());
var ShaderOptionsConfig = /** @class */ (function () {
    function ShaderOptionsConfig(opts) {
        this.m_hashCode = 0;
        this.m_dirty = false;
        this.m_optmap = {};
        if (opts == null)
            return;
        this.m_options = opts;
        var optmap = this.m_optmap;
        for (var i = 0, len = opts.length; i < len; i++) {
            var opt = opts[i];
            optmap[opt.flag] = opt.default;
        }
        this.compileOptions();
    }
    ShaderOptionsConfig.prototype.getFlag = function (key) {
        return this.m_optmap[key];
    };
    ShaderOptionsConfig.prototype.verifyFlag = function (key, value) {
        var curval = this.m_optmap[key];
        if (curval == null) {
            console.warn("invalid shader option flag: [" + key + "]");
            return false;
        }
        var options = this.m_options;
        for (var i = 0, len = options.length; i < len; i++) {
            var opt = options[i];
            if (opt.flag === key) {
                if (opt.values.indexOf(value) >= 0) {
                    return true;
                }
                else {
                    console.warn("invalid shader option value : [" + key + ": " + value + "]");
                    return false;
                }
            }
        }
    };
    ShaderOptionsConfig.prototype.setFlag = function (key, value) {
        this.m_optmap[key] = value;
        this.m_dirty = true;
        return true;
    };
    Object.defineProperty(ShaderOptionsConfig.prototype, "hashCode", {
        get: function () {
            if (this.m_dirty) {
                this.compileOptions();
            }
            return this.m_hashCode;
        },
        enumerable: true,
        configurable: true
    });
    ShaderOptionsConfig.prototype.compileOptions = function () {
        this.m_dirty = false;
        var flags = '';
        var hashstr = [];
        var optmap = this.m_optmap;
        for (var key in optmap) {
            var val = optmap[key];
            if (val == null)
                throw new Error("shader flag is null [" + key + "]");
            var hash = " " + key + "_" + val;
            hashstr.push(hash);
            var flag = "#define " + hash + "\n";
            flags += flag;
        }
        this.m_compileFlags = flags;
        this.calculateHashCode(hashstr);
    };
    ShaderOptionsConfig.prototype.calculateHashCode = function (hashstr) {
        hashstr.sort();
        this.m_hashCode = Utility.Hashfnv32a(hashstr.join(' '));
    };
    Object.defineProperty(ShaderOptionsConfig.prototype, "compileFlag", {
        get: function () {
            if (this.m_dirty) {
                this.compileOptions();
            }
            return this.m_compileFlags;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Deep Clone
     */
    ShaderOptionsConfig.prototype.clone = function () {
        var optconfig = new ShaderOptionsConfig();
        optconfig.m_hashCode = this.m_hashCode;
        optconfig.m_dirty = this.m_dirty;
        optconfig.m_options = this.m_options;
        optconfig.m_compileFlags = this.m_compileFlags;
        optconfig.m_optmap = Utility.cloneMap(this.m_optmap);
        return optconfig;
    };
    return ShaderOptionsConfig;
}());

var RenderQueue;
(function (RenderQueue) {
    RenderQueue[RenderQueue["Opaque"] = 0] = "Opaque";
    RenderQueue[RenderQueue["Transparent"] = 1] = "Transparent";
    RenderQueue[RenderQueue["Skybox"] = 2] = "Skybox";
    RenderQueue[RenderQueue["Image"] = 3] = "Image";
    RenderQueue[RenderQueue["Overlay"] = 4] = "Overlay";
    RenderQueue[RenderQueue["Other"] = 5] = "Other";
})(RenderQueue || (RenderQueue = {}));
var Comparison;
(function (Comparison) {
    Comparison[Comparison["NEVER"] = 512] = "NEVER";
    Comparison[Comparison["LESS"] = 513] = "LESS";
    Comparison[Comparison["EQUAL"] = 514] = "EQUAL";
    Comparison[Comparison["LEQUAL"] = 515] = "LEQUAL";
    Comparison[Comparison["GREATER"] = 516] = "GREATER";
    Comparison[Comparison["NOTEQUAL"] = 517] = "NOTEQUAL";
    Comparison[Comparison["GEQUAL"] = 518] = "GEQUAL";
    Comparison[Comparison["ALWAYS"] = 519] = "ALWAYS";
})(Comparison || (Comparison = {}));
var BlendOperator;
(function (BlendOperator) {
    BlendOperator[BlendOperator["ADD"] = 32774] = "ADD";
    BlendOperator[BlendOperator["MIN"] = 32775] = "MIN";
    BlendOperator[BlendOperator["MAX"] = 32776] = "MAX";
    BlendOperator[BlendOperator["SUBTRACT"] = 32778] = "SUBTRACT";
    BlendOperator[BlendOperator["RESERVE_SUBSTRACT"] = 32779] = "RESERVE_SUBSTRACT";
})(BlendOperator || (BlendOperator = {}));
var BlendFactor;
(function (BlendFactor) {
    BlendFactor[BlendFactor["ONE"] = 1] = "ONE";
    BlendFactor[BlendFactor["ZERO"] = 0] = "ZERO";
    BlendFactor[BlendFactor["SRC_COLOR"] = 768] = "SRC_COLOR";
    BlendFactor[BlendFactor["ONE_MINUS_SRC_COLOR"] = 769] = "ONE_MINUS_SRC_COLOR";
    BlendFactor[BlendFactor["SRC_ALPHA"] = 770] = "SRC_ALPHA";
    BlendFactor[BlendFactor["ONE_MINUS_SRC_ALPHA"] = 771] = "ONE_MINUS_SRC_ALPHA";
    BlendFactor[BlendFactor["DST_ALPHA"] = 772] = "DST_ALPHA";
    BlendFactor[BlendFactor["ONE_MINUS_DST_ALPHA"] = 773] = "ONE_MINUS_DST_ALPHA";
    BlendFactor[BlendFactor["DST_COLOR"] = 774] = "DST_COLOR";
    BlendFactor[BlendFactor["ONE_MINUS_DST_COLOR"] = 775] = "ONE_MINUS_DST_COLOR";
    BlendFactor[BlendFactor["SRC_ALPHA_SATURATE"] = 776] = "SRC_ALPHA_SATURATE";
    BlendFactor[BlendFactor["CONSTANT_ALPHA"] = 32771] = "CONSTANT_ALPHA";
    BlendFactor[BlendFactor["ONE_MINUS_CONSTANT_ALPHA"] = 32772] = "ONE_MINUS_CONSTANT_ALPHA";
    BlendFactor[BlendFactor["CONSTANT_COLOR"] = 32769] = "CONSTANT_COLOR";
    BlendFactor[BlendFactor["ONE_MINUS_CONSTANT_COLOR"] = 32770] = "ONE_MINUS_CONSTANT_COLOR";
})(BlendFactor || (BlendFactor = {}));
var CullingMode;
(function (CullingMode) {
    CullingMode[CullingMode["Front"] = 1028] = "Front";
    CullingMode[CullingMode["Back"] = 1029] = "Back";
    CullingMode[CullingMode["FRONT_AND_BACK"] = 1032] = "FRONT_AND_BACK";
    CullingMode[CullingMode["None"] = 2884] = "None";
})(CullingMode || (CullingMode = {}));
var ShaderTags = /** @class */ (function () {
    function ShaderTags() {
        this.blend = false;
    }
    ShaderTags.prototype.clone = function () {
        var tags = new ShaderTags();
        tags.queue = this.queue;
        tags.ztest = this.ztest;
        tags.zwrite = this.zwrite;
        tags.blendOp = this.blendOp;
        tags.blendFactorDst = this.blendFactorDst;
        tags.blendFactorSrc = this.blendFactorSrc;
        tags.culling = this.culling;
        return tags;
    };
    ShaderTags.prototype.fillDefaultVal = function () {
        if (this.queue == null)
            this.queue = RenderQueue.Opaque;
        if (this.zwrite == null)
            this.zwrite = true;
        if (this.ztest == null)
            this.ztest = Comparison.LEQUAL;
        if (this.culling == null)
            this.culling = CullingMode.Back;
        if (this.blendOp == null)
            this.blendOp = BlendOperator.ADD;
        if (this.blendFactorSrc == null)
            this.blendFactorSrc = BlendFactor.SRC_ALPHA;
        if (this.blendFactorDst == null)
            this.blendFactorDst = BlendFactor.ONE_MINUS_SRC_ALPHA;
    };
    ShaderTags.prototype.toString = function () {
        return "\n            queue:" + RenderQueue[this.queue] + "\n            ztest:" + Comparison[this.ztest] + "\n            zwrite:" + this.zwrite + "\n            blend:" + this.blend + "\n            blendOp:" + BlendOperator[this.blendOp] + "\n            blendSrc:" + BlendFactor[this.blendFactorSrc] + "\n            blendDst:" + BlendFactor[this.blendFactorDst] + "\n            culling:" + CullingMode[this.culling] + "\n        ";
    };
    return ShaderTags;
}());
var ShaderProgram = /** @class */ (function () {
    function ShaderProgram() {
    }
    Object.defineProperty(ShaderProgram.prototype, "glProgram", {
        get: function () {
            return this.glprogram.Program;
        },
        enumerable: true,
        configurable: true
    });
    return ShaderProgram;
}());
var ShaderPass = /** @class */ (function () {
    function ShaderPass() {
    }
    return ShaderPass;
}());
var Shader = /** @class */ (function () {
    function Shader(source, defaultProgram, defOptConfig, glctx) {
        this.m_compiledPrograms = {};
        this.m_source = source;
        this.m_defaultProgram = defaultProgram;
        this.m_defaultOptionsConfig = defOptConfig;
        this.m_compiledPrograms[defOptConfig.hashCode] = defaultProgram;
        this.m_glctx = glctx;
    }
    Object.defineProperty(Shader.prototype, "source", {
        get: function () {
            return this.m_source;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "defaultProgram", {
        get: function () {
            return this.m_defaultProgram;
        },
        enumerable: true,
        configurable: true
    });
    Shader.prototype.getVariantProgram = function (optconfig) {
        if (optconfig == null)
            throw new Error('optconfig is null');
        var hash = optconfig.hashCode;
        var cachedProgram = this.m_compiledPrograms[hash];
        if (cachedProgram != null) {
            return cachedProgram;
        }
        else {
            var source = this.source;
            var _a = source.injectCompileFlags(optconfig.compileFlag), vs = _a[0], ps = _a[1];
            var program = Shader.CreateProgram(this.m_glctx, vs, ps);
            if (program == null)
                throw new Error("compile program failed");
            this.m_compiledPrograms[hash] = program;
            console.log("program hash " + hash);
            return program;
        }
    };
    Shader.prototype.release = function () {
        this.m_glctx = null;
    };
    Shader.ParseShaderInfo = function (source, info) {
        var regexp = /ERROR: 0:([\d]+):/g;
        var split = source.split(/\r\n|\r|\n/);
        var ary = null;
        while ((ary = regexp.exec(info)) !== null) {
            console.error(split[Number(ary[1]) - 1]);
        }
    };
    Shader.CreateProgram = function (glctx, vsource, psource) {
        return glctx.createGLProgram(vsource, psource);
    };
    return Shader;
}());

var __awaiter$3 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$3 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ShaderSource = /** @class */ (function () {
    function ShaderSource(vs, ps, name) {
        this.m_built = false;
        this.m_shaderTag = null;
        this.optionsList = [];
        this.ps = ps;
        this.vs = vs;
        this.name = name;
    }
    ShaderSource.create = function (unified, name) {
        var _a = ShaderPreprocessor.processUnifiedSource(unified, name), vs = _a[0], ps = _a[1];
        return new ShaderSource(vs, ps, name);
    };
    ShaderSource.load = function (url, name) {
        return __awaiter$3(this, void 0, void 0, function () {
            var _this = this;
            return __generator$3(this, function (_a) {
                if (url == null || url === '')
                    return [2 /*return*/, null];
                return [2 /*return*/, new Promise(function (res, rej) { return __awaiter$3(_this, void 0, void 0, function () {
                        var glsl, source;
                        return __generator$3(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, GLUtility.HttpGet(url, "text")];
                                case 1:
                                    glsl = _a.sent();
                                    source = ShaderSource.create(glsl, name);
                                    res(source);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Object.defineProperty(ShaderSource.prototype, "isBuilt", {
        get: function () {
            return this.m_built;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderSource.prototype, "vertex", {
        get: function () {
            return this.vs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderSource.prototype, "pixel", {
        get: function () {
            return this.ps;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderSource.prototype, "tags", {
        get: function () {
            return this.m_shaderTag;
        },
        enumerable: true,
        configurable: true
    });
    ShaderSource.prototype.buildShader = function (v) {
        if (this.m_built)
            return true;
        var gen_vs = this.ProcessShader(this.vs, v);
        var gen_ps = this.ProcessShader(this.ps, v);
        this.ps = gen_ps;
        this.vs = gen_vs;
        this.m_built = true;
        return true;
    };
    ShaderSource.prototype.addVariant = function (vname) {
        if (this.variants == null) {
            this.variants = [];
            this.variants.push(vname);
            return true;
        }
        var variants = this.variants;
        if (variants.indexOf(vname) < 0) {
            variants.push(vname);
            return true;
        }
        return false;
    };
    ShaderSource.prototype.addOptions = function (variant) {
        var options = variant.options;
        if (options == null)
            return;
        var optlist = this.optionsList;
        for (var i = 0, len = options.length; i < len; i++) {
            optlist.push(options[i]);
        }
    };
    ShaderSource.prototype.ProcessShader = function (source, variants) {
        var lines = source.split('\n');
        for (var i = 0, len = lines.length; i < len; i++) {
            var line = lines[i];
            var pinclude = ShaderPreprocessor.processSourceInclude(line, variants);
            if (pinclude != null) {
                lines[i] = pinclude[0];
                var vname = pinclude[1];
                var added = this.addVariant(vname);
                if (added)
                    this.addOptions(variants[vname]);
                continue;
            }
            var poptions = ShaderPreprocessor.processOptions(line);
            if (poptions != null) {
                lines[i] = poptions[0];
                this.optionsList.push(poptions[1]);
                continue;
            }
            lines[i] = this.processShaderTag(line);
        }
        return lines.join('\n').trim();
    };
    ShaderSource.prototype.processShaderTag = function (line) {
        line = line.trim();
        var tags = this.m_shaderTag;
        var regex2 = /#(ztest|zwrite|queue) ([\w]+)/;
        var match = line.match(regex2);
        if (match != null) {
            if (tags == null) {
                tags = new ShaderTags();
                this.m_shaderTag = tags;
            }
            var tagtype = match[1].toLowerCase();
            var tagval = match[2].toUpperCase();
            switch (tagtype) {
                case "ztest":
                    this.setShaderTagProperty('ztest', tagval, Comparison);
                    break;
                case "zwrite":
                    {
                        var val = tagval === 'OFF' ? 0 : (tagval === "ON" ? 1 : -1);
                        if (val == -1) {
                            throw new Error("invalid zwrite tag [" + match[2] + "]");
                        }
                        var newval = val == 1;
                        if (tags.zwrite == null || tags.zwrite == newval) {
                            tags.zwrite = newval;
                        }
                        else {
                            throw new Error("zwrite tag conflict");
                        }
                    }
                    break;
                case "queue":
                    tagval = tagval.charAt(0).toUpperCase() + match[2].slice(1);
                    this.setShaderTagProperty('queue', tagval, RenderQueue);
                    break;
                case "cull":
                    {
                        var cullingmode = CullingMode.Back;
                        switch (tagval) {
                            case "ALL":
                                cullingmode = CullingMode.FRONT_AND_BACK;
                                break;
                            case "BACK":
                                cullingmode = CullingMode.Back;
                                break;
                            case "FRONT":
                                cullingmode = CullingMode.Front;
                                break;
                            case "NONE":
                                cullingmode = CullingMode.None;
                                break;
                            default:
                                throw new Error('invalid culling mode');
                        }
                        if (tags.culling == null) {
                            tags.culling = cullingmode;
                        }
                        else {
                            if (tags.culling != cullingmode) {
                                throw new Error("culling mode confliect : " + cullingmode + " " + tags.culling);
                            }
                        }
                    }
                default:
                    throw new Error("unknown shader tag [" + line + "]");
            }
            line = '';
        }
        var regexblend = /#blend ([\w]+) ([\w]+)[\s]*([\w]+)*/;
        match = line.match(regexblend);
        if (match != null) {
            console.log('process blend');
            if (tags == null) {
                tags = new ShaderTags();
                this.m_shaderTag = tags;
            }
            tags.blend = true;
            var tarfs = match[1].toUpperCase();
            var tarfd = match[2].toUpperCase();
            var tarop = match[3];
            if (tarop == null) {
                tarop = 'ADD';
            }
            else {
                tarop = tarop.toUpperCase();
                var op = BlendOperator[tarop];
                if (op == null)
                    throw new Error("invalid blend operator [" + tarop + "]");
            }
            var fs = BlendFactor[tarfs];
            var fd = BlendFactor[tarfd];
            if (fs == null)
                throw new Error("invalid blend factor [" + match[1] + "]");
            if (fd == null)
                throw new Error("invalid blend factor [" + match[2] + "]");
            var newop = BlendFactor[tarop];
            if (tags.blendOp != null && (tags.blendOp != newop || tags.blendFactorDst != fd || tags.blendFactorSrc != fs)) {
                throw new Error("bleng tag conflict [" + line + "]");
            }
            else {
                tags.blendOp = newop;
                tags.blendFactorSrc = fs;
                tags.blendFactorDst = fd;
            }
            line = '';
        }
        return line;
    };
    ShaderSource.prototype.setShaderTagProperty = function (pname, tagval, enumtype) {
        var tags = this.m_shaderTag;
        var val = enumtype[tagval];
        if (val == undefined) {
            throw new Error("invalid " + pname + " tag [" + tagval + "]");
        }
        if (tags[pname] == null) {
            tags[pname] = val;
        }
        else {
            if (tags[pname] != val) {
                throw new Error(pname + " tag conflict [" + Comparison[tags[pname]] + "] [" + tagval + "]");
            }
        }
    };
    ShaderSource.prototype.injectCompileFlags = function (flags) {
        var prefix = '#version 300 es\n';
        var vs = this.vs;
        var ps = this.pixel;
        if (!vs.startsWith(prefix)) {
            vs = prefix + '#define SHADER_VS\r\n' + flags + vs;
        }
        else {
            vs = prefix + '#define SHADER_VS\r\n' + flags + vs.slice(15);
        }
        if (!ps.startsWith(prefix)) {
            ps = prefix + '#define SHADER_PS\r\n' + flags + ps;
        }
        else {
            ps = prefix + '#define SHADER_PS\r\n' + flags + ps.slice(15);
        }
        return [vs, ps];
    };
    return ShaderSource;
}());

var ShaderGen = /** @class */ (function () {
    function ShaderGen() {
    }
    ShaderGen.SHADERFX_BASIS = "#define PI 3.1415926\n#define PI_2 6.2831852\n#define PI_HALF 1.5707963\n#define EPSILON 1e-5\n\nuniform UNIFORM_OBJ{\n    mat4 _obj2world_;\n};\n#define MATRIX_M _obj2world_\nuniform UNIFORM_BASIS{\n    //basic region\n    vec4 _screenparam_;//[width,height,1/wdith,1/height]\n    highp vec4 _time_;//[Time,deltaTime,sinTime,cosTime]\n    //camera\n    vec4 _camera_pos_;\n    mat4 _camera_mtx_view_;\n    vec4 _camera_projparam_;//[near,far,1/near,1/far]\n    mat4 _camera_mtx_proj_;\n    mat4 _camera_mtx_invproj_;\n    //Ambient And Fog\n    lowp vec4 _ambientcolor_;\n    vec4 _fogcolor_;\n    vec4 _fogparam_;\n};\n#define TIME _time_\n#define SCREEN _screenparam_\n\n#define MATRIX_V _camera_mtx_view_\n#define MATRIX_P _camera_mtx_proj_\n#define MATRIX_VP MATRIX_P * MATRIX_V\n#define MATRIX_MV MATRIX_V * MATRIX_M\n#define MATRIX_IT_MV transpose(inverse(MATRIX_MV))\n#define MATRIX_MVP MATRIX_P * MATRIX_MV\n#define MATRIX_INV_P _camera_mtx_invproj_\n#define MATRIX_WORLD2OBJ inverse(MATRIX_M)\n#define CAMERA_POS _camera_pos_\n#define CAMERA_NEAR _camera_projparam_.x\n#define CAMERA_FAR _camera_projparam_.y\n#define CAMERA_NEAR_INV _camera_projparam_.z\n#define CAMERA_FAR_INV _camera_projparam_.w\n#define SCREEN_WIDTH _screenparam_.x\n#define SCREEN_HEIGHT _screenparam_.y\n#define SCREEN_WIDTH_INV _screenparam_.z\n#define SCREEN_HEIGHT_INV _screenparam_.w\nvec3 ObjToWorldDir(in vec3 dir){\n    return normalize(dir * mat3(MATRIX_WORLD2OBJ));\n}\nfloat SAMPLE_DEPTH_TEXTURE(sampler2D depthtex,vec2 uv){\n    return texture(depthtex,uv).r;\n}\nfloat DECODE_VIEWDEPTH(float d){\n    return 1.0/ ((CAMERA_NEAR_INV - CAMERA_FAR_INV) * d  - CAMERA_NEAR_INV);\n}\nvec4 ClipToWorld(in vec4 clippoint){\n    return inverse(MATRIX_VP) * clippoint;\n}\n\n\n#define saturate(x) clamp(x,0.0,1.0)\n";
    ShaderGen.SHADERFX_LIGHT = "layout (std140) uniform UNIFORM_LIGHT{\n    vec4 lightColor0;\n    vec4 lightColor1;\n    vec4 lightColor2;\n    vec4 lightColor3;\n    vec4 lightIntensity;\n    vec4 lightPosX;\n    vec4 lightPosY;\n    vec4 lightPosZ;\n    vec4 light_ambient;\n    vec4 lightPrimePos;\n    vec4 lightPrimeColor;\n};\n\n#define LIGHT_COLOR0 lightColor0\n#define LIGHT_COLOR1 lightColor1\n#define LIGHT_COLOR2 lightColor2\n#define LIGHT_COLOR3 lightColor3\n\n#define MAIN_LIGHT_POS lightPrimePos\n#define MAIN_LIGHT_COLOR lightPrimeColor\n\n#define LIGHT_INTENSITY lightIntensity\n#define LIGHT_INTENSITY0 lightIntensity.x\n#define LIGHT_INTENSITY1 lightIntensity.y\n#define LIGHT_INTENSITY2 lightIntensity.z\n#define LIGHT_INTENSITY3 lightIntensity.w\n";
    ShaderGen.SHADERFX_LIGHTING = "vec3 LightModel_Lambert(vec3 lightdir,vec3 lightColor,float atten,vec3 normal,vec3 albedo){\n    float diff = max(.0,dot(lightdir,normal));\n    return albedo * lightColor * diff * atten;\n}\n\n\nvec3 Sample_4PointLights(vec3 wpos,vec3 normal){\n    vec4 toLightX = lightPosX - vec4(wpos.x);\n    vec4 toLightY = lightPosY - vec4(wpos.y);\n    vec4 toLightZ = lightPosZ - vec4(wpos.z);\n\n    //dot\n    vec4 ndotl = vec4(0.0);\n    ndotl += toLightX * normal.x;\n    ndotl += toLightY * normal.y;\n    ndotl += toLightZ * normal.z;\n    ndotl = max(vec4(0.0),ndotl);\n\n    //lensq\n    vec4 toLightSq = vec4(0.0);\n    toLightSq += toLightX * toLightX;\n    toLightSq += toLightY * toLightY;\n    toLightSq += toLightZ * toLightZ;\n    toLightSq = max(toLightSq,vec4(0.000001));\n\n    ndotl *= sqrt(toLightSq);\n\n    vec4 atten = 1.0/ (1.0 + toLightSq * LIGHT_INTENSITY);\n    vec4 diff = ndotl * atten;\n    \n    vec3 col = vec3(0.0);\n    col += diff.x * LIGHT_COLOR0.xyz;\n    col += diff.y * LIGHT_COLOR1.xyz;\n    col += diff.z * LIGHT_COLOR2.xyz;\n    col += diff.w * LIGHT_COLOR3.xyz;\n\n    return col;\n}\n";
    ShaderGen.SHADERFX_SHADOWMAP = "#options SMCASCADE NONE TWO FOUR\n#options SHADOW ON OFF\nprecision mediump sampler2DShadow;\n\n#ifdef SHADOW_ON\n\n#define SHADOW_COORD vec4 shadow_coord\n#define CAL_SHADOW_COORD(x,pos) x.shadow_coord = uLightMtx[0] * vec4(pos.xyz,1.0)\n\nuniform UNIFORM_SHADOWMAP{\n    mat4 uLightMtx[4];\n    float uShadowDist;\n};\n\nuniform sampler2DShadow uShadowMap;\n\nfloat computeShadow(vec4 vLightPos,sampler2D shadowsampler){\n    vec3 clipspace = vLightPos.xyz / vLightPos.w;\n    clipspace = clipspace *0.5 + 0.5;\n    float shadowDep = texture(shadowsampler,vec2(clipspace.xy)).x;\n    \n    //fix shadowmpa edge clamp\n    vec2 border = step(clipspace.xy,vec2(0.002));\n    border += step(vec2(0.998),clipspace.xy);\n    shadowDep += (border.x + border.y);\n\n    return step(clipspace.z- 0.01,shadowDep);\n}\n\nfloat computeShadowPoisson(vec4 vLightPos,sampler2D shadowsampler){\n    vec3 clipspace = vLightPos.xyz / vLightPos.w;\n    clipspace = clipspace *0.5 + 0.5;\n\n    vec2 coord = clipspace.xy;\n    float curdepth = clipspace.z - 0.01;\n    float visibility = 1.0;\n\n    float mapsize = 1.0/1024.0;\n\n    vec2 poissonDisk[4];\n        poissonDisk[0] = vec2(-0.94201624, -0.39906216);\n        poissonDisk[1] = vec2(0.94558609, -0.76890725);\n        poissonDisk[2] = vec2(-0.094184101, -0.92938870);\n        poissonDisk[3] = vec2(0.34495938, 0.29387760);\n\n    if(texture(shadowsampler,coord + poissonDisk[0] * mapsize).r <curdepth) visibility -=0.25;\n    if(texture(shadowsampler,coord + poissonDisk[1] * mapsize).r <curdepth) visibility -=0.25;\n    if(texture(shadowsampler,coord + poissonDisk[2] * mapsize).r <curdepth) visibility -=0.25;\n    if(texture(shadowsampler,coord + poissonDisk[3] * mapsize).r <curdepth) visibility -=0.25;\n    return visibility;\n}\n\nfloat computeShadowPCF3(vec4 vLightPos,sampler2DShadow shadowsampler){\n    vec3 clipspace = vLightPos.xyz / vLightPos.w;\n    clipspace = clipspace *0.5 + 0.5;\n\n    vec2 shadowMapSizeInv = vec2(1024.0,1.0/1024.0);\n\n    float curdepth = clipspace.z;\n\n    vec2 uv = clipspace.xy *shadowMapSizeInv.x;\n    uv += 0.5;\n    vec2 st = fract(uv);\n    vec2 base_uv = floor(uv) - 0.5;\n    base_uv *= shadowMapSizeInv.y;\n\n    vec2 uvw0 = 3. - 2. * st;\n    vec2 uvw1 = 1. + 2. * st;\n    vec2 u = vec2((2. - st.x) / uvw0.x - 1., st.x / uvw1.x + 1.) * shadowMapSizeInv.y;\n    vec2 v = vec2((2. - st.y) / uvw0.y - 1., st.y / uvw1.y + 1.) * shadowMapSizeInv.y;\n    curdepth -=0.001;\n\n    float shadow = 0.;\n    shadow += uvw0.x * uvw0.y * texture(shadowsampler, vec3(base_uv.xy + vec2(u[0], v[0]), curdepth));\n    shadow += uvw1.x * uvw0.y * texture(shadowsampler, vec3(base_uv.xy + vec2(u[1], v[0]), curdepth));\n    shadow += uvw0.x * uvw1.y * texture(shadowsampler, vec3(base_uv.xy + vec2(u[0], v[1]), curdepth));\n    shadow += uvw1.x * uvw1.y * texture(shadowsampler, vec3(base_uv.xy + vec2(u[1], v[1]), curdepth));\n    shadow = shadow / 16.;\n    return shadow;\n}\n\n#endif";
    ShaderGen.blit = "#version 300 es\n\nprecision mediump float;\n#queue opaque\n#zwrite off\n#ztest always\n\ninout vec2 vUV;\n#pragma vs vertex\nin vec4 aPosition;\nin vec2 aUV;\nvoid vertex(){\n    vec4 pos = aPosition;\n    pos.xy *=2.0;\n    vUV = vec2(aUV.x,1.0 -aUV.y);\n    gl_Position = pos;\n}\n#pragma ps fragment\nuniform sampler2D uSampler;\nout vec4 fragColor;\nvoid fragment(){\n    fragColor = texture(uSampler,vUV);\n}";
    ShaderGen.depth = "#version 300 es\n\nprecision mediump float;\n#include SHADERFX_BASIS\n#queue other\n#pragma vs vertex\n#pragma ps fragment\n\nin vec4 aPosition;\nvoid vertex(){\n    gl_Position = MATRIX_MVP * aPosition;\n}\n\nvoid fragment(){\n}";
    ShaderGen.diffuse = "#version 300 es\n\n#pragma optimize (off)\n#pragma debug (on)\nprecision mediump float;\n#include SHADERFX_BASIS\n#include SHADERFX_LIGHT\n#include SHADERFX_LIGHTING\n\nstruct V2F{\n    vec3 pos;\n    vec3 normal;\n    vec3 wpos;\n};\ninout V2F v2f;\n\n#queue opaque\n#pragma vs vertex\n#ifdef SHADER_VS\nin vec4 aPosition;\nin vec2 aUV;\nin vec4 aNormal;\n\nvoid vertex(){\n    vec4 wpos = MATRIX_M * aPosition;\n    v2f.pos = wpos.xyz;\n    vec4 pos = MATRIX_VP * wpos;\n    gl_Position = pos;\n    v2f.normal = ObjToWorldDir(aNormal.xyz);\n    v2f.wpos = wpos.xyz;\n}\n#endif\n#pragma ps fragment\n#ifdef SHADER_PS\nout lowp vec4 fragColor;\nuniform vec4 uColor;\nvoid fragment(){\n\n    vec3 col = Sample_4PointLights(v2f.wpos,normalize(v2f.normal)) * uColor.xyz;\n    \n    vec3 mainCol = LightModel_Lambert(MAIN_LIGHT_POS.xyz,MAIN_LIGHT_COLOR.xyz,MAIN_LIGHT_COLOR.w,v2f.normal,uColor.xyz);\n\n\n    fragColor = vec4(mainCol + col,1.0);\n}\n#endif";
    ShaderGen.gizmos = "#version 300 es\n\nprecision mediump float;\n#include SHADERFX_BASIS\n#queue other\n#pragma vs vertex\n#pragma ps fragment\n\nin vec4 aPosition;\n\nvoid vertex(){\n    vec4 vpos = aPosition;\n    gl_Position = MATRIX_MVP * vpos;\n}\n\nout vec4 fragColor;\nvoid fragment(){\n    fragColor = vec4(1.0);\n}";
    ShaderGen.pbrMetallicRoughness = "#version 300 es\n\nprecision mediump float;\n#include SHADERFX_BASIS\n#include SHADERFX_LIGHT\n#include SHADERFX_SHADOWMAP\n#queue opaque\n\nstruct V2F{\n    vec4 wpos;\n    vec2 uv;\n    vec3 normal;\n    #ifdef SHADOW_ON\n    vec4 lpos;\n    #endif\n};\n\ninout V2F v2f;\n\n#pragma vs vertex\n\nin vec3 aPosition;\nin vec3 aNormal;\nin vec2 aUV;\n\nvoid vertex(){\n\n    vec4 wpos = MATRIX_M * vec4(aPosition,1.0);\n    v2f.wpos = wpos;\n    #ifdef SHADOW_ON\n    v2f.lpos = uLightMtx[0] * wpos;\n    #endif\n    v2f.normal = ObjToWorldDir(aNormal.xyz);\n    gl_Position = MATRIX_VP * wpos;\n    v2f.uv = aUV;\n}\n\n#pragma ps fragment\n\nuniform uPBR{\n    vec4 uColor;\n    float uMetallic;\n    float uRoughness;\n    float uEmissive;\n};\n\nuniform sampler2D uSampler;\nuniform sampler2D uTexMetallicRoughness;\nuniform sampler2D uTexEmissive;\n\nout vec4 fragColor;\n\nvec3 diffuse(vec3 diffcolor){\n    return diffcolor / PI;\n}\n\nvec3 specularReflection(float metallic,float vdoth){\n    return metallic + (vec3(1.0) - metallic) * pow(1.0- vdoth,5.0);\n}\n\nfloat microfacetDistribution(float alphaRoughness,float NdotH)\n{\n    float roughnessSq = alphaRoughness * alphaRoughness;\n    float f = (NdotH * roughnessSq - NdotH) * NdotH + 1.0;\n    return roughnessSq / (PI * f * f);\n}\n\nfloat geometricOcclusion(float NdotV, float NdotH,float VdotH,float NdotL)\n{\n    return min(min(2.0 * NdotV * NdotH / VdotH, 2.0 * NdotL * NdotH / VdotH), 1.0);\n}\n\n\nvoid fragment(){\n\n    vec2 uv = v2f.uv;\n    vec3 wpos = v2f.wpos.xyz;\n    vec3 diffColor = texture(uSampler,uv).xyz;\n\n    vec3 n = v2f.normal;\n    vec3 v = normalize(CAMERA_POS.xyz - wpos);\n    vec3 l = -LIGHT_DIR0;\n    vec3 h = normalize(v+l);\n\n    float roughness = uRoughness;\n    float metallic = uMetallic;\n\n    float NdotL = clamp(dot(n, l), 0.001, 1.0);\n    float NdotV = clamp(abs(dot(n, v)), 0.001, 1.0);\n    float NdotH = clamp(dot(n, h), 0.0, 1.0);\n    //float LdotH = clamp(dot(l, h), 0.0, 1.0);\n    float VdotH = clamp(dot(v, h), 0.0, 1.0);\n\n    vec3 F = specularReflection(metallic,VdotH);\n    float D = microfacetDistribution(roughness,NdotH);\n    float G = geometricOcclusion(NdotV,NdotH,VdotH,NdotL);\n\n    vec3 diff = (vec3(1.0) - F) * diffColor;\n    vec3 spec = F  * (G * D / (4.0 * NdotL * NdotV));\n\n    vec3 col = NdotL * LIGHT_COLOR0 * (diff + spec);\n\n    vec3 ambient = ambient_color.a * ambient_color.rgb;\n\n    col += ambient;\n\n    #ifdef SHADOW_ON\n    float shadow = computeShadow(v2f.lpos,uShadowMap);\n    shadow = clamp(shadow+0.5,0.0,1.0);\n    col = mix(min(col,ambient),col,shadow);\n    #endif\n\n    fragColor = vec4(col *1.2,1.0);\n\n}";
    ShaderGen.rect = "#version 300 es\n\nprecision mediump float;\n#include SHADERFX_BASIS\n\n#queue overlay\n#zwrite off\n#ztest always\n\ninout vec2 vUV;\ninout vec4 vColor;\n\n#pragma vs vertex\n#ifdef SHADER_VS\nin vec4 aPosition;\nin vec2 aUV;\nin vec4 aColor;\n\nvoid vertex(){\n    vec2 pos = 2.0 * (aPosition.xy * _screenparam_.zw) -1.0 ;\n    \n    gl_Position = vec4(pos.x,-pos.y,0,1.0);\n    vUV = aUV;\n    vColor = aColor;\n}\n#endif\n\n#pragma ps fragment\n#ifdef SHADER_PS\nout vec4 fragColor;\nvoid fragment(){\n    fragColor = vColor;\n}\n#endif\n";
    ShaderGen.screenRect = "#version 300 es\n\nprecision mediump float;\n#include SHADERFX_BASIS\n#queue opaque\ninout vec2 vUV;\n#pragma vs vertex\n\nuniform vec4 uRect;\n\nin vec4 aPosition;\nin vec2 aUV;\nvoid vertex(){\n    vec4 pos = aPosition;\n\n    vec4 rect = uRect * SCREEN.zwzw * 2.0;\n    pos.xy = ((pos.xy + 0.5) * rect.zw + rect.xy) - 1.0;\n\n    vUV = vec2(aUV.x,1.0 -aUV.y);\n    gl_Position = pos;\n}\n#pragma ps fragment\nuniform sampler2D uSampler;\nout vec4 fragColor;\nvoid fragment(){\n    fragColor = texture(uSampler,vUV);\n}";
    ShaderGen.shadowmap = "#version 300 es\n\nprecision mediump float;\n#include SHADERFX_BASIS\n#queue other\n#pragma vs vertex\n#pragma ps fragment\n\nuniform mat4 uLightVP;\n\nin vec4 aPosition;\nvoid vertex(){\n    mat4 lightmtx = uLightVP;\n    gl_Position = lightmtx * MATRIX_M * aPosition; //(uLightVP * MATRIX_M) *\n}\n\nvoid fragment(){\n}";
    ShaderGen.shadowSample = "#version 300 es\n\nprecision mediump float;\n#include SHADERFX_BASIS\n#include SHADERFX_SHADOWMAP\n\n\nstruct V2F{\n    vec3 pos;\n    vec3 normal;\n    vec3 wpos;\n    SHADOW_COORD;\n};\ninout V2F v2f;\n\n\n#queue opaque\n#pragma vs vertex\n#ifdef SHADER_VS\nin vec4 aPosition;\nin vec2 aUV;\nin vec4 aNormal;\n\nvoid vertex(){\n    vec4 wpos = MATRIX_M * aPosition;\n    v2f.pos = wpos.xyz;\n    vec4 pos = MATRIX_VP * wpos;\n    gl_Position = pos;\n    v2f.normal = ObjToWorldDir(aNormal.xyz);\n    v2f.wpos = wpos.xyz;\n\n    CAL_SHADOW_COORD(v2f,wpos);\n}\n#endif\n\n#pragma ps fragment\n#ifdef SHADER_PS\n\nout lowp vec4 fragColor;\nvoid fragment(){\n    float depth = computeShadowPCF3(v2f.shadow_coord,uShadowMap);\n    fragColor = vec4(depth,depth,depth,1.0);\n}\n#endif";
    ShaderGen.shadowsGather = "#version 300 es\n\nprecision mediump float;\n#include SHADERFX_BASIS\n#include SHADERFX_SHADOWMAP\n\ninout vec2 vUV;\ninout vec3 vvdir;\n\n#pragma vs vertex\n\nin vec4 aPosition;\nvoid vertex(){\n    vec4 pos = aPosition;\n    vUV = pos.xy +0.5;\n    pos.xy *=2.0;\n\n    vec4 clippos = vec4(pos.xy *2.0,1.0,1.0);\n    vec4 cwpos = ClipToWorld(clippos);\n\n    vvdir = (cwpos.xyz / cwpos.w) - CAMERA_POS.xyz;\n    \n    gl_Position = pos;\n}\n\n#pragma ps fragment\n\nout vec4 fragColor;\nuniform sampler2D uDepthTexure;\nvoid fragment(){\n    float eyedepth = DECODE_VIEWDEPTH(SAMPLE_DEPTH_TEXTURE(uDepthTexure,vUV));\n    vec3 dir = normalize(vvdir);\n    vec3 wpos = dir * eyedepth + CAMERA_POS.xyz;\n    vec4 lpos = uLightMtx[0] * vec4(wpos,1.0);\n    vec3 lcpos = lpos.xyz / lpos.w;\n    lcpos = lpos.xyz *0.5 +0.5;\n    vec2 coord=  lcpos.xy;\n    float shadowDep = texture(uShadowMap,coord).x;\n    float d = shadowDep;// lcpos.z;\n    fragColor = vec4(lcpos.z -1.0,0,0,1.0);\n}";
    ShaderGen.skybox = "#version 300 es\n\nprecision mediump float;\n#include SHADERFX_BASIS\n#options ENVMAP_TYPE CUBE TEX PCG\n#queue skybox\n\ninout vec3 vWorldDir;\n\n#ifdef ENVMAP_TYPE_CUBE\nuniform samplerCube uSampler;\n#elif defined(ENVMAP_TYPE_TEX)\nuniform sampler2D uSampler;\n#elif defined(ENVMAP_TYPE_PCG)\n\n#define SAMPLES_NUMS 16\n// https://www.shadertoy.com/view/XlBfRD\n// License (MIT) Copyright (C) 2017-2018 Rui. All rights reserved.\nstruct ScatteringParams\n{\n    float sunRadius;\n\tfloat sunRadiance;\n\n\tfloat mieG;\n\tfloat mieHeight;\n\n\tfloat rayleighHeight;\n\n\tvec3 waveLambdaMie;\n\tvec3 waveLambdaOzone;\n\tvec3 waveLambdaRayleigh;\n\n\tfloat earthRadius;\n\tfloat earthAtmTopRadius;\n\tvec3 earthCenter;\n};\n\nvec3 ComputeSphereNormal(vec2 coord, float phiStart, float phiLength, float thetaStart, float thetaLength)\n{\n\tvec3 normal;\n\tnormal.x = -sin(thetaStart + coord.y * thetaLength) * sin(phiStart + coord.x * phiLength);\n\tnormal.y = -cos(thetaStart + coord.y * thetaLength);\n\tnormal.z = -sin(thetaStart + coord.y * thetaLength) * cos(phiStart + coord.x * phiLength);\n\treturn normalize(normal);\n}\n\nvec2 ComputeRaySphereIntersection(vec3 position, vec3 dir, vec3 center, float radius)\n{\n\tvec3 origin = position - center;\n\tfloat B = dot(origin, dir);\n\tfloat C = dot(origin, origin) - radius * radius;\n\tfloat D = B * B - C;\n\n\tvec2 minimaxIntersections;\n\tif (D < 0.0)\n\t{\n\t\tminimaxIntersections = vec2(-1.0, -1.0);\n\t}\n\telse\n\t{\n\t\tD = sqrt(D);\n\t\tminimaxIntersections = vec2(-B - D, -B + D);\n\t}\n\n\treturn minimaxIntersections;\n}\n\nvec3 ComputeWaveLambdaRayleigh(vec3 lambda)\n{\n\tconst float n = 1.0003;\n\tconst float N = 2.545E25;\n\tconst float pn = 0.035;\n\tconst float n2 = n * n;\n\tconst float pi3 = PI * PI * PI;\n\tconst float rayleighConst = (8.0 * pi3 * pow(n2 - 1.0,2.0)) / (3.0 * N) * ((6.0 + 3.0 * pn) / (6.0 - 7.0 * pn));\n\treturn rayleighConst / (lambda * lambda * lambda * lambda);\n}\n\nfloat ComputePhaseMie(float theta, float g)\n{\n\tfloat g2 = g * g;\n\treturn (1.0 - g2) / pow(1.0 + g2 - 2.0 * g * saturate(theta), 1.5) / (4.0 * PI);\n}\n\nfloat ComputePhaseRayleigh(float theta)\n{\n\tfloat theta2 = theta * theta;\n\treturn (theta2 * 0.75 + 0.75) / (4.0 * PI);\n}\n\nfloat ChapmanApproximation(float X, float h, float cosZenith)\n{\n\tfloat c = sqrt(X + h);\n\tfloat c_exp_h = c * exp(-h);\n\n\tif (cosZenith >= 0.0)\n\t{\n\t\treturn c_exp_h / (c * cosZenith + 1.0);\n\t}\n\telse\n\t{\n\t\tfloat x0 = sqrt(1.0 - cosZenith * cosZenith) * (X + h);\n\t\tfloat c0 = sqrt(x0);\n\n\t\treturn 2.0 * c0 * exp(X - x0) - c_exp_h / (1.0 - c * cosZenith);\n\t}\n}\n\nfloat GetOpticalDepthSchueler(float h, float H, float earthRadius, float cosZenith)\n{\n\treturn H * ChapmanApproximation(earthRadius / H, h / H, cosZenith);\n}\n\nvec3 GetTransmittance(ScatteringParams setting, vec3 L, vec3 V)\n{\n\tfloat ch = GetOpticalDepthSchueler(L.y, setting.rayleighHeight, setting.earthRadius, V.y);\n\treturn exp(-(setting.waveLambdaMie + setting.waveLambdaRayleigh) * ch);\n}\n\nvec2 ComputeOpticalDepth(ScatteringParams setting, vec3 samplePoint, vec3 V, vec3 L, float neg)\n{\n\tfloat rl = length(samplePoint);\n\tfloat h = rl - setting.earthRadius;\n\tvec3 r = samplePoint / rl;\n\n\tfloat cos_chi_sun = dot(r, L);\n\tfloat cos_chi_ray = dot(r, V * neg);\n\n\tfloat opticalDepthSun = GetOpticalDepthSchueler(h, setting.rayleighHeight, setting.earthRadius, cos_chi_sun);\n\tfloat opticalDepthCamera = GetOpticalDepthSchueler(h, setting.rayleighHeight, setting.earthRadius, cos_chi_ray) * neg;\n\n\treturn vec2(opticalDepthSun, opticalDepthCamera);\n}\n\nvoid AerialPerspective(ScatteringParams setting, vec3 start, vec3 end, vec3 V, vec3 L, bool infinite, out vec3 transmittance, out vec3 insctrMie, out vec3 insctrRayleigh)\n{\n\tfloat inf_neg = infinite ? 1.0 : -1.0;\n\n\tvec3 sampleStep = (end - start) / float(SAMPLES_NUMS);\n\tvec3 samplePoint = end - sampleStep;\n\tvec3 sampleLambda = setting.waveLambdaMie + setting.waveLambdaRayleigh + setting.waveLambdaOzone;\n\n\tfloat sampleLength = length(sampleStep);\n\n\tvec3 scattering = vec3(0.0);\n\tvec2 lastOpticalDepth = ComputeOpticalDepth(setting, end, V, L, inf_neg);\n\n\tfor (int i = 1; i < SAMPLES_NUMS; i++, samplePoint -= sampleStep)\n\t{\n\t\tvec2 opticalDepth = ComputeOpticalDepth(setting, samplePoint, V, L, inf_neg);\n\n\t\tvec3 segment_s = exp(-sampleLambda * (opticalDepth.x + lastOpticalDepth.x));\n\t\tvec3 segment_t = exp(-sampleLambda * (opticalDepth.y - lastOpticalDepth.y));\n\t\t\n\t\ttransmittance *= segment_t;\n\t\t\n\t\tscattering = scattering * segment_t;\n\t\tscattering += exp(-(length(samplePoint) - setting.earthRadius) / setting.rayleighHeight) * segment_s;\n\n\t\tlastOpticalDepth = opticalDepth;\n\t}\n\n\tinsctrMie = scattering * setting.waveLambdaMie * sampleLength;\n\tinsctrRayleigh = scattering * setting.waveLambdaRayleigh * sampleLength;\n}\n\nfloat ComputeSkyboxChapman(ScatteringParams setting, vec3 eye, vec3 V, vec3 L, out vec3 transmittance, out vec3 insctrMie, out vec3 insctrRayleigh)\n{\n\tbool neg = true;\n\n\tvec2 outerIntersections = ComputeRaySphereIntersection(eye, V, setting.earthCenter, setting.earthAtmTopRadius);\n\tif (outerIntersections.y < 0.0) return 0.0;\n\n\tvec2 innerIntersections = ComputeRaySphereIntersection(eye, V, setting.earthCenter, setting.earthRadius);\n\tif (innerIntersections.x > 0.0)\n\t{\n\t\tneg = false;\n\t\touterIntersections.y = innerIntersections.x;\n\t}\n\n\teye -= setting.earthCenter;\n\n\tvec3 start = eye + V * max(0.0, outerIntersections.x);\n\tvec3 end = eye + V * outerIntersections.y;\n\n\tAerialPerspective(setting, start, end, V, L, neg, transmittance, insctrMie, insctrRayleigh);\n\n\tbool intersectionTest = innerIntersections.x < 0.0 && innerIntersections.y < 0.0;\n\treturn intersectionTest ? 1.0 : 0.0;\n}\n\nvec4 ComputeSkyInscattering(ScatteringParams setting, vec3 eye, vec3 V, vec3 L)\n{\n\tvec3 insctrMie = vec3(0.0);\n\tvec3 insctrRayleigh = vec3(0.0);\n\tvec3 insctrOpticalLength = vec3(1.0);\n\tfloat intersectionTest = ComputeSkyboxChapman(setting, eye, V, L, insctrOpticalLength, insctrMie, insctrRayleigh);\n\n\tfloat phaseTheta = dot(V, L);\n\tfloat phaseMie = ComputePhaseMie(phaseTheta, setting.mieG);\n\tfloat phaseRayleigh = ComputePhaseRayleigh(phaseTheta);\n\tfloat phaseNight = 1.0 - saturate(insctrOpticalLength.x * EPSILON);\n\n\tvec3 insctrTotalMie = insctrMie * phaseMie;\n\tvec3 insctrTotalRayleigh = insctrRayleigh * phaseRayleigh;\n\n\tvec3 sky = (insctrTotalMie + insctrTotalRayleigh) * setting.sunRadiance;\n\n\tfloat angle = saturate((1.0 - phaseTheta) * setting.sunRadius);\n\tfloat cosAngle = cos(angle * PI * 0.5);\n\tfloat edge = ((angle >= 0.9) ? smoothstep(0.9, 1.0, angle) : 0.0);\n                         \n\tvec3 limbDarkening = GetTransmittance(setting, -L, V);\n\tlimbDarkening *= pow(vec3(cosAngle), vec3(0.420, 0.503, 0.652)) * mix(vec3(1.0), vec3(1.2,0.9,0.5), edge) * intersectionTest;\n\n\tsky += limbDarkening;\n\n\treturn vec4(sky, phaseNight * intersectionTest);\n}\n\nvec3 TonemapACES(vec3 x)\n{\n\tconst float A = 2.51f;\n\tconst float B = 0.03f;\n\tconst float C = 2.43f;\n\tconst float D = 0.59f;\n\tconst float E = 0.14f;\n\treturn (x * (A * x + B)) / (x * (C * x + D) + E);\n}\n\nfloat noise(vec2 uv)\n{\n\treturn fract(dot(sin(uv.xyx * uv.xyy * 1024.0), vec3(341896.483, 891618.637, 602649.7031)));\n}\n\n#endif\n\n#pragma vs vertex\n#ifdef SHADER_VS\nin vec4 aPosition;\nvoid vertex(){\n    vec4 pos = aPosition;\n    pos.xy*=2.0;\n    pos.z = 1.0;\n    gl_Position = pos;\n\n    vec4 wpos =  inverse(MATRIX_VP) * pos;\n    wpos.xyz = wpos.xyz / wpos.w - CAMERA_POS.xyz;\n    vWorldDir = wpos.xyz;\n    \n}\n#endif\n\n#pragma ps fragment\n#ifdef SHADER_PS\nout lowp vec4 fragColor;\nvoid fragment(){\n    vec3 dir = vWorldDir.xyz;\n    #ifdef ENVMAP_TYPE_CUBE\n    fragColor = texture(uSampler,dir);\n    #elif defined(ENVMAP_TYPE_TEX)\n    dir = normalize(dir);\n    float y = 1.0 - 0.5 *(1.0 + dir.y);\n    float x = atan(dir.z,dir.x) / PI_2 + 0.5;\n    fragColor = texture(uSampler,vec2(x,y));\n    #elif defined(ENVMAP_TYPE_PCG)\n\n    vec3 V = normalize(dir);\n    vec3 L = normalize(vec3(0,0.5,0.5));\n\n    ScatteringParams setting;\n\tsetting.sunRadius = 500.0;\n\tsetting.sunRadiance = 20.0;\n\tsetting.mieG = 0.76;\n\tsetting.mieHeight = 1200.0;\n\tsetting.rayleighHeight = 8000.0;\n\tsetting.earthRadius = 6360000.0;\n\tsetting.earthAtmTopRadius = 6420000.0;\n\tsetting.earthCenter = vec3(0, -setting.earthRadius, 0);\n\tsetting.waveLambdaMie = vec3(2e-7);\n    // wavelength with 680nm, 550nm, 450nm\n    setting.waveLambdaRayleigh = ComputeWaveLambdaRayleigh(vec3(680e-9, 550e-9, 450e-9));\n    \n    // see https://www.shadertoy.com/view/MllBR2\n\tsetting.waveLambdaOzone = vec3(1.36820899679147, 3.31405330400124, 0.13601728252538) * 0.6e-6 * 2.504;\n\t\n    vec3 eye = vec3(0,1000.0,0);\n   \tvec4 sky = ComputeSkyInscattering(setting, eye, V, L);\n    sky.rgb = TonemapACES(sky.rgb * 2.0);\n    sky.rgb = pow(sky.rgb, vec3(1.0 / 2.2)); // gamma\n    sky.rgb += noise(dir.xy * TIME.z) / 255.0; // dither\n\tfragColor = vec4(sky.rgb, 1.0);\n    #endif\n}\n#endif\n";
    ShaderGen.sprite = "#version 300 es\n\nprecision mediump float;\n#include SHADERFX_BASIS\n\n#queue transparent\n#zwrite off\n#blend src_alpha one_minus_src_alpha\n\ninout vec2 vUV;\n\n#pragma vs vertex\n#ifdef SHADER_VS\nin vec4 aPosition;\nin vec2 aUV;\n\nvoid vertex(){\n    gl_Position = MATRIX_MVP * aPosition;\n    vUV = aUV;\n}\n#endif\n\n#pragma ps fragment\n#ifdef SHADER_PS\nuniform sampler2D uSampler;\nuniform vec4 uColor;\nout vec4 fragColor;\nvoid fragment(){\n    fragColor = texture(uSampler,vUV) * uColor;\n}\n#endif\n";
    ShaderGen.text = "#version 300 es\n\nprecision mediump float;\n#include SHADERFX_BASIS\n\n#queue overlay\n#zwrite off\n#ztest always\n#blend src_alpha one_minus_src_alpha\n\ninout vec2 vUV;\n\n#pragma vs vertex\n#ifdef SHADER_VS\nin vec4 aPosition;\nin vec2 aUV;\n\nvoid vertex(){\n    vec2 pos = 2.0 * (aPosition.xy * _screenparam_.zw) -1.0 ;\n    \n    gl_Position = vec4(pos.x,-pos.y,0,1.0);\n    vUV = aUV;\n}\n#endif\n\n#pragma ps fragment\n#ifdef SHADER_PS\nout vec4 fragColor;\nuniform sampler2D uSampler;\nvoid fragment(){\n    vec2 uv =vUV;\n    vec4 col = vec4(1.0);\n    col.a = texture(uSampler,uv).a;\n    fragColor = col;\n}\n#endif\n";
    ShaderGen.UnlitColor = "#version 300 es\n\nprecision mediump float;\n#include SHADERFX_BASIS\n#queue opaque\n\n#pragma vs vertex\nin vec4 aPosition;\nvoid vertex(){\n    vec4 pos = aPosition;\n    gl_Position = MATRIX_MVP * pos;\n}\n\n#pragma ps fragment\nuniform vec4 uColor;\nout vec4 fragColor;\nvoid fragment(){\n    fragColor = uColor;\n}";
    ShaderGen.UnlitTexture = "#version 300 es\n\nprecision mediump float;\n#include SHADERFX_BASIS\n\n#queue opaque\n\ninout vec2 vUV;\n\n\n#pragma vs vertex\nin vec4 aPosition;\nin vec2 aUV;\nvoid vertex(){\n    gl_Position = MATRIX_MVP * aPosition;\n    vUV = aUV;\n}\n\n#pragma ps fragment\n\nuniform sampler2D uSampler;\nout vec4 fragColor;\nvoid fragment(){\n    fragColor = texture(uSampler,vUV);\n}";
    ShaderGen.uvValue = "#version 300 es\n\nprecision mediump float;\n#include SHADERFX_BASIS\n\ninout vec2 vUV;\n\n#pragma vs vertex\nin vec4 aPosition;\nin vec2 aUV;\nvoid vertex(){\n    gl_Position = MATRIX_MVP * aPosition;\n    vUV = aUV;\n}\n\n#pragma ps fragment\nout vec4 fragColor;\nvoid fragment(){\n    fragColor = vec4(vUV,0,1.0);\n}";
    return ShaderGen;
}());

var ShaderFX = /** @class */ (function () {
    function ShaderFX() {
    }
    ShaderFX.registVariant = function (variant) {
        this.variants[variant.variantName] = variant;
    };
    ShaderFX.linkAllVariant = function () {
        var variants = ShaderFX.variants;
        for (var key in variants) {
            var v = variants[key];
            if (v != null && v instanceof ShaderVariant) {
                v.link(variants);
            }
        }
    };
    ShaderFX.getShader = function () {
    };
    ShaderFX.compileShaders = function (glctx, source) {
        if (!ShaderFX.s_variantsLinked) {
            ShaderFX.linkAllVariant();
            ShaderFX.s_variantsLinked = true;
        }
        if (source == null)
            return null;
        source.buildShader(ShaderFX.variants);
        if (!source.isBuilt)
            return null;
        var optconfig = new ShaderOptionsConfig(source.optionsList);
        var compileFlags = optconfig.compileFlag;
        var _a = source.injectCompileFlags(compileFlags), vs = _a[0], ps = _a[1];
        var p = Shader.CreateProgram(glctx, vs, ps);
        if (p == null)
            return null;
        var shader = new Shader(source, p, optconfig, glctx);
        var tags = source.tags;
        if (tags == null) {
            tags = new ShaderTags();
        }
        tags.fillDefaultVal();
        shader.tags = tags;
        return shader;
    };
    ShaderFX.isInternalUniformBlockName = function (blockname) {
        var CLASS = ShaderFX;
        if (blockname == CLASS.UNIFORM_BASIS || blockname == CLASS.UNIFORM_OBJ || blockname == CLASS.UNIFORM_SHADOWMAP)
            return true;
        return false;
    };
    ShaderFX.variants = {};
    ShaderFX.s_variantsLinked = false;
    ShaderFX.VARIANT_SHADERFX_OBJ = "SHADERFX_OBJ";
    ShaderFX.VARIANT_SHADERFX_CAMERA = "SHADERFX_CAMERA";
    ShaderFX.VARIANT_SHADERFX_BASIS = "SHADERFX_BASIS";
    ShaderFX.VARIANT_SHADERFX_LIGHT = "SHADERFX_LIGHT";
    ShaderFX.VARIANT_SHADERFX_SHADOWMAP = "SHADERFX_SHADOWMAP";
    ShaderFX.VARIANT_SHADERFX_LIGHTING = "SHADERFX_LIGHTING";
    ShaderFX.OPT_SHADOWMAP_SHADOW = "SHADOW";
    ShaderFX.OPT_SHADOWMAP_SHADOW_ON = "ON";
    ShaderFX.OPT_SHADOWMAP_SHADOW_OFF = "OFF";
    ShaderFX.ATTR_aPosition = "aPosition";
    ShaderFX.ATTR_aUV = "aUV";
    ShaderFX.ATTR_aNormal = "aNormal";
    ShaderFX.ATTR_aColor = "aColor";
    ShaderFX.UNIFORM_BASIS = "UNIFORM_BASIS";
    ShaderFX.UNIFORM_OBJ = "UNIFORM_OBJ";
    ShaderFX.UNIFORM_LIGHT = "UNIFORM_LIGHT";
    ShaderFX.UNIFORM_SHADOWMAP = "UNIFORM_SHADOWMAP";
    ShaderFX.UNIFORM_SHADOWMAP_SAMPLER = "uShadowMap";
    ShaderFX.UNIFORM_MAIN_COLOR = "uColor";
    ShaderFX.UNIFORM_MAIN_TEXTURE = "uSampler";
    ShaderFX.GL_TEXTURE_FB = 0x84C0;
    ShaderFX.GL_TEXTURE_DEPTH = 0x84C1;
    ShaderFX.GL_TEXTURE_TEMP = 0x84C2;
    ShaderFX.GL_TEXTURE_DEF_TEX = 0x84C3;
    ShaderFX.GL_TEXTURE_FB_ID = 0;
    ShaderFX.GL_TEXTURE_TEMP_ID = 2;
    ShaderFX.GL_TEXTURE_DEF_TEX_ID = 3;
    //Texture used in shader sampler
    ShaderFX.GL_SH_TEXTURE0 = 0x84C4;
    ShaderFX.GL_SH_TEXTURE1 = 0x84C5;
    ShaderFX.GL_SH_TEXTURE2 = 0x84C6;
    ShaderFX.GL_SH_TEXTURE3 = 0x84C7;
    ShaderFX.GL_SH_TEXTURE4 = 0x84C8;
    ShaderFX.GL_SH_TEXTURE5 = 0x84C9;
    ShaderFX.GL_SH_TEXTURE6 = 0x84C10;
    ShaderFX.GL_SH_TEXTURE7 = 0x84C11;
    ShaderFX.GL_SH_TEXTURE0_ID = 4;
    ShaderFX.GL_SH_TEXTURE1_ID = 5;
    ShaderFX.GL_SH_TEXTURE2_ID = 6;
    ShaderFX.GL_SH_TEXTURE3_ID = 7;
    ShaderFX.GL_SH_TEXTURE4_ID = 8;
    ShaderFX.GL_SH_TEXTURE5_ID = 9;
    ShaderFX.GL_SH_TEXTURE6_ID = 10;
    ShaderFX.GL_SH_TEXTURE7_ID = 11;
    ShaderFX.GL_SHADOWMAP_TEX0 = 0x84CC;
    ShaderFX.GL_SHADOWMAP_TEX1 = 0x84CD;
    ShaderFX.GL_SHADOWMAP_TEX2 = 0x84CE;
    ShaderFX.GL_SHADOWMAP_TEX3 = 0x84CF;
    ShaderFX.GL_SHADOWMAP_TEX0_ID = 12;
    ShaderFX.GL_SHADOWMAP_TEX1_ID = 13;
    ShaderFX.GL_SHADOWMAP_TEX2_ID = 14;
    ShaderFX.GL_SHADOWMAP_TEX3_ID = 15;
    return ShaderFX;
}());
function ShaderFile(vsfile, psfile) {
    return function (target, key) {
        if (psfile == null) {
            psfile = vsfile;
        }
        target[key] = getShaderSource(vsfile, psfile, key);
    };
}
function ShaderInc(filename) {
    return function (target, key) {
        var variant = getShaderInclude(filename);
        target[key] = variant;
        ShaderFX.registVariant(variant);
    };
}
function getShaderSource(vss, pss, name) {
    var unified = ShaderGen[vss];
    if (unified != null) {
        return ShaderSource.create(unified, name);
    }
    var vs = ShaderGen[vss + '_vs'];
    var ps = ShaderGen[pss + '_ps'];
    if (vs != null && ps != null) {
        return new ShaderSource(vs, ps, name);
    }
    throw new Error("shader source invalid : " + vss + " " + pss);
}
function getShaderInclude(src) {
    var inc = ShaderGen[src];
    if (inc == null) {
        throw new Error("shader include invalid : " + src);
    }
    return new ShaderVariant(src.toUpperCase(), inc);
}

var GLConst;
(function (GLConst) {
    GLConst[GLConst["BYTE"] = 5120] = "BYTE";
    GLConst[GLConst["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
    GLConst[GLConst["SHORT"] = 5122] = "SHORT";
    GLConst[GLConst["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
    GLConst[GLConst["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
    GLConst[GLConst["FLOAT"] = 5126] = "FLOAT";
})(GLConst || (GLConst = {}));
var GL = /** @class */ (function () {
    function GL() {
    }
    GL.isDepthFmt = function (fmt) {
        return GL.s_depth_fmt.indexOf(fmt) >= 0;
    };
    GL.isDepthStencilFmt = function (fmt) {
        return GL.s_depth_stencil_fmt.indexOf(fmt) >= 0;
    };
    GL.isStencilFmt = function (fmt) {
        return GL.s_stencil_fmt.indexOf(fmt) >= 0;
    };
    GL.POINTS = 0x0000;
    GL.LINES = 0x0001;
    GL.LINE_LOOP = 0x0002;
    GL.LINE_STRIP = 0x0003;
    GL.TRIANGLES = 0x0004;
    GL.TRIANGLE_STRIP = 0x0005;
    GL.TRIANGLE_FAN = 0x0006;
    GL.FRAMEBUFFER = 0x8D40;
    GL.RENDERBUFFER = 0x8D41;
    GL.COLOR_ATTACHMENT0 = 0x8CE0;
    GL.DEPTH_ATTACHMENT = 0x8D00;
    GL.DEPTH_STENCIL_ATTACHMENT = 0x821A;
    GL.STENCIL_ATTACHMENT = 0x8D20;
    GL.COLOR_ATTACHMENT1 = 0x8CE1;
    GL.COLOR_ATTACHMENT2 = 0x8CE2;
    GL.COLOR_ATTACHMENT3 = 0x8CE3;
    GL.COLOR_ATTACHMENT4 = 0x8CE4;
    GL.COLOR_ATTACHMENT5 = 0x8CE5;
    GL.COLOR_ATTACHMENT6 = 0x8CE6;
    GL.COLOR_ATTACHMENT7 = 0x8CE7;
    GL.COLOR_ATTACHMENT8 = 0x8CE8;
    GL.COLOR_ATTACHMENT9 = 0x8CE9;
    GL.COLOR_ATTACHMENT10 = 0x8CEA;
    GL.COLOR_ATTACHMENT11 = 0x8CEB;
    GL.COLOR_ATTACHMENT12 = 0x8CEC;
    GL.COLOR_ATTACHMENT13 = 0x8CED;
    GL.COLOR_ATTACHMENT14 = 0x8CEE;
    GL.COLOR_ATTACHMENT15 = 0x8CEF;
    GL.DEPTH_BUFFER_BIT = 0x00000100;
    GL.STENCIL_BUFFER_BIT = 0x00000400;
    GL.COLOR_BUFFER_BIT = 0x00004000;
    GL.ARRAY_BUFFER = 0x8892;
    GL.ELEMENT_ARRAY_BUFFER = 0x8893;
    GL.UNIFORM_BUFFER = 0x8A11;
    GL.PIXEL_PACK_BUFFER = 0x88EB;
    GL.PIXEL_UNPACK_BUFFER = 0x88EC;
    GL.PIXEL_PACK_BUFFER_BINDING = 0x88ED;
    GL.PIXEL_UNPACK_BUFFER_BINDING = 0x88EF;
    GL.COPY_READ_BUFFER = 0x8F36;
    GL.COPY_WRITE_BUFFER = 0x8F37;
    GL.COPY_READ_BUFFER_BINDING = 0x8F36;
    GL.COPY_WRITE_BUFFER_BINDING = 0x8F37;
    GL.STATIC_DRAW = 0x88E4;
    GL.STREAM_DRAW = 0x88E0;
    GL.DYNAMIC_DRAW = 0x88E8;
    GL.RGB = 0x1907;
    GL.RGBA = 0x1908;
    GL.RGBA8 = 0x8051;
    GL.DEPTH_COMPONENT = 0x1902;
    GL.DEPTH_COMPONENT16 = 0x81A5;
    GL.DEPTH_COMPONENT24 = 0x81A6;
    GL.DEPTH_COMPONENT32F = 0x8CAC;
    GL.DEPTH_STENCIL = 0x84F9;
    GL.DEPTH24_STENCIL8 = 0x88F0;
    GL.STENCIL_INDEX = 0x1901;
    GL.STENCIL_INDEX8 = 0x8D48;
    GL.s_depth_fmt = [GL.DEPTH_COMPONENT16, GL.DEPTH_COMPONENT24, GL.DEPTH_COMPONENT32F, GL.DEPTH_COMPONENT];
    GL.s_stencil_fmt = [GL.STENCIL_INDEX8, GL.STENCIL_INDEX];
    GL.s_depth_stencil_fmt = [GL.DEPTH24_STENCIL8, GL.DEPTH_STENCIL];
    GL.BYTE = 5120;
    GL.UNSIGNED_BYTE = 5121;
    GL.SHORT = 5122;
    GL.UNSIGNED_SHORT = 5123;
    GL.UNSIGNED_INT = 5125;
    GL.FLOAT = 5126;
    GL.NEAREST = 0x2600;
    GL.LINEAR = 0x2601;
    GL.NEAREST_MIPMAP_NEAREST = 0x2700;
    GL.LINEAR_MIPMAP_NEAREST = 0x2701;
    GL.NEAREST_MIPMAP_LINEAR = 0x2702;
    GL.LINEAR_MIPMAP_LINEAR = 0x2703;
    GL.TEXTURE_MAG_FILTER = 0x2800;
    GL.TEXTURE_MIN_FILTER = 0x2801;
    GL.TEXTURE_WRAP_S = 0x2802;
    GL.TEXTURE_WRAP_T = 0x2803;
    GL.TEXTURE_WRAP_R = 0x8072;
    GL.TEXTURE_2D = 0x0DE1;
    GL.TEXTURE = 0x1702;
    GL.TEXTURE_CUBE_MAP = 0x8513;
    GL.TEXTURE_BINDING_CUBE_MAP = 0x8514;
    GL.TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;
    GL.TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516;
    GL.TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517;
    GL.TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518;
    GL.TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519;
    GL.EXTURE_CUBE_MAP_NEGATIVE_Z = 0x851A;
    GL.MAX_CUBE_MAP_TEXTURE_SIZE = 0x851C;
    GL.ACTIVE_TEXTURE = 0x84E0;
    GL.REPEAT = 0x2901;
    GL.CLAMP_TO_EDGE = 0x812F;
    GL.MIRRORED_REPEAT = 0x8370;
    GL.TEXTURE_COMPARE_MODE = 0x884C;
    GL.TEXTURE_COMPARE_FUNC = 0x884D;
    GL.COMPARE_REF_TO_TEXTURE = 0x884E;
    GL.SAMPLER_2D = 0x8B5E;
    GL.SAMPLER_3D = 0x8B5F;
    GL.SAMPLER_2D_SHADOW = 0x8B62;
    GL.SAMPLER_2D_ARRAY = 0x8DC1;
    GL.SAMPLER_2D_ARRAY_SHADOW = 0x8DC4;
    GL.SAMPLER_CUBE_SHADOW = 0x8DC5;
    GL.OBJECT_TYPE = 0x9112;
    GL.SYNC_CONDITION = 0x9113;
    GL.SYNC_STATUS = 0x9114;
    GL.SYNC_FLAGS = 0x9115;
    GL.SYNC_FENCE = 0x9116;
    GL.SYNC_GPU_COMMANDS_COMPLETE = 0x9117;
    GL.UNSIGNALED = 0x9118;
    GL.SIGNALED = 0x9119;
    GL.ALREADY_SIGNALED = 0x911A;
    GL.TIMEOUT_EXPIRED = 0x911B;
    GL.CONDITION_SATISFIED = 0x911C;
    GL.WAIT_FAILED = 0x911D;
    GL.SYNC_FLUSH_COMMANDS_BIT = 0x00000001;
    GL.NEVER = 0x0200;
    GL.ALWAYS = 0x0207;
    GL.LESS = 0x0201;
    GL.EQUAL = 0x0202;
    GL.LEQUAL = 0x0203;
    GL.GREATER = 0x0204;
    GL.GEQUAL = 0x0206;
    GL.NOTEQUAL = 0x0205;
    GL.BLEND = 0x0BE2;
    GL.DEPTH_TEST = 0x0B71;
    GL.DITHER = 0x0BD0;
    GL.POLYGON_OFFSET_FILL = 0x8037;
    GL.SAMPLE_ALPHA_TO_COVERAGE = 0x809E;
    GL.SAMPLE_COVERAGE = 0x80A0;
    GL.SCISSOR_TEST = 0x0C11;
    GL.STENCIL_TEST = 0x0B90;
    GL.CW = 0x0900;
    GL.CCW = 0x0901;
    GL.TEXTURE0 = 33984;
    GL.TEXTURE1 = 33985;
    GL.TEXTURE2 = 33986;
    GL.TEXTURE3 = 33987;
    GL.TEXTURE4 = 33988;
    GL.TEXTURE5 = 33989;
    GL.TEXTURE6 = 33990;
    GL.TEXTURE7 = 33991;
    GL.TEXTURE8 = 33992;
    GL.TEXTURE9 = 33993;
    GL.TEXTURE10 = 33994;
    GL.TEXTURE11 = 33995;
    GL.TEXTURE12 = 33996;
    GL.TEXTURE13 = 33997;
    GL.TEXTURE14 = 33998;
    GL.TEXTURE15 = 33999;
    GL.TEXTURE16 = 34000;
    GL.TEXTURE17 = 34001;
    GL.TEXTURE18 = 34002;
    GL.TEXTURE19 = 34003;
    GL.TEXTURE20 = 34004;
    GL.TEXTURE21 = 34005;
    GL.TEXTURE22 = 34006;
    GL.TEXTURE23 = 34007;
    GL.TEXTURE24 = 34008;
    GL.TEXTURE25 = 34009;
    GL.TEXTURE26 = 34010;
    GL.TEXTURE27 = 34011;
    GL.TEXTURE28 = 34012;
    GL.TEXTURE29 = 34013;
    GL.TEXTURE30 = 34014;
    GL.TEXTURE31 = 34015;
    GL.FLOAT_VEC2 = 0x8B50;
    GL.FLOAT_VEC3 = 0x8B51;
    GL.FLOAT_VEC4 = 0x8B52;
    GL.INT_VEC2 = 0x8B53;
    GL.INT_VEC3 = 0x8B54;
    GL.INT_VEC4 = 0x8B55;
    GL.BOOL = 0x8B56;
    GL.BOOL_VEC2 = 0x8B57;
    GL.BOOL_VEC3 = 0x8B58;
    GL.BOOL_VEC4 = 0x8B59;
    GL.FLOAT_MAT2 = 0x8B5A;
    GL.FLOAT_MAT3 = 0x8B5B;
    GL.FLOAT_MAT4 = 0x8B5C;
    GL.SAMPLER_CUBE = 0x8B60;
    GL.STREAM_READ = 0x88E1;
    GL.STREAM_COPY = 0x88E2;
    GL.STATIC_READ = 0x88E5;
    GL.STATIC_COPY = 0x88E6;
    GL.DYNAMIC_READ = 0x88E9;
    GL.DYNAMIC_COPY = 0x88EA;
    return GL;
}());

var TextureType;
(function (TextureType) {
    TextureType[TextureType["Color"] = 0] = "Color";
    TextureType[TextureType["Depth"] = 1] = "Depth";
    TextureType[TextureType["DepthStencil"] = 2] = "DepthStencil";
})(TextureType || (TextureType = {}));
var TextureDescUtility = /** @class */ (function () {
    function TextureDescUtility() {
    }
    TextureDescUtility.fillDefault = function (desc) {
        if (desc.internalformat != null) {
            if (desc.format == null) {
                desc.format = desc.internalformat;
            }
        }
        else {
            throw new Error("invalid texcture creation desc");
        }
        desc.wrap_s = undefinedOr(desc.wrap_s, GL.CLAMP_TO_EDGE);
        desc.wrap_t = undefinedOr(desc.wrap_t, GL.CLAMP_TO_EDGE);
        desc.min_filter = undefinedOr(desc.min_filter, GL.LINEAR);
        desc.mag_filter = undefinedOr(desc.mag_filter, GL.LINEAR);
        desc.mipmap = undefinedOr(desc.mipmap, false);
    };
    Object.defineProperty(TextureDescUtility, "DefaultRGBA", {
        get: function () {
            var desc = {
                internalformat: GL.RGBA,
                format: GL.RGBA
            };
            TextureDescUtility.fillDefault(desc);
            return desc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextureDescUtility, "DefaultRGB", {
        get: function () {
            var desc = {
                internalformat: GL.RGB,
                format: GL.RGB
            };
            TextureDescUtility.fillDefault(desc);
            return desc;
        },
        enumerable: true,
        configurable: true
    });
    TextureDescUtility.clone = function (desc) {
        var c = { internalformat: desc.internalformat };
        for (var p in desc) {
            c[p] = desc[p];
        }
        return c;
    };
    TextureDescUtility.getTexFmtType = function (internalformat) {
        if (GL.isDepthFmt(internalformat))
            return TextureType.Depth;
        if (GL.isDepthStencilFmt(internalformat))
            return TextureType.DepthStencil;
        return TextureType.Color;
    };
    return TextureDescUtility;
}());

var __awaiter$4 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$4 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Texture2D = /** @class */ (function () {
    function Texture2D(tex, width, heigt, desc) {
        if (width === void 0) { width = 0; }
        if (heigt === void 0) { heigt = 0; }
        this.m_raw = tex;
        this.m_width = width;
        this.m_height = heigt;
        this.m_desc = desc == null ? null : TextureDescUtility.clone(desc);
    }
    Texture2D.prototype.getDesc = function () {
        return this.m_desc;
    };
    Texture2D.prototype.getRawTexture = function () {
        return this.m_raw;
    };
    Object.defineProperty(Texture2D.prototype, "width", {
        get: function () { return this.m_width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Texture2D.prototype, "height", {
        get: function () { return this.m_height; },
        enumerable: true,
        configurable: true
    });
    Texture2D.prototype.release = function (glctx) {
        if (this.m_raw != null) {
            glctx.deleteTexture(this.m_raw);
            this.m_raw = null;
        }
        return;
    };
    Texture2D.createTexture2D = function (width, height, desc, glctx) {
        TextureDescUtility.fillDefault(desc);
        var tex = glctx.createTexture();
        glctx.activeTexture(ShaderFX.GL_TEXTURE_TEMP);
        glctx.bindTexture(GL.TEXTURE_2D, tex);
        glctx.texStorage2D(GL.TEXTURE_2D, 1, desc.internalformat, width, height);
        glctx.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, desc.mag_filter);
        glctx.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, desc.min_filter);
        glctx.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, desc.wrap_s);
        glctx.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, desc.wrap_t);
        if (desc.compare_mode != null) {
            glctx.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_COMPARE_MODE, desc.compare_mode);
        }
        if (desc.mipmap) {
            glctx.generateMipmap(GL.TEXTURE_2D);
        }
        glctx.bindTexture(GL.TEXTURE_2D, null);
        var texture = new Texture2D(tex, width, height, desc);
        return texture;
    };
    Texture2D.createTexture2DImage = function (img, desc, glctx) {
        var tex = glctx.createTexture();
        TextureDescUtility.fillDefault(desc);
        try {
            glctx.bindTexture(GL.TEXTURE_2D, tex);
            glctx.texImage2D(GL.TEXTURE_2D, 0, desc.internalformat, img.width, img.height, 0, desc.format, GL.UNSIGNED_BYTE, img);
            glctx.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, desc.mag_filter);
            glctx.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, desc.min_filter);
            glctx.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, desc.wrap_s);
            glctx.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, desc.wrap_t);
            if (desc.mipmap) {
                glctx.generateMipmap(GL.TEXTURE_2D);
            }
            glctx.generateMipmap(GL.TEXTURE_2D);
            glctx.bindTexture(GL.TEXTURE_2D, null);
            return new Texture2D(tex, img.width, img.height, desc);
        }
        catch (e) {
            glctx.deleteTexture(tex);
            return null;
        }
    };
    Texture2D.loadTexture2D = function (url, glctx, alpha) {
        if (alpha === void 0) { alpha = true; }
        return new Promise(function (res, rej) {
            var img = new Image();
            img.onload = function () {
                try {
                    var desc = alpha ? TextureDescUtility.DefaultRGBA : TextureDescUtility.DefaultRGB;
                    var tex = Texture2D.createTexture2DImage(img, desc, glctx);
                    res(new Texture2D(tex, img.width, img.height, desc));
                }
                catch (e) {
                    glctx.deleteTexture(tex);
                    rej(e);
                }
            };
            img.onerror = function (ev) {
                rej(ev);
            };
            img.src = url;
        });
    };
    Texture2D.prototype.resize = function (width, height, glctx) {
        if (width == this.m_width && height == this.m_height)
            return;
        glctx.deleteTexture(this.m_raw);
        var desc = this.m_desc;
        var tex = glctx.createTexture();
        glctx.activeTexture(ShaderFX.GL_TEXTURE_TEMP);
        glctx.bindTexture(GL.TEXTURE_2D, tex);
        glctx.texStorage2D(GL.TEXTURE_2D, 1, desc.internalformat, width, height);
        glctx.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, desc.mag_filter);
        glctx.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, desc.min_filter);
        glctx.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, desc.wrap_s);
        glctx.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, desc.wrap_t);
        if (desc.mipmap) {
            glctx.generateMipmap(GL.TEXTURE_2D);
        }
        glctx.bindTexture(GL.TEXTURE_2D, null);
        this.m_raw = tex;
        this.m_width = width;
        this.m_height = height;
    };
    Texture2D.crateEmptyTexture = function (width, height, glctx) {
        if (width < 2 || height < 2) {
            throw new Error('invalid texture size');
        }
        var tex = glctx.createTexture();
        glctx.activeTexture(Texture2D.TEMP_TEXID);
        glctx.bindTexture(GL.TEXTURE_2D, tex);
        glctx.texStorage2D(GL.TEXTURE_2D, 1, GL.RGBA8, width, height);
        glctx.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
        glctx.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
        glctx.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
        glctx.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
        glctx.bindTexture(GL.TEXTURE_2D, null);
        return new Texture2D(tex, width, height);
    };
    Texture2D.createTextureSync = function (buffer, mime, glctx, callback) {
        var blob = new Blob([buffer], { type: mime });
        var url = URL.createObjectURL(blob);
        var image = new Image();
        var tex = new Texture2D(null);
        image.onload = function () {
            var rawtex = glctx.createTexture();
            glctx.activeTexture(Texture2D.TEMP_TEXID);
            glctx.bindTexture(GL.TEXTURE_2D, rawtex);
            glctx.texImage2D(GL.TEXTURE_2D, 0, GL.RGB, image.width, image.height, 0, GL.RGB, GL.UNSIGNED_BYTE, image);
            glctx.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
            glctx.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
            glctx.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
            glctx.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
            glctx.generateMipmap(GL.TEXTURE_2D);
            glctx.bindTexture(GL.TEXTURE_2D, null);
            tex.m_width = image.width;
            tex.m_height = image.height;
            tex.m_raw = rawtex;
            if (callback != null)
                callback(true);
        };
        image.onerror = function (ev) {
            console.error(ev);
            if (callback != null)
                callback(false);
        };
        image.src = url;
        return tex;
    };
    Texture2D.createTexture = function (buffer, mime, glctx) {
        return __awaiter$4(this, void 0, void 0, function () {
            return __generator$4(this, function (_a) {
                return [2 /*return*/, new Promise(function (res, rej) {
                        var tex = Texture2D.createTextureSync(buffer, mime, glctx, function (suc) {
                            if (suc) {
                                res(tex);
                            }
                            else {
                                rej('failed');
                            }
                        });
                    })];
            });
        });
    };
    return Texture2D;
}());

var FrameBuffer = /** @class */ (function () {
    function FrameBuffer() {
        this.m_texbinding = {};
    }
    Object.defineProperty(FrameBuffer.prototype, "width", {
        get: function () { return this.m_width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameBuffer.prototype, "height", {
        get: function () { return this.m_height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameBuffer.prototype, "coltex", {
        get: function () { return this.m_coltex; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameBuffer.prototype, "depthtex", {
        get: function () { return this.m_depthtex; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameBuffer.prototype, "attachments", {
        get: function () {
            return this.m_texbinding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameBuffer.prototype, "rawobj", {
        get: function () {
            return this.m_rawobj;
        },
        enumerable: true,
        configurable: true
    });
    FrameBuffer.createEmpty = function (glctx) {
        var glfb = glctx.createFramebuffer();
        var fb = new FrameBuffer();
        fb.m_rawobj = glfb;
        return fb;
    };
    FrameBuffer.create = function (glctx, width, height, texdesc) {
        var glfb = glctx.createFramebuffer();
        var fb = new FrameBuffer();
        fb.m_rawobj = glfb;
        glctx.bindFramebuffer(GL.FRAMEBUFFER, glfb);
        glctx.activeTexture(ShaderFX.GL_TEXTURE_TEMP);
        if (texdesc.colFmt != undefined) {
            var coltex = Texture2D.createTexture2D(width, height, {
                internalformat: texdesc.colFmt,
            }, glctx);
            fb.bindTexutre(glctx, coltex, GL.COLOR_ATTACHMENT0);
        }
        if (texdesc.depthFmt != undefined) {
            var deptex = Texture2D.createTexture2D(width, height, {
                internalformat: texdesc.depthFmt
            }, glctx);
            fb.bindTexutre(glctx, deptex, GL.DEPTH_ATTACHMENT);
        }
        else if (texdesc.depthstencilFmt != undefined) {
            var dstex = Texture2D.createTexture2D(width, height, {
                internalformat: texdesc.depthstencilFmt
            }, glctx);
            fb.bindTexutre(glctx, dstex, GL.DEPTH_STENCIL_ATTACHMENT);
        }
        glctx.bindFramebuffer(GL.FRAMEBUFFER, null);
        return fb;
    };
    FrameBuffer.createFromTexture = function (glctx, desc) {
        var glfb = glctx.createFramebuffer();
        var fb = new FrameBuffer();
        fb.m_rawobj = glfb;
        glctx.bindFramebuffer(GL.FRAMEBUFFER, glfb);
        fb.bindTexutre(glctx, desc.depthTex, GL.DEPTH_ATTACHMENT);
        fb.bindTexutre(glctx, desc.depthStencil, GL.DEPTH_STENCIL_ATTACHMENT);
        fb.bindTexutre(glctx, desc.colorTex0, GL.COLOR_ATTACHMENT0);
        fb.bindTexutre(glctx, desc.colorTex1, GL.COLOR_ATTACHMENT1);
        fb.bindTexutre(glctx, desc.colorTex2, GL.COLOR_ATTACHMENT2);
        fb.bindTexutre(glctx, desc.colorTex3, GL.COLOR_ATTACHMENT3);
        glctx.bindFramebuffer(GL.FRAMEBUFFER, null);
        return fb;
    };
    FrameBuffer.prototype.resize = function (glctx, width, height) {
        if (width == null || height == null) {
            throw new Error("resize framebuffer invalid param!");
        }
        if (this.m_width == width && this.m_height == height)
            return false;
        var fbtex = this.m_texbinding;
        var curfb = glctx.bindingFBO;
        glctx.bindGLFramebuffer(this);
        for (var key in fbtex) {
            if (fbtex.hasOwnProperty(key)) {
                var tex = fbtex[key];
                if (tex != null) {
                    tex.resize(width, height, glctx);
                    glctx.framebufferTexture2D(GL.FRAMEBUFFER, Number.parseInt(key), GL.TEXTURE_2D, tex.getRawTexture(), 0);
                }
            }
        }
        glctx.bindGLFramebuffer(curfb);
        this.m_width = width;
        this.m_height = height;
        return true;
    };
    FrameBuffer.prototype.bindTexutre = function (glctx, tex, attatch) {
        if (tex == null)
            return;
        glctx.framebufferTexture2D(GL.FRAMEBUFFER, attatch, GL.TEXTURE_2D, tex.getRawTexture(), 0);
        this.m_texbinding[attatch] = tex;
        if (attatch == GL.COLOR_ATTACHMENT0) {
            this.m_coltex = tex;
        }
        else if (attatch == GL.DEPTH_ATTACHMENT) {
            this.m_depthtex = tex;
        }
        else if (attatch == GL.DEPTH_STENCIL_ATTACHMENT) {
            this.m_depthtex = tex;
        }
    };
    FrameBuffer.prototype.release = function (glctx) {
        glctx.bindFramebuffer(GL.FRAMEBUFFER, null);
        glctx.deleteFramebuffer(this.m_rawobj);
        this.m_rawobj = null;
        var fbtex = this.m_texbinding;
        for (var key in fbtex) {
            if (fbtex.hasOwnProperty(key)) {
                var tex = fbtex[key];
                if (tex != null)
                    tex.release(glctx);
                fbtex[key] = null;
            }
        }
        this.m_texbinding = {};
        this.m_coltex = null;
        this.m_width = null;
        this.m_height = null;
    };
    return FrameBuffer;
}());

var GLProgram = /** @class */ (function () {
    function GLProgram(gl, program) {
        this.Attributes = {};
        this.Uniforms = {};
        this.UniformsInfo = {};
        this.UniformBlock = {};
        this.Program = program;
        var numAttrs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        for (var i = 0; i < numAttrs; i++) {
            var attrInfo = gl.getActiveAttrib(program, i);
            if (attrInfo == null)
                continue;
            var attrLoca = gl.getAttribLocation(program, attrInfo.name);
            this.Attributes[attrInfo.name] = attrLoca;
        }
        var numUniform = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (var i = 0; i < numUniform; i++) {
            var uniformInfo = gl.getActiveUniform(program, i);
            if (uniformInfo == null)
                continue;
            var uname = uniformInfo.name;
            this.UniformsInfo[uname] = uniformInfo;
            var uniformLoca = gl.getUniformLocation(program, uname);
            this.Uniforms[uname] = uniformLoca;
        }
        var numublock = gl.getProgramParameter(program, gl.ACTIVE_UNIFORM_BLOCKS);
        for (var i = 0; i < numublock; i++) {
            var ublockName = gl.getActiveUniformBlockName(program, i);
            if (ublockName != null) {
                this.UniformBlock[ublockName] = i;
            }
        }
    }
    Object.defineProperty(GLProgram.prototype, "id", {
        get: function () {
            if (this.m_id == null) {
                GLProgram.s_id++;
                this.m_id = GLProgram.s_id;
            }
            return this.m_id;
        },
        enumerable: true,
        configurable: true
    });
    GLProgram.prototype.GetUniform = function (key) {
        return this.Uniforms[key];
    };
    GLProgram.prototype.GetAttribute = function (key) {
        return this.Attributes[key];
    };
    GLProgram.s_id = 0;
    return GLProgram;
}());

var GLVertexArray = /** @class */ (function () {
    function GLVertexArray(raw) {
        this.raw = raw;
    }
    return GLVertexArray;
}());

var GLContext = /** @class */ (function () {
    function GLContext(wgl) {
        this.m_glFenceSynces = [];
        this.m_viewport = [0, 0, 0, 0];
        this.gl = wgl;
        this.viewport(0, 0, wgl.canvas.width, wgl.canvas.height);
        this.m_pipelineState = new ShaderTags();
    }
    Object.defineProperty(GLContext.prototype, "canvasWidth", {
        get: function () { return this.gl.canvas.width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLContext.prototype, "canvasHeight", {
        get: function () { return this.gl.canvas.height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLContext.prototype, "bindingFBO", {
        get: function () { return this.m_curfb; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLContext.prototype, "bindingReadFBO", {
        get: function () { return this.m_readfb; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLContext.prototype, "bindingDrawFBO", {
        get: function () { return this.m_drawfb; },
        enumerable: true,
        configurable: true
    });
    GLContext.createFromGL = function (wgl) {
        return new GLContext(wgl);
    };
    GLContext.createFromCanvas = function (canvas, attrib) {
        var g = canvas.getContext('webgl2', attrib);
        if (g == null) {
            g = canvas.getContext('webgl');
        }
        if (g == null)
            return null;
        return new GLContext(g);
    };
    GLContext.prototype.getWebGLRenderingContext = function () {
        return this.gl;
    };
    GLContext.prototype.createGLProgram = function (vsource, psource) {
        var gl = this.gl;
        var vs = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vs, vsource);
        gl.compileShader(vs);
        if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
            console.error(Utility.StrAddLineNum(vsource));
            console.error('compile vertex shader failed: ' + gl.getShaderInfoLog(vs));
            gl.deleteShader(vs);
            return null;
        }
        var ps = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(ps, psource);
        gl.compileShader(ps);
        if (!gl.getShaderParameter(ps, gl.COMPILE_STATUS)) {
            console.error(Utility.StrAddLineNum(psource));
            console.error('compile fragment shader failed: ' + gl.getShaderInfoLog(ps));
            gl.deleteShader(ps);
            return null;
        }
        var program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, ps);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(Utility.StrAddLineNum(vsource));
            console.error(Utility.StrAddLineNum(psource));
            console.error('link shader program failed!:' + gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            gl.deleteShader(vs);
            gl.deleteShader(ps);
            return null;
        }
        if (program == null)
            return null;
        var p = new GLProgram(gl, program);
        return p;
    };
    GLContext.prototype.bindGLFramebuffer = function (fb) {
        if (this.m_curfb == fb)
            return false;
        var gl = this.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, fb != null ? fb.rawobj : null);
        this.m_curfb = fb;
        return true;
    };
    GLContext.prototype.bindReadFrameBuffer = function (fb) {
        if (this.m_readfb == fb)
            return false;
        var gl = this.gl;
        gl.bindFramebuffer(gl.READ_FRAMEBUFFER, fb != null ? fb.rawobj : null);
        this.m_readfb = fb;
        return true;
    };
    GLContext.prototype.bindDrawFrameBuffer = function (fb) {
        if (this.m_drawfb == fb)
            return false;
        var gl = this.gl;
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, fb != null ? fb.rawobj : null);
        this.m_drawfb = fb;
        return true;
    };
    GLContext.prototype.blitFramebuffer = function (srcX0, srcY0, srcX1, srcY1, dstX0, dstY0, dstX1, dstY1, mask, filter) {
        var readfb = this.m_readfb;
        var drawfb = this.m_drawfb;
        if (readfb == drawfb) {
            throw new Error('blitFrameBuffer error: read/draw framebuffer are equal!');
        }
        var gl = this.gl;
        gl.blitFramebuffer(srcX0, srcY0, srcX1, srcY1, dstX0, dstY0, dstX1, dstY1, mask, filter);
    };
    GLContext.prototype.viewport = function (x, y, w, h) {
        var vp = this.m_viewport;
        if (vp[2] == w && vp[3] == h && vp[0] == x && vp[1] == y)
            return;
        var gl = this.gl;
        gl.viewport(x, y, w, h);
        vp[0] = x;
        vp[1] = y;
        vp[2] = w;
        vp[3] = h;
    };
    GLContext.prototype.colorMask = function (red, green, blue, alpha) {
        this.gl.colorMask(red, green, blue, alpha);
    };
    GLContext.prototype.colorEnable = function (enable) {
        this.gl.colorMask(enable, enable, enable, enable);
    };
    GLContext.prototype.useProgram = function (program) {
        this.gl.useProgram(program);
    };
    GLContext.prototype.useGLProgram = function (program) {
        this.gl.useProgram(program.Program);
    };
    GLContext.prototype.uniformBlockBinding = function (program, uniformBlockIndex, uniformBlockBinding) {
        this.gl.uniformBlockBinding(program, uniformBlockIndex, uniformBlockBinding);
    };
    GLContext.prototype.createBuffer = function () {
        return this.gl.createBuffer();
    };
    GLContext.prototype.deleteBuffer = function (buffer) {
        this.gl.deleteBuffer(buffer);
    };
    GLContext.prototype.createBufferAndBind = function (target) {
        var gl = this.gl;
        var buffer = gl.createBuffer();
        gl.bindBuffer(target, buffer);
        return buffer;
    };
    GLContext.prototype.bindBuffer = function (target, buffer) {
        this.gl.bindBuffer(target, buffer);
    };
    GLContext.prototype.bufferData = function (target, sizeOrData, usage) {
        this.gl.bufferData(target, sizeOrData, usage);
    };
    GLContext.prototype.fenceSync = function (condition, flags) {
        return this.gl.fenceSync(condition, flags);
    };
    GLContext.prototype.isSync = function (sync) {
        return this.gl.isSync(sync);
    };
    GLContext.prototype.deleteSync = function (sync) {
        this.gl.deleteSync(sync);
    };
    GLContext.prototype.clientWaitSync = function (sync, flags, timeout) {
        return this.gl.clientWaitSync(sync, flags, timeout);
    };
    GLContext.prototype.waitSync = function (sync, flags, timeout) {
        this.gl.waitSync(sync, flags, timeout);
    };
    GLContext.prototype.getSyncParameter = function (sync, pname) {
        return this.gl.getSyncParameter(sync, pname);
    };
    GLContext.prototype.deleteTexture = function (texture) {
        this.gl.deleteTexture(texture);
    };
    GLContext.prototype.createTexture = function () {
        return this.gl.createTexture();
    };
    GLContext.prototype.createVertexArray = function () {
        return this.gl.createVertexArray();
    };
    GLContext.prototype.createGLVertexArray = function () {
        return new GLVertexArray(this.createVertexArray());
    };
    GLContext.prototype.deleteVertexArray = function (vertexArray) {
        this.gl.deleteVertexArray(vertexArray);
    };
    GLContext.prototype.deleteGLVertexArray = function (va) {
        if (va != null && va.raw != null) {
            this.deleteVertexArray(va.raw);
        }
    };
    GLContext.prototype.isVertexArray = function (vertexArray) {
        return this.gl.isVertexArray(vertexArray);
    };
    GLContext.prototype.bindVertexArray = function (array) {
        this.gl.bindVertexArray(array);
    };
    GLContext.prototype.bindGLVertexArray = function (va) {
        this.gl.bindVertexArray(va == null ? null : va.raw);
    };
    GLContext.prototype.depthFunc = function (func) {
        var state = this.m_pipelineState;
        if (state.ztest == func)
            return;
        state.ztest = func;
        this.gl.depthFunc(func);
    };
    GLContext.prototype.depthMask = function (flag) {
        var state = this.m_pipelineState;
        if (state.zwrite == flag)
            return;
        state.zwrite = flag;
        this.gl.depthMask(flag);
    };
    GLContext.prototype.depthRange = function (zNear, zFar) {
        this.gl.depthRange(zNear, zFar);
    };
    GLContext.prototype.enable = function (cap) {
        this.gl.enable(cap);
    };
    GLContext.prototype.disable = function (cap) {
        this.gl.disable(cap);
    };
    GLContext.prototype.pipelineBlend = function (enable) {
        var state = this.m_pipelineState;
        if (state.blend == enable)
            return;
        state.blend = enable;
        if (enable) {
            this.gl.enable(GL.BLEND);
        }
        else {
            this.gl.disable(GL.BLEND);
        }
    };
    GLContext.prototype.pipelineBlendParam = function (op, srcfactor, dstfactor) {
        var gl = this.gl;
        var state = this.m_pipelineState;
        if (state.blendOp != op) {
            gl.blendEquation(op);
            state.blendOp = op;
        }
        if (state.blendFactorSrc != srcfactor || state.blendFactorDst != dstfactor) {
            gl.blendFunc(srcfactor, dstfactor);
            state.blendFactorDst = dstfactor;
            state.blendFactorSrc = srcfactor;
        }
    };
    GLContext.prototype.cullFace = function (mode) {
        var state = this.m_pipelineState;
        if (state.culling == mode)
            return;
        state.culling = mode;
        this.gl.cullFace(mode);
    };
    GLContext.prototype.pipelineState = function (tag) {
        if (tag == null)
            return;
        if (tag.ztest != null)
            this.depthFunc(tag.ztest);
        if (tag.zwrite != null)
            this.depthMask(tag.zwrite);
        var blend = tag.blend;
        if (blend != null) {
            this.pipelineBlend(blend);
            if (blend) {
                this.pipelineBlendParam(tag.blendOp, tag.blendFactorSrc, tag.blendFactorDst);
            }
        }
        if (tag.culling != null) {
            this.cullFace(tag.culling);
        }
    };
    Object.defineProperty(GLContext.prototype, "currentPipelineState", {
        get: function () {
            return this.m_pipelineState.clone();
        },
        enumerable: true,
        configurable: true
    });
    GLContext.prototype.clear = function (mask) {
        this.gl.clear(mask);
    };
    GLContext.prototype.clearColor = function (r, g, b, a) {
        this.gl.clearColor(r, g, b, a);
    };
    GLContext.prototype.clearColorAry = function (raw) {
        this.gl.clearColor(raw[0], raw[1], raw[2], raw[3]);
    };
    GLContext.prototype.clearDepth = function (depth) {
        if (this.m_clearDepth == depth)
            return;
        this.gl.clearDepth(depth);
        this.m_clearDepth = depth;
    };
    GLContext.prototype.registFenceSync = function (fs) {
        this.m_glFenceSynces.push(fs);
    };
    GLContext.prototype.unregistFenceSync = function (fs) {
        var syncs = this.m_glFenceSynces;
        var index = syncs.indexOf(fs);
        if (index >= 0) {
            syncs.splice(index, 1);
            return true;
        }
        return false;
    };
    GLContext.prototype.checkAllFenceSync = function () {
        var syncs = this.m_glFenceSynces;
        var len = syncs.length;
        if (len == 0)
            return;
        var remains = [];
        var changed = false;
        for (var t = 0; t < len; t++) {
            var s = syncs[t];
            if (!s.checkSignaled(true)) {
                changed = true;
                remains.push(s);
            }
        }
        if (changed) {
            this.m_glFenceSynces = remains;
        }
    };
    GLContext.prototype.bindBufferBase = function (target, index, buffer) {
        this.gl.bindBufferBase(target, index, buffer);
    };
    GLContext.prototype.bindBufferRange = function (target, index, buffer, offset, size) {
        this.gl.bindBufferRange(target, index, buffer, offset, size);
    };
    GLContext.prototype.drawElementIndices = function (desc) {
        this.gl.drawElements(desc.topology, desc.indiceCount, desc.type, desc.offset);
    };
    GLContext.prototype.drawElements = function (mode, count, type, offset) {
        this.gl.drawElements(mode, count, type, offset);
    };
    GLContext.prototype.polygonOffset = function (factor, units) {
        this.gl.polygonOffset(factor, units);
    };
    //texture
    GLContext.prototype.activeTexture = function (texture) {
        this.gl.activeTexture(texture);
    };
    GLContext.prototype.bindTexture = function (target, tex) {
        this.gl.bindTexture(target, tex);
    };
    GLContext.prototype.texStorage2D = function (target, level, format, width, height) {
        this.gl.texStorage2D(target, level, format, width, height);
    };
    GLContext.prototype.texImage2D = function (target, level, internalfmt, width, height, border, format, type, pixels) {
        this.gl.texImage2D(target, level, internalfmt, width, height, border, format, type, pixels);
    };
    GLContext.prototype.texParameteri = function (target, pname, param) {
        this.gl.texParameteri(target, pname, param);
    };
    GLContext.prototype.texParameterf = function (target, pname, param) {
        this.gl.texParameterf(target, pname, param);
    };
    GLContext.prototype.generateMipmap = function (target) {
        this.gl.generateMipmap(target);
    };
    GLContext.prototype.createShader = function (type) {
        return this.gl.createShader(type);
    };
    GLContext.prototype.shaderSource = function (shader, source) {
        this.gl.shaderSource(shader, source);
    };
    GLContext.prototype.compileShader = function (shader) {
        this.gl.compileShader(shader);
    };
    GLContext.prototype.getShaderParameter = function (shader, type) {
        this.gl.getShaderParameter(shader, type);
    };
    GLContext.prototype.getShaderInfoLog = function (shader) {
        this.gl.getShaderInfoLog(shader);
    };
    GLContext.prototype.deleteShader = function (shader) {
        this.gl.deleteShader(shader);
    };
    GLContext.prototype.createProgram = function () {
        return this.gl.createProgram();
    };
    GLContext.prototype.attachShader = function (program, shader) {
        this.gl.attachShader(program, shader);
    };
    GLContext.prototype.linkProgram = function (program) {
        this.gl.linkProgram(program);
    };
    GLContext.prototype.getProgramParameter = function (program, target) {
        return this.gl.getProgramParameter(program, target);
    };
    GLContext.prototype.getProgramInfoLog = function (program) {
        return this.gl.getProgramInfoLog(program);
    };
    GLContext.prototype.deleteProgram = function (program) {
        this.gl.deleteProgram(program);
    };
    GLContext.prototype.createFramebuffer = function () {
        return this.gl.createFramebuffer();
    };
    GLContext.prototype.deleteFramebuffer = function (fb) {
        this.gl.deleteFramebuffer(fb);
    };
    GLContext.prototype.framebufferTexture2D = function (target, attachment, textarget, texture, level) {
        this.gl.framebufferTexture2D(target, attachment, textarget, texture, level);
    };
    GLContext.prototype.bindFramebuffer = function (target, fb) {
        this.gl.bindFramebuffer(target, fb);
    };
    GLContext.prototype.frontFace = function (mode) {
        this.gl.frontFace(mode);
    };
    GLContext.prototype.vertexAttribPointer = function (index, size, type, normalized, stride, offset) {
        this.gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
    };
    GLContext.prototype.enableVertexAttribArray = function (index) {
        this.gl.enableVertexAttribArray(index);
    };
    GLContext.prototype.uniform1f = function (loc, x) {
        this.gl.uniform1f(loc, x);
    };
    GLContext.prototype.uniform1i = function (loc, x) {
        this.gl.uniform1i(loc, x);
    };
    GLContext.prototype.uniform1ui = function (loc, x) {
        this.gl.uniform1ui(loc, x);
    };
    GLContext.prototype.uniform1iv = function (loc, data, srcOffset, srcLength) {
        this.gl.uniform1iv(loc, data, srcOffset, srcLength);
    };
    GLContext.prototype.uniform1fv = function (loc, data, srcOffset, srcLength) {
        this.gl.uniform1fv(loc, data, srcOffset, srcLength);
    };
    GLContext.prototype.uniform1uiv = function (loc, data, srcOffset, srcLength) {
        this.gl.uniform1uiv(loc, data, srcOffset, srcLength);
    };
    GLContext.prototype.uniform2f = function (loc, x, y) {
        this.gl.uniform2f(loc, x, y);
    };
    GLContext.prototype.uniform2i = function (loc, x, y) {
        this.gl.uniform2i(loc, x, y);
    };
    GLContext.prototype.uniform2ui = function (loc, x, y) {
        this.gl.uniform2ui(loc, x, y);
    };
    GLContext.prototype.uniform2iv = function (loc, data, srcOffset, srcLength) {
        this.gl.uniform2iv(loc, data, srcOffset, srcLength);
    };
    GLContext.prototype.uniform2fv = function (loc, data, srcOffset, srcLength) {
        this.gl.uniform1fv(loc, data, srcOffset, srcLength);
    };
    GLContext.prototype.uniform2uiv = function (loc, data, srcOffset, srcLength) {
        this.gl.uniform2uiv(loc, data, srcOffset, srcLength);
    };
    GLContext.prototype.uniform3f = function (loc, x, y, z) {
        this.gl.uniform3f(loc, x, y, z);
    };
    GLContext.prototype.uniform3i = function (loc, x, y, z) {
        this.gl.uniform3i(loc, x, y, z);
    };
    GLContext.prototype.uniform3ui = function (loc, x, y, z) {
        this.gl.uniform3ui(loc, x, y, z);
    };
    GLContext.prototype.uniform3iv = function (loc, data, srcOffset, srcLength) {
        this.gl.uniform3iv(loc, data, srcOffset, srcLength);
    };
    GLContext.prototype.uniform3fv = function (loc, data, srcOffset, srcLength) {
        this.gl.uniform3fv(loc, data, srcOffset, srcLength);
    };
    GLContext.prototype.uniform3uiv = function (loc, data, srcOffset, srcLength) {
        this.gl.uniform3uiv(loc, data, srcOffset, srcLength);
    };
    GLContext.prototype.uniform4f = function (loc, x, y, z, w) {
        this.gl.uniform4f(loc, x, y, z, w);
    };
    GLContext.prototype.uniform4i = function (loc, x, y, z, w) {
        this.gl.uniform4i(loc, x, y, z, w);
    };
    GLContext.prototype.uniform4ui = function (loc, x, y, z, w) {
        this.gl.uniform4ui(loc, x, y, z, w);
    };
    GLContext.prototype.uniform4iv = function (loc, data, srcOffset, srcLength) {
        this.gl.uniform4iv(loc, data, srcOffset, srcLength);
    };
    GLContext.prototype.uniform4fv = function (loc, data, srcOffset, srcLength) {
        this.gl.uniform4fv(loc, data, srcOffset, srcLength);
    };
    GLContext.prototype.uniform4uiv = function (loc, data, srcOffset, srcLength) {
        this.gl.uniform4uiv(loc, data, srcOffset, srcLength);
    };
    GLContext.prototype.uniformMatrix4fv = function (location, transpose, data, srcOffset, srcLength) {
        this.gl.uniformMatrix4fv(location, transpose, data, srcOffset, srcLength);
    };
    GLContext.prototype.bindSampler = function (unit, sampler) {
        this.gl.bindSampler(unit, sampler);
    };
    GLContext.prototype.readPixels = function (x, y, width, height, format, type, dstData) {
        this.gl.readPixels(x, y, width, height, format, type, dstData);
    };
    GLContext.prototype.getBufferSubData = function (target, srcByteOffset, dstBuffer, dstOffset, length) {
        this.gl.getBufferSubData(target, srcByteOffset, dstBuffer, dstOffset, length);
    };
    return GLContext;
}());

/**
 * Wrapper of WebGLSync object and gl.fenceSync.
 */
var GLFenceSync = /** @class */ (function () {
    /**
     *
     * @param glctx
     * @param autoCheckEmit GLContext will check fenceSyncStatus and emit callback when GLCtx call @function <checkAllFenceSync>
     */
    function GLFenceSync(glctx, autoCheckEmit) {
        if (autoCheckEmit === void 0) { autoCheckEmit = false; }
        this.m_signaled = false;
        this.m_released = false;
        this.glctx = glctx;
        this.m_autoCheck = autoCheckEmit;
    }
    Object.defineProperty(GLFenceSync.prototype, "pending", {
        get: function () {
            return this.m_callback != null;
        },
        enumerable: true,
        configurable: true
    });
    GLFenceSync.prototype.emit = function (onsignaled) {
        if (this.m_released)
            throw new Error('glFenceSync has beend releasd!');
        if (onsignaled == null)
            throw new Error('sync callback must not be error.');
        if (this.m_callback != null) {
            console.error("emit must wait until previous sync signaled.");
            return;
        }
        this.m_callback = onsignaled;
        this.m_signaled = false;
        this.m_syncObj = this.glctx.fenceSync(GL.SYNC_GPU_COMMANDS_COMPLETE, 0);
        if (this.m_autoCheck) {
            //register autocheck
            this.glctx.registFenceSync(this);
        }
    };
    GLFenceSync.prototype.release = function () {
        if (this.m_released)
            return;
        var glctx = this.glctx;
        if (this.m_syncObj != null) {
            glctx.unregistFenceSync(this);
            glctx.deleteSync(this.m_syncObj);
            this.m_syncObj = null;
        }
        this.glctx = null;
        this.m_callback = null;
        this.m_released = true;
    };
    GLFenceSync.prototype.checkSignaled = function (autoEmitCallback) {
        if (autoEmitCallback === void 0) { autoEmitCallback = true; }
        var sync = this.m_syncObj;
        if (sync == null)
            return this.m_signaled;
        var glctx = this.glctx;
        var status = glctx.getSyncParameter(sync, GL.SYNC_STATUS);
        if (status == GL.SIGNALED) {
            glctx.deleteSync(sync);
            this.m_syncObj = null;
            this.m_signaled = true;
            if (autoEmitCallback) {
                this.m_callback();
                this.m_callback = null;
            }
            if (this.m_autoCheck) {
                glctx.unregistFenceSync(this);
            }
        }
        return this.m_signaled;
    };
    return GLFenceSync;
}());

var GLPixelPack = /** @class */ (function () {
    function GLPixelPack(glctx, buffersize, dynamic) {
        if (dynamic === void 0) { dynamic = true; }
        var pb = glctx.createBuffer();
        glctx.bindBuffer(GL.PIXEL_PACK_BUFFER, pb);
        glctx.bufferData(GL.PIXEL_PACK_BUFFER, buffersize, dynamic ? GL.DYNAMIC_READ : GL.STATIC_READ);
        glctx.bindBuffer(GL.PIXEL_PACK_BUFFER, null);
        this.m_pb = pb;
        this.glctx = glctx;
    }
    GLPixelPack.prototype.release = function () {
        var glctx = this.glctx;
        if (glctx == null)
            return;
        if (this.m_pb != null) {
            glctx.deleteBuffer(this.m_pb);
            this.m_pb = null;
        }
        this.glctx = null;
    };
    GLPixelPack.prototype.readPixelsSync = function (rect, format, type, dstbuffer, dstoffset, length) {
        if (dstoffset === void 0) { dstoffset = 0; }
        var pb = this.m_pb;
        var glctx = this.glctx;
        glctx.bindBuffer(GL.PIXEL_PACK_BUFFER, pb);
        glctx.readPixels(rect.x, rect.y, rect.z, rect.w, format, type, 0);
        glctx.getBufferSubData(GL.PIXEL_PACK_BUFFER, 0, dstbuffer, dstoffset, length);
        glctx.bindBuffer(GL.PIXEL_PACK_BUFFER, null);
    };
    GLPixelPack.prototype.readPixelsAsync = function (rect, format, type, dstbuffer, cb, dstoffset, length) {
        if (dstoffset === void 0) { dstoffset = 0; }
        var sync = this.m_sync;
        if (this.m_sync == null) {
            sync = new GLFenceSync(this.glctx, true);
            this.m_sync = sync;
        }
        else {
            if (sync.pending) {
                console.error("previous async readPixels operation is not finished, skip new operations");
                return;
            }
        }
        var pb = this.m_pb;
        var glctx = this.glctx;
        glctx.bindBuffer(GL.PIXEL_PACK_BUFFER, pb);
        glctx.readPixels(rect.x, rect.y, rect.z, rect.w, format, type, 0);
        sync.emit(function () {
            glctx.bindBuffer(GL.PIXEL_PACK_BUFFER, pb);
            glctx.getBufferSubData(GL.PIXEL_PACK_BUFFER, 0, dstbuffer, dstoffset, length);
            glctx.bindBuffer(GL.PIXEL_PACK_BUFFER, null);
            cb(dstbuffer);
        });
    };
    return GLPixelPack;
}());

var __awaiter$5 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$5 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var GLTFaccessor = /** @class */ (function () {
    function GLTFaccessor() {
        this.byteOffset = 0;
        this.normalized = false;
    }
    return GLTFaccessor;
}());
var GLTFanimation = /** @class */ (function () {
    function GLTFanimation() {
    }
    return GLTFanimation;
}());
var GLTFanimationSampler = /** @class */ (function () {
    function GLTFanimationSampler() {
        this.interpolation = "LINEAR";
    }
    return GLTFanimationSampler;
}());
var GLTFasset = /** @class */ (function () {
    function GLTFasset() {
    }
    return GLTFasset;
}());
var GLTFbuffer = /** @class */ (function () {
    function GLTFbuffer() {
    }
    return GLTFbuffer;
}());
var GLTFbufferView = /** @class */ (function () {
    function GLTFbufferView() {
        this.byteOffset = 0;
    }
    return GLTFbufferView;
}());
var GLTFcamera = /** @class */ (function () {
    function GLTFcamera() {
    }
    return GLTFcamera;
}());
var GLTFchannel = /** @class */ (function () {
    function GLTFchannel() {
    }
    return GLTFchannel;
}());
var GLTFimage = /** @class */ (function () {
    function GLTFimage() {
    }
    return GLTFimage;
}());
var GLTFindices = /** @class */ (function () {
    function GLTFindices() {
        this.byteOffset = 0;
    }
    return GLTFindices;
}());
var GLTFmaterial = /** @class */ (function () {
    function GLTFmaterial() {
        this.emissiveFactor = [0, 0, 0];
        this.alphaMode = "OPAQUE";
        this.doubleSided = false;
    }
    return GLTFmaterial;
}());
var GLTFmesh = /** @class */ (function () {
    function GLTFmesh() {
    }
    return GLTFmesh;
}());
var GLTFnode = /** @class */ (function () {
    function GLTFnode() {
        this.matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        this.rotation = [0, 0, 0, 1];
        this.scale = [1, 1, 1];
        this.translation = [0, 0, 0];
    }
    return GLTFnode;
}());
var GLTFnormalTextureInfo = /** @class */ (function () {
    function GLTFnormalTextureInfo() {
        this.texCoord = 0;
        this.scale = 1;
    }
    return GLTFnormalTextureInfo;
}());
var GLTFocclusionTextureInfo = /** @class */ (function () {
    function GLTFocclusionTextureInfo() {
        this.texCoord = 0;
        this.strength = 1;
    }
    return GLTFocclusionTextureInfo;
}());
var GLTForthographic = /** @class */ (function () {
    function GLTForthographic() {
    }
    return GLTForthographic;
}());
var GLTFpbrMetallicRoughness = /** @class */ (function () {
    function GLTFpbrMetallicRoughness() {
        this.baseColorFactor = [1, 1, 1, 1];
        this.metallicFactor = 1;
        this.roughnessFactor = 1;
    }
    return GLTFpbrMetallicRoughness;
}());
var GLTFperspective = /** @class */ (function () {
    function GLTFperspective() {
    }
    return GLTFperspective;
}());
var GLTFprimitive = /** @class */ (function () {
    function GLTFprimitive() {
        this.mode = 4;
    }
    return GLTFprimitive;
}());
var GLTFsampler = /** @class */ (function () {
    function GLTFsampler() {
        this.wrapS = 10497;
        this.wrapT = 10497;
    }
    return GLTFsampler;
}());
var GLTFscene = /** @class */ (function () {
    function GLTFscene() {
    }
    return GLTFscene;
}());
var GLTFskin = /** @class */ (function () {
    function GLTFskin() {
    }
    return GLTFskin;
}());
var GLTFsparse = /** @class */ (function () {
    function GLTFsparse() {
    }
    return GLTFsparse;
}());
var GLTFtarget = /** @class */ (function () {
    function GLTFtarget() {
    }
    return GLTFtarget;
}());
var GLTFtexture = /** @class */ (function () {
    function GLTFtexture() {
    }
    return GLTFtexture;
}());
var GLTFtextureInfo = /** @class */ (function () {
    function GLTFtextureInfo() {
        this.texCoord = 0;
    }
    return GLTFtextureInfo;
}());
var GLTFvalues = /** @class */ (function () {
    function GLTFvalues() {
        this.byteOffset = 0;
    }
    return GLTFvalues;
}());
var GLTFfile = /** @class */ (function () {
    function GLTFfile() {
    }
    return GLTFfile;
}());
var GLTFdata = /** @class */ (function () {
    function GLTFdata() {
    }
    return GLTFdata;
}());
var GLTFbinary = /** @class */ (function () {
    function GLTFbinary() {
    }
    GLTFbinary.fromBuffer = function (arybuffer) {
        var dataview = new DataView(arybuffer, 0, arybuffer.byteLength);
        var pos = 0;
        var magic = dataview.getUint32(0, true);
        if (magic != 0x46546C67)
            return undefined;
        var data = new GLTFdata();
        pos += 4;
        var version = dataview.getUint32(pos, true);
        pos += 4;
        var length = dataview.getUint32(pos);
        pos += 4;
        pos = this.parseChunk(data, dataview, pos);
        pos = this.parseChunk(data, dataview, pos);
        return data;
    };
    GLTFbinary.parseChunk = function (data, dataview, pos) {
        var chunkLen = dataview.getUint32(pos, true);
        pos += 4;
        var chunkType = dataview.getUint32(pos, true);
        pos += 4;
        var start = pos;
        if (chunkType == 0x4E4F534A) {
            var jsonstr = String.fromCharCode.apply(null, Array.from(new Uint8Array(dataview.buffer, start, chunkLen)));
            data.gltf = JSON.parse(jsonstr);
        }
        else if (chunkType == 0x004E4942) {
            var binary = dataview.buffer.slice(start, start + chunkLen);
            data.rawBinary = binary;
        }
        else {
            throw new Error("unknown chunk. ");
        }
        pos += chunkLen;
        return pos;
    };
    return GLTFbinary;
}());
var GLTFtool = /** @class */ (function () {
    function GLTFtool() {
    }
    GLTFtool.LoadGLTF = function (json, bin, images) {
        return __awaiter$5(this, void 0, void 0, function () {
            return __generator$5(this, function (_a) {
                return [2 /*return*/, new Promise(function (res, rej) {
                    })];
            });
        });
    };
    GLTFtool.LoadGLTFBinary = function (uri) {
        return __awaiter$5(this, void 0, void 0, function () {
            return __generator$5(this, function (_a) {
                return [2 /*return*/, new Promise(function (res, rej) {
                        var buffer = GLUtility.HttpGet(uri, "arraybuffer");
                        buffer.then(function (result) {
                            res(GLTFbinary.fromBuffer(result));
                        }, function (err) {
                            rej("load failed");
                        });
                    })];
            });
        });
    };
    return GLTFtool;
}());

var RenderTexture = /** @class */ (function () {
    function RenderTexture() {
    }
    RenderTexture.prototype.getDesc = function () {
        return this.m_desc;
    };
    RenderTexture.prototype.getRawTexture = function () {
        return this.m_rawtex;
    };
    Object.defineProperty(RenderTexture.prototype, "internalFB", {
        get: function () {
            return this.m_fb;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @TODO this may need trefactoring
     * @param glctx
     * @param width
     * @param height
     */
    RenderTexture.prototype.resize = function (glctx, width, height) {
        if (this.m_fb.resize(glctx, width, height)) {
            this.m_rawtex = this.internalGetFBtex(TextureDescUtility.getTexFmtType(this.m_desc.internalformat));
        }
    };
    RenderTexture.prototype.internalGetFBtex = function (type) {
        var fb = this.m_fb;
        if (type == TextureType.Color) {
            return fb.coltex;
        }
        return fb.depthtex;
    };
    RenderTexture.create = function (glctx, width, height, desc) {
        var internalfmt = desc.internalformat;
        var texfmt = TextureDescUtility.getTexFmtType(desc.internalformat);
        var fbdesc = {};
        switch (texfmt) {
            case TextureType.Color:
                fbdesc.colFmt = internalfmt;
                break;
            case TextureType.Depth:
                fbdesc.depthFmt = internalfmt;
                break;
            case TextureType.DepthStencil:
                fbdesc.depthstencilFmt = internalfmt;
                break;
        }
        var fb = FrameBuffer.create(glctx, width, height, fbdesc);
        var rt = new RenderTexture();
        rt.m_fb = fb;
        rt.m_desc = desc;
        rt.m_valid = true;
        rt.m_rawtex = rt.internalGetFBtex(texfmt);
        return rt;
    };
    RenderTexture.prototype.release = function (glctx) {
        this.m_rawtex = null;
        this.m_fb.release(glctx);
        this.m_fb = null;
        this.m_valid = false;
    };
    return RenderTexture;
}());

var BufferDebugInfo = /** @class */ (function () {
    function BufferDebugInfo(texture, rect) {
        this.m_texture = texture;
        this.drawRect = rect.clone();
    }
    Object.defineProperty(BufferDebugInfo.prototype, "rawTexture", {
        get: function () {
            var tex = this.m_texture;
            if (tex instanceof Texture2D) {
                return tex.getRawTexture();
            }
            else if (tex instanceof RenderTexture) {
                return tex.getRawTexture();
            }
            return this.m_texture;
        },
        enumerable: true,
        configurable: true
    });
    BufferDebugInfo.prototype.setTexture = function (tex) {
        this.m_texture = tex;
    };
    return BufferDebugInfo;
}());

var RenderPass = /** @class */ (function () {
    function RenderPass(pipeline) {
        this.pipeline = pipeline;
    }
    RenderPass.prototype.render = function (scene) {
    };
    RenderPass.prototype.release = function () {
        this.pipeline = null;
    };
    RenderPass.Release = function (pass) {
        if (pass == null)
            return;
        pass.release();
        return null;
    };
    return RenderPass;
}());

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PassDebug = /** @class */ (function (_super) {
    __extends$1(PassDebug, _super);
    function PassDebug() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PassDebug.prototype.render = function (scene) {
        var model = this.pipeline.model;
        var debugInfo = model.bufferDebugInfo;
        var glctx = this.pipeline.glctx;
        if (debugInfo == null || debugInfo.length == 0)
            return;
        glctx.bindGLFramebuffer(this.pipeline.mainFrameBuffer);
        for (var i = 0, len = debugInfo.length; i < len; i++) {
            var info = debugInfo[i];
            var rawtex = info.rawTexture;
            if (rawtex != null) {
                model.drawsScreenTex(rawtex, info.drawRect);
            }
        }
    };
    return PassDebug;
}(RenderPass));

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Pre-rendering Depth Pass
 */
var PassDepth = /** @class */ (function (_super) {
    __extends$2(PassDepth, _super);
    function PassDepth(pipeline) {
        return _super.call(this, pipeline) || this;
        // let deftags = new ShaderTags();
        // deftags.blendOp = null;
        // deftags.blend = false;
        // deftags.zwrite = true;
        // deftags.ztest = Comparison.LEQUAL;
        // deftags.culling = CullingMode.Back;
        // deftags.fillDefaultVal();
        // this.m_tags =deftags;
        // let shader = pipeline.graphicRender.shaderLib.shaderDepth;
        // this.m_program = shader.defaultProgram;
        // //debug depth texture
        // let debuginfo = new BufferDebugInfo(pipeline.depthRT,glmath.vec4(0,0,200,200));
        // this.m_bufferDebugInfo = debuginfo;
        // pipeline.addBufferDebugInfo(debuginfo);
    }
    PassDepth.prototype.render = function (scene) {
        // const CLASS = PipelineBase;
        // const pipe = this.pipeline;
        // const gl = pipe.GL;
        // const glctx = pipe.GLCtx;
        // const deftags = this.m_tags;
        // const NAME_BASIS = ShaderFX.UNIFORM_BASIS;
        // const NAME_OBJ = ShaderFX.UNIFORM_OBJ;
        // let cam = scene.mainCamera;
        // let nodelist = pipe.nodeList;
        // if(nodelist == null) return;
        // let queue = nodelist.nodeOpaque;
        // if(queue.length == 0) return;
        // //diable color buffer
        // glctx.colorEnable(false);
        // //state
        // let state =pipe.stateCache;
        // state.reset(deftags);
        // pipe.activeDefaultTexture();
        // //do draw
        // let len = queue.length;
        // let program = this.m_program;
        // let glp = program.Program;
        // glctx.useGLProgram(program);
        // let ublock = program.UniformBlock;
        // let indexCam = ublock[NAME_BASIS];
        // glctx.uniformBlockBinding(glp, indexCam, CLASS.UNIFORMINDEX_BASIS);
        // let indexObj = ublock[NAME_OBJ];
        // glctx.uniformBlockBinding(glp, indexObj, CLASS.UNIFORMINDEX_OBJ);
        // const dataobj = pipe.shaderDataObj;
        // for(let i=0;i<len;i++){
        //     let node = queue[i];
        //     if(node instanceof MeshRender){
        //         let mat = node.material;
        //         let mesh = node.mesh;
        //         node.refreshData(glctx);
        //         dataobj.setMtxModel(node.object.transform.objMatrix);
        //         pipe.updateUniformBufferObject(dataobj);
        //         node.bindVertexArray(glctx);
        //         let indicedesc = mesh.indiceDesc;
        //         gl.drawElements(indicedesc.topology, indicedesc.indiceCount,indicedesc.type, indicedesc.offset);
        //         node.unbindVertexArray(glctx);
        //         mat.clean(gl);
        //     }
        // }
        // glctx.colorEnable(true);
        // //copy depth buffer to seperated depth texture
        // let mainfb = pipe.mainFrameBuffer;
        // glctx.bindReadFrameBuffer(mainfb);
        // glctx.bindDrawFrameBuffer(pipe.depthRT.internalFB);
        // let w = mainfb.width;
        // let h = mainfb.height;
        // glctx.blitFramebuffer(0,0,w,h,0,0,w,h,gl.DEPTH_BUFFER_BIT,gl.NEAREST);
        // glctx.bindReadFrameBuffer(null);
        // glctx.bindDrawFrameBuffer(null);
        // pipe.bindTargetFrameBuffer(true,false);
        // this.m_bufferDebugInfo.setTexture(pipe.depthRT.getRawTexture()); 
    };
    return PassDepth;
}(RenderPass));

var MaterialPorpertyBlock = /** @class */ (function () {
    function MaterialPorpertyBlock(program) {
        if (program == null)
            return;
        if (this.uniforms == null) {
            this.uniforms = {};
        }
        this.setProgram(program);
    }
    MaterialPorpertyBlock.prototype.setProgram = function (program) {
        if (program == this.m_program)
            return;
        if (this.m_program == null) {
            var uinfo_1 = program.UniformsInfo;
            var selfu_1 = this.uniforms;
            for (var uname in uinfo_1) {
                var info = uinfo_1[uname];
                selfu_1[uname] = { type: info.type, value: null };
            }
            this.m_program = program;
            return;
        }
        var uinfo = program.UniformsInfo;
        var selfu = this.uniforms;
        for (var key in selfu) {
            if (uinfo[key] == null) {
                delete selfu[key];
            }
        }
        for (var key in uinfo) {
            var u = selfu[key];
            var up = uinfo[key];
            if (u == null) {
                selfu[key] = { type: up.type, value: null };
            }
            else {
                if (u.type != up.type) {
                    u.type = up.type;
                    u.value = null;
                    //TODO this can be optimized by checking if old value is compatible with new uniform type.
                    //(e.g., Texture object wrap with TEXTURE_CUBE and TEXTURE_2D)
                }
            }
        }
        //sync uniformblocks
        var selfprogrm = this.m_program;
        var selfBlock = this.uniformsBlock;
        var uniformBlock = program.UniformBlock;
        var newblocks = null;
        if (selfBlock != null) {
            for (var slot in selfBlock) {
                var slotindex = selfBlock[slot];
                var blockname = Material.programGetUniformBlockName(selfprogrm, slotindex);
                if (blockname == null)
                    continue;
                var newindex = uniformBlock[blockname];
                if (newindex == null)
                    continue;
                delete selfBlock[slot];
                selfBlock[newindex] = slotindex;
            }
        }
        for (var bname in uniformBlock) {
            if (ShaderFX.isInternalUniformBlockName(bname))
                continue;
            var info = selfprogrm.UniformBlock[bname];
            if (info != null) {
                newblocks[uniformBlock[bname]] = selfBlock[info];
            }
            else {
                newblocks[uniformBlock[bname]] = null;
            }
        }
        this.uniformsBlock = newblocks;
        //sync program
        this.m_program = program;
    };
    MaterialPorpertyBlock.prototype.clone = function () {
        var block = new MaterialPorpertyBlock(null);
        block.m_program = this.m_program;
        block.uniforms = Utility.cloneMap(this.uniforms, function (p) {
            return {
                type: p.type,
                value: p.value,
                extra: p.extra
            };
        });
        return block;
    };
    MaterialPorpertyBlock.prototype.getUniform = function (name) {
        return this.uniforms[name];
    };
    MaterialPorpertyBlock.prototype.release = function () {
        this.m_program = null;
        this.uniforms = null;
    };
    return MaterialPorpertyBlock;
}());
var Material = /** @class */ (function () {
    function Material(shader) {
        this.m_useVariants = false;
        this.m_shadertags = null;
        this.m_applyTexCount = 0;
        if (shader == null) {
            return;
        }
        this.m_shader = shader;
        this.m_program = shader.defaultProgram;
        this.m_optConfig = shader.m_defaultOptionsConfig;
        this.m_propertyBlock = new MaterialPorpertyBlock(this.m_program);
    }
    Object.defineProperty(Material.prototype, "program", {
        get: function () {
            if (this.m_program == null) {
                var newprogram = this.m_shader.getVariantProgram(this.m_optConfig);
                this.m_propertyBlock.setProgram(newprogram);
                this.m_program = newprogram;
            }
            return this.m_program;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "shaderTags", {
        get: function () {
            if (this.m_shadertags == null)
                return this.m_shader.tags;
            return this.m_shadertags;
        },
        set: function (tags) {
            this.m_shadertags = tags;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "propertyBlock", {
        get: function () {
            return this.m_propertyBlock;
        },
        enumerable: true,
        configurable: true
    });
    Material.prototype.setShader = function (shader) {
        this.m_shader = shader;
        this.m_program = null;
        this.m_useVariants = false;
    };
    Material.prototype.clone = function () {
        var mat = new Material();
        mat.m_shader = this.m_shader;
        mat.m_program = this.program;
        mat.m_propertyBlock = this.m_propertyBlock.clone();
        mat.m_useVariants = this.m_useVariants;
        mat.m_optConfig = this.m_optConfig.clone();
        return mat;
    };
    Material.prototype.setColor = function (name, color) {
        var p = this.m_propertyBlock.getUniform(name);
        if (p == null)
            return;
        p.value = color;
    };
    Material.prototype.setTexture = function (name, tex) {
        var p = this.m_propertyBlock.getUniform(name);
        if (p == null)
            return;
        p.value = tex;
    };
    Material.prototype.setSampler = function (name, texsampler) {
        var p = this.m_propertyBlock.getUniform(name);
        if (p == null)
            return;
        var ptype = p.type;
        if (ptype != GL.SAMPLER_2D &&
            ptype != GL.SAMPLER_2D_SHADOW &&
            ptype != GL.SAMPLER_3D &&
            ptype != GL.SAMPLER_2D_ARRAY &&
            ptype != GL.SAMPLER_2D_ARRAY_SHADOW &&
            ptype != GL.SAMPLER_CUBE_SHADOW) {
            return;
        }
        p.extra = texsampler;
    };
    Material.prototype.setFloat = function (name, val) {
        var p = this.m_propertyBlock.getUniform(name);
        if (p == null)
            return;
        p.value = val;
    };
    Material.prototype.setVec2 = function (name, valx, valy) {
        var p = this.m_propertyBlock.getUniform(name);
        if (p == null)
            return;
        p.value = [valx, valy];
    };
    Material.prototype.setVec3 = function (name, val) {
        var p = this.m_propertyBlock.getUniform(name);
        if (p == null)
            return;
        p.value = val.clone();
    };
    Material.prototype.setVec4 = function (name, val) {
        var p = this.m_propertyBlock.getUniform(name);
        if (p == null)
            return;
        p.value = val;
    };
    Material.prototype.setMat4 = function (name, val) {
        var p = this.m_propertyBlock.getUniform(name);
        if (p == null)
            return;
        p.value = val;
    };
    /**
     * Set uniform block binding
     * @param name
     * @param index
     */
    Material.prototype.setUniformBlockwitName = function (name, index) {
        var u = this.m_program.UniformBlock[name];
        if (u == null)
            return;
        var propertyblock = this.m_propertyBlock;
        var uniformblock = propertyblock.uniformsBlock;
        if (uniformblock == null) {
            uniformblock = {};
            propertyblock.uniformsBlock = uniformblock;
        }
        uniformblock[u] = index;
    };
    /**
     * Set uniform block binding
     * @param bufferindex shader uniform index, this value can be queried by @function <getUniformBlockIndex>
     * @param index uniform buffer binded index
     */
    Material.prototype.setUniformBlock = function (bufferindex, index) {
        var propertyblock = this.propertyBlock;
        var uniformblock = propertyblock.uniformsBlock;
        if (uniformblock == null) {
            uniformblock = {};
            propertyblock.uniformsBlock = uniformblock;
        }
        uniformblock[bufferindex] = index;
    };
    /**
     * Query the uniform blocksindex in current shader program
     * @param name
     */
    Material.prototype.getUniformBlockIndex = function (name) {
        return this.m_program.UniformBlock[name];
    };
    /**
     *
     * @param slotindex
     */
    Material.prototype.getUniformBlockName = function (slotindex) {
        return Material.programGetUniformBlockName(this.program, slotindex);
    };
    /**
     * Query the uniform block name with uniform block slot index.
     * @todo merge this function to class ShaderProgram
     * @param program
     * @param slotindex
     */
    Material.programGetUniformBlockName = function (program, slotindex) {
        var blocks = program.UniformBlock;
        for (var key in blocks) {
            if (blocks[key] == slotindex)
                return key;
        }
    };
    /**
     * SetFlag will not switch to new program immediately,
     * setUniform parameters must be called after @property {program} refreshed.
     * @param key
     * @param value
     * @param refresh
     */
    Material.prototype.setFlag = function (key, value, refresh) {
        if (refresh === void 0) { refresh = false; }
        var defOptCfg = this.m_shader.m_defaultOptionsConfig;
        var verified = this.m_shader.m_defaultOptionsConfig.verifyFlag(key, value);
        if (!verified) {
            console.warn("set shader flag verify failed: " + key + ":" + value);
            return;
        }
        if (!this.m_useVariants) {
            this.m_optConfig = defOptCfg.clone();
        }
        if (this.m_optConfig.setFlag(key, value)) {
            this.m_program = null;
            this.m_useVariants = true;
        }
        else {
            console.warn("set shader flag: value not changed");
        }
        if (refresh)
            this.refreshProgram();
    };
    /**
     * refresh program after @function <setFlag> called.
     */
    Material.prototype.refreshProgram = function () {
        return this.program;
    };
    Material.prototype.setFlagNoVerify = function (options) {
        var useVariants = this.m_useVariants;
        var cfg = useVariants ? this.m_optConfig : this.m_shader.m_defaultOptionsConfig;
        var val = cfg.getFlag(options.flag);
        if (val == null)
            return;
        if (val == options.default)
            return;
        if (!useVariants) {
            this.m_optConfig = cfg.clone();
            this.m_useVariants = true;
        }
        this.m_optConfig.setFlag(options.flag, options.default);
        this.m_program = null;
    };
    Material.prototype.getFlag = function (key) {
        var optCfg = this.m_useVariants ? this.m_shader.m_defaultOptionsConfig : this.m_optConfig;
        return optCfg.getFlag(key);
    };
    Material.prototype.apply = function (glctx) {
        this.m_applyTexCount = 0;
        var program = this.program;
        var propertyblock = this.m_propertyBlock;
        var pu = propertyblock.uniforms;
        for (var key in pu) {
            var u = pu[key];
            if (key === "uShadowMap") {
                glctx.uniform1i(program.Uniforms[key], ShaderFX.GL_SHADOWMAP_TEX0_ID);
            }
            else {
                this.setUniform(glctx, program.Uniforms[key], u);
            }
        }
        var puniformblocks = propertyblock.uniformsBlock;
        if (puniformblocks != null) {
            var glp = program.Program;
            for (var key in puniformblocks) {
                var ind = Number(key);
                glctx.uniformBlockBinding(glp, ind, puniformblocks[ind]);
            }
        }
    };
    /**
     * TODO clean apply process
     * especially for binded texture
     * @param gl
     */
    Material.prototype.clean = function (glctx) {
        // let pu = this.m_propertyBlock.uniforms;
        // for(let i=0,len = pu.length;i<len;i++){
        //     let u = pu[i];
        //     let loc = this.program.Uniforms[u.key];
        //     let type = u.type;
        //     if(type == gl.SAMPLER_2D){
        //         //gl.bindTexture(gl.TEXTURE,null);
        //     }
        // }
    };
    Material.prototype.setUniform = function (glctx, loc, mp) {
        var val = mp.value;
        var type = mp.type;
        if (val == null && type != GL.SAMPLER_2D)
            return;
        switch (type) {
            case GL.FLOAT_MAT4:
                glctx.uniformMatrix4fv(loc, false, val.raw);
                break;
            case GL.FLOAT:
                glctx.uniform1f(loc, val);
                break;
            case GL.FLOAT_VEC2:
                glctx.uniform2fv(loc, val);
                break;
            case GL.FLOAT_VEC3:
                glctx.uniform3fv(loc, val.raw);
                break;
            case GL.FLOAT_VEC4:
                glctx.uniform4fv(loc, val.raw);
                break;
            case GL.SAMPLER_CUBE:
                if (val != null) {
                    var texCount = this.m_applyTexCount;
                    var tex = null;
                    if (val.getRawTexture != undefined) {
                        tex = val.getRawTexture();
                    }
                    else if (val instanceof WebGLTexture) {
                        tex = val;
                    }
                    if (tex == null) {
                        //raw texture is null or onloading...
                        //TODO no internal texture_cube_map_support
                        //gl.uniform1i(loc,Material.DEF_TEXID_NUM);
                        return;
                    }
                    glctx.activeTexture(GL.TEXTURE4 + texCount);
                    glctx.bindTexture(GL.TEXTURE_CUBE_MAP, tex);
                    var locid = 4 + texCount;
                    glctx.uniform1i(loc, locid);
                    this.m_applyTexCount = texCount + 1;
                    var extra = mp.extra;
                    if (extra != null) {
                        glctx.bindSampler(locid, extra.rawobj);
                    }
                }
                break;
            case GL.SAMPLER_2D:
                if (val != null) {
                    var texCount = this.m_applyTexCount;
                    var tex = null;
                    if (val instanceof Texture2D) {
                        tex = val.getRawTexture();
                    }
                    else if (val instanceof WebGLTexture) {
                        tex = val;
                    }
                    if (tex == null) {
                        //raw texture is null or onloading...
                        glctx.uniform1i(loc, Material.DEF_TEXID_NUM);
                        return;
                    }
                    glctx.activeTexture(GL.TEXTURE4 + texCount);
                    glctx.bindTexture(GL.TEXTURE_2D, tex);
                    var locid = 4 + texCount;
                    glctx.uniform1i(loc, locid);
                    this.m_applyTexCount = texCount + 1;
                    var extra = mp.extra;
                    if (extra != null) {
                        glctx.bindSampler(locid, extra.rawobj);
                    }
                }
                else {
                    //texture is null
                    //use default white texture
                    glctx.uniform1i(loc, Material.DEF_TEXID_NUM);
                }
                break;
        }
    };
    Material.DEF_TEXID_NUM = 3;
    return Material;
}());

var BaseRender = /** @class */ (function () {
    function BaseRender() {
        this.castShadow = false;
    }
    Object.defineProperty(BaseRender.prototype, "object", {
        get: function () { return this.m_object; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRender.prototype, "renderQueue", {
        get: function () {
            return this.material.shaderTags.queue;
        },
        enumerable: true,
        configurable: true
    });
    return BaseRender;
}());

var Transform = /** @class */ (function () {
    function Transform(gobj) {
        this.m_localPosition = vec3.zero;
        this.m_localRotation = quat.Identity;
        this.m_localScale = vec3.one;
        this.m_worldPositon = vec3.zero;
        this.m_worldRotation = quat.Identity;
        this.m_worldScale = vec3.one;
        this.m_localTRSdirty = true;
        this.m_TRSDirty = false;
        this.m_needDecompose = false;
        /**
         * Snapshot of TRS dirty flag at the end of the last updated frame.
         */
        this.m_frameTRSDirty = false;
        this.m_localMtx = mat4.Identity;
        /** localToWorld mtx */
        this.m_objMtx = mat4.Identity;
        this.m_right = vec3.right;
        this.m_forward = vec3.forward;
        this.m_up = vec3.up;
        this.m_gameobj = gobj;
    }
    Object.defineProperty(Transform.prototype, "gameobject", {
        get: function () {
            return this.m_gameobj;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "parent", {
        get: function () {
            return this.m_parent;
        },
        set: function (p) {
            if (p == null) {
                var curp = this.m_parent;
                if (curp != null) {
                    curp.removeChild(this);
                }
            }
            else {
                p.addChild(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "localMatrix", {
        get: function () {
            if (this.m_localTRSdirty == true) {
                this.m_localMtx.setTRS(this.localPosition, this.localRotation, this.localScale);
                this.m_localTRSdirty = false;
                this.m_TRSDirty = true;
            }
            return this.m_localMtx;
        },
        set: function (mat) {
            this.m_localTRSdirty = false;
            this.m_localMtx = mat;
            mat4.DecomposeTRS(mat, this.m_localPosition, this.m_localRotation, this.m_localScale);
            this.m_TRSDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "objMatrix", {
        /**
         * Model matrix, MATRIX_M
         */
        get: function () {
            this.calObjMatrix();
            return this.m_objMtx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "worldToLocalMatrix", {
        get: function () {
            if (this.m_objMtxInv == null) {
                this.m_objMtxInv = this.objMatrix.inverse();
            }
            return this.m_objMtxInv;
        },
        enumerable: true,
        configurable: true
    });
    Transform.prototype.calObjMatrix = function (decompose) {
        if (decompose === void 0) { decompose = false; }
        if (this.m_TRSDirty) {
            if (this.parent == null) {
                this.m_objMtx.set(this.localMatrix);
                this.m_worldPositon = this.m_localPosition.clone();
                this.m_worldRotation = this.m_localRotation.clone();
                this.m_worldScale = this.m_localScale.clone();
                this.m_needDecompose = false;
            }
            else {
                var objmtx = this.parent.objMatrix.mul(this.localMatrix);
                this.m_objMtx.set(objmtx);
                this.m_needDecompose = true;
            }
            this.m_objMtxInv = null;
            this.m_TRSDirty = false;
        }
        if (decompose && this.m_needDecompose) {
            var sk = vec3.zero;
            var rotamtx = new mat3();
            mat4.DecomposeAffine(this.m_objMtx, this.m_worldPositon, rotamtx, this.m_worldScale, sk);
            this.m_worldRotation = quat.MtxToQuat(rotamtx);
            this.m_needDecompose = false;
        }
    };
    Object.defineProperty(Transform.prototype, "position", {
        /**
         * world-space position
         */
        get: function () {
            this.calObjMatrix(true);
            return this.m_worldPositon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "rotation", {
        /**
         * world-space rotation
         */
        get: function () {
            this.calObjMatrix(true);
            return this.m_worldRotation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "lossyScale", {
        /**
         * world-space scale
         */
        get: function () {
            this.calObjMatrix(true);
            return this.m_localScale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "children", {
        get: function () {
            return this.m_children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "localRotation", {
        /**
         * local rotation
         */
        get: function () {
            return this.m_localRotation;
        },
        set: function (q) {
            this.setRotation(q);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "localPosition", {
        get: function () {
            return this.m_localPosition;
        },
        set: function (pos) {
            this.setPosition(pos);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "localScale", {
        get: function () {
            return this.m_localScale;
        },
        set: function (s) {
            this.setScale(s);
        },
        enumerable: true,
        configurable: true
    });
    /** set local rotation */
    Transform.prototype.setRotation = function (q) {
        this.m_localRotation.set(q);
        this.m_forward = null;
        this.m_up = null;
        this.m_right = null;
        this.m_localTRSdirty = true;
        this.m_TRSDirty = true;
    };
    /** set local position */
    Transform.prototype.setPosition = function (pos) {
        this.m_localPosition.set(pos);
        this.m_localTRSdirty = true;
        this.m_TRSDirty = true;
    };
    /** set local scale */
    Transform.prototype.setScale = function (scale) {
        this.m_localScale.set(scale);
        this.m_localTRSdirty = true;
        this.m_TRSDirty = true;
    };
    Object.defineProperty(Transform.prototype, "worldForward", {
        get: function () {
            return this.rotation.rota(vec3.forward);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "worldUp", {
        get: function () {
            return this.rotation.rota(vec3.up);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "worldRight", {
        get: function () {
            return this.rotation.rota(vec3.right);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "forward", {
        /**
         * local forward
         */
        get: function () {
            if (this.m_forward == null) {
                this.m_forward = this.m_localRotation.rota(vec3.forward);
            }
            return this.m_forward;
        },
        set: function (dir) {
            var len = dir.length;
            if (len == 0) {
                console.warn("can not set forward to " + dir);
                return;
            }
            var forward = dir.divToRef(len);
            var up = this.up;
            var right = vec3.SafeCross(forward, up).normalized;
            up = forward.cross(right).normalized;
            this.m_localRotation = quat.Coordinate(forward, up);
            this.m_forward = forward;
            this.m_up.set(up);
            this.m_right = right;
            this.m_localTRSdirty = true;
            this.m_TRSDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "up", {
        /**
         * local up
         */
        get: function () {
            if (this.m_up == null) {
                this.m_up = this.m_localRotation.rota(vec3.up);
            }
            return this.m_up;
        },
        set: function (dir) {
            var len = dir.length;
            if (len == 0) {
                console.warn("can not set up to " + dir);
                return;
            }
            var up = dir.divToRef(len);
            var right = vec3.SafeCross(up, this.forward).normalized;
            var forward = right.cross(up).normalized;
            this.m_localRotation = quat.Coordinate(forward, up);
            this.m_up = up;
            this.m_forward.set(forward);
            this.m_right = right;
            this.m_localTRSdirty = true;
            this.m_TRSDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "right", {
        /**
         * local right
         */
        get: function () {
            if (this.m_right == null) {
                this.m_right = this.m_localRotation.rota(vec3.right);
            }
            return this.m_right;
        },
        set: function (dir) {
            var len = dir.length;
            if (len == 0) {
                console.warn("can not set up to " + dir);
                return;
            }
            var right = dir.divToRef(len);
            var forward = vec3.SafeCross(right, this.up).normalized;
            var up = forward.cross(right);
            this.m_localRotation = quat.Coordinate(forward, up);
            this.m_up.set(up);
            this.m_forward = forward;
            this.right = right;
            this.m_localTRSdirty = true;
            this.m_TRSDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Transform.prototype.addChild = function (trs) {
        if (trs == null)
            return false;
        var children = this.m_children;
        if (children == null) {
            children = [];
            this.m_children = children;
        }
        var index = children.indexOf(trs);
        if (index >= 0)
            return true;
        trs.m_parent = this;
        children.push(trs);
        return true;
    };
    Transform.prototype.removeChild = function (trs) {
        var children = this.m_children;
        if (children == null)
            return false;
        var index = children.indexOf(trs);
        if (index < 0)
            return false;
        trs.m_parent = null;
        this.m_children = children.splice(index, 1);
        return true;
    };
    Transform.prototype.setLocalDirty = function (dirty) {
        if (dirty === void 0) { dirty = true; }
        if (dirty == this.m_localTRSdirty)
            return;
        this.m_localTRSdirty = dirty;
        if (dirty) {
            this.m_TRSDirty = true;
        }
        else {
            this.localMatrix;
        }
    };
    /**
     *
     * @param pmtxdirty parent's transform dirty?
     */
    Transform.prototype.setObjMatrixDirty = function (pmtxdirty) {
        var dirty = this.m_TRSDirty || pmtxdirty;
        this.m_frameTRSDirty = dirty;
        if (dirty) {
            this.m_TRSDirty = true;
            this.calObjMatrix(false);
        }
    };
    Object.defineProperty(Transform.prototype, "isDirty", {
        get: function () { return this.m_localTRSdirty || this.m_frameTRSDirty; },
        enumerable: true,
        configurable: true
    });
    Transform.prototype.setLookAt = function (target, worldup) {
        this.m_localTRSdirty = true;
        this.setLookDir(target.subToRef(this.m_localPosition), worldup);
    };
    Transform.prototype.setLookDir = function (forward, worldup) {
        this.m_localTRSdirty = true;
        var f = forward.Normalize();
        if (worldup == null)
            worldup = this.up;
        var right = vec3.SafeCross(worldup, f).normalized;
        var up = f.cross(right).normalized;
        this.m_up.set(up);
        this.m_right = right;
        this.m_forward = f;
        this.m_localRotation = quat.Coordinate(f, up);
    };
    /**
     * Apply translate to current transform.
     * @param offset
     */
    Transform.prototype.applyTranslate = function (offset, local) {
        if (local === void 0) { local = true; }
        if (local) {
            this.localPosition.add(offset);
            this.setLocalDirty();
        }
        else {
            var p = this.m_parent;
            if (p == null) {
                this.localPosition.add(offset);
                this.setLocalDirty();
            }
            else {
                var m = p.worldToLocalMatrix;
                var localoff = m.mulvec(offset.vec4(0));
                this.localPosition.add(localoff);
                this.setLocalDirty();
            }
        }
    };
    /**
     * Apply rotation to current transform.
     * @param q
     */
    Transform.prototype.applyRotate = function (q) {
        this.localRotation.selfRota(q);
        this.m_forward.mul(q);
        this.m_up.mul(q);
        this.m_right.mul(q);
        this.setLocalDirty();
    };
    /**
     * Apply scale to current transform.
     * @param scale
     */
    Transform.prototype.applyScale = function (scale) {
        this.m_localScale.mul(scale);
        this.setLocalDirty();
    };
    return Transform;
}());

var GameObject = /** @class */ (function () {
    function GameObject(name) {
        this.active = true;
        this.name = name;
        this.transform = new Transform(this);
    }
    Object.defineProperty(GameObject.prototype, "render", {
        get: function () {
            return this.m_render;
        },
        set: function (v) {
            v['m_object'] = this;
            this.m_render = v;
        },
        enumerable: true,
        configurable: true
    });
    GameObject.prototype.addRender = function (t) {
        var render = new t();
        render['m_object'] = this;
        this.m_render = render;
        return render;
    };
    GameObject.prototype.update = function (scene) {
        var comp = this.components;
        if (comp != null) {
            for (var i = 0, len = comp.length; i < len; i++) {
                var c = comp[i];
                if (c.onUpdate != null) {
                    c.onUpdate(scene);
                }
            }
        }
        var trs = this.transform;
        var trsdirty = trs.isDirty;
        var children = this.transform.children;
        if (children != null) {
            for (var i = 0, len = children.length; i < len; i++) {
                var g = children[i].gameobject;
                g.transform.setObjMatrixDirty(trsdirty);
                g.update(scene);
            }
        }
    };
    GameObject.prototype.addComponent = function (c) {
        var comps = this.components;
        if (comps == null) {
            comps = [];
            this.components = comps;
        }
        var index = comps.indexOf(c);
        if (index >= 0)
            return;
        c.gameobject = this;
        if (c.onStart != null)
            c.onStart();
        comps.push(c);
    };
    GameObject.prototype.getComponent = function (t) {
        var comps = this.components;
        for (var i = 0, len = comps.length; i < len; i++) {
            if (comps[i] instanceof t)
                return comps[i];
        }
        return null;
    };
    GameObject.prototype.getChildByName = function (name) {
        var children = this.transform.children;
        if (children == null)
            return null;
        for (var i = 0, len = children.length; i < len; i++) {
            var ct = children[i].gameobject;
            if (ct.name === name)
                return ct;
            var cc = ct.getChildByName(name);
            if (cc != null)
                return cc;
        }
        return null;
    };
    return GameObject;
}());

var Component = /** @class */ (function () {
    function Component() {
    }
    Object.defineProperty(Component.prototype, "transform", {
        get: function () {
            return this.gameobject.transform;
        },
        enumerable: true,
        configurable: true
    });
    return Component;
}());

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AmbientType;
(function (AmbientType) {
    AmbientType[AmbientType["Background"] = 0] = "Background";
    AmbientType[AmbientType["AmbientColor"] = 1] = "AmbientColor";
})(AmbientType || (AmbientType = {}));
var ClearType;
(function (ClearType) {
    ClearType[ClearType["Background"] = 0] = "Background";
    ClearType[ClearType["Skybox"] = 1] = "Skybox";
})(ClearType || (ClearType = {}));
var ProjectionType;
(function (ProjectionType) {
    ProjectionType[ProjectionType["perspective"] = 0] = "perspective";
    ProjectionType[ProjectionType["orthographic"] = 1] = "orthographic";
})(ProjectionType || (ProjectionType = {}));
var Camera = /** @class */ (function (_super) {
    __extends$3(Camera, _super);
    function Camera() {
        var _this = _super.call(this) || this;
        _this.enabled = true;
        _this.order = 0;
        _this.m_fov = 60;
        _this.m_projDirty = false;
        _this.orthosize = 10.0;
        _this.m_worldToCamMtxCalculated = false;
        _this.m_background = vec4.zero;
        _this.m_ambientColor = glmath.vec4(0.1, 0.1, 0.1, 1.0);
        _this.m_ambientType = AmbientType.AmbientColor;
        _this.m_clearType = ClearType.Background;
        _this.m_dataTrsDirty = true;
        _this.m_dataProjDirty = true;
        _this.ambientDataDirty = true;
        _this.worldRHS = true;
        _this.m_projMtx = mat4.perspectiveFoV(60, 1, 0.01, 100);
        _this.m_projMtxInv = null;
        _this.m_projectionType = ProjectionType.perspective;
        return _this;
    }
    Object.defineProperty(Camera.prototype, "isDataTrsDirty", {
        get: function () {
            return this.m_dataTrsDirty || this.transform.isDirty;
        },
        set: function (v) {
            this.m_dataTrsDirty = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "isDataProjDirty", {
        get: function () {
            return this.m_dataProjDirty;
        },
        set: function (v) {
            this.m_dataProjDirty = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "far", {
        get: function () {
            return this.m_far;
        },
        set: function (v) {
            if (this.m_far == v)
                return;
            this.m_far = v;
            this.m_projDirty = true;
            this.m_dataProjDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "near", {
        get: function () {
            return this.m_near;
        },
        set: function (v) {
            if (this.m_near == v)
                return;
            this.m_near = v;
            this.m_projDirty = true;
            this.m_dataProjDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "fov", {
        get: function () {
            return this.m_fov;
        },
        set: function (v) {
            if (this.m_fov == v)
                return;
            this.m_fov = v;
            this.m_projDirty = true;
            this.m_dataProjDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "aspect", {
        get: function () {
            return this.m_aspectratio;
        },
        set: function (v) {
            if (v == this.m_aspectratio)
                return;
            this.m_aspectratio = v;
            this.m_projDirty = true;
            this.m_dataProjDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "ambientColor", {
        get: function () {
            return this.m_ambientColor;
        },
        set: function (v) {
            this.m_ambientColor = v;
            this.ambientDataDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "background", {
        get: function () {
            return this.m_background;
        },
        set: function (v) {
            this.m_background = v;
            if (this.m_ambientType == AmbientType.Background) {
                this.ambientDataDirty = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "skybox", {
        get: function () {
            return this.m_skybox;
        },
        set: function (skybox) {
            this.m_skybox = skybox;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "clearType", {
        get: function () {
            return this.m_clearType;
        },
        set: function (t) {
            this.m_clearType = t;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "ambientType", {
        get: function () {
            return this.m_ambientType;
        },
        set: function (t) {
            if (this.m_ambientType == t)
                return;
            this.m_ambientType = t;
            this.ambientDataDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "WorldMatrix", {
        /** View matrix of camera */
        get: function () {
            var trs = this.transform;
            if (!this.m_worldToCamMtxCalculated && trs.isDirty) {
                this.m_worldToCamMtx = mat4.coordCvt(trs.position, trs.worldForward, trs.worldUp);
                this.m_camToWorldMtx = null;
                this.m_screenToWorldMtx = null;
                this.m_dataTrsDirty = true;
                this.m_worldToCamMtxCalculated = true;
            }
            return this.m_worldToCamMtx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "WorldToCameraMatrix", {
        get: function () { return this.WorldMatrix; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "CameraToWorldMatrix", {
        get: function () {
            var camToWorld = this.m_camToWorldMtx;
            if (camToWorld == null) {
                camToWorld = mat4.inverse(this.WorldToCameraMatrix);
                this.m_camToWorldMtx = camToWorld;
            }
            return camToWorld;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "ScreenToWorldMatrix", {
        get: function () {
            var mtx = this.m_screenToWorldMtx;
            if (mtx == null) {
                mtx = this.CameraToWorldMatrix.mul(this.ProjMatrixInv);
                this.m_screenToWorldMtx = mtx;
            }
            return mtx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "ProjMatrix", {
        /** Projection matrix of camera */
        get: function () {
            if (this.m_projDirty) {
                this.m_projMtx = mat4.perspectiveFoV(this.m_fov, this.m_aspectratio, this.m_near, this.m_far);
                this.m_projMtxInv = null;
                this.m_screenToWorldMtx;
                this.m_projDirty = false;
                this.m_dataProjDirty = true;
            }
            return this.m_projMtx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "ProjMatrixInv", {
        get: function () {
            var inv = this.m_projMtxInv;
            if (inv != null)
                return inv;
            inv = mat4.inverse(this.m_projMtx);
            if (!inv.isValid) {
                throw new Error("invalid proj matrix");
            }
            this.m_projMtxInv = inv;
            return inv;
        },
        enumerable: true,
        configurable: true
    });
    Camera.prototype.viewPointToRay = function (spos) {
        var tarpos = this.ScreenToWorldMatrix.mulvec(spos.vec4(1.0));
        tarpos.div(tarpos.w);
        var pos = this.transform.position;
        var dir = new vec3(tarpos.raw).sub(pos).normalized;
        return Ray.fromPointDir(pos, dir);
    };
    Camera.prototype.onUpdate = function (scene) {
        scene.mainCamera = this;
        this.m_worldToCamMtxCalculated = false;
    };
    Camera.persepctive = function (gobj, fov, aspectratio, near, far) {
        var camera = new Camera();
        camera.m_fov = fov;
        camera.m_aspectratio = aspectratio;
        camera.m_near = near;
        camera.m_far = far;
        if (gobj == null) {
            gobj = new GameObject();
        }
        gobj.addComponent(camera);
        camera.m_projMtx = mat4.perspectiveFoV(fov, aspectratio, near, far);
        camera.m_projectionType = ProjectionType.perspective;
        var trs = gobj.transform;
        camera.m_worldToCamMtx = mat4.coordCvt(trs.localPosition, trs.worldForward, trs.worldUp);
        return camera;
    };
    Camera.orthographic = function (gobj, size, aspectratio, near, far) {
        var camera = new Camera();
        camera.m_aspectratio = aspectratio;
        camera.m_near = near;
        camera.m_far = far;
        if (gobj == null) {
            gobj = new GameObject();
        }
        gobj.addComponent(camera);
        camera.orthosize = size;
        var w = size * aspectratio;
        camera.m_projMtx = mat4.orthographic(w, size, near, far);
        camera.m_projectionType = ProjectionType.orthographic;
        var trs = gobj.transform;
        camera.m_worldToCamMtx = mat4.coordCvt(trs.localPosition, trs.worldForward, trs.worldUp);
        return camera;
    };
    return Camera;
}(Component));

var MeshTopology;
(function (MeshTopology) {
    MeshTopology[MeshTopology["Triangles"] = 4] = "Triangles";
    MeshTopology[MeshTopology["TriangleFan"] = 6] = "TriangleFan";
    MeshTopology[MeshTopology["TriangleStrip"] = 5] = "TriangleStrip";
    MeshTopology[MeshTopology["Points"] = 0] = "Points";
    MeshTopology[MeshTopology["Lines"] = 1] = "Lines";
    MeshTopology[MeshTopology["LineStrip"] = 3] = "LineStrip";
    MeshTopology[MeshTopology["LineLoop"] = 2] = "LineLoop";
})(MeshTopology || (MeshTopology = {}));
var MeshVertexAttrDesc = /** @class */ (function () {
    /**
     * constructor of MeshVertexAttrDesc
     * @param type data type
     * @param size componsnet length [1,2,3,4]
     * @param bytes total size in bytes
     * @param offset offset in bytes
     */
    function MeshVertexAttrDesc(type, size, bytes, offset) {
        this.offset = 0;
        this.type = type;
        this.size = size;
        this.totalbytes = bytes;
        this.offset = 0;
    }
    Object.defineProperty(MeshVertexAttrDesc.prototype, "length", {
        get: function () {
            return this.totalbytes / this.size / MeshBufferUtility.TypeSize(this.type);
        },
        enumerable: true,
        configurable: true
    });
    return MeshVertexAttrDesc;
}());
var MeshVertexDesc = /** @class */ (function () {
    function MeshVertexDesc() {
    }
    Object.defineProperty(MeshVertexDesc.prototype, "totalByteSize", {
        get: function () {
            var bytes = this.position.totalbytes;
            if (this.uv != null) {
                bytes += this.uv.totalbytes;
            }
            if (this.normal != null) {
                bytes += this.normal.totalbytes;
            }
            if (this.color != null) {
                bytes += this.color.totalbytes;
            }
            return bytes;
        },
        enumerable: true,
        configurable: true
    });
    return MeshVertexDesc;
}());
var MeshIndicesDesc = /** @class */ (function () {
    function MeshIndicesDesc(topology, indices, type, offset) {
        if (topology === void 0) { topology = MeshTopology.Triangles; }
        if (indices === void 0) { indices = 0; }
        if (type === void 0) { type = GL.UNSIGNED_SHORT; }
        if (offset === void 0) { offset = 0; }
        this.indiceCount = 0;
        this.topology = topology;
        this.indiceCount = indices;
        this.type = type;
        this.offset = offset;
        this.totalbytes = indices * MeshBufferUtility.TypeSize(type);
    }
    MeshIndicesDesc.prototype.set = function (topology, indices, type, offset) {
        if (topology === void 0) { topology = MeshTopology.Triangles; }
        if (indices === void 0) { indices = 0; }
        if (type === void 0) { type = GL.UNSIGNED_SHORT; }
        if (offset === void 0) { offset = 0; }
        this.topology = topology;
        this.indiceCount = indices;
        this.type = type;
        this.offset = offset;
        this.totalbytes = indices * MeshBufferUtility.TypeSize(type);
    };
    return MeshIndicesDesc;
}());
var Mesh = /** @class */ (function () {
    function Mesh(name, serperatedBuffer) {
        if (serperatedBuffer === void 0) { serperatedBuffer = false; }
        this.vertexDesc = new MeshVertexDesc();
        this.indiceDesc = new MeshIndicesDesc();
        this.m_bufferInited = false;
        this.m_seperatedBuffer = false;
        this.name = name;
        this.m_seperatedBuffer = serperatedBuffer;
    }
    Object.defineProperty(Mesh.prototype, "dataPosition", {
        get: function () { return this.m_dataPosition; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "dataUV", {
        get: function () { return this.m_dataUV; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "dataNormal", {
        get: function () { return this.m_dataNormal; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "dataIndices", {
        get: function () { return this.m_dataIndices; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "dataColor", {
        get: function () { return this.m_dataColor; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "seperatedBuffer", {
        get: function () { return this.m_seperatedBuffer; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "bufferInited", {
        get: function () {
            return this.m_bufferInited;
        },
        enumerable: true,
        configurable: true
    });
    Mesh.prototype.setNormal = function (data, type, size, bufferByteLen) {
        if (bufferByteLen === void 0) { bufferByteLen = undefined; }
        this.m_dataNormal = data;
        this.vertexDesc.normal = new MeshVertexAttrDesc(type, size, bufferByteLen == undefined ? data.byteLength : bufferByteLen);
    };
    /**
     *
     * @param data
     * @param type
     * @param size component size [1,2,3,4]
     * @param bufferByteLen
     */
    Mesh.prototype.setUV = function (data, type, size, bufferByteLen) {
        if (bufferByteLen === void 0) { bufferByteLen = undefined; }
        this.m_dataUV = data;
        this.vertexDesc.uv = new MeshVertexAttrDesc(type, size, bufferByteLen == undefined ? data.byteLength : bufferByteLen);
    };
    /**
     *
     * @param data
     * @param type
     * @param size component size [1,2,3,4]
     * @param bufferByteLen
     */
    Mesh.prototype.setColor = function (data, type, size, bufferByteLen) {
        if (bufferByteLen === void 0) { bufferByteLen = undefined; }
        this.m_dataColor = data;
        this.vertexDesc.color = new MeshVertexAttrDesc(type, size, bufferByteLen == undefined ? data.byteLength : bufferByteLen);
    };
    /**
     *
     * @param data
     * @param type data type
     * @param size component size
     */
    Mesh.prototype.setPosition = function (data, type, size, bufferByteLen) {
        if (bufferByteLen === void 0) { bufferByteLen = undefined; }
        this.m_dataPosition = data;
        this.vertexDesc.position = new MeshVertexAttrDesc(type, size, bufferByteLen == undefined ? data.byteLength : bufferByteLen);
    };
    Mesh.prototype.setIndices = function (data, type, mode, indicesCount) {
        if (indicesCount === void 0) { indicesCount = undefined; }
        this.m_dataIndices = data;
        var inddesc = this.indiceDesc;
        inddesc.indiceCount = indicesCount == undefined ? data.length : indicesCount;
        inddesc.topology = mode;
        inddesc.offset = 0;
        inddesc.type = type;
        inddesc.totalbytes = data.byteLength;
    };
    Mesh.prototype.setIndicesCount = function (indices) {
        var indicesdesc = this.indiceDesc;
        indicesdesc.indiceCount = indices;
    };
    Object.defineProperty(Mesh, "Quad", {
        get: function () {
            if (Mesh.s_quad != null)
                return Mesh.s_quad;
            var quad = new Mesh();
            Mesh.s_quad = quad;
            var dataPosition = new Float32Array([
                -0.5, -0.5, 0, 1,
                0.5, -0.5, 0, 1,
                -0.5, 0.5, 0, 1,
                0.5, 0.5, 0, 1
            ]);
            var dataIndices = new Uint16Array([
                0, 1, 2,
                1, 3, 2
            ]);
            var dataUV = new Float32Array([
                0.0, 1.0,
                1.0, 1.0,
                0.0, 0.0,
                1.0, 0.0
            ]);
            quad.m_dataPosition = dataPosition;
            quad.m_dataUV = dataUV;
            quad.m_dataIndices = dataIndices;
            quad.name = "quad";
            var vertexdesc = quad.vertexDesc;
            vertexdesc.position = new MeshVertexAttrDesc(GL.FLOAT, 4, dataPosition.length * 4);
            vertexdesc.uv = new MeshVertexAttrDesc(GL.FLOAT, 2, dataUV.length * 4);
            quad.indiceDesc.set(MeshTopology.Triangles, dataIndices.length, GL.UNSIGNED_SHORT, 0);
            quad.calculateNormal();
            return quad;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh, "Sphere", {
        get: function () {
            if (Mesh.s_sphere != null)
                return Mesh.s_sphere;
            var sphere = new Mesh('sphere');
            Mesh.s_sphere = sphere;
            var slicey = 16;
            var slicer = slicey * 2;
            var radstep = Math.PI / slicey;
            var rad = -Math.PI / 2.0 + radstep;
            var positions = [];
            var uvs = [];
            var pcount = (slicey - 1) * (slicer + 1) + 2;
            positions.push(.0, -1.0, .0, 1.0);
            uvs.push(0.5, 0.0);
            for (var t = 1; t < slicey; t++) {
                var y = Math.sin(rad);
                var d = Math.cos(rad);
                var yaw = 0;
                var v = t * 1.0 / slicey;
                for (var s = 0; s <= slicer; s++) {
                    var x = d * Math.cos(yaw);
                    var z = d * Math.sin(yaw);
                    positions.push(x, y, z, 1.0);
                    uvs.push(s * 1.0 / slicer, v);
                    yaw += radstep;
                }
                rad += radstep;
            }
            positions.push(.0, 1.0, .0, 1.0);
            uvs.push(0.5, 1.0);
            var indices = [];
            {
                //bottom
                for (var t = 1, tbmax = slicer; t <= tbmax; t++) {
                    indices.push(0, t, t + 1);
                }
                //center
                var slicerlayer = slicer + 1;
                for (var t = 0; t < slicey - 2; t++) {
                    var ib = 1 + t * slicerlayer;
                    var it_1 = ib + slicerlayer;
                    for (var s = 0; s < slicerlayer; s++) {
                        var ibs = ib + s;
                        var its = it_1 + s;
                        indices.push(ibs, ibs + 1, its + 1, ibs, its + 1, its);
                    }
                }
                //top
                var imax = pcount - 1;
                var istart = imax - slicer - 1;
                for (var t = istart, ttmax = imax; t < ttmax; t++) {
                    indices.push(imax, t, t + 1);
                }
            }
            var dataposition = new Float32Array(positions);
            sphere.m_dataPosition = dataposition;
            var dataindices = new Uint16Array(indices);
            sphere.m_dataIndices = dataindices;
            var datauv = new Float32Array(uvs);
            sphere.m_dataUV = datauv;
            sphere.m_dataNormal = dataposition;
            var vertexdesc = sphere.vertexDesc;
            vertexdesc.position = new MeshVertexAttrDesc(GL.FLOAT, 4, dataposition.byteLength);
            vertexdesc.normal = new MeshVertexAttrDesc(GL.FLOAT, 4, dataposition.byteLength);
            vertexdesc.uv = new MeshVertexAttrDesc(GL.FLOAT, 2, datauv.byteLength);
            sphere.indiceDesc.set(MeshTopology.Triangles, indices.length, GL.UNSIGNED_SHORT, 0);
            return sphere;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh, "Cube", {
        get: function () {
            if (Mesh.s_cube != null)
                return Mesh.s_cube;
            var cube = new Mesh();
            Mesh.s_cube = cube;
            var dataPosition = new Float32Array([
                -1, 1, 1, 1,
                1, 1, 1, 1,
                -1, -1, 1, 1,
                1, -1, 1, 1,
                1, 1, 1, 1,
                1, 1, -1, 1,
                1, -1, 1, 1,
                1, -1, -1, 1,
                1, 1, -1, 1,
                -1, 1, -1, 1,
                1, -1, -1, 1,
                -1, -1, -1, 1,
                -1, 1, -1, 1,
                -1, 1, 1, 1,
                -1, -1, -1, 1,
                -1, -1, 1, 1,
                -1, 1, -1, 1,
                1, 1, -1, 1,
                -1, 1, 1, 1,
                1, 1, 1, 1,
                -1, -1, 1, 1,
                1, -1, 1, 1,
                -1, -1, -1, 1,
                1, -1, -1, 1,
            ]);
            var dataUV = new Float32Array(48);
            for (var i = 0; i < 6; i++) {
                dataUV.set([0, 1, 1, 1, 0, 0, 1, 0], i * 8);
            }
            var dataIndices = [];
            for (var i_1 = 0; i_1 < 6; i_1++) {
                var k = i_1 * 4;
                dataIndices.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
            }
            cube.m_dataIndices = new Uint16Array(dataIndices);
            cube.m_dataPosition = dataPosition;
            cube.m_dataUV = dataUV;
            cube.name = "cube";
            var vertexdesc = cube.vertexDesc;
            vertexdesc.position = new MeshVertexAttrDesc(GL.FLOAT, 4, dataPosition.length * 4);
            vertexdesc.uv = new MeshVertexAttrDesc(GL.FLOAT, 2, dataUV.length * 4);
            cube.indiceDesc.set(MeshTopology.Triangles, dataIndices.length, GL.UNSIGNED_SHORT, 0);
            cube.calculateNormal();
            return cube;
        },
        enumerable: true,
        configurable: true
    });
    Mesh.prototype.calculateNormal = function () {
        if (this.indiceDesc.topology != MeshTopology.Triangles) {
            console.warn(MeshTopology[this.indiceDesc.topology] + " is not supported.");
            return;
        }
        var normal = this.m_dataNormal;
        var position = this.m_dataPosition;
        if (position == null) {
            console.warn('vertices position is needed for normal calculation.');
            return;
        }
        var indics = this.m_dataIndices;
        if (indics == null) {
            console.warn('indices data is needed for normal calculation.');
            return;
        }
        var positionattr = this.vertexDesc.position;
        var floatLength = positionattr.totalbytes / MeshBufferUtility.TypeSize(positionattr.type);
        var normaldata = new Float32Array(floatLength);
        var verticesLen = floatLength / positionattr.size;
        var normalVec = new Array(verticesLen);
        var normalAcc = new Uint16Array(verticesLen);
        var tricount = indics.length / 3;
        for (var i = 0; i < tricount; i++) {
            var off = i * 3;
            var i1 = indics[off];
            var i2 = indics[off + 1];
            var i3 = indics[off + 2];
            var i1v = i1 * 4;
            var i2v = i2 * 4;
            var i3v = i3 * 4;
            var v1 = new vec3([position[i1v], position[i1v + 1], position[i1v + 2]]);
            var v2 = new vec3([position[i2v], position[i2v + 1], position[i2v + 2]]);
            var v3 = new vec3([position[i3v], position[i3v + 1], position[i3v + 2]]);
            var n = vec3.Cross(v1.sub(v2), v3.sub(v2)).normalized;
            normalAcc[i1]++;
            if (normalVec[i1] == null)
                normalVec[i1] = vec3.zero;
            normalVec[i1].add(n);
            normalAcc[i2]++;
            if (normalVec[i2] == null)
                normalVec[i2] = vec3.zero;
            normalVec[i2].add(n);
            normalAcc[i3]++;
            if (normalVec[i3] == null)
                normalVec[i3] = vec3.zero;
            normalVec[i3].add(n);
        }
        for (var i = 0; i < verticesLen; i++) {
            var v = normalVec[i].div(normalAcc[i]).raw;
            normaldata.set([v[0], v[1], v[2], 0], i * 4);
        }
        this.m_dataNormal = normaldata;
        this.vertexDesc.normal = new MeshVertexAttrDesc(GL.FLOAT, 4, normaldata.length * 4);
    };
    Mesh.prototype.refreshMeshBuffer = function (glctx) {
        if (this.m_bufferInited)
            return;
        var buffervert = glctx.createBuffer();
        glctx.bindBuffer(GL.ARRAY_BUFFER, buffervert);
        this.bufferVertices = buffervert;
        var dataTotalSize = this.vertexDesc.totalByteSize;
        var totalData = new ArrayBuffer(dataTotalSize);
        var totalDataView = new DataView(totalData, 0, dataTotalSize);
        var offset = 0;
        var vertexDesc = this.vertexDesc;
        if (this.m_dataPosition != null) {
            vertexDesc.position.offset = offset;
            offset = MeshBufferUtility.copyBuffer(totalDataView, this.m_dataPosition, offset);
            offset = Math.ceil(offset / 4.0) * 4;
        }
        if (this.m_dataUV != null) {
            vertexDesc.uv.offset = offset;
            offset = MeshBufferUtility.copyBuffer(totalDataView, this.m_dataUV, offset);
            offset = Math.ceil(offset / 4.0) * 4;
        }
        if (this.m_dataNormal != null) {
            vertexDesc.normal.offset = offset;
            offset = MeshBufferUtility.copyBuffer(totalDataView, this.m_dataNormal, offset);
            offset = Math.ceil(offset / 4.0) * 4;
        }
        glctx.bufferData(GL.ARRAY_BUFFER, totalData, GL.STATIC_DRAW);
        glctx.bindBuffer(GL.ARRAY_BUFFER, null);
        //Indices
        var dataIndices = this.m_dataIndices;
        var hasIndices = dataIndices != null && dataIndices.length != 0;
        if (hasIndices) {
            var bufferIndices = glctx.createBuffer();
            glctx.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, bufferIndices);
            glctx.bufferData(GL.ELEMENT_ARRAY_BUFFER, dataIndices, GL.STATIC_DRAW);
            glctx.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, null);
            this.bufferIndices = bufferIndices;
        }
        this.m_bufferInited = true;
    };
    return Mesh;
}());
var MeshBufferUtility = /** @class */ (function () {
    function MeshBufferUtility() {
    }
    /**
     *
     * @param target
     * @param buffer
     * @param offsetInByte
     * @returns endpos in byte
     */
    MeshBufferUtility.copyBuffer = function (target, buffer, offsetInByte) {
        var offset = offsetInByte;
        if (buffer instanceof DataView) {
            var sourceView = new Uint8Array(buffer.buffer, 0, buffer.byteLength);
            for (var i = 0, len = sourceView.byteLength; i < len; i++) {
                target.setUint8(offset, sourceView[i]);
                offset++;
            }
            return offset;
        }
        else if (buffer instanceof ArrayBuffer) {
            var sourceView = new Uint8Array(buffer, 0, buffer.byteLength);
            for (var i = 0, len = sourceView.byteLength; i < len; i++) {
                target.setUint8(offset, sourceView[i]);
                offset++;
            }
            return offset;
        }
        else if (buffer instanceof Float32Array) {
            for (var i = 0, len = buffer.length; i < len; i++) {
                target.setFloat32(offset, buffer[i], true);
                offset += 4;
            }
            return offset;
        }
        else if (buffer instanceof Uint16Array) {
            for (var i = 0, len = buffer.length; i < len; i++) {
                target.setUint16(offset, buffer[i]);
                offset += 2;
            }
            return offset;
        }
        else {
            throw new Error('not implemented');
        }
    };
    MeshBufferUtility.TypeSize = function (type) {
        if (type == GLConst.FLOAT || type == GLConst.UNSIGNED_INT) {
            return 4;
        }
        if (type == GLConst.SHORT || type == GLConst.UNSIGNED_SHORT) {
            return 2;
        }
        if (type == GLConst.BYTE || type == GLConst.UNSIGNED_BYTE) {
            return 1;
        }
        return 0;
    };
    /**
     * Quad Order
     * v0 -- v1
     *  |    |
     * v3 -- v2
     * @param databuffer
     * @param quadsize
     */
    MeshBufferUtility.IndicesBufferFillQuad = function (databuffer, quadsize) {
        var itemlen = quadsize * 6;
        if (databuffer.length < itemlen)
            throw new Error('buffer size exceeded.');
        var index = 0;
        var vindex = 0;
        for (var i = 0; i < quadsize; i++) {
            databuffer[index] = vindex;
            databuffer[index + 1] = vindex + 1;
            databuffer[index + 2] = vindex + 2;
            databuffer[index + 3] = vindex;
            databuffer[index + 4] = vindex + 2;
            databuffer[index + 5] = vindex + 3;
            index += 6;
            vindex += 4;
        }
    };
    return MeshBufferUtility;
}());

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DynamicMesh = /** @class */ (function (_super) {
    __extends$4(DynamicMesh, _super);
    function DynamicMesh(name) {
        return _super.call(this, name, true) || this;
    }
    DynamicMesh.prototype.refreshMeshBuffer = function (glctx) {
        if (this.m_bufferInited)
            return false;
        if (this.m_seperatedBuffer) {
            var vertexdesc = this.vertexDesc;
            var posdesc = vertexdesc.position;
            if (posdesc != null && this.bufferVertices == null) {
                var buffer = glctx.createBufferAndBind(GL.ARRAY_BUFFER);
                var datapos = this.m_dataPosition;
                if (datapos)
                    glctx.bufferData(GL.ARRAY_BUFFER, datapos, GL.DYNAMIC_DRAW);
                this.bufferVertices = buffer;
                posdesc.offset = 0;
            }
            var uvdesc = vertexdesc.uv;
            if (uvdesc != null && this.bufferUV == null) {
                var buffer = glctx.createBufferAndBind(GL.ARRAY_BUFFER);
                var datauv = this.m_dataUV;
                if (datauv)
                    glctx.bufferData(GL.ARRAY_BUFFER, datauv, GL.DYNAMIC_DRAW);
                this.bufferUV = buffer;
                uvdesc.offset = 0;
            }
            var normaldesc = vertexdesc.normal;
            if (normaldesc != null && this.bufferNormal == null) {
                var buffer = glctx.createBufferAndBind(GL.ARRAY_BUFFER);
                var datanormal = this.m_dataNormal;
                if (datanormal)
                    glctx.bufferData(GL.ARRAY_BUFFER, datanormal, GL.DYNAMIC_DRAW);
                this.bufferNormal = buffer;
                normaldesc.offset = 0;
            }
            var colordesc = vertexdesc.color;
            if (colordesc != null && this.bufferColor == null) {
                var buffer = glctx.createBufferAndBind(GL.ARRAY_BUFFER);
                var datacolor = this.m_dataColor;
                if (datacolor)
                    glctx.bufferData(GL.ARRAY_BUFFER, datacolor, GL.DYNAMIC_DRAW);
                this.bufferColor = buffer;
                colordesc.offset = 0;
            }
            glctx.bindBuffer(GL.ARRAY_BUFFER, null);
            //indices
            var dataIndices = this.m_dataIndices;
            var hasIndices = dataIndices != null && dataIndices.length != 0;
            if (hasIndices && this.bufferIndices == null) {
                var buffer = glctx.createBuffer();
                glctx.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, buffer);
                glctx.bufferData(GL.ELEMENT_ARRAY_BUFFER, dataIndices, GL.STATIC_DRAW);
                glctx.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, null);
                this.bufferIndices = buffer;
            }
        }
        else {
            throw new Error('dynamic buffer only support seperated buffer currently');
        }
        this.m_bufferInited = true;
        return true;
    };
    DynamicMesh.prototype.uploadDataBufferPosition = function (gl, databuffer, databytes) {
        if (databuffer === void 0) { databuffer = null; }
        if (databytes === void 0) { databytes = undefined; }
        var data = null;
        if (databuffer != null && databuffer != this.m_dataPosition) {
            data = databuffer;
        }
        else {
            data = this.m_dataPosition;
        }
        var posdesc = this.vertexDesc.position;
        if (databytes != undefined) {
            if (databytes > data.byteLength) {
                throw new Error('specific positionbuffer databytes overflow!');
            }
            else {
                posdesc.totalbytes = databytes;
            }
        }
        else {
            posdesc.totalbytes = data.byteLength;
        }
        var buffer = this.bufferVertices;
        if (buffer == null) {
            buffer = gl.createBuffer();
            this.bufferVertices = buffer;
        }
        gl.bindBuffer(GL.ARRAY_BUFFER, buffer);
        gl.bufferData(GL.ARRAY_BUFFER, data, GL.DYNAMIC_DRAW);
        gl.bindBuffer(GL.ARRAY_BUFFER, null);
    };
    DynamicMesh.prototype.uploadDataBufferUV = function (gl, databuffer, databytes) {
        if (databuffer === void 0) { databuffer = null; }
        if (databytes === void 0) { databytes = undefined; }
        var data = null;
        if (databuffer != null && databuffer != this.m_dataUV) {
            data = databuffer;
        }
        else {
            data = this.m_dataUV;
        }
        var uvdesc = this.vertexDesc.uv;
        if (databytes != undefined) {
            if (databytes > data.byteLength) {
                throw new Error("specific uv buffer databytes overflow!");
            }
            else {
                uvdesc.totalbytes = databytes;
            }
        }
        else {
            uvdesc.totalbytes = data.byteLength;
        }
        var buffer = this.bufferUV;
        if (buffer == null) {
            buffer = gl.createBuffer();
            this.bufferUV = buffer;
        }
        gl.bindBuffer(GL.ARRAY_BUFFER, buffer);
        gl.bufferData(GL.ARRAY_BUFFER, data, GL.DYNAMIC_DRAW);
        gl.bindBuffer(GL.ARRAY_BUFFER, null);
    };
    DynamicMesh.prototype.uploadDataBufferNormal = function (gl, databuffer, databytes) {
        if (databuffer === void 0) { databuffer = null; }
        if (databytes === void 0) { databytes = undefined; }
        var data = null;
        if (databuffer != null && databuffer != this.m_dataNormal) {
            data = databuffer;
        }
        else {
            data = this.m_dataNormal;
        }
        var nordesc = this.vertexDesc.normal;
        if (databytes != undefined) {
            if (databytes > data.byteLength) {
                throw new Error('specific normal buffer databytes overflow!');
            }
            else {
                nordesc.totalbytes = databytes;
            }
        }
        else {
            nordesc.totalbytes = data.byteLength;
        }
        var buffer = this.bufferNormal;
        if (buffer == null) {
            buffer = gl.createBuffer();
            this.bufferNormal = buffer;
        }
        gl.bindBuffer(GL.ARRAY_BUFFER, buffer);
        gl.bufferData(GL.ARRAY_BUFFER, data, GL.DYNAMIC_DRAW);
        gl.bindBuffer(GL.ARRAY_BUFFER, null);
    };
    DynamicMesh.prototype.uploadDataBufferColor = function (gl, databuffer, databytes) {
        if (databuffer === void 0) { databuffer = null; }
        if (databytes === void 0) { databytes = undefined; }
        var data = null;
        if (databuffer != null && databuffer != this.m_dataColor) {
            data = databuffer;
        }
        else {
            data = this.m_dataColor;
        }
        var colordesc = this.vertexDesc.color;
        if (databytes != undefined) {
            if (databytes > data.byteLength) {
                throw new Error('specific colorbuffer databytes overflow!');
            }
            else {
                colordesc.totalbytes = databytes;
            }
        }
        else {
            colordesc.totalbytes = data.byteLength;
        }
        var buffer = this.bufferColor;
        if (buffer == null) {
            buffer = gl.createBuffer();
            this.bufferColor = buffer;
        }
        gl.bindBuffer(GL.ARRAY_BUFFER, buffer);
        gl.bufferData(GL.ARRAY_BUFFER, data, GL.DYNAMIC_DRAW);
        gl.bindBuffer(GL.ARRAY_BUFFER, null);
    };
    DynamicMesh.prototype.uploadDataBufferIndices = function (gl, databuffer, dynamicdraw) {
        if (databuffer === void 0) { databuffer = null; }
        if (dynamicdraw === void 0) { dynamicdraw = true; }
        var buffer = this.bufferIndices;
        if (buffer == null)
            throw new Error('normal buffer is null');
        var data = null;
        if (databuffer != null && databuffer != this.m_dataIndices) {
            if (databuffer.byteLength > this.m_dataIndices.byteLength)
                throw new Error('normal buffer overflow');
            data = databuffer;
        }
        else {
            data = this.m_dataIndices;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, dynamicdraw ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    };
    return DynamicMesh;
}(Mesh));

var FRAME_INTERVAL = 60;
var FRAME_INTERVAL_P = FRAME_INTERVAL * 1000;
var FrameTimer = /** @class */ (function () {
    function FrameTimer(printFPS) {
        if (printFPS === void 0) { printFPS = false; }
        this.m_ts = 0;
        this.m_delta = 0;
        this.m_deltaaccu = 0;
        this.m_accuCount = 0;
        this.m_fps = 0;
        this.m_printfps = false;
        this.m_printfps = printFPS;
    }
    Object.defineProperty(FrameTimer.prototype, "fps", {
        get: function () {
            return this.m_fps;
        },
        enumerable: true,
        configurable: true
    });
    FrameTimer.prototype.tick = function (ts) {
        var delta = ts - this.m_ts;
        this.m_delta = delta;
        this.m_ts = ts;
        if (this.m_printfps) {
            this.m_deltaaccu += this.m_delta;
            var accuc = this.m_accuCount;
            accuc++;
            if (accuc >= FRAME_INTERVAL) {
                this.m_fps = FRAME_INTERVAL_P / this.m_deltaaccu;
                this.m_deltaaccu = 0;
                accuc = 0;
                console.log("FPS " + this.m_fps);
            }
            this.m_accuCount = accuc;
        }
        return delta;
    };
    return FrameTimer;
}());

var GizmosCmdType;
(function (GizmosCmdType) {
    GizmosCmdType[GizmosCmdType["none"] = 0] = "none";
    GizmosCmdType[GizmosCmdType["color"] = 1] = "color";
    GizmosCmdType[GizmosCmdType["mark"] = 2] = "mark";
    GizmosCmdType[GizmosCmdType["sphere"] = 3] = "sphere";
    GizmosCmdType[GizmosCmdType["box"] = 4] = "box";
    GizmosCmdType[GizmosCmdType["frustum"] = 5] = "frustum";
})(GizmosCmdType || (GizmosCmdType = {}));
var GizmosCmd = /** @class */ (function () {
    function GizmosCmd() {
        this.type = GizmosCmdType.none;
        this.param0 = vec4.zero;
        this.param1 = vec4.zero;
    }
    return GizmosCmd;
}());
var Gizmos = /** @class */ (function () {
    function Gizmos() {
        this.m_cmdlist = [];
        this.m_cmdCount = 0;
    }
    Object.defineProperty(Gizmos.prototype, "cmdlist", {
        get: function () {
            return this.m_cmdlist;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gizmos.prototype, "cmdCount", {
        get: function () {
            return this.m_cmdCount;
        },
        enumerable: true,
        configurable: true
    });
    Gizmos.prototype.onframe = function () {
        this.m_cmdCount = 0;
    };
    Gizmos.prototype.getNewCmd = function () {
        var cmdlist = this.m_cmdlist;
        if (cmdlist.length <= this.m_cmdCount) {
            var newcmd = new GizmosCmd();
            cmdlist.push(newcmd);
            this.m_cmdCount++;
            return newcmd;
        }
        else {
            var newcmd = cmdlist[this.m_cmdCount];
            this.m_cmdCount++;
            return newcmd;
        }
    };
    Gizmos.prototype.drawMark = function (origin) {
        var newcmd = this.getNewCmd();
        newcmd.type = GizmosCmdType.mark;
        newcmd.param0.setRaw(origin.raw);
    };
    Gizmos.prototype.drawColor = function (col) {
        var newcmd = this.getNewCmd();
        newcmd.type = GizmosCmdType.color;
        newcmd.param0.setRaw(col.raw);
    };
    Gizmos.prototype.drawSphere = function (origin, rad) {
        var newcmd = this.getNewCmd();
        newcmd.type = GizmosCmdType.sphere;
        newcmd.param0.setValue(origin.x, origin.y, origin.z, rad);
    };
    Gizmos.prototype.drawBox = function (origin, size, rota) {
        var newcmd = this.getNewCmd();
        newcmd.type = GizmosCmdType.box;
        newcmd.param0.setRaw(origin.raw);
        newcmd.param1.setRaw(size.raw);
        newcmd.extra = rota.clone();
    };
    Gizmos.prototype.drawFrustum = function () {
        throw new Error('not implemented');
    };
    return Gizmos;
}());

function ReleaseGraphicObj(gobj, glctx) {
    if (gobj == null)
        return;
    gobj.release(glctx);
    return null;
}

var __extends$5 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LightType;
(function (LightType) {
    LightType[LightType["direction"] = 0] = "direction";
    LightType[LightType["point"] = 1] = "point";
})(LightType || (LightType = {}));
var Light = /** @class */ (function (_super) {
    __extends$5(Light, _super);
    function Light(type, intensity, color) {
        var _this = _super.call(this) || this;
        _this.lightType = LightType.point;
        _this.intensity = 1.0;
        _this.lightColor = vec3.one;
        _this.m_range = 10;
        _this.m_paramDirty = true;
        _this.castShadow = false;
        _this.lightType = type;
        if (intensity)
            _this.intensity = intensity;
        if (color)
            _this.lightColor = color;
        return _this;
    }
    Object.defineProperty(Light.prototype, "range", {
        get: function () {
            return this.m_range;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Light.prototype, "lightPosData", {
        get: function () {
            if (this.lightType == LightType.direction) {
                return this.transform.forward;
            }
            else {
                return this.transform.localPosition;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Light.prototype, "isDirty", {
        get: function () {
            return this.transform.isDirty && this.m_paramDirty;
        },
        set: function (v) {
            if (v) {
                this.m_paramDirty = true;
            }
            else {
                this.m_paramDirty = false;
                this.transform.setLocalDirty(false);
            }
        },
        enumerable: true,
        configurable: true
    });
    Light.createPointLight = function (gobj, range, position, intensity, color) {
        if (range === void 0) { range = 10; }
        var light = new Light(LightType.point, intensity, color);
        gobj.addComponent(light);
        if (position)
            light.transform.localPosition = position;
        light.m_range = range;
        return light;
    };
    Light.creatDirctionLight = function (gobj, intensity, dir, color) {
        if (intensity === void 0) { intensity = 1.0; }
        if (dir === void 0) { dir = vec3.down; }
        if (color === void 0) { color = vec3.one; }
        var light = new Light(LightType.direction, intensity, color);
        gobj.addComponent(light);
        light.transform.forward = dir.Normalize();
        light.castShadow = true;
        return light;
    };
    Light.prototype.onUpdate = function (scene) {
        scene.addLight(this);
    };
    Light.prototype.getShaderLightPosData = function () {
        if (this.lightType == LightType.direction) {
            var fwd = this.transform.forward.raw;
            return glmath.vec4(-fwd[0], -fwd[1], -fwd[2], 1.0);
        }
        else {
            return this.transform.position.vec4(0.0);
        }
    };
    return Light;
}(Component));

var MeshBuilder = /** @class */ (function () {
    function MeshBuilder(topology) {
        this.m_indicesCount = 0;
        this.m_topology = topology;
        this.m_positions = [];
        this.m_indiecs = [];
    }
    MeshBuilder.prototype.addLine = function (p0, p1) {
        var pos = this.m_positions;
        pos.push(p0.x, p0.y, p0.z, 1.0, p1.x, p1.y, p1.z, 1.0);
        var indice = this.m_indiecs;
        var indiceCount = this.m_indicesCount;
        indice.push(indiceCount, indiceCount + 1);
        this.m_indicesCount += 2;
    };
    MeshBuilder.prototype.addLines = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        var len = arg.length;
        for (var t = 1; t < len; t++) {
            this.addLine(arg[t - 1], arg[t]);
        }
        if (len > 2) {
            this.addLine(arg[len - 1], arg[0]);
        }
    };
    MeshBuilder.prototype.addPoint = function (p) {
    };
    MeshBuilder.prototype.addTri = function (p0, p1, p2) {
        var pos = this.m_positions;
        pos.push(p0.x, p0.y, p0.z, 1.0);
        pos.push(p1.x, p1.y, p1.z, 1.0);
        pos.push(p2.x, p2.y, p2.z, 1.0);
        var index = this.m_indicesCount;
        this.m_indiecs.push(index, index + 1, index + 2);
        this.m_indicesCount = index + 3;
    };
    MeshBuilder.prototype.addTriRaw = function (ary) {
        if (ary.length != 6)
            throw new Error('invalid array');
        var pos = this.m_positions;
        pos.push.apply(pos, ary);
        var index = this.m_indicesCount;
        this.m_indiecs.push(index, index + 1, index + 2);
        this.m_indicesCount = index + 3;
    };
    MeshBuilder.prototype.addRect = function (rect, z) {
        var _a;
        var pos = this.m_positions;
        var x = rect.x;
        var y = rect.y;
        var w = rect.z;
        var h = rect.w;
        var i = this.m_positions.length / 4;
        pos.push.apply(pos, [x, y, z, 1, x + w, y, z, 1, x, y + h, z, 1, x + w, y + h, z, 1]);
        (_a = this.m_indiecs).push.apply(_a, [i, i + 1, i + 2, i + 1, i + 2, i + 3]);
        this.m_indicesCount = i + 6;
    };
    MeshBuilder.prototype.genMesh = function () {
        var topo = this.m_topology;
        var mesh = new Mesh();
        mesh.setPosition(new Float32Array(this.m_positions), GLConst.FLOAT, 4);
        mesh.setIndices(new Uint16Array(this.m_indiecs), GLConst.UNSIGNED_SHORT, topo);
        return mesh;
    };
    return MeshBuilder;
}());

var ShaderBuffer = /** @class */ (function () {
    function ShaderBuffer(bytesize) {
        this.minoff = 0;
        this.maxoff = 0;
        this.m_isdirty = false;
        this.maxoff = 0;
        this.minoff = bytesize;
        var buffer = new ArrayBuffer(bytesize);
        this.rawbuffer = buffer;
        this.dataView = new DataView(buffer);
        this.byteArray = new Uint8Array(buffer);
    }
    Object.defineProperty(ShaderBuffer.prototype, "isDirty", {
        get: function () { return this.m_isdirty; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderBuffer.prototype, "offsetMin", {
        get: function () { return this.minoff; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderBuffer.prototype, "offsetMax", {
        get: function () { return this.maxoff; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderBuffer.prototype, "raw", {
        get: function () {
            return this.byteArray;
        },
        enumerable: true,
        configurable: true
    });
    ShaderBuffer.prototype.setDirty = function (d) {
        this.m_isdirty = d;
        if (!d) {
            this.minoff = this.rawbuffer.byteLength;
            this.maxoff = 0;
        }
    };
    ShaderBuffer.prototype.set = function (fxbuffer, off) {
        this.byteArray.set(fxbuffer.byteArray, off);
    };
    ShaderBuffer.prototype.setOfView = function (fxview) {
        this.set(fxview.buffer, fxview.viewbase);
    };
    ShaderBuffer.prototype.setOfSubData = function (fxsubdata) {
        this.set(fxsubdata.bufferView.buffer, fxsubdata.baseOffset);
    };
    ShaderBuffer.prototype.setMinMaxOffset = function (byteOffset, length) {
        if (byteOffset < this.minoff)
            this.minoff = byteOffset;
        var max = byteOffset + length;
        if (max > this.maxoff)
            this.maxoff = max;
        this.m_isdirty = true;
    };
    ShaderBuffer.prototype.setFloat = function (byteOffset, value) {
        this.setMinMaxOffset(byteOffset, 4);
        this.dataView.setFloat32(byteOffset, value, true);
    };
    ShaderBuffer.prototype.setUint32 = function (byteOffset, value) {
        this.setMinMaxOffset(byteOffset, 4);
        this.dataView.setUint32(byteOffset, value);
    };
    ShaderBuffer.prototype.setVec3 = function (byteOffset, value) {
        this.setMinMaxOffset(byteOffset, 12);
        var raw = value.raw;
        var dv = this.dataView;
        var off = byteOffset;
        dv.setFloat32(off, raw[0], true);
        off += 4;
        dv.setFloat32(off, raw[1], true);
        off += 4;
        dv.setFloat32(off, raw[2], true);
    };
    ShaderBuffer.prototype.setVec4 = function (byteOffset, value) {
        this.setMinMaxOffset(byteOffset, 16);
        var raw = value.raw;
        var dv = this.dataView;
        var off = byteOffset;
        dv.setFloat32(off, raw[0], true);
        off += 4;
        dv.setFloat32(off, raw[1], true);
        off += 4;
        dv.setFloat32(off, raw[2], true);
        off += 4;
        dv.setFloat32(off, raw[3], true);
    };
    ShaderBuffer.prototype.setMat4 = function (byteOffset, value) {
        this.setMinMaxOffset(byteOffset, 64);
        var raw = value.raw;
        var dv = this.dataView;
        var len = raw.length;
        var off = byteOffset;
        for (var i = 0; i < len; i++) {
            dv.setFloat32(off, raw[i], true);
            off += 4;
        }
    };
    ShaderBuffer.prototype.setMat3 = function (byteOffset, value) {
        this.setMinMaxOffset(byteOffset, 36);
        var raw = value.raw;
        var dv = this.dataView;
        var len = raw.length;
        var off = byteOffset;
        for (var i = 0; i < len; i++) {
            dv.setFloat32(off, raw[i], true);
            off += 4;
        }
    };
    return ShaderBuffer;
}());
var ShaderBufferView = /** @class */ (function () {
    function ShaderBufferView(buffer, byteoffset, bytelength) {
        this.base = 0;
        this.fxbuffer = buffer;
        this.base = byteoffset;
    }
    Object.defineProperty(ShaderBufferView.prototype, "buffer", {
        get: function () {
            return this.fxbuffer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderBufferView.prototype, "viewbase", {
        get: function () {
            return this.base;
        },
        enumerable: true,
        configurable: true
    });
    ShaderBufferView.prototype.setFloat = function (byteoffset, val) {
        var base = this.base;
        this.fxbuffer.setFloat(base + byteoffset, val);
    };
    ShaderBufferView.prototype.setUint32 = function (byteoffset, val) {
        var base = this.base;
        this.fxbuffer.setUint32(base + byteoffset, val);
    };
    ShaderBufferView.prototype.setVec3 = function (byteoffset, val) {
        var base = this.base;
        this.fxbuffer.setVec3(base + byteoffset, val);
    };
    ShaderBufferView.prototype.setVec4 = function (byteoffset, val) {
        var base = this.base;
        this.fxbuffer.setVec4(base + byteoffset, val);
    };
    ShaderBufferView.prototype.setMat4 = function (byteoffset, val) {
        var base = this.base;
        this.fxbuffer.setMat4(base + byteoffset, val);
    };
    ShaderBufferView.prototype.setMat3 = function (byteoffset, val) {
        var base = this.base;
        this.fxbuffer.setMat3(base + byteoffset, val);
    };
    return ShaderBufferView;
}());
var ShaderSubData = /** @class */ (function () {
    function ShaderSubData(data, length, offset) {
        this.m_seperated = false;
        this.byteLength = length;
        if (data == null) {
            var buffer = new ShaderBuffer(length);
            this.view = new ShaderBufferView(buffer, 0, length);
            this.m_seperated = true;
        }
        else {
            this.view = new ShaderBufferView(data.fxbuffer, offset, length);
        }
        this.baseOffset = offset;
    }
    Object.defineProperty(ShaderSubData.prototype, "isSeperated", {
        get: function () { return this.m_seperated; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderSubData.prototype, "bufferView", {
        get: function () {
            return this.view;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderSubData.prototype, "isDirty", {
        get: function () {
            return this.view.buffer.isDirty;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderSubData.prototype, "setDirty", {
        set: function (v) {
            this.view.buffer.setDirty(v);
        },
        enumerable: true,
        configurable: true
    });
    return ShaderSubData;
}());
var ShaderData = /** @class */ (function () {
    function ShaderData(bytelength) {
        this.buffer = new ShaderBuffer(bytelength);
    }
    Object.defineProperty(ShaderData.prototype, "fxbuffer", {
        get: function () {
            return this.buffer;
        },
        enumerable: true,
        configurable: true
    });
    ShaderData.prototype.submitBuffer = function (gl, glbuffer) {
        var fxbuffer = this.buffer;
        if (!fxbuffer.isDirty)
            return false;
        var minoff = fxbuffer.offsetMin;
        var maxoff = fxbuffer.offsetMax;
        if (minoff >= maxoff) {
            fxbuffer.setDirty(false);
            return false;
        }
        gl.bindBuffer(gl.UNIFORM_BUFFER, glbuffer);
        gl.bufferSubData(gl.UNIFORM_BUFFER, minoff, fxbuffer.raw, minoff, maxoff - minoff);
        gl.bindBuffer(gl.UNIFORM_BUFFER, null);
        fxbuffer.setDirty(false);
        return true;
    };
    return ShaderData;
}());

var __extends$6 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ShaderFXLibs = /** @class */ (function () {
    function ShaderFXLibs(glctx) {
        this.glctx = glctx;
    }
    Object.defineProperty(ShaderFXLibs.prototype, "shaderUnlitColor", {
        get: function () {
            if (this.m_unlitColor == null) {
                this.m_unlitColor = ShaderFX.compileShaders(this.glctx, ShaderFXLibs.SH_unitColor);
            }
            return this.m_unlitColor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderFXLibs.prototype, "shaderUnlitTexture", {
        get: function () {
            if (this.m_unlitTexture == null) {
                this.m_unlitTexture = ShaderFX.compileShaders(this.glctx, ShaderFXLibs.SH_unlitTexture);
            }
            return this.m_unlitTexture;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderFXLibs.prototype, "shaderUVvalue", {
        get: function () {
            if (this.m_uvValue == null) {
                this.m_uvValue = ShaderFX.compileShaders(this.glctx, ShaderFXLibs.SH_uvValue);
            }
            return this.m_uvValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderFXLibs.prototype, "shaderDiffuse", {
        get: function () {
            if (this.m_diffuse == null) {
                this.m_diffuse = ShaderFX.compileShaders(this.glctx, ShaderFXLibs.SH_diffuse);
            }
            return this.m_diffuse;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderFXLibs.prototype, "shaderSkybox", {
        get: function () {
            if (this.m_skybox == null) {
                this.m_skybox = ShaderFX.compileShaders(this.glctx, ShaderFXLibs.SH_skybox);
            }
            return this.m_skybox;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderFXLibs.prototype, "shaderPbrMetallicRoughness", {
        get: function () {
            if (this.m_pbrMetallicRoughness == null) {
                this.m_pbrMetallicRoughness = ShaderFX.compileShaders(this.glctx, ShaderFXLibs.SH_pbrMetallicRoughness);
            }
            return this.m_pbrMetallicRoughness;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderFXLibs.prototype, "shaderDepth", {
        get: function () {
            if (this.m_depth == null) {
                this.m_depth = ShaderFX.compileShaders(this.glctx, ShaderFXLibs.SH_depth);
            }
            return this.m_depth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderFXLibs.prototype, "shaderShadowMap", {
        get: function () {
            if (this.m_shadermap == null) {
                this.m_shadermap = ShaderFX.compileShaders(this.glctx, ShaderFXLibs.SH_shadowmap);
            }
            return this.m_shadermap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderFXLibs.prototype, "shaderBlit", {
        get: function () {
            if (this.m_blit == null) {
                this.m_blit = ShaderFX.compileShaders(this.glctx, ShaderFXLibs.SH_blit);
            }
            return this.m_blit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderFXLibs.prototype, "shaderSprite", {
        get: function () {
            if (this.m_sprite == null) {
                this.m_sprite = ShaderFX.compileShaders(this.glctx, ShaderFXLibs.SH_sprite);
            }
            return this.m_sprite;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderFXLibs.prototype, "shaderScreenRect", {
        get: function () {
            if (this.m_screenRect == null) {
                this.m_screenRect = ShaderFX.compileShaders(this.glctx, ShaderFXLibs.SH_screenRect);
            }
            return this.m_screenRect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderFXLibs.prototype, "shaderShadowSample", {
        get: function () {
            if (this.m_shadowsample == null) {
                this.m_shadowsample = ShaderFX.compileShaders(this.glctx, ShaderFXLibs.SH_shadowsample);
            }
            return this.m_shadowsample;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderFXLibs.prototype, "shaderRect", {
        get: function () {
            if (this.m_shaderrect == null) {
                this.m_shaderrect = ShaderFX.compileShaders(this.glctx, ShaderFXLibs.SH_rect);
            }
            return this.m_shaderrect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderFXLibs.prototype, "shaderText", {
        get: function () {
            if (this.m_shadertext == null) {
                this.m_shadertext = ShaderFX.compileShaders(this.glctx, ShaderFXLibs.SH_text);
            }
            return this.m_shadertext;
        },
        enumerable: true,
        configurable: true
    });
    ShaderFXLibs.prototype.release = function () {
    };
    ShaderFXLibs.prototype.reload = function () {
    };
    ShaderFXLibs.SH_PBR_BaseColorFactor = "uColor";
    ShaderFXLibs.SH_PBR_BaseColorTexture = "uSampler";
    ShaderFXLibs.SH_PBR_MetallicFactor = "uMetallic";
    ShaderFXLibs.SH_PBR_RoughnessFactor = "uRoughness";
    ShaderFXLibs.SH_PBR_MetallicRoughnessTexture = "uTexMetallicRoughness";
    ShaderFXLibs.SH_PBR_EmissiveFactor = "uEmissive";
    ShaderFXLibs.SH_PBR_EmissiveTexture = "uTexEmissive";
    __decorate([
        ShaderFile("UnlitColor")
    ], ShaderFXLibs, "SH_unitColor", void 0);
    __decorate([
        ShaderFile("UnlitTexture")
    ], ShaderFXLibs, "SH_unlitTexture", void 0);
    __decorate([
        ShaderFile("uvValue")
    ], ShaderFXLibs, "SH_uvValue", void 0);
    __decorate([
        ShaderFile("diffuse")
    ], ShaderFXLibs, "SH_diffuse", void 0);
    __decorate([
        ShaderFile("skybox")
    ], ShaderFXLibs, "SH_skybox", void 0);
    __decorate([
        ShaderFile("pbrMetallicRoughness")
    ], ShaderFXLibs, "SH_pbrMetallicRoughness", void 0);
    __decorate([
        ShaderFile("depth")
    ], ShaderFXLibs, "SH_depth", void 0);
    __decorate([
        ShaderFile("shadowmap")
    ], ShaderFXLibs, "SH_shadowmap", void 0);
    __decorate([
        ShaderFile("blit")
    ], ShaderFXLibs, "SH_blit", void 0);
    __decorate([
        ShaderFile("sprite")
    ], ShaderFXLibs, "SH_sprite", void 0);
    __decorate([
        ShaderFile("screenRect")
    ], ShaderFXLibs, "SH_screenRect", void 0);
    __decorate([
        ShaderFile("shadowSample")
    ], ShaderFXLibs, "SH_shadowsample", void 0);
    __decorate([
        ShaderFile("rect")
    ], ShaderFXLibs, "SH_rect", void 0);
    __decorate([
        ShaderFile('text')
    ], ShaderFXLibs, "SH_text", void 0);
    __decorate([
        ShaderInc(ShaderFX.VARIANT_SHADERFX_BASIS)
    ], ShaderFXLibs, "SHADERFX_BASIS", void 0);
    __decorate([
        ShaderInc(ShaderFX.VARIANT_SHADERFX_LIGHT)
    ], ShaderFXLibs, "SHADERFX_LIGHT", void 0);
    __decorate([
        ShaderInc(ShaderFX.VARIANT_SHADERFX_LIGHTING)
    ], ShaderFXLibs, "SHADERFX_LIGHTING", void 0);
    __decorate([
        ShaderInc(ShaderFX.VARIANT_SHADERFX_SHADOWMAP)
    ], ShaderFXLibs, "SHADERFX_SHADOWMAP", void 0);
    return ShaderFXLibs;
}());
/** Shader DataBuffer */
var ShaderDataUniformObj = /** @class */ (function (_super) {
    __extends$6(ShaderDataUniformObj, _super);
    function ShaderDataUniformObj() {
        var _this = this;
        var buffersize = 16 * 4;
        _this = _super.call(this, buffersize) || this;
        _this.buffer.setMat4(0, mat4.Identity);
        return _this;
    }
    ShaderDataUniformObj.prototype.setMtxModel = function (mtx) {
        this.buffer.setMat4(0, mtx);
    };
    ShaderDataUniformObj.UNIFORM_OBJ = "UNIFORM_OBJ";
    return ShaderDataUniformObj;
}(ShaderData));
/**
 * four points light
 * [0]
 * vec4 lightColor0;
 * vec4 lightColor1;
 * vec4 lightColor2;
 * vec4 lightColor3;
 * vec4 lightIntensity;
 * vec4 lightPosX;
 * vec4 lightPosY;
 * vec4 lightPosZ;
 * [128]
 * vec4 light_ambient;
 * [144]
 * vec4 lightPrimePos;
 * vec4 lightPrimeColor;
 */
var ShaderDataUniformLight = /** @class */ (function (_super) {
    __extends$6(ShaderDataUniformLight, _super);
    function ShaderDataUniformLight() {
        var _this = this;
        var buffersize = (8 * 4 + 4 + 8) * 4;
        _this = _super.call(this, buffersize) || this;
        return _this;
    }
    ShaderDataUniformLight.prototype.setMainLight = function (light) {
        var buffer = this.buffer;
        if (light == null) {
            buffer.setVec4(144, vec4.zero);
            buffer.setVec4(160, vec4.zero);
        }
        else {
            buffer.setVec4(144, light.getShaderLightPosData());
            buffer.setVec4(160, light.lightColor.vec4(light.intensity));
        }
    };
    ShaderDataUniformLight.prototype.setPointLights = function (lights, count) {
        var buffer = this.buffer;
        var lintensity = new vec4();
        var lposx = new vec4();
        var lposy = new vec4();
        var lposz = new vec4();
        for (var t = 0; t < 4; t++) {
            if (t < count) {
                var light = lights[t];
                var lcol = light.lightColor;
                buffer.setVec4(t * 16, glmath.vec4(lcol.x, lcol.y, lcol.z, 1.0));
                var lpos = light.transform.position;
                lintensity.raw[t] = light.intensity;
                lposx.raw[t] = lpos.raw[0];
                lposy.raw[t] = lpos.raw[1];
                lposz.raw[t] = lpos.raw[2];
            }
            else {
                buffer.setVec4(t * 16, vec4.zero);
            }
        }
        buffer.setVec4(64, lintensity);
        buffer.setVec4(80, lposx);
        buffer.setVec4(96, lposy);
        buffer.setVec4(112, lposz);
    };
    ShaderDataUniformLight.prototype.setAmbientColor = function (ambient) {
        this.buffer.setVec4(128, ambient);
    };
    ShaderDataUniformLight.prototype.setLightCount = function (count) {
    };
    ShaderDataUniformLight.UNIFORM_LIGHT = "UNIFORM_LIGHT";
    return ShaderDataUniformLight;
}(ShaderData));
var ShaderDataUniformShadowMap = /** @class */ (function (_super) {
    __extends$6(ShaderDataUniformShadowMap, _super);
    function ShaderDataUniformShadowMap() {
        var _this = this;
        var buffersize = 16 * 4 * 4 + 4;
        _this = _super.call(this, buffersize) || this;
        return _this;
    }
    ShaderDataUniformShadowMap.prototype.setLightMtx = function (mtx, index) {
        this.buffer.setMat4(index * 64, mtx);
    };
    ShaderDataUniformShadowMap.prototype.setShadowDistance = function (dist) {
    };
    ShaderDataUniformShadowMap.prototype.setCascadeCount = function (count) {
    };
    return ShaderDataUniformShadowMap;
}(ShaderData));
var ShaderDataBasis = /** @class */ (function (_super) {
    __extends$6(ShaderDataBasis, _super);
    function ShaderDataBasis() {
        var _this = _super.call(this, 32 + 224 + 48) || this;
        _this.render = new ShaderDataRender(_this);
        _this.camrea = new ShaderDataCamera(_this);
        _this.ambientfog = new ShaderDataAmbientFog(_this);
        return _this;
    }
    ShaderDataBasis.prototype.updateDataBasic = function (data) {
        if (data.isSeperated) {
            this.buffer.setOfSubData(data);
            data.setDirty = false;
        }
    };
    ShaderDataBasis.prototype.updateDataCamera = function (data) {
        if (data.isSeperated) {
            this.buffer.setOfSubData(data);
            data.setDirty = false;
        }
    };
    ShaderDataBasis.prototype.updateDateAmbeintFog = function (data) {
        if (data.isSeperated) {
            this.buffer.setOfSubData(data);
            data.setDirty = false;
        }
    };
    ShaderDataBasis.prototype.submitBuffer = function (gl, glbuffer) {
        var min = this.buffer.offsetMin;
        var max = this.buffer.offsetMax;
        var t = _super.prototype.submitBuffer.call(this, gl, glbuffer);
        //if(t)console.log(min,max);
        return t;
    };
    return ShaderDataBasis;
}(ShaderData));
var ShaderDataRender = /** @class */ (function (_super) {
    __extends$6(ShaderDataRender, _super);
    //[0,16] vec4 _screenparam_
    //[16,32] highp vec4 _time_
    function ShaderDataRender(data) {
        return _super.call(this, data, 32, 0) || this;
    }
    ShaderDataRender.prototype.setScreenParam = function (width, height) {
        this.view.setVec4(0, new vec4([width, height, 1.0 / width, 1.0 / height]));
    };
    ShaderDataRender.prototype.setTime = function (t, ts) {
        this.view.setVec4(16, new vec4([t, ts, Math.sin(t), Math.cos(t)]));
    };
    return ShaderDataRender;
}(ShaderSubData));
var ShaderDataCamera = /** @class */ (function (_super) {
    __extends$6(ShaderDataCamera, _super);
    //[0,16] vec4 _camera_pos_;
    //[16,80] mat4 _camera_mtx_view_;
    //[80,96] vec4 _camera_projparam_;
    //[96,160] mat4 _camera_mtx_proj_;
    //[160,224] mat4 _camera_mtx_invproj_;
    function ShaderDataCamera(data) {
        return _super.call(this, data, 224, 32) || this;
    }
    ShaderDataCamera.prototype.setProjParam = function (near, far) {
        this.view.setVec4(80, new vec4([near, far, 1.0 / near, 1.0 / far]));
    };
    ShaderDataCamera.prototype.setCameraPos = function (pos) {
        this.view.setVec3(0, pos);
    };
    ShaderDataCamera.prototype.setCameraMtxView = function (view) {
        this.view.setMat4(16, view);
    };
    ShaderDataCamera.prototype.setCameraMtxProj = function (proj, invproj) {
        var view = this.view;
        view.setMat4(96, proj);
        if (invproj == null) {
            view.setMat4(160, proj.inverse());
        }
        else {
            view.setMat4(160, invproj);
        }
    };
    return ShaderDataCamera;
}(ShaderSubData));
/**
 *
 */
var ShaderDataAmbientFog = /** @class */ (function (_super) {
    __extends$6(ShaderDataAmbientFog, _super);
    //[0,16] lowp vec4 _ambientcolor_;
    //[16,32] vec4 _fogcolor_;
    //[32,48] vec4 _fogparam_;
    function ShaderDataAmbientFog(data) {
        return _super.call(this, data, 48, 256) || this;
    }
    ShaderDataAmbientFog.prototype.setAmbientColor = function (col) {
        this.view.setVec4(0, col);
    };
    ShaderDataAmbientFog.prototype.setFogColor = function (col) {
        this.view.setVec4(16, col);
    };
    ShaderDataAmbientFog.prototype.setFogParam = function (param) {
        this.view.setVec4(32, param);
    };
    return ShaderDataAmbientFog;
}(ShaderSubData));

var ShaderUniformBuffer = /** @class */ (function () {
    function ShaderUniformBuffer(glctx, datatype, uniformIndex, uniform_name) {
        var data = new datatype();
        var buffer = glctx.createBufferAndBind(GL.UNIFORM_BUFFER);
        glctx.bufferData(GL.UNIFORM_BUFFER, data.fxbuffer.raw, GL.DYNAMIC_DRAW);
        glctx.bindBufferBase(GL.UNIFORM_BUFFER, uniformIndex, buffer);
        this.m_glbuffer = buffer;
        this.m_uniformIndex = uniformIndex;
        this.m_data = data;
        this.name = uniform_name;
    }
    Object.defineProperty(ShaderUniformBuffer.prototype, "data", {
        get: function () { return this.m_data; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderUniformBuffer.prototype, "buffer", {
        get: function () { return this.m_glbuffer; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderUniformBuffer.prototype, "uniformIndex", {
        get: function () { return this.m_uniformIndex; },
        enumerable: true,
        configurable: true
    });
    ShaderUniformBuffer.prototype.uploadBufferData = function (glctx) {
        return this.m_data.submitBuffer(glctx.getWebGLRenderingContext(), this.m_glbuffer);
    };
    ShaderUniformBuffer.prototype.release = function (glctx) {
        glctx.deleteBuffer(this.m_glbuffer);
        this.m_glbuffer = null;
        this.m_data = null;
        this.m_uniformIndex = undefined;
    };
    return ShaderUniformBuffer;
}());

var __extends$7 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MeshRender = /** @class */ (function (_super) {
    __extends$7(MeshRender, _super);
    /**
     * @param mesh
     * @param mat
     * @param dynamic dynamic meshRender will not generate VertexArrayObject
     */
    function MeshRender(mesh, mat, dynamic) {
        if (dynamic === void 0) { dynamic = false; }
        var _this = _super.call(this) || this;
        _this.m_dynamic = false;
        _this.m_vaoProgamId = -1;
        _this.mesh = mesh;
        _this.material = mat;
        _this.castShadow = true;
        _this.m_dynamic = dynamic;
        return _this;
    }
    Object.defineProperty(MeshRender.prototype, "dynamic", {
        get: function () {
            return this.m_dynamic;
        },
        enumerable: true,
        configurable: true
    });
    MeshRender.prototype.release = function (glctx) {
        if (this.m_vao != null) {
            glctx.deleteVertexArray(this.m_vao);
            this.m_vao = null;
        }
        this.mesh = null;
    };
    MeshRender.prototype.draw = function (gl) {
        var mesh = this.mesh;
        var desc = mesh.indiceDesc;
        gl.drawElements(desc.topology, desc.indiceCount, desc.type, desc.offset);
    };
    MeshRender.prototype.refreshData = function (glctx) {
        var mesh = this.mesh;
        var mat = this.material;
        if (mat == null || mat.program == null) {
            throw new Error("material or program is null");
        }
        if (this.m_dynamic) {
            if (!mesh.bufferInited) {
                mesh.refreshMeshBuffer(glctx);
            }
        }
        else {
            var vao = this.m_vao;
            if (vao != null) {
                var curid = mat.program.id;
                if (curid == this.m_vaoProgamId)
                    return;
                glctx.deleteVertexArray(this.m_vao);
                this.m_vaoProgamId = -1;
            }
            this.m_vao = MeshRender.CreateVertexArrayObj(glctx, mesh, mat.program);
            this.m_vaoProgamId = mat.program.id;
        }
    };
    /**
     * Bind meshbuffers
     * dynamic meshrender: bindBuffer
     * static meshrender: bindVertexArray
     * @param glctx
     */
    MeshRender.prototype.bindVertexArray = function (glctx) {
        if (this.m_dynamic) {
            MeshRender.bindBuffers(glctx, this.mesh, this.material.program);
        }
        else {
            glctx.bindGLVertexArray(this.m_vao);
        }
    };
    /**
     * Unbind meshbuffers
     * dynamic meshrender: unbindBuffer
     * static meshrender: unbindVertexArray
     * @param glctx
     */
    MeshRender.prototype.unbindVertexArray = function (glctx, unbindBuffer) {
        if (unbindBuffer === void 0) { unbindBuffer = true; }
        if (this.m_dynamic) {
            if (unbindBuffer) {
                glctx.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, null);
                glctx.bindBuffer(GL.ARRAY_BUFFER, null);
            }
        }
        else {
            glctx.bindVertexArray(null);
        }
    };
    /**
     * @todo buffer binding
     * @param glctx
     * @param mesh
     * @param program
     */
    MeshRender.bindBuffers = function (glctx, mesh, program) {
        var vertdesc = mesh.vertexDesc;
        var attrs = program.Attributes;
        if (mesh.seperatedBuffer) {
            if (vertdesc.position != null) {
                var aPos = attrs[ShaderFX.ATTR_aPosition];
                if (aPos != null) {
                    glctx.bindBuffer(GL.ARRAY_BUFFER, mesh.bufferVertices);
                    var posdesc = vertdesc.position;
                    glctx.vertexAttribPointer(aPos, posdesc.size, GL.FLOAT, false, posdesc.size * 4, posdesc.offset);
                    glctx.enableVertexAttribArray(aPos);
                }
            }
            if (vertdesc.uv != null) {
                var aUV = attrs[ShaderFX.ATTR_aUV];
                if (aUV != null) {
                    glctx.bindBuffer(GL.ARRAY_BUFFER, mesh.bufferUV);
                    var uvdesc = vertdesc.uv;
                    glctx.vertexAttribPointer(aUV, uvdesc.size, GL.FLOAT, false, uvdesc.size * 4, uvdesc.offset);
                    glctx.enableVertexAttribArray(aUV);
                }
            }
            if (vertdesc.normal) {
                var aNorm = attrs[ShaderFX.ATTR_aNormal];
                if (aNorm != null) {
                    glctx.bindBuffer(GL.ARRAY_BUFFER, mesh.bufferNormal);
                    var normdesc = vertdesc.normal;
                    glctx.vertexAttribPointer(aNorm, normdesc.size, GL.FLOAT, false, normdesc.size * 4, normdesc.offset);
                    glctx.enableVertexAttribArray(aNorm);
                }
            }
            if (vertdesc.color) {
                var aColor = attrs[ShaderFX.ATTR_aColor];
                if (aColor != null) {
                    glctx.bindBuffer(GL.ARRAY_BUFFER, mesh.bufferColor);
                    var colordesc = vertdesc.color;
                    glctx.vertexAttribPointer(aColor, colordesc.size, GL.FLOAT, false, colordesc.size * 4, colordesc.offset);
                    glctx.enableVertexAttribArray(aColor);
                }
            }
            glctx.bindBuffer(GL.ARRAY_BUFFER, null);
        }
        else {
            glctx.bindBuffer(GL.ARRAY_BUFFER, mesh.bufferVertices);
            if (vertdesc.position != null) {
                var aPos = attrs[ShaderFX.ATTR_aPosition];
                if (aPos != null) {
                    var posdesc = vertdesc.position;
                    glctx.vertexAttribPointer(aPos, posdesc.size, GL.FLOAT, false, posdesc.size * 4, posdesc.offset);
                    glctx.enableVertexAttribArray(aPos);
                }
            }
            if (vertdesc.uv != null) {
                var aUV = attrs[ShaderFX.ATTR_aUV];
                if (aUV != null) {
                    var uvdesc = vertdesc.uv;
                    glctx.vertexAttribPointer(aUV, uvdesc.size, GL.FLOAT, false, uvdesc.size * 4, uvdesc.offset);
                    glctx.enableVertexAttribArray(aUV);
                }
            }
            if (vertdesc.normal) {
                var aNorm = attrs[ShaderFX.ATTR_aNormal];
                if (aNorm != null) {
                    var normdesc = vertdesc.normal;
                    glctx.vertexAttribPointer(aNorm, normdesc.size, GL.FLOAT, false, normdesc.size * 4, normdesc.offset);
                    glctx.enableVertexAttribArray(aNorm);
                }
            }
        }
        glctx.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, mesh.bufferIndices);
    };
    MeshRender.CreateVertexArrayObj = function (glctx, mesh, program) {
        if (!mesh.bufferInited) {
            mesh.refreshMeshBuffer(glctx);
        }
        if (program == null)
            throw new Error("program is null");
        var vao = glctx.createGLVertexArray();
        glctx.bindGLVertexArray(vao);
        MeshRender.bindBuffers(glctx, mesh, program);
        glctx.bindGLVertexArray(null);
        return vao;
    };
    return MeshRender;
}(BaseRender));

var IndexedBuffer = /** @class */ (function () {
    function IndexedBuffer() {
        this.array = [];
        this.capacity = 0;
        this.size = 0;
    }
    IndexedBuffer.prototype.push = function (t) {
        var idx = this.size;
        if (idx >= this.capacity) {
            this.array.push(t);
            this.capacity++;
        }
        else {
            this.array[idx] = t;
        }
        this.size = idx + 1;
    };
    IndexedBuffer.prototype.empty = function () {
        this.size = 0;
    };
    IndexedBuffer.prototype.release = function () {
        this.array = [];
        this.size = 0;
        this.capacity = 0;
    };
    return IndexedBuffer;
}());
var IndexedTypedBuffer = /** @class */ (function () {
    function IndexedTypedBuffer(type, size) {
        if (size === void 0) { size = 128; }
        this.size = 0;
        this.array = new type(size);
        this.m_capacity = size;
        this.m_type = type;
    }
    Object.defineProperty(IndexedTypedBuffer.prototype, "capacity", {
        get: function () { return this.m_capacity; },
        enumerable: true,
        configurable: true
    });
    IndexedTypedBuffer.prototype.push = function (val) {
        if (this.size >= this.m_capacity) {
            this.extendArray();
        }
        this.array[this.size] = val;
        this.size++;
    };
    IndexedTypedBuffer.prototype.checkExten = function (newsize) {
        if (this.size + newsize >= this.m_capacity) {
            this.extendArray();
            return true;
        }
        return false;
    };
    IndexedTypedBuffer.prototype.extendArray = function () {
        var capa = this.m_capacity * 2;
        this.m_capacity = capa;
        var newary = new this.m_type(capa);
        newary.set(this.array, 0);
        this.array = newary;
    };
    IndexedTypedBuffer.prototype.empty = function () {
        this.size = 0;
    };
    IndexedTypedBuffer.prototype.release = function () {
        this.array = null;
        this.m_capacity = 0;
        this.size = 0;
    };
    return IndexedTypedBuffer;
}());

var RenderNodeList = /** @class */ (function () {
    function RenderNodeList() {
        this.nodeOpaque = new IndexedBuffer();
        this.nodeTransparent = new IndexedBuffer();
        this.nodeImage = new IndexedBuffer();
        this.nodeOverlay = new IndexedBuffer();
    }
    RenderNodeList.prototype.reset = function () {
        this.nodeOpaque.empty();
        this.nodeTransparent.empty();
        this.nodeImage.empty();
        this.nodeOverlay.empty();
    };
    RenderNodeList.prototype.pushRenderNode = function (rnode) {
        var queue = rnode.renderQueue;
        if (queue == null) {
            if (rnode.material == null || rnode.material.shaderTags == null)
                return;
            queue = rnode.material.shaderTags.queue;
        }
        switch (queue) {
            case RenderQueue.Opaque:
                this.nodeOpaque.push(rnode);
                break;
            case RenderQueue.Transparent:
                this.nodeTransparent.push(rnode);
                break;
            case RenderQueue.Image:
                this.nodeImage.push(rnode);
                break;
            case RenderQueue.Overlay:
                this.nodeOverlay.push(rnode);
                break;
        }
    };
    RenderNodeList.prototype.sort = function () {
    };
    return RenderNodeList;
}());

var __extends$8 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Scene = /** @class */ (function (_super) {
    __extends$8(Scene, _super);
    function Scene() {
        var _this = _super.call(this) || this;
        _this.m_lightList = new Array(4);
        _this.m_lightCount = 0;
        _this.m_lightCountPrev = 0;
        _this.m_lightDataDirty = true;
        return _this;
    }
    Object.defineProperty(Scene.prototype, "lightDataList", {
        get: function () { return this.m_lightList; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "lightCount", {
        get: function () { return this.m_lightCount; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "lightDataDirty", {
        get: function () { return this.m_lightDataDirty; },
        set: function (val) { this.m_lightDataDirty = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "lightPrime", {
        /**
         * Primary light, usually directional light.
         */
        get: function () { return this.m_primeLight; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "lights", {
        get: function () {
            return this.m_lightList;
        },
        enumerable: true,
        configurable: true
    });
    Scene.prototype.onFrameStart = function () {
        this.m_lightCount = 0;
        this.m_primeLight = null;
    };
    Scene.prototype.onFrameEnd = function () {
        var lightcount = this.m_lightCount;
        if (!this.m_lightDataDirty && this.m_lightCountPrev != lightcount) {
            this.m_lightDataDirty = true;
        }
        this.m_lightCountPrev = lightcount;
        var primeLight = this.m_primeLight;
        if (primeLight != this.m_primeLightPrev) {
            this.m_lightDataDirty = true;
        }
        this.m_primeLightPrev = primeLight;
    };
    Scene.prototype.addLight = function (light) {
        if (light.lightType == LightType.direction) {
            this.m_primeLight = light;
        }
        else {
            var lightcount = this.m_lightCount;
            if (lightcount >= 4)
                return;
            if (light.isDirty) {
                light.isDirty = false;
                this.m_lightDataDirty = true;
            }
            this.m_lightList[lightcount] = light;
            this.m_lightCount = lightcount + 1;
        }
    };
    return Scene;
}(GameObject));

var SceneBuilder = /** @class */ (function () {
    function SceneBuilder() {
    }
    SceneBuilder.applyTRS = function (gobj, trs) {
        var pos = trs.pos;
        var gtrs = gobj.transform;
        if (pos != null) {
            gtrs.setPosition(new vec3(pos));
        }
        var rota = trs.rota;
        if (rota != null) {
            gtrs.setRotation(rota);
        }
        var scale = trs.scal;
        if (scale != null) {
            gtrs.setScale(new vec3(scale));
        }
    };
    SceneBuilder.ParseNode = function (node, gobj) {
        if (gobj == null)
            gobj = new GameObject();
        var comp = node.comp;
        if (comp != null)
            comp.forEach(function (c) { return gobj.addComponent(c); });
        if (node.trs != null)
            SceneBuilder.applyTRS(gobj, node.trs);
        var render = node.render;
        if (render != null) {
            gobj.render = render;
        }
        if (node.oncreate != null)
            node.oncreate(gobj);
        var children = node.children;
        if (children != null) {
            for (var key in children) {
                if (children.hasOwnProperty(key)) {
                    var cnode = children[key];
                    var cobj = SceneBuilder.ParseNode(cnode);
                    if (cobj != null)
                        cobj.name = key;
                    cobj.transform.parent = gobj.transform;
                }
            }
        }
        return gobj;
    };
    SceneBuilder.Build = function (rootnode) {
        var scene = new Scene();
        if (rootnode == null)
            return scene;
        SceneBuilder.ParseNode(rootnode, scene);
        return scene;
    };
    return SceneBuilder;
}());

var SceneManager = /** @class */ (function () {
    function SceneManager() {
    }
    SceneManager.prototype.onFrame = function (scene) {
        scene.onFrameStart();
        var strs = scene.transform;
        strs.localMatrix;
        strs.setObjMatrixDirty(false);
        scene.update(scene);
        scene.onFrameEnd();
    };
    return SceneManager;
}());

var SkyboxType;
(function (SkyboxType) {
    SkyboxType["CubeMap"] = "CUBE";
    SkyboxType["Tex360"] = "TEX";
    SkyboxType["Procedural"] = "PCG";
    SkyboxType["Custom"] = "CUSTOM";
})(SkyboxType || (SkyboxType = {}));
var Skybox = /** @class */ (function () {
    function Skybox(type) {
        this.m_type = type;
    }
    Object.defineProperty(Skybox.prototype, "type", {
        get: function () { return this.m_type; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "rawTex", {
        get: function () { return this.m_rawtex; },
        enumerable: true,
        configurable: true
    });
    Skybox.createFromCubeMap = function (cubemap) {
        if (cubemap == null)
            return null;
        var sb = new Skybox(SkyboxType.CubeMap);
        sb.m_rawtex = cubemap;
        return sb;
    };
    Skybox.createFromTex360 = function (tex) {
        if (tex == null)
            return null;
        var sb = new Skybox(SkyboxType.Tex360);
        sb.m_rawtex = tex;
        return sb;
    };
    Skybox.createFromProcedural = function () {
        var sb = new Skybox(SkyboxType.Procedural);
        return sb;
    };
    return Skybox;
}());

var ShadowCascade;
(function (ShadowCascade) {
    ShadowCascade[ShadowCascade["NoCascade"] = 1] = "NoCascade";
    ShadowCascade[ShadowCascade["TwoCascade"] = 2] = "TwoCascade";
    ShadowCascade[ShadowCascade["FourCascade"] = 4] = "FourCascade";
})(ShadowCascade || (ShadowCascade = {}));
var ShadowConfig = /** @class */ (function () {
    function ShadowConfig() {
        this.shadowmapSize = 1024;
        this.cascade = ShadowCascade.NoCascade;
        this.shadowDistance = 40.0;
        this.cascadeSplit = ShadowConfig.CASCADE_SPLIT_NONE;
    }
    ShadowConfig.CASCADE_SPLIT_TWO_CASCADE = [0.333, 0.667];
    ShadowConfig.CASCADE_SPLIT_FOUR_CASCADE = [0.067, 0.133, 0.266, 0.534];
    ShadowConfig.CASCADE_SPLIT_NONE = [1.0];
    return ShadowConfig;
}());
var ShadowMapData = /** @class */ (function () {
    function ShadowMapData() {
    }
    return ShadowMapData;
}());

var GraphicsRenderCreateInfo = /** @class */ (function () {
    function GraphicsRenderCreateInfo() {
        this.colorFormat = 0x8058;
        this.depthFormat = 0x81A6;
        this.frameBufferResizeDelay = 250;
    }
    return GraphicsRenderCreateInfo;
}());
var GraphicsRender = /** @class */ (function () {
    function GraphicsRender(canvas, pipeline, creationInfo) {
        this.shadowConfig = new ShadowConfig();
        this.pause = false;
        this.m_frameBufferInvalid = false;
        this.m_valid = false;
        this.m_time = 0;
        this.m_dt = 0;
        this.m_resizeDelayter = new Delayter();
        GraphicsRender.globalRender = this;
        this.canvas = canvas;
        this.gizmos = new Gizmos();
        this.m_screenWidth = canvas.clientWidth;
        this.m_screenHeight = canvas.clientHeight;
        if (creationInfo == null) {
            creationInfo = new GraphicsRenderCreateInfo();
            this.m_creationInfo = creationInfo;
        }
        var glctx = GLContext.createFromCanvas(canvas, {
            antialias: true,
            alpha: false,
            depth: false,
            stencil: false
        });
        this.m_glctx = glctx;
        this.m_shaderFXlib = new ShaderFXLibs(glctx);
        //default texture
        Material.DEF_TEXID_NUM = GraphicsRender.TEXID_DEFAULT_TEX;
        Texture2D.TEMP_TEXID = GL.TEXTURE2;
        this.m_defaultTexture = Texture2D.crateEmptyTexture(2, 2, glctx);
        glctx.activeTexture(GL.TEXTURE3);
        glctx.bindTexture(GL.TEXTURE_2D, this.m_defaultTexture.getRawTexture());
        glctx.frontFace(GL.CCW);
        this.setPipeline(pipeline);
    }
    Object.defineProperty(GraphicsRender.prototype, "isFrameBufferInvalid", {
        get: function () { return this.m_frameBufferInvalid; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsRender.prototype, "screenWidth", {
        get: function () { return this.m_screenWidth; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsRender.prototype, "screenHeight", {
        get: function () { return this.m_screenHeight; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsRender.prototype, "time", {
        get: function () { return this.m_time; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsRender.prototype, "deltaTime", {
        get: function () { return this.m_dt; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsRender.prototype, "pipeline", {
        get: function () {
            return this.m_renderPipeline;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsRender.prototype, "shaderLib", {
        get: function () {
            return this.m_shaderFXlib;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsRender.prototype, "glctx", {
        get: function () {
            return this.m_glctx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsRender.prototype, "defaultTexture", {
        get: function () {
            return this.m_defaultTexture;
        },
        enumerable: true,
        configurable: true
    });
    GraphicsRender.prototype.setPipeline = function (pipeline) {
        if (pipeline == null)
            return;
        var curpipeline = this.m_renderPipeline;
        if (curpipeline != null) {
            curpipeline.release();
            curpipeline = null;
        }
        pipeline.graphicRender = this;
        pipeline.onSetupRender(this.glctx, this.m_creationInfo);
        this.m_renderPipeline = pipeline;
        this.m_valid = true;
    };
    GraphicsRender.prototype.reload = function () {
        var shaderfxlib = this.m_shaderFXlib;
        if (shaderfxlib != null)
            shaderfxlib.reload();
        var renderpipeline = this.m_renderPipeline;
        if (renderpipeline != null)
            renderpipeline.reload();
    };
    GraphicsRender.prototype.release = function () {
        var renderpipe = this.m_renderPipeline;
        if (renderpipe != null) {
            renderpipe.release();
            this.m_renderPipeline = null;
        }
        this.m_shaderFXlib.release();
        this.m_time = 0.0;
        this.m_valid = false;
    };
    GraphicsRender.prototype.resizeCanvas = function (w, h) {
        var canvas = this.canvas;
        if (canvas.width == w && canvas.width == h)
            return;
        if (w <= 0 || h <= 0) {
            this.m_frameBufferInvalid = true;
            return;
        }
        else {
            this.m_frameBufferInvalid = false;
        }
        if (!this.m_valid)
            return;
        var self = this;
        var delay = this.m_creationInfo.frameBufferResizeDelay;
        if (delay == 0) {
            canvas.width = w;
            canvas.height = h;
            self.doResizeFrameBuffer(w, h);
            return;
        }
        else {
            var delayter = this.m_resizeDelayter;
            delayter.delaytime = delay;
            delayter.emit(function () {
                canvas.width = w;
                canvas.height = h;
                self.doResizeFrameBuffer(w, h);
            });
        }
    };
    GraphicsRender.prototype.doResizeFrameBuffer = function (w, h) {
        this.m_screenWidth = w;
        this.m_screenHeight = h;
        this.m_renderPipeline.resizeFrameBuffer(w, h);
    };
    /**
     *
     * @param scene
     * @param dt deltaTime /s
     */
    GraphicsRender.prototype.render = function (scene, dt) {
        if (this.pause || this.m_frameBufferInvalid)
            return;
        this.m_time += dt;
        this.m_dt = dt;
        // gl.clearColor(0,0,0,1);
        // gl.clear(gl.COLOR_BUFFER_BIT);
        var p = this.pipeline;
        if (p == null)
            return;
        p.exec(scene);
        this.lateRender();
    };
    GraphicsRender.prototype.lateRender = function () {
        this.gizmos.onframe();
    };
    /**
     * return GLES view coord [-1,1]
     */
    GraphicsRender.prototype.canvasCoordToViewCoord = function (pointerx, pointery) {
        var x = pointerx / this.screenWidth * 2.0 - 1.0;
        var y = 1.0 - 2.0 * pointery / this.screenHeight;
        return new vec2([x, y]);
    };
    GraphicsRender.prototype.renderToCanvas = function () {
        this.pipeline.onRenderToCanvas();
    };
    GraphicsRender.TEXID_FB = 0;
    GraphicsRender.TEXID_TEMP = 2;
    GraphicsRender.TEXID_DEFAULT_TEX = 3;
    GraphicsRender.TEXID_SHADER_TEX = [4, 5, 6, 7, 8, 9, 10, 11];
    GraphicsRender.TEXID_SHADOW_MAP = [15, 16, 17, 18];
    return GraphicsRender;
}());

var __extends$9 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SpriteRender = /** @class */ (function (_super) {
    __extends$9(SpriteRender, _super);
    function SpriteRender() {
        var _this = _super.call(this) || this;
        _this.m_imageDirty = false;
        _this.m_color = vec4.one;
        _this.m_colorDirty = true;
        _this.mesh = Mesh.Quad;
        _this.material = new Material(GraphicsRender.globalRender.shaderLib.shaderSprite);
        return _this;
    }
    Object.defineProperty(SpriteRender.prototype, "image", {
        get: function () { return this.m_image; },
        set: function (t) {
            if (t == this.m_image)
                return;
            this.m_image = t;
            this.m_imageDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpriteRender.prototype, "color", {
        get: function () { return this.m_color; },
        set: function (c) { this.m_color.set(c); this.m_colorDirty = true; },
        enumerable: true,
        configurable: true
    });
    SpriteRender.prototype.refreshData = function (glctx) {
        _super.prototype.refreshData.call(this, glctx);
        if (this.m_imageDirty) {
            this.material.setTexture(ShaderFX.UNIFORM_MAIN_TEXTURE, this.m_image);
            this.m_imageDirty = false;
        }
        if (this.m_colorDirty) {
            this.m_colorDirty = false;
            this.material.setColor(ShaderFX.UNIFORM_MAIN_COLOR, this.m_color);
        }
    };
    return SpriteRender;
}(MeshRender));

var __awaiter$6 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$6 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * TEXTURE_CUBE_MAP wrapped by Texture
 */
var TextureCubeMap = /** @class */ (function () {
    function TextureCubeMap(tex, width, height, desc) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        this.m_raw = tex;
        this.m_width = width;
        this.m_height = height;
        this.m_desc = desc == null ? null : TextureDescUtility.clone(desc);
    }
    TextureCubeMap.prototype.getDesc = function () {
        return this.m_desc;
    };
    TextureCubeMap.prototype.getRawTexture = function () {
        return this.m_raw;
    };
    TextureCubeMap.prototype.release = function (glctx) {
        if (this.m_raw != null) {
            glctx.deleteTexture(this.m_raw);
            this.m_raw = null;
        }
        return;
    };
    /**
     * create cubemap texture with six-faces images
     * @param imgs
     * @param glctx
     */
    TextureCubeMap.loadCubeMapImage = function (imgs, glctx) {
        var texcube = null;
        try {
            var gltexcube = glctx.createTexture();
            glctx.activeTexture(Texture2D.TEMP_TEXID);
            glctx.bindTexture(GL.TEXTURE_CUBE_MAP, gltexcube);
            var imgw = imgs[0].width;
            var imgh = imgs[0].height;
            for (var i = 0; i < 6; i++) {
                var img = imgs[i];
                glctx.texImage2D(GL.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, GL.RGB, imgw, imgh, 0, GL.RGB, GL.UNSIGNED_BYTE, img);
            }
            glctx.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
            glctx.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
            glctx.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
            glctx.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
            glctx.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_WRAP_R, GL.CLAMP_TO_EDGE);
            glctx.bindTexture(GL.TEXTURE_CUBE_MAP, null);
            var desc = {
                format: GL.RGB,
                internalformat: GL.RGB,
                mipmap: false,
                min_filter: GL.LINEAR,
                mag_filter: GL.LINEAR
            };
            texcube = new TextureCubeMap(gltexcube, imgw, imgh, desc);
            texcube.m_raw = gltexcube;
            return texcube;
        }
        catch (e) {
            console.error(e);
            return null;
        }
    };
    /**
     * create cubemap texture with six-faces images
     * @param urls [Front,Back,Up,Down,Right,Left]
     * @param glctx
     */
    TextureCubeMap.loadCubeMap = function (urls, glctx) {
        return __awaiter$6(this, void 0, void 0, function () {
            var _this = this;
            return __generator$6(this, function (_a) {
                if (urls == null || urls.length != 6)
                    return [2 /*return*/, null];
                return [2 /*return*/, new Promise(function (res, rej) { return __awaiter$6(_this, void 0, void 0, function () {
                        var imgpromises, imgurls, i, imgs, texcube;
                        return __generator$6(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    imgpromises = [];
                                    imgurls = urls;
                                    for (i = 0; i < 6; i++) {
                                        imgpromises.push(GLUtility.loadImage(imgurls[i]));
                                    }
                                    return [4 /*yield*/, Promise.all(imgpromises)];
                                case 1:
                                    imgs = _a.sent();
                                    if (imgs.length != 6) {
                                        rej('load image failed!');
                                        return [2 /*return*/];
                                    }
                                    texcube = TextureCubeMap.loadCubeMapImage(imgs, glctx);
                                    res(texcube);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return TextureCubeMap;
}());

var TextureSampler = /** @class */ (function () {
    function TextureSampler() {
    }
    Object.defineProperty(TextureSampler.prototype, "rawobj", {
        get: function () { return this.m_rawobj; },
        enumerable: true,
        configurable: true
    });
    TextureSampler.create = function (gl, desc) {
        desc = desc || {};
        var texsampler = new TextureSampler();
        var sampler = gl.createSampler();
        if (desc.CompareFunc != null)
            gl.samplerParameteri(sampler, gl.TEXTURE_COMPARE_FUNC, desc.CompareFunc);
        if (desc.CompareMode != null)
            gl.samplerParameteri(sampler, gl.TEXTURE_COMPARE_MODE, desc.CompareMode);
        if (desc.MagFilter != null)
            gl.samplerParameteri(sampler, gl.TEXTURE_MAG_FILTER, desc.MagFilter);
        if (desc.MinFileter != null)
            gl.samplerParameteri(sampler, gl.TEXTURE_MIN_FILTER, desc.MinFileter);
        if (desc.WrapR != null)
            gl.samplerParameteri(sampler, gl.TEXTURE_WRAP_R, desc.WrapR);
        if (desc.WrapS != null)
            gl.samplerParameteri(sampler, gl.TEXTURE_WRAP_S, desc.WrapS);
        if (desc.WrapT != null)
            gl.samplerParameteri(sampler, gl.TEXTURE_WRAP_T, desc.WrapT);
        texsampler.m_rawobj = sampler;
        return texsampler;
    };
    TextureSampler.prototype.release = function (gl) {
        if (this.m_rawobj != null) {
            gl.deleteSampler(this.m_rawobj);
        }
        this.m_rawobj = null;
    };
    return TextureSampler;
}());

var GraphicsContext = /** @class */ (function () {
    function GraphicsContext() {
    }
    Object.defineProperty(GraphicsContext, "currentRender", {
        get: function () { return GraphicsContext.m_currentRender; },
        enumerable: true,
        configurable: true
    });
    GraphicsContext.activeRender = function (g) {
        GraphicsContext.m_currentRender = g;
    };
    return GraphicsContext;
}());

var Color = /** @class */ (function () {
    function Color() {
    }
    Color.RED = [1, 0, 0, 1];
    Color.BLACK = [0, 0, 0, 1];
    Color.WHITE = [1, 1, 1, 1];
    Color.GREEN = [0, 1, 0, 1];
    Color.BLUE = [0, 0, 1, 1];
    Color.YELLOW = [1, 1, 0, 1];
    Color.GREY = Utility.colorRGBA(200, 200, 200, 255);
    Color.COLOR_ERROR = [1, 0, 1, 1];
    return Color;
}());

var __extends$a = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PassGizmos = /** @class */ (function (_super) {
    __extends$a(PassGizmos, _super);
    function PassGizmos(pipe) {
        var _this = _super.call(this, pipe) || this;
        _this.enable = true;
        var glctx = pipe.glctx;
        if (PassGizmos.s_shader == null) {
            var shader = ShaderFX.compileShaders(pipe.glctx, PassGizmos.SH_gizmos);
            PassGizmos.s_shader = shader;
        }
        var mat = new Material(PassGizmos.s_shader);
        _this.m_material = mat;
        var mesh = _this.genMesh();
        _this.m_mesh = mesh;
        if (mesh != null) {
            _this.m_vao = MeshRender.CreateVertexArrayObj(pipe.glctx, mesh, mat.program);
        }
        var tags = new ShaderTags();
        tags.blend = false;
        tags.ztest = Comparison.LEQUAL;
        tags.zwrite = false;
        tags.fillDefaultVal();
        _this.m_tags = tags;
        _this.genMeshCross();
        _this.createMesh();
        var meshBox = _this.m_meshBoxWire;
        _this.m_meshBoxWireVAO = MeshRender.CreateVertexArrayObj(glctx, meshBox, _this.m_matColor.program);
        return _this;
    }
    PassGizmos.prototype.render = function (scene) {
        if (!this.enable)
            return;
        // const mesh =this.m_mesh;
        // if(mesh == null) return;
        // const CLASS = PipelineBase;
        // const NAME_BASIS = ShaderFX.UNIFORM_BASIS;
        // const NAME_OBJ = ShaderFX.UNIFORM_OBJ;
        var pipeline = this.pipeline;
        var model = pipeline.model;
        var glctx = pipeline.glctx;
        var matcolor = this.m_matColor;
        glctx.bindGLFramebuffer(pipeline.mainFrameBuffer);
        if (scene != null) {
            this.drawLightMark(scene);
        }
        //draw gizmos
        var gizmos = pipeline.graphicRender.gizmos;
        var cmdCount = gizmos.cmdCount;
        if (cmdCount == 0)
            return;
        var cmdlist = gizmos.cmdlist;
        cmdlist.sort(function (a, b) { return a.type - b.type; });
        for (var t = 0; t < cmdCount; t++) {
            var cmd = cmdlist[t];
            switch (cmd.type) {
                case GizmosCmdType.box:
                    matcolor.setColor(ShaderFX.UNIFORM_MAIN_COLOR, glmath.vec4(1.0, 0, 0, 1));
                    var mtx = mat4.TRS(cmd.param0.vec3(), cmd.extra, vec3.one);
                    model.drawMeshWithMat(this.m_meshBoxWire, matcolor, this.m_meshBoxWireVAO, mtx);
                    break;
            }
        }
        // pipeline.stateCache.apply(this.m_tags);
        // let mat = this.m_material;
        // let program = mat.program;
        // let glp = program.Program;
        // gl.useProgram(program.Program);
        // const ublock = program.UniformBlock;
        // let indexCam = ublock[NAME_BASIS];
        // if (indexCam != null) gl.uniformBlockBinding(glp, indexCam, CLASS.UNIFORMINDEX_BASIS);
        // let indexObj = ublock[NAME_OBJ];
        // if (indexObj != null) gl.uniformBlockBinding(glp, indexObj, CLASS.UNIFORMINDEX_OBJ);
        // mat.apply(gl);
        // let dataobj = pipeline.shaderDataObj;
        // const mtx = mat4.Identity;
        // dataobj.setMtxModel(mtx);
        // pipeline.updateUniformBufferObject(dataobj);
        // gl.bindVertexArray(this.m_vao);
        // const indiceDesc= mesh.indiceDesc;
        // gl.drawElements(indiceDesc.topology,indiceDesc.indiceCount,indiceDesc.type,indiceDesc.offset);
        // gl.bindVertexArray(null);
    };
    PassGizmos.prototype.drawLightMark = function (scene) {
        var lights = scene.lights;
        var lightcount = scene.lightCount;
        var model = this.pipeline.model;
        var mesh = this.m_meshcross;
        var meshvao = this.m_meshvao;
        var mat = this.m_matColor;
        var lightPrime = scene.lightPrime;
        if (lightPrime != null) {
            mat.setColor(ShaderFX.UNIFORM_MAIN_COLOR, lightPrime.lightColor.vec4(1.0));
            model.drawMeshWithMat(mesh, mat, meshvao, lightPrime.transform.objMatrix);
        }
        if (lights == null || lightcount == 0)
            return;
        for (var t = 0; t < lightcount; t++) {
            var light = lights[t];
            mat.setColor(ShaderFX.UNIFORM_MAIN_COLOR, light.lightColor.vec4(1.0));
            model.drawMeshWithMat(mesh, mat, meshvao, light.transform.objMatrix);
        }
    };
    PassGizmos.prototype.genMeshCross = function () {
        var crossbuilder = new MeshBuilder(MeshTopology.Lines);
        crossbuilder.addLine(glmath.vec3(-0.3, 0, 0), glmath.vec3(0.3, 0, 0));
        crossbuilder.addLine(glmath.vec3(0, -0.3, 0), glmath.vec3(0, 0.3, 0));
        crossbuilder.addLine(glmath.vec3(0, 0, -0.3), glmath.vec3(0, 0, 0.3));
        this.m_meshcross = crossbuilder.genMesh();
        var pipe = this.pipeline;
        var mat = new Material(pipe.graphicRender.shaderLib.shaderUnlitColor);
        this.m_matColor = mat;
        mat.setColor(ShaderFX.UNIFORM_MAIN_COLOR, glmath.vec4(1.0, 0, 0, 1.0));
        this.m_meshvao = MeshRender.CreateVertexArrayObj(pipe.glctx, this.m_meshcross, mat.program);
    };
    PassGizmos.prototype.genMesh = function () {
        var builder = new MeshBuilder(MeshTopology.Lines);
        builder.addLine(glmath.vec3(-50, 0, 0), glmath.vec3(50, 0, 0));
        builder.addLine(glmath.vec3(0, 0, -50), glmath.vec3(0, 0, 50));
        builder.addLine(glmath.vec3(-5, 0, -5), glmath.vec3(5, 0, -5));
        builder.addLine(glmath.vec3(5, 0, -5), glmath.vec3(5, 0, 5));
        builder.addLine(glmath.vec3(5, 0, 5), glmath.vec3(-5, 0, 5));
        builder.addLine(glmath.vec3(-5, 0, 5), glmath.vec3(-5, 0, -5));
        return builder.genMesh();
    };
    PassGizmos.prototype.createMesh = function () {
        var boxbuilder = new MeshBuilder(MeshTopology.Lines);
        var p0 = glmath.vec3(0.5, 0.5, 0.5);
        var p1 = glmath.vec3(0.5, 0.5, -0.5);
        var p2 = glmath.vec3(-0.5, 0.5, -0.5);
        var p3 = glmath.vec3(-0.5, 0.5, 0.5);
        var p4 = glmath.vec3(0.5, -0.5, 0.5);
        var p5 = glmath.vec3(0.5, -0.5, -0.5);
        var p6 = glmath.vec3(-0.5, -0.5, -0.5);
        var p7 = glmath.vec3(-0.5, -0.5, 0.5);
        boxbuilder.addLines(p0, p1, p2, p3);
        boxbuilder.addLines(p4, p5, p6, p7);
        boxbuilder.addLine(p0, p4);
        boxbuilder.addLine(p1, p5);
        boxbuilder.addLine(p2, p6);
        boxbuilder.addLine(p3, p7);
        this.m_meshBoxWire = boxbuilder.genMesh();
    };
    __decorate$1([
        ShaderFile("gizmos")
    ], PassGizmos, "SH_gizmos", void 0);
    return PassGizmos;
}(RenderPass));

var __extends$b = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PassOpaque = /** @class */ (function (_super) {
    __extends$b(PassOpaque, _super);
    function PassOpaque(pipeline) {
        var _this = _super.call(this, pipeline) || this;
        var deftags = new ShaderTags();
        deftags.blendOp = null;
        deftags.blend = false;
        deftags.zwrite = true;
        deftags.ztest = Comparison.LEQUAL;
        deftags.culling = null;
        _this.m_tags = deftags;
        pipeline.glctx.enable(GL.DEPTH_TEST);
        return _this;
        //pipeline.glctx.polygonOffset(-1,-1);
    }
    PassOpaque.prototype.render = function (scene) {
        var queue = this.pipeline.nodeList.nodeOpaque;
        var pipe = this.pipeline;
        var glctx = pipe.glctx;
        var cam = scene.mainCamera;
        if (queue.size == 0)
            return;
        var model = pipe.model;
        // glctx.enable(GL.POLYGON_OFFSET_FILL);
        var deftags = this.m_tags;
        glctx.pipelineState(deftags);
        glctx.depthMask(true);
        var mainfb = pipe.mainFrameBuffer;
        glctx.viewport(0, 0, mainfb.width, mainfb.height);
        glctx.bindGLFramebuffer(mainfb);
        var len = queue.size;
        var queueary = queue.array;
        for (var t = 0; t < len; t++) {
            var node = queueary[t];
            if (node instanceof MeshRender) {
                model.drawMeshRender(node, node.object.transform.objMatrix);
            }
            else {
                node.draw(glctx, model);
            }
        }
        // gl.disable(gl.POLYGON_OFFSET_FILL);
    };
    return PassOpaque;
}(RenderPass));

var __extends$c = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SM_SIZE = 1024;
var PassShadow = /** @class */ (function (_super) {
    __extends$c(PassShadow, _super);
    function PassShadow(pipeline) {
        var _this = _super.call(this, pipeline) || this;
        var glctx = pipeline.glctx;
        var tex = Texture2D.createTexture2D(SM_SIZE, SM_SIZE, {
            internalformat: GL.DEPTH_COMPONENT24,
            min_filter: GL.NEAREST,
            mag_filter: GL.NEAREST,
            wrap_s: GL.REPEAT,
            wrap_t: GL.REPEAT,
            compare_mode: GL.COMPARE_REF_TO_TEXTURE
        }, glctx);
        _this.m_fbShadow = FrameBuffer.createFromTexture(glctx, {
            depthTex: tex
        });
        var matSMgather = new Material(pipeline.graphicRender.shaderLib.shaderShadowMap);
        _this.m_uniformLightVP = matSMgather.propertyBlock.getUniform("uLightVP");
        _this.m_matShadowGather = matSMgather;
        var model = _this.pipeline.model;
        model.addBufferDebugInfo(new BufferDebugInfo(_this.m_fbShadow.depthtex, glmath.vec4(0, 0, 128, 128)));
        model.setShadowMapTex(tex, 0);
        return _this;
    }
    PassShadow.prototype.render = function (scene) {
        if (scene == null)
            return;
        var lightPrim = scene.lightPrime;
        var pipeline = this.pipeline;
        var glctx = pipeline.glctx;
        var matShadowGather = this.m_matShadowGather;
        var uniformLightVP = this.m_uniformLightVP;
        var queue = pipeline.nodeList.nodeOpaque;
        if (queue == null || queue.size == 0)
            return;
        var model = pipeline.model;
        if (lightPrim != null && lightPrim.castShadow) {
            glctx.viewport(0, 0, SM_SIZE, SM_SIZE);
            glctx.bindGLFramebuffer(this.m_fbShadow);
            //draw sm
            glctx.clearDepth(1000);
            glctx.clear(GL.DEPTH_BUFFER_BIT);
            glctx.enable(GL.DEPTH_TEST);
            glctx.depthMask(true);
            //config light mtx;
            var lightProj = mat4.orthographic(10, 10, 0.1, 20); //mat4.orthographic(10,10,0.01,100);
            var lightView = mat4.coordCvt(lightPrim.transform.position, lightPrim.lightPosData, lightPrim.transform.worldUp);
            if (!lightView.isValid) {
                throw new Error("invalid lightMtx");
            }
            var lightmtx = lightProj.mul(lightView);
            uniformLightVP.value = lightmtx;
            var uniformSM = model.uniformShadowMap;
            uniformSM.data.setLightMtx(lightmtx, 0);
            model.updateUniformShadowMap();
            var queuelen = queue.size;
            var queueary = queue.array;
            for (var t = 0; t < queuelen; t++) {
                var node = queueary[t];
                if (node instanceof MeshRender && node.castShadow) {
                    model.drawMeshRender(node, node.object.transform.objMatrix, matShadowGather);
                }
            }
            glctx.bindGLFramebuffer(null);
        }
    };
    return PassShadow;
}(RenderPass));

var __extends$d = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PassSkybox = /** @class */ (function (_super) {
    __extends$d(PassSkybox, _super);
    function PassSkybox(pipeline) {
        var _this = _super.call(this, pipeline) || this;
        _this.m_lastSkyboxType = SkyboxType.Tex360;
        var deftags = new ShaderTags();
        deftags.blend = false;
        deftags.zwrite = true;
        deftags.ztest = Comparison.LEQUAL;
        deftags.culling = CullingMode.Back;
        deftags.fillDefaultVal();
        _this.m_tags = deftags;
        var mat = new Material(pipeline.graphicRender.shaderLib.shaderSkybox);
        mat.setFlag("ENVMAP_TYPE", "TEX", true);
        var skyrender = new MeshRender(Mesh.Quad, mat);
        _this.m_skyrender = skyrender;
        return _this;
    }
    PassSkybox.prototype.release = function () {
        this.m_skyrender.release(this.pipeline.glctx);
        this.m_skyrender = null;
        this.m_lastTex = null;
        _super.prototype.release.call(this);
    };
    PassSkybox.prototype.render = function (scene) {
        var camera = scene.mainCamera;
        if (camera.clearType != ClearType.Skybox || camera.skybox == null)
            return;
        var pipeline = this.pipeline;
        var glctx = pipeline.glctx;
        glctx.bindGLFramebuffer(pipeline.mainFrameBuffer);
        var skyboxrender = this.m_skyrender;
        var mat = skyboxrender.material;
        var texskybox = camera.skybox;
        if (texskybox.type != this.m_lastSkyboxType) {
            var newtype = texskybox.type;
            this.m_lastSkyboxType = newtype;
            mat.setFlag("ENVMAP_TYPE", newtype, true);
            var rawtex_1 = texskybox.rawTex;
            mat.setTexture(ShaderFX.UNIFORM_MAIN_TEXTURE, rawtex_1);
        }
        var rawtex = texskybox.rawTex;
        if (rawtex != null && rawtex != this.m_lastTex) {
            var tex = texskybox.rawTex;
            this.m_lastTex = tex;
            mat.setTexture(ShaderFX.UNIFORM_MAIN_TEXTURE, tex);
        }
        pipeline.model.drawMeshRender(skyboxrender);
    };
    return PassSkybox;
}(RenderPass));

var __extends$e = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PassOverlay = /** @class */ (function (_super) {
    __extends$e(PassOverlay, _super);
    function PassOverlay(pipeline) {
        return _super.call(this, pipeline) || this;
    }
    PassOverlay.prototype.render = function (scene) {
        var queue = this.pipeline.nodeList.nodeOverlay;
        if (queue.size == 0)
            return;
        var pipe = this.pipeline;
        var glctx = pipe.glctx;
        var model = pipe.model;
        var mainfb = pipe.mainFrameBuffer;
        glctx.viewport(0, 0, mainfb.width, mainfb.height);
        glctx.bindGLFramebuffer(mainfb);
        var len = queue.size;
        var queueary = queue.array;
        for (var t = 0; t < len; t++) {
            var node = queueary[t];
            if (node instanceof MeshRender) {
                model.drawMeshRender(node, node.object.transform.objMatrix);
            }
            else {
                node.draw(glctx, model);
            }
        }
    };
    return PassOverlay;
}(RenderPass));

var __extends$f = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PassTest = /** @class */ (function (_super) {
    __extends$f(PassTest, _super);
    function PassTest(pipeline) {
        var _this = _super.call(this, pipeline) || this;
        _this.m_render = new MeshRender(Mesh.Cube, new Material(pipeline.graphicRender.shaderLib.shaderUnlitColor), false);
        return _this;
    }
    PassTest.prototype.render = function (scene) {
        var pipe = this.pipeline;
        var glctx = pipe.glctx;
        glctx.enable(GL.DEPTH_TEST);
        glctx.depthFunc(GL.LEQUAL);
        glctx.bindGLFramebuffer(pipe.mainFrameBuffer);
        var model = pipe.model;
        model.drawMeshRender(this.m_render, mat4.Identity);
    };
    return PassTest;
}(RenderPass));

var PipelineUtility = /** @class */ (function () {
    function PipelineUtility() {
    }
    PipelineUtility.traversalRenderNode = function (drawlist, obj) {
        var children = obj.children;
        if (children == null)
            return;
        for (var i = 0, len = children.length; i < len; i++) {
            var c = children[i];
            var cobj = c.gameobject;
            if (!cobj.active)
                continue;
            var crender = cobj.render;
            if (crender != null) {
                drawlist.pushRenderNode(crender);
            }
            PipelineUtility.traversalRenderNode(drawlist, c);
        }
    };
    /**
     * traversal all transform of scene object, then generate renderNodeList for further rendering.
     * @param scene
     * @param nodelist
     */
    PipelineUtility.generateDrawList = function (scene, nodelist) {
        nodelist.reset();
        PipelineUtility.traversalRenderNode(nodelist, scene.transform);
        nodelist.sort();
    };
    return PipelineUtility;
}());

/**
 * @todo add internal res to graphics render
 */
var RenderModel = /** @class */ (function () {
    function RenderModel(pipeline) {
        var glctx = pipeline.graphicRender.glctx;
        this.m_glctx = glctx;
        this.m_bufferDebugInfo = [];
        this.m_uniformObj = new ShaderUniformBuffer(glctx, ShaderDataUniformObj, 0, ShaderFX.UNIFORM_OBJ);
        this.m_uniformBasis = new ShaderUniformBuffer(glctx, ShaderDataBasis, 1, ShaderFX.UNIFORM_BASIS);
        this.m_uniformShadowMap = new ShaderUniformBuffer(glctx, ShaderDataUniformShadowMap, 2, ShaderFX.UNIFORM_SHADOWMAP);
        this.m_uniformLight = new ShaderUniformBuffer(glctx, ShaderDataUniformLight, 3, ShaderFX.UNIFORM_LIGHT);
        this.m_matFullscreen = new Material(pipeline.graphicRender.shaderLib.shaderBlit);
        this.m_renderFullscreen = new MeshRender(Mesh.Quad, this.m_matFullscreen);
        this.m_matScreenRect = new Material(pipeline.graphicRender.shaderLib.shaderScreenRect);
    }
    Object.defineProperty(RenderModel.prototype, "bufferDebugInfo", {
        get: function () { return this.m_bufferDebugInfo; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderModel.prototype, "uniformBasis", {
        get: function () { return this.m_uniformBasis; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderModel.prototype, "uniformObj", {
        get: function () { return this.m_uniformObj; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderModel.prototype, "uniformLight", {
        get: function () { return this.m_uniformLight; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderModel.prototype, "uniformShadowMap", {
        get: function () { return this.m_uniformShadowMap; },
        enumerable: true,
        configurable: true
    });
    RenderModel.prototype.bindDefaultUniform = function (program) {
        var glctx = this.m_glctx;
        var glp = program.Program;
        var ublock = program.UniformBlock;
        var uniformBasis = this.m_uniformBasis;
        var indexBasis = ublock[uniformBasis.name];
        if (indexBasis != null)
            glctx.uniformBlockBinding(glp, indexBasis, uniformBasis.uniformIndex);
        var uniformObj = this.m_uniformObj;
        var indexObj = ublock[uniformObj.name];
        if (indexObj != null)
            glctx.uniformBlockBinding(glp, indexObj, uniformObj.uniformIndex);
        var uniformLight = this.m_uniformLight;
        var indexLight = ublock[uniformLight.name];
        if (indexLight != null)
            glctx.uniformBlockBinding(glp, indexLight, uniformLight.uniformIndex);
        //ShadowMap todo
        var uniformSM = this.m_uniformShadowMap;
        var indexSM = ublock[uniformSM.name];
        if (indexSM != null)
            glctx.uniformBlockBinding(glp, indexSM, uniformSM.uniformIndex);
    };
    RenderModel.prototype.updateUnifromScreenParam = function (w, h) {
        var uniformBasis = this.m_uniformBasis;
        var data = uniformBasis.data;
        data.render.setScreenParam(w, h);
        this.m_screenAspect = w * 1.0 / h;
    };
    RenderModel.prototype.updateUniformBasis = function (cam) {
        var uniformBasis = this.m_uniformBasis;
        var data = uniformBasis.data;
        var datacamera = data.camrea;
        if (cam.isDataTrsDirty) {
            datacamera.setCameraMtxView(cam.WorldMatrix);
            datacamera.setCameraPos(cam.transform.position);
            cam.isDataTrsDirty = false;
        }
        if (cam.aspect != this.m_screenAspect)
            cam.aspect = this.m_screenAspect;
        if (cam.isDataProjDirty) {
            datacamera.setCameraMtxProj(cam.ProjMatrix);
            datacamera.setProjParam(cam.near, cam.far);
            cam.isDataProjDirty = false;
        }
    };
    RenderModel.prototype.updateUniformLightData = function (scene) {
        if (!scene.lightDataDirty)
            return false;
        var uniformLight = this.m_uniformLight;
        var data = uniformLight.data;
        var lightNum = scene.lightCount;
        var alllights = scene.lightDataList;
        data.setLightCount(lightNum);
        data.setPointLights(alllights, lightNum);
        data.setMainLight(scene.lightPrime);
        uniformLight.uploadBufferData(this.m_glctx);
        scene.lightDataDirty = false;
        console.log("upload light data");
        return true;
    };
    RenderModel.prototype.updateUniformShadowMap = function () {
        var uniformSM = this.m_uniformShadowMap;
        uniformSM.uploadBufferData(this.m_glctx);
    };
    RenderModel.prototype.setShadowMapTex = function (tex, index) {
        var rawtex = tex.getRawTexture();
        var glctx = this.m_glctx;
        glctx.activeTexture(ShaderFX.GL_SHADOWMAP_TEX0);
        glctx.bindTexture(GL.TEXTURE_2D, rawtex);
        glctx.activeTexture(ShaderFX.GL_TEXTURE_TEMP);
    };
    RenderModel.prototype.updateUniformObjMtx = function (objmtx) {
        var uniformObj = this.m_uniformObj;
        uniformObj.data.setMtxModel(objmtx);
        uniformObj.uploadBufferData(this.m_glctx);
    };
    RenderModel.prototype.drawFullScreen = function (tex, setState) {
        if (setState === void 0) { setState = true; }
        var mat = this.m_matFullscreen;
        mat.setTexture(ShaderFX.UNIFORM_MAIN_TEXTURE, tex);
        this.drawMeshRender(this.m_renderFullscreen, null, null, setState);
    };
    RenderModel.prototype.drawMeshRender = function (meshrender, objmtx, matReplace, setState) {
        if (setState === void 0) { setState = false; }
        var mat = matReplace != null ? matReplace : meshrender.material;
        var mesh = meshrender.mesh;
        var glctx = this.m_glctx;
        meshrender.refreshData(glctx);
        var glp = mat.program;
        glctx.useGLProgram(glp);
        this.bindDefaultUniform(glp);
        mat.apply(glctx);
        if (objmtx != null) {
            this.updateUniformObjMtx(objmtx);
        }
        if (setState) {
            glctx.pipelineState(mat.shaderTags);
        }
        meshrender.bindVertexArray(glctx);
        glctx.drawElementIndices(mesh.indiceDesc);
        meshrender.unbindVertexArray(glctx);
        mat.clean(glctx);
    };
    RenderModel.prototype.drawMeshWithMat = function (mesh, mat, vao, objmtx, applyStatus) {
        if (objmtx === void 0) { objmtx = null; }
        if (applyStatus === void 0) { applyStatus = false; }
        var glctx = this.m_glctx;
        mesh.refreshMeshBuffer(glctx);
        var glp = mat.program;
        glctx.useGLProgram(glp);
        this.bindDefaultUniform(glp);
        mat.apply(glctx);
        if (applyStatus)
            glctx.pipelineState(mat.shaderTags);
        if (objmtx != null)
            this.updateUniformObjMtx(objmtx);
        glctx.bindGLVertexArray(vao);
        glctx.drawElementIndices(mesh.indiceDesc);
        glctx.bindGLVertexArray(null);
        mat.clean(glctx);
    };
    RenderModel.prototype.drawsScreenTex = function (tex, rect) {
        var mat = this.m_matScreenRect;
        mat.setVec4("uRect", rect);
        mat.setTexture(ShaderFX.UNIFORM_MAIN_TEXTURE, tex);
        this.drawMeshRender(this.m_renderFullscreen, null, mat);
    };
    RenderModel.prototype.clearFrameBufferTarget = function (clearinfo, fb) {
        if (clearinfo == null)
            return;
        var glctx = this.m_glctx;
        glctx.bindGLFramebuffer(fb);
        var ccol = clearinfo.color;
        if (ccol)
            glctx.clearColorAry(ccol.raw);
        var depth = clearinfo.depth;
        if (depth != null)
            glctx.clearDepth(depth);
        glctx.clear(clearinfo.clearMask);
    };
    RenderModel.prototype.addBufferDebugInfo = function (info) {
        var curinfo = this.m_bufferDebugInfo;
        if (curinfo.indexOf(info) >= 0)
            return;
        curinfo.push(info);
    };
    RenderModel.prototype.removeBufferDebugInfo = function (info) {
        var curinfo = this.m_bufferDebugInfo;
        var index = curinfo.indexOf(info);
        if (index < 0)
            return;
        curinfo = curinfo.splice(index, 1);
    };
    RenderModel.prototype.release = function (glctx) {
        this.m_glctx = null;
        this.m_uniformObj = ReleaseGraphicObj(this.m_uniformObj, glctx);
        this.m_uniformBasis = ReleaseGraphicObj(this.m_uniformBasis, glctx);
        this.m_uniformLight = ReleaseGraphicObj(this.m_uniformLight, glctx);
        this.m_uniformShadowMap = ReleaseGraphicObj(this.m_uniformShadowMap, glctx);
    };
    return RenderModel;
}());

var DoubleBuffered = /** @class */ (function () {
    function DoubleBuffered(back, front) {
        this.back = back;
        this.front = front;
    }
    DoubleBuffered.create = function (back, front) {
        return new DoubleBuffered(back, front);
    };
    DoubleBuffered.prototype.swap = function () {
        var temp = this.back;
        this.back = this.front;
        this.front = temp;
    };
    return DoubleBuffered;
}());

// /**
//  * @todo
//  * dependencies
//  * @class <GLFramebuffer>
//  * @class <RenderTexture>
//  * 
//  */
var RenderPipeline = /** @class */ (function () {
    function RenderPipeline(info) {
        if (info != null) {
            this.m_clearInfo = info.clearinfo;
        }
    }
    Object.defineProperty(RenderPipeline.prototype, "graphicRender", {
        get: function () { return this.m_graphicRender; },
        set: function (val) { this.m_graphicRender = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderPipeline.prototype, "model", {
        get: function () { return this.m_model; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderPipeline.prototype, "nodeList", {
        get: function () { return this.m_nodelist.back; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderPipeline.prototype, "mainFrameBuffer", {
        get: function () { return this.m_mainfb; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderPipeline.prototype, "glctx", {
        get: function () { return this.m_glctx; },
        enumerable: true,
        configurable: true
    });
    RenderPipeline.prototype.onSetupRender = function (glctx, info) {
        this.m_nodelist = new DoubleBuffered(new RenderNodeList(), new RenderNodeList());
        this.m_glctx = glctx;
        this.m_model = new RenderModel(this);
        var fb = FrameBuffer.create(glctx, glctx.canvasWidth, glctx.canvasHeight, { colFmt: info.colorFormat, depthFmt: info.depthFormat });
        this.m_mainfb = fb;
        this.onInitGL();
    };
    RenderPipeline.prototype.onInitGL = function () {
    };
    RenderPipeline.prototype.resizeFrameBuffer = function () {
    };
    RenderPipeline.prototype.exec = function (data) {
        if (data == null)
            return;
        if (!(data instanceof Scene))
            return;
        var camera = data.mainCamera;
        if (camera == null)
            return;
        var nodelist = this.m_nodelist;
        nodelist.swap();
        var model = this.m_model;
        model.updateUniformBasis(camera);
        var glctx = this.m_glctx;
        model.uniformBasis.uploadBufferData(glctx);
        var nodelistback = nodelist.back;
        nodelistback.reset();
        PipelineUtility.generateDrawList(data, nodelistback);
        var mainfb = this.m_mainfb;
        glctx.bindGLFramebuffer(mainfb);
        model.clearFrameBufferTarget(this.m_clearInfo, mainfb);
        //exec passes
    };
    RenderPipeline.prototype.onRenderToCanvas = function () {
        var glctx = this.m_glctx;
        glctx.bindGLFramebuffer(null);
        var mainfb = this.m_mainfb;
        glctx.viewport(0, 0, mainfb.width, mainfb.height);
        this.m_model.drawFullScreen(this.m_mainfb.coltex);
    };
    RenderPipeline.prototype.reload = function () {
    };
    RenderPipeline.prototype.release = function () {
    };
    return RenderPipeline;
}());

var StackedPipeline = /** @class */ (function () {
    function StackedPipeline(buildopt) {
        this.m_buildopt = buildopt;
        this.clearInfo = buildopt.clearinfo;
    }
    Object.defineProperty(StackedPipeline.prototype, "model", {
        get: function () { return this.m_model; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedPipeline.prototype, "nodeList", {
        get: function () { return this.m_renderNodeList; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedPipeline.prototype, "mainFrameBuffer", {
        get: function () { return this.m_mainfb; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedPipeline.prototype, "glctx", {
        get: function () { return this.m_glctx; },
        enumerable: true,
        configurable: true
    });
    StackedPipeline.prototype.onSetupRender = function (glctx, info) {
        var fb = FrameBuffer.create(glctx, glctx.canvasWidth, glctx.canvasHeight, { colFmt: info.colorFormat, depthFmt: info.depthFormat });
        this.m_mainfb = fb;
        this.m_glctx = glctx;
        this.m_model = new RenderModel(this);
        this.m_renderNodeList = new RenderNodeList();
        this.onInitGL();
    };
    StackedPipeline.prototype.onInitGL = function () {
        var renderpasses = [];
        var buildInfo = this.m_buildopt;
        var passes = buildInfo.passes;
        var passlen = passes.length;
        for (var t = 0; t < passlen; t++) {
            var pass = passes[t];
            var rp = new pass(this);
            renderpasses.push(rp);
        }
        this.m_renderPass = renderpasses;
    };
    StackedPipeline.prototype.resizeFrameBuffer = function (width, height) {
        if (this.m_mainfb.resize(this.m_glctx, width, height)) {
            this.m_glctx.viewport(0, 0, width, height);
            this.m_model.updateUnifromScreenParam(width, height);
        }
    };
    StackedPipeline.prototype.exec = function (data) {
        if (data == null)
            return;
        if (!(data instanceof Scene)) {
            return;
        }
        var camera = data.mainCamera;
        if (camera == null)
            return;
        var model = this.m_model;
        model.updateUniformBasis(camera);
        model.updateUniformLightData(data);
        var glctx = this.m_glctx;
        model.uniformBasis.uploadBufferData(glctx);
        model.clearFrameBufferTarget(this.clearInfo, this.m_mainfb);
        var nodeList = this.m_renderNodeList;
        nodeList.reset();
        PipelineUtility.generateDrawList(data, nodeList);
        var passes = this.m_renderPass;
        var passeslen = passes.length;
        for (var t = 0; t < passeslen; t++) {
            passes[t].render(data);
        }
    };
    StackedPipeline.prototype.onRenderToCanvas = function () {
        var glctx = this.m_glctx;
        glctx.bindGLFramebuffer(null);
        var mainfb = this.m_mainfb;
        glctx.viewport(0, 0, mainfb.width, mainfb.height);
        this.m_model.drawFullScreen(this.m_mainfb.coltex);
    };
    StackedPipeline.prototype.reload = function () {
        throw new Error("not implemented");
    };
    StackedPipeline.prototype.release = function () {
        //release passes;
        var passes = this.m_renderPass;
        var passeslen = passes.length;
        for (var t = 0; t < passeslen; t++) {
            passes[t].release();
        }
        this.m_renderPass = null;
        var glctx = this.m_glctx;
        this.m_model = ReleaseGraphicObj(this.m_model, glctx);
        this.m_mainfb = ReleaseGraphicObj(this.m_mainfb, glctx);
        this.m_glctx = null;
    };
    return StackedPipeline;
}());

var GLTFSceneBuilder = /** @class */ (function () {
    function GLTFSceneBuilder(gltfdata, glctx, shaderlib) {
        this.buffers = {};
        this.buffersDesc = {};
        this.materials = {};
        this.images = {};
        this.m_gltfData = gltfdata;
        this.m_glctx = glctx;
        this.m_shaderfxlib = shaderlib;
        this.m_pbrShader = shaderlib.shaderDiffuse;
        this.m_pbrBlendShader = shaderlib.shaderDiffuse;
        this.gltf = gltfdata.gltf;
    }
    GLTFSceneBuilder.prototype.release = function () {
    };
    GLTFSceneBuilder.prototype.createScene = function () {
        var gltf = this.gltf;
        var scenes = gltf.scenes;
        if (scenes == null)
            return null;
        var scene = scenes[gltf.scene];
        var nodes = gltf.nodes;
        var scenenodes = scene.nodes;
        var gsceneobj = new GameObject();
        for (var i = 0, nodeslen = scenenodes.length; i < nodeslen; i++) {
            var gobj = this.buildNode(nodes, scenenodes[i]);
            if (gobj != null) {
                gobj.transform.parent = gsceneobj.transform;
            }
        }
        //gstrs.setScale(glmath.vec3(0.001,0.001,0.001));
        return gsceneobj;
    };
    GLTFSceneBuilder.prototype.buildNode = function (nodes, index) {
        var _node = nodes[index];
        if (_node == null) {
            console.error(nodes);
            console.error(index);
            throw new Error("invalid node");
        }
        var gobj = new GameObject();
        gobj.name = _node.name;
        if (_node.rotation) {
            gobj.transform.setRotation(new quat(_node.rotation));
        }
        else if (_node.matrix) {
            //Set matrix
            //TODO
            gobj.transform.localMatrix = new mat4(_node.matrix);
        }
        //gobj.transform.localScale = glmath.vec3(0.001,0.001,0.001);
        if (_node.mesh != undefined) {
            var meshrender = this.getMesh(_node.mesh);
            if (meshrender != null) {
                gobj.render = meshrender;
            }
        }
        var _nodeChildren = _node.children;
        if (_nodeChildren != null && _nodeChildren.length > 0) {
            for (var i = 0, len = _nodeChildren.length; i < len; i++) {
                var g = this.buildNode(nodes, _nodeChildren[i]);
                if (g != null) {
                    g.transform.parent = gobj.transform;
                }
            }
        }
        return gobj;
    };
    GLTFSceneBuilder.prototype.getMesh = function (meshid) {
        var _meshes = this.gltf.meshes;
        if (_meshes == null)
            return null;
        var _mesh = _meshes[meshid];
        if (_mesh == null)
            return null;
        var _primitives = _mesh.primitives;
        if (_primitives == null)
            return null;
        var mesh = new Mesh();
        mesh.name = _mesh.name;
        //TODO
        var _primitive = _primitives[0];
        var _attribute = _primitive.attributes;
        if (_attribute['NORMAL'] != null) {
            var index = _attribute['NORMAL'];
            var buffer = this.getBuffer(index);
            var desc = this.buffersDesc[index];
            mesh.setNormal(buffer, desc.type, desc.size);
        }
        if (_attribute['POSITION'] != null) {
            var index = _attribute['POSITION'];
            var buffer = this.getBuffer(index);
            var desc = this.buffersDesc[index];
            mesh.setPosition(buffer, desc.type, desc.size);
        }
        if (_attribute['TEXCOORD_0'] != null) {
            var index = _attribute['TEXCOORD_0'];
            var buffer = this.getBuffer(index);
            var desc = this.buffersDesc[index];
            mesh.setUV(buffer, desc.type, desc.size);
        }
        if (_attribute['TANGENT'] != null) ;
        //Indices
        {
            var index = _primitive.indices;
            if (index != null) {
                var buffer = this.getBuffer(index);
                var desc = this.buffersDesc[index];
                var mode = _primitive.mode == null ? 4 : _primitive.mode;
                mesh.setIndices(buffer, desc.type, mode);
            }
        }
        var mat = null;
        var matid = _primitive.material;
        if (matid != null) {
            mat = this.getMaterial(_primitive.material);
        }
        var meshrender = new MeshRender(mesh, mat);
        return meshrender;
    };
    GLTFSceneBuilder.prototype.getBuffer = function (bufferindex) {
        var buffers = this.buffers;
        var cbuffer = buffers[bufferindex];
        if (cbuffer != null) {
            return cbuffer;
        }
        var _accessors = this.gltf.accessors;
        var _accessor = _accessors[bufferindex];
        var _bufferview = this.gltf.bufferViews[_accessor.bufferView];
        if (_bufferview == null) {
            console.error(_accessor);
            console.error(this.gltf.bufferViews[_accessor.bufferView]);
            throw new Error('buffer view is null');
        }
        var rawBuffer = this.m_gltfData.rawBinary;
        var dataType = _accessor.componentType;
        var dataBuffer = null;
        var dataBufferOffset = 0;
        if (_accessor.byteOffset != null)
            dataBufferOffset += _accessor.byteOffset;
        if (_bufferview.byteOffset != null)
            dataBufferOffset += _bufferview.byteOffset;
        var sizeType = _accessor.type;
        var size = this.getSize(sizeType);
        var componentLength = _accessor.count * size;
        if (dataType == GL.FLOAT) {
            dataBuffer = new Float32Array(rawBuffer, dataBufferOffset, componentLength);
        }
        else if (dataType == GL.UNSIGNED_INT) {
            dataBuffer = new Uint32Array(rawBuffer, dataBufferOffset, componentLength);
        }
        else if (dataType == GL.UNSIGNED_SHORT) {
            dataBuffer = new Uint16Array(rawBuffer, dataBufferOffset, componentLength);
        }
        else {
            throw new Error("buffer datatype not supported." + dataType);
        }
        var totalbyte = componentLength * MeshBufferUtility.TypeSize(dataType);
        this.buffers[bufferindex] = dataBuffer;
        this.buffersDesc[bufferindex] = new MeshVertexAttrDesc(dataType, size, totalbyte);
        return dataBuffer;
    };
    GLTFSceneBuilder.prototype.getSize = function (type) {
        switch (type) {
            case "SCALAR":
                return 1;
            case "VEC2":
                return 2;
            case "VEC3":
                return 3;
            case "VEC4":
                return 4;
            case "MAT2":
                return 4;
            case "MAT3":
                return 9;
            case "MAT4":
                return 16;
        }
        throw new Error("invalid type " + type);
    };
    GLTFSceneBuilder.prototype.getMaterial = function (index) {
        var _materials = this.gltf.materials;
        if (_materials == null)
            return null;
        var _material = _materials[index];
        var mat = new Material(this.m_pbrShader);
        mat.name = _material.name;
        var shadertags = null;
        var shadertagsOverride = false;
        var matDoubleSided = _material.doubleSided;
        if (matDoubleSided == true) {
            if (shadertags == null)
                shadertags = new ShaderTags();
            shadertags.culling = CullingMode.None;
            shadertagsOverride = true;
        }
        var alphaMode = _material.alphaMode;
        if (alphaMode == "BLEND") {
            if (shadertags == null)
                shadertags = new ShaderTags();
            shadertags.blendOp = BlendOperator.ADD;
            shadertags.queue = RenderQueue.Transparent;
            shadertagsOverride = true;
            mat.setShader(this.m_pbrBlendShader);
        }
        if (shadertagsOverride) {
            if (shadertags.queue == null)
                shadertags.queue = RenderQueue.Opaque;
            mat.shaderTags = shadertags;
        }
        //pbr property
        var _pbrMetallicRoughness = _material.pbrMetallicRoughness;
        if (_pbrMetallicRoughness != null) {
            var _baseCOlorFactor = _pbrMetallicRoughness.baseColorFactor;
            if (_baseCOlorFactor != null) {
                mat.setColor(ShaderFXLibs.SH_PBR_BaseColorFactor, new vec4(_baseCOlorFactor));
            }
            var _baseColorTexture = _pbrMetallicRoughness.baseColorTexture;
            if (_baseColorTexture != null) {
                var tex = this.getImage(_baseColorTexture.index);
                if (tex != null)
                    mat.setTexture(ShaderFXLibs.SH_PBR_BaseColorTexture, tex);
            }
            var _metallicFactor = _pbrMetallicRoughness.metallicFactor;
            if (_metallicFactor != null) {
                mat.setFloat(ShaderFXLibs.SH_PBR_MetallicFactor, _metallicFactor);
            }
            var _roughnessFactor = _pbrMetallicRoughness.roughnessFactor;
            if (_roughnessFactor != null) {
                mat.setFloat(ShaderFXLibs.SH_PBR_RoughnessFactor, _roughnessFactor);
            }
            var _metallicRoughnessTexture = _pbrMetallicRoughness.metallicRoughnessTexture;
            if (_metallicRoughnessTexture != null) {
                var tex = this.getImage(_metallicRoughnessTexture.index);
                mat.setTexture(ShaderFXLibs.SH_PBR_MetallicRoughnessTexture, tex);
            }
        }
        //emissive property
        var _emissiveFactor = _material.emissiveFactor;
        if (_emissiveFactor != null) {
            mat.setColor(ShaderFXLibs.SH_PBR_EmissiveFactor, glmath.vec4(_emissiveFactor[0], _emissiveFactor[1], _emissiveFactor[2], 0));
        }
        var _emissiveTexture = _material.emissiveTexture;
        if (_emissiveTexture != null) {
            var tex = this.getImage(_emissiveTexture.index);
            mat.setTexture(ShaderFXLibs.SH_PBR_EmissiveTexture, tex);
        }
        this.materials[index] = mat;
        return mat;
    };
    GLTFSceneBuilder.prototype.getImage = function (index) {
        var img = this.images[index];
        if (img != null) {
            return img;
        }
        var _images = this.gltf.images;
        var _image = _images[index];
        var mime = _image.mimeType;
        if (mime != "image/png" && mime != "image/jpg") {
            throw new Error("invalid mime type " + mime);
        }
        var _bufferview = this.gltf.bufferViews[_image.bufferView];
        if (_bufferview == null) {
            return null;
        }
        var rawBuffer = this.m_gltfData.rawBinary;
        var uint8array = new Uint8Array(rawBuffer, _bufferview.byteOffset, _bufferview.byteLength);
        var texture = Texture2D.createTextureSync(uint8array, _image.mimeType, this.m_glctx);
        this.images[index] = texture;
        return texture;
    };
    return GLTFSceneBuilder;
}());

var InputSnapShot = /** @class */ (function () {
    function InputSnapShot() {
        this.key = {};
        this.keyDown = {};
        this.keyUp = {};
        this.hasKeyPressEvent = false;
        this.mouse = new Array(4);
        this.mouseDown = new Array(4);
        this.mouseUp = new Array(4);
        /**
         * [posx,posy,deltax,deltay]
         */
        this.mousepos = new vec4();
        this.mousewheel = false;
        this.mousewheelDelta = 0;
        this.mouseMove = false;
        this.deltaTime = 0;
    }
    InputSnapShot.prototype.getKeyDown = function (key) {
        return this.keyDown[key] == true;
    };
    InputSnapShot.prototype.getKeyUp = function (key) {
        return this.keyUp[key] == true;
    };
    InputSnapShot.prototype.getKey = function (key) {
        return this.key[key];
    };
    InputSnapShot.prototype.getMouseBtn = function (btn) {
        return this.mouse[btn];
    };
    InputSnapShot.prototype.getMouseDown = function (btn) {
        return this.mouseDown[btn];
    };
    InputSnapShot.prototype.getMouseUp = function (btn) {
        return this.mouseUp[btn];
    };
    return InputSnapShot;
}());
var InputCache = /** @class */ (function () {
    function InputCache() {
        this.mousepos = new vec4();
        this.mousebtn = new Array(4);
        this.mousedown = new Array(4);
        this.mouseup = new Array(4);
        this.mousewheel = false;
        this.mousewheelDelta = 0;
        this.keyDown = {};
        this.keyUp = {};
        this.m_keydirty = false;
        this.m_mousedirty = false;
        this.m_mousePosDirty = false;
        this.m_shotMouseDownFalse = false;
        this.m_shotMouseUpFalse = false;
    }
    InputCache.prototype.setKeyDown = function (e) {
        var kp = this.keyPress;
        if (kp == null) {
            kp = {};
            this.keyPress = kp;
        }
        kp[e.key] = true;
        this.keyDown[e.key] = true;
        this.m_keydirty = true;
    };
    InputCache.prototype.setKeyUp = function (e) {
        var kp = this.keyPress;
        if (kp == null) {
            kp = {};
            this.keyPress = kp;
        }
        kp[e.key] = false;
        this.keyUp[e.key] = true;
        this.m_keydirty = true;
    };
    InputCache.prototype.setMousePos = function (e) {
        var mp = this.mousepos;
        var x = e.offsetX;
        var y = e.offsetY;
        mp.z = x - mp.x;
        mp.w = y - mp.y;
        mp.x = x;
        mp.y = y;
        this.m_mousePosDirty = true;
    };
    InputCache.prototype.setButtonDown = function (e) {
        var btn = e.button;
        this.mousebtn[btn] = true;
        this.mousedown[btn] = true;
        this.m_mousedirty = true;
    };
    InputCache.prototype.setButtonUp = function (e) {
        var btn = e.button;
        this.mousebtn[btn] = false;
        this.mouseup[btn] = true;
        this.m_mousedirty = true;
    };
    InputCache.prototype.setMouseWheel = function (delta) {
        this.mousewheel = true;
        this.mousewheelDelta += delta;
    };
    InputCache.prototype.reset = function () {
        this.mousewheel = false;
        this.mousewheelDelta = 0;
        if (this.m_mousedirty) {
            var mouseup = this.mouseup;
            var mousedown = this.mousedown;
            mouseup.fill(false);
            mousedown.fill(false);
            this.m_mousedirty = false;
        }
        if (this.m_keydirty) {
            this.keyDown = [];
            this.keyUp = [];
            this.m_keydirty = false;
            this.keyPress = {};
        }
    };
    InputCache.prototype.applytoSnapShot = function (shot) {
        var mousePosDirty = this.m_mousePosDirty;
        shot.mouseMove = mousePosDirty;
        if (mousePosDirty) {
            this.m_mousePosDirty = false;
            var shotmousepos = shot.mousepos;
            shotmousepos.set(this.mousepos);
        }
        shot.mousewheelDelta = this.mousewheelDelta;
        shot.mousewheel = this.mousewheelDelta != 0 && this.mousewheel;
        var smdown = shot.mouseDown;
        var smup = shot.mouseUp;
        var smouse = shot.mouse;
        if (this.m_mousedirty) {
            var cmdown = this.mousedown;
            for (var i = 0; i < 4; i++) {
                smdown[i] = cmdown[i];
            }
            var cmup = this.mouseup;
            for (var i = 0; i < 4; i++) {
                smup[i] = cmup[i];
            }
            this.m_shotMouseDownFalse = false;
            this.m_shotMouseUpFalse = false;
            var cmouse = this.mousebtn;
            for (var i = 0; i < 4; i++) {
                smouse[i] = cmouse[i];
            }
        }
        else {
            if (!this.m_shotMouseDownFalse) {
                smdown.fill(false);
                this.m_shotMouseDownFalse = true;
            }
            if (!this.m_shotMouseUpFalse) {
                smup.fill(false);
                this.m_shotMouseUpFalse = true;
            }
        }
        var keydirty = this.m_keydirty;
        shot.hasKeyPressEvent = keydirty;
        if (keydirty) {
            //key press
            var skey = shot.key;
            var ckey = this.keyPress;
            for (var k in ckey) {
                skey[k] = ckey[k];
            }
            shot.keyDown = this.keyDown;
            shot.keyUp = this.keyUp;
        }
        else {
            shot.keyDown = null;
            shot.keyUp = null;
        }
    };
    return InputCache;
}());
var Input = /** @class */ (function () {
    function Input() {
    }
    Input.init = function (canvas) {
        if (Input.s_inited)
            return;
        Input.s_canvas = canvas;
        Input.regEventListener();
        Input.s_inited = true;
    };
    Input.prototype.release = function () {
        Input.removeEventListener();
    };
    Input.regEventListener = function () {
        window.addEventListener('keydown', Input.onEvtKeyDown);
        window.addEventListener('keyup', Input.onEvtKeyUp);
        var canvas = Input.s_canvas;
        canvas.addEventListener('mousemove', Input.onEvtMouseMove);
        canvas.addEventListener('mousedown', Input.onEvtMouseDown);
        canvas.addEventListener('mouseup', Input.onEvtMouseUp);
        canvas.addEventListener('mousewheel', Input.onEvtMouseWheel);
    };
    Input.removeEventListener = function () {
        window.removeEventListener('keydown', Input.onEvtKeyDown);
        window.removeEventListener('keyup', Input.onEvtKeyUp);
        var canvas = Input.s_canvas;
        canvas.removeEventListener('mousemove', Input.onEvtMouseMove);
        canvas.removeEventListener('mousedown', Input.onEvtMouseDown);
        canvas.removeEventListener('mouseup', Input.onEvtMouseUp);
    };
    Input.onEvtKeyDown = function (e) {
        var c = Input.s_cache;
        c.setKeyDown(e);
    };
    Input.onEvtKeyUp = function (e) {
        var c = Input.s_cache;
        c.setKeyUp(e);
    };
    Input.onEvtMouseMove = function (e) {
        var c = Input.s_cache;
        c.setMousePos(e);
    };
    Input.onEvtMouseDown = function (e) {
        var c = Input.s_cache;
        c.setButtonDown(e);
    };
    Input.onEvtMouseUp = function (e) {
        var c = Input.s_cache;
        c.setButtonUp(e);
    };
    Input.onEvtMouseWheel = function (e) {
        var c = Input.s_cache;
        c.setMouseWheel(e.deltaY);
    };
    Input.onFrame = function (dt) {
        var c = Input.s_cache;
        var snpashot = Input.snapshot;
        snpashot.deltaTime = dt;
        c.applytoSnapShot(Input.snapshot);
        c.reset();
    };
    Input.s_inited = false;
    Input.s_cache = new InputCache();
    Input.snapshot = new InputSnapShot();
    return Input;
}());

var ProgramSetupConfig = /** @class */ (function () {
    function ProgramSetupConfig() {
        this.targetFPS = 60;
        this.setupInput = true;
    }
    return ProgramSetupConfig;
}());
/**
 * Convinent setup program class
 */
var ProgramBase = /** @class */ (function () {
    function ProgramBase(canvas, config) {
        this.m_config = new ProgramSetupConfig();
        this.m_canvas = canvas;
        this.m_timer = new FrameTimer(false);
        if (config != null)
            this.m_config = config;
        var cfg = this.m_config;
        if (cfg.setupInput) {
            Input.init(canvas);
        }
        GLUtility.setTargetFPS(cfg.targetFPS);
        GLUtility.registerOnFrame(this.onFrame.bind(this));
        this.m_graphicsRender = new GraphicsRender(canvas);
        WindowUtility.setOnResizeFunc(this.onResize.bind(this));
    }
    Object.defineProperty(ProgramBase.prototype, "canvas", {
        get: function () { return this.m_canvas; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgramBase.prototype, "config", {
        get: function () { return this.m_config; },
        enumerable: true,
        configurable: true
    });
    ProgramBase.prototype.onResize = function () {
        var canvas = this.m_canvas;
        var grender = this.m_graphicsRender;
        var width = canvas.clientWidth;
        var height = canvas.clientHeight;
        grender.resizeCanvas(width, height);
    };
    ProgramBase.prototype.onFrame = function (ts) {
        var delta = this.m_timer.tick(ts);
        var dt = delta / 1000;
        var setupInput = this.m_config.setupInput;
        if (setupInput)
            Input.onFrame(dt);
    };
    return ProgramBase;
}());

var __extends$g = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CameraFreeFly = /** @class */ (function (_super) {
    __extends$g(CameraFreeFly, _super);
    function CameraFreeFly() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_startpos = vec4.zero;
        _this.m_rotay = 0;
        _this.m_rotax = 0;
        return _this;
    }
    CameraFreeFly.prototype.onStart = function () {
        this.m_trs = this.gameobject.transform;
    };
    CameraFreeFly.prototype.onUpdate = function (scene) {
        var trs = this.m_trs;
        var snapshot = Input.snapshot;
        if (snapshot.getKey('w')) {
            trs.applyTranslate(trs.worldForward.mulToRef(-0.3), false);
        }
        else if (snapshot.getKey('s')) {
            trs.applyTranslate(trs.worldForward.mulToRef(0.3), false);
        }
        if (snapshot.getKey('d')) {
            trs.applyTranslate(trs.worldRight.mulToRef(-0.3), false);
        }
        else if (snapshot.getKey('a')) {
            trs.applyTranslate(trs.worldRight.mulToRef(0.3), false);
        }
        if (snapshot.mousewheel) {
            var offset = trs.worldForward.mulNumToRef(snapshot.mousewheelDelta * 0.05);
            trs.applyTranslate(offset, false);
        }
        if (snapshot.getMouseBtn(0)) {
            if (snapshot.getMouseDown(0)) {
                this.m_startpos.set(snapshot.mousepos);
                var q = trs.localRotation;
                var e = q.toEuler();
                this.m_rotax = e.x;
                this.m_rotay = e.y;
            }
            else {
                var mpos = snapshot.mousepos;
                var spos = this.m_startpos;
                if (spos.z != 0 || spos.w != 0) {
                    var deltax = mpos.x - spos.x;
                    var deltay = mpos.y - spos.y;
                    if (deltax != 0 && deltay != 0) {
                        var deg2rad = glmath.Deg2Rad;
                        var rotax = this.m_rotax - deltay * deg2rad * 0.3;
                        var rotay = this.m_rotay + deltax * deg2rad * 0.3;
                        trs.setRotation(quat.fromEuler(rotax, rotay, 0));
                    }
                }
            }
        }
    };
    return CameraFreeFly;
}(Component));

var __extends$h = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ControlHandlerComponent = /** @class */ (function (_super) {
    __extends$h(ControlHandlerComponent, _super);
    function ControlHandlerComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_selected = false;
        return _this;
    }
    ControlHandlerComponent.prototype.onStart = function () {
    };
    ControlHandlerComponent.prototype.onUpdate = function (scene) {
        var camera = scene.mainCamera;
        if (camera == null)
            return;
        var grender = GraphicsContext.currentRender;
        var trs = this.gameobject.transform;
        var pos = trs.position;
        var snapshot = Input.snapshot;
        var mpos = snapshot.mousepos;
        var mouseDown = snapshot.getMouseDown(0);
        if (mouseDown) {
            var viewcoord = grender.canvasCoordToViewCoord(mpos.x, mpos.y);
            var ray = camera.viewPointToRay(glmath.vec3(viewcoord.x, viewcoord.y, 0));
            if (ray.sphereIntersect(pos, 0.3)) {
                this.m_selected = true;
            }
            else {
                this.m_selected = false;
            }
        }
        if (this.m_selected) {
            //draw
            if (snapshot.getKey('q')) {
                trs.applyTranslate(glmath.vec3(0.05, 0, 0));
                trs.setLocalDirty(true);
            }
            else if (snapshot.getKey('e')) {
                trs.applyTranslate(glmath.vec3(-0.05, 0, 0));
                trs.setLocalDirty(true);
            }
            else if (snapshot.getKey('z')) {
                trs.applyTranslate(glmath.vec3(0, 0, 0.05));
                trs.setLocalDirty(true);
            }
            else if (snapshot.getKey('c')) {
                trs.applyTranslate(glmath.vec3(0, 0, -0.05));
                trs.setLocalDirty(true);
            }
            grender.gizmos.drawBox(pos, vec3.one, quat.Identity);
        }
    };
    return ControlHandlerComponent;
}(Component));

var SpriteBatch = /** @class */ (function () {
    function SpriteBatch(defaultSize, grender) {
        if (defaultSize === void 0) { defaultSize = 512; }
        this.m_isdirty = true;
        this.rectPosBuffer = new IndexedTypedBuffer(Float32Array, defaultSize);
        this.rectColorBuffer = new IndexedTypedBuffer(Float32Array, defaultSize);
        var indicesArray = new Uint16Array(128 * 6);
        MeshBufferUtility.IndicesBufferFillQuad(indicesArray, 128);
        SpriteBatch.s_indicesBuffer = indicesArray;
        var mesh = new DynamicMesh("spritebatch");
        mesh.setIndices(indicesArray, GLConst.UNSIGNED_SHORT, MeshTopology.Triangles);
        mesh.setPosition(this.rectPosBuffer.array, GLConst.FLOAT, 3);
        mesh.setColor(this.rectColorBuffer.array, GLConst.FLOAT, 4);
        mesh.refreshMeshBuffer(grender.glctx);
        var mat = this.m_matRect;
        if (mat == null) {
            mat = new Material(grender.shaderLib.shaderRect);
            this.m_matRect = mat;
        }
        if (this.vao == null) {
            this.vao = MeshRender.CreateVertexArrayObj(grender.glctx, mesh, mat.program);
        }
        this.mesh = mesh;
    }
    Object.defineProperty(SpriteBatch.prototype, "material", {
        get: function () {
            return this.m_matRect;
        },
        enumerable: true,
        configurable: true
    });
    SpriteBatch.prototype.refreshData = function (glctx) {
        if (!this.m_isdirty)
            return;
        var mesh = this.mesh;
        var posbuffer = this.rectPosBuffer;
        mesh.uploadDataBufferPosition(glctx, posbuffer.array, posbuffer.size * 4);
        var colbuffer = this.rectColorBuffer;
        mesh.uploadDataBufferColor(glctx, colbuffer.array, colbuffer.size * 4);
        mesh.setIndicesCount(posbuffer.size / 8 * 6);
        this.m_isdirty = false;
    };
    SpriteBatch.prototype.drawRect = function (rect, color, depth) {
        if (depth === void 0) { depth = 0; }
        var vertexbuffer = this.rectPosBuffer;
        var colorbuffer = this.rectColorBuffer;
        var varray = vertexbuffer.array;
        var carray = colorbuffer.array;
        var x = rect[0];
        var y = rect[1];
        var x1 = x + rect[2];
        var y1 = y + rect[3];
        varray.set([x, y, depth, x1, y, depth, x1, y1, depth, x, y1, depth], vertexbuffer.size);
        vertexbuffer.size += 12;
        var col = color;
        var csize = colorbuffer.size;
        for (var t = 0; t < 4; t++) {
            carray.set(col, csize);
            csize += 4;
        }
        colorbuffer.size = csize;
        this.m_isdirty = true;
    };
    SpriteBatch.prototype.drawRectVec4 = function (rect, color, depth) {
        if (depth === void 0) { depth = 0; }
        this.drawRect(rect.raw, color.raw, depth);
    };
    SpriteBatch.prototype.drawSprite = function () {
        throw new Error("not implemented");
    };
    return SpriteBatch;
}());

var FontInfo = /** @class */ (function () {
    function FontInfo() {
    }
    Object.defineProperty(FontInfo, "image", {
        get: function () {
            if (FontInfo.s_img != null)
                return FontInfo.s_img;
            var img = new Image();
            img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAgAElEQVR4Xu3dC7y2bzUn8LWchmKMIoxzOUYHTDSiUKIpwlRKEoY0pFCOYYQcJjkmQw6p9C+JIVENIdIwRAxmRuWQpOjgkCGy5vO9P+t+5n7u536e/ez97v2+e7/vc30+/8//8+597/twXb9rXetav99aV8ahXdM9kNf01x8+Pg4AuMZBcADAAQDXeA9c459/RS1AVd02M59znsagqv5VZr5m/k5V9RaZ+Tfn6V1P413WAFBVT4qIX8jM/7LQAe8TEd8dEZ8fER8SEXfIzE886UtU1b+MiBdn5ltP71FVN4qIB0XE20XEN2TmC/2+qn4wIr4/M395vL6q3j8iPjwifjkz/8e2d6mqX4iI/5qZ37brfavqGyPi5pn572bv5F1/LyJuk5l/fMQ9viginjd9z5P20eX4uzkA/iAinpyZX7EAgJtGxO9GxAdGxF0j4pMz8z0WrvvhiPipzLyuqv40Iv5tZr5kMmjvHBEABkRvGRHPj4hPy8zf6YF+TESYaf8rIu6bmbepqk/va243uc/9IsKAPiEi7tRgefRSp1XVbzUAvnoHSO4QET8TEbfKTNevtap6WER8fET8m8z8x4Xf36a/5esj4ici4o0i4jWZ+euXYyBP+ow5AAzCUzLzaxY+8B0iwoDepDviXpl5q4XrzLb/FBFM+z/piMysHlzPM7A62v91+ndFxB9kpnub6c+MiO/oGffzEfHBEWFAAOmPJgD41Yj40cx8RFU9JCI+LjNvuwUA3ollWwRAVV0vIl4UEd+amf95yz3eICKeGxG/nZmfvfDdQPofDHr/B+hfkJm/cdLBuRx/NwcAtALANy184JtGxJdGxCMi4r0j4v0y84cmA/JREfFQMyQifj8i/t6gMc8R8cjMfFpVAQ+T/n4RwczeMDPdc9Wq6gERcY+I+LMGiWv/e2Z+8+y6n46IlxiMqnpaRPzPzPyyLYP3aRHxR5kJCButAfR1EfHmmQm0i62qPq5n91vN/YSq+hcRwSqZPCze52fms7c8z89/IjO//XIM8q5nzAEA4QCwc63c8lFvGxH8hP9mNkbEO0WEmalT/ndmvqyqPO/nIuI9/SwifiQzv2cBbB8UETr0rSKC6WV2Xz8DgOXAgP5hRLAGlqTB0hy3VdXPslaZ+TG7/pYjGBF/DbyZyYpNgcs/spy9e0T8YkTwj346M39s4fvOLQC8GLO6uJYe1bHt2L0sM69fVXeJiPtnpv9PO8q6/7XW9Ih4dUR8SWZyPtdaVbmOz/HRmen/03sAEkv0WRHxxr1M/DOfIDNZomO19lX87ZqV2QL03+5J4hs2WlUBtNnNQk3f2RI6+kzf0svJU/sCTuM/7PvSVfXmbWnHP/mHzHzevn8/vW5uAaAaAL7/uDerqk/ugfjUiGDabhkR78r5ioiHzx2nqrLmPrktxA9k5hfPOuz7IuJl7Ux9ZkSYpZ+Tma9up/DhbUl+vP/P9H51ZrI8x2pV9Qrrt2XqqD/s3Uhl5mdsAYDl8ZWZ+Rez7/mE3t348S0i4i8j4qV9zSdl5suPevb4+6oCpO+dXP8XmWnZPHabA+Ce1u/MfMFx79QA4I3zhh8XER8ZEcw2c7gEAJ40v4LfoAPed/KBnDm7AZ32rIiwA7kuIp6UmY+vKhbqBpl5z7YUZqUl6CdP0hFVBfi2iRvL0bwfqoqH/7uZ+eXH7aPJ9x25BFTVvzYBTrqsTZ71rlPnef7OcwDwgHnLa+Zr3w+tqntHxF0y815VBaHPn8YUqmo0g0y/jryXvX1E/NLoWVfVm3HorOkR8do2pzepKqB6VmY+oar+Y0TYs7+j4Ew7jt/ZXvwX7vu+k06y7X2fzPT+W1v7MKySbeszjvucfQEwcZYfn5ks6olaVbHCv9lj+hFLN1kBoKrepL1XS8DnnuSJVcWM3ygzH1JVT7ffn5rVqrp5b/u8mHWMmTRw35yZ/9czq8o6/MaZ+aDucEuI2a3dzlrZHjeQsjLaiyOCVQBg20HP3rtVlc750Yh4h8y0e1lsVXV7Vqive93eD5hdWFX3tcPJTM7rRmtfytb3zTLz7S/hOSMAfjEzBcw22hUJBVcV5+2DMtP/r3irKnt8M5olWnTuGpy8/O87qZN8nA+tqh+xE8pMQbcza1cKAGbc688TD1BV1++YxecthXGr6hsi4tYdAl/bkp7m6FSVSCtfxNjcIzM5y2fWrggAzuxrLvHGVfWO/BLRxemtOlJo1/HQzPy7S3zMzj+vKhzI2y2Fo8/iuQcAnEWvXqB7HgBwgQbrLF71AICz6NULdM9FAFQV1gx58tgL9C2HVz1BD2wAgCKmCZb3n9GvRBGCMUiYv0V0RASPebUf7n37v+8gzWszU8hzrVUVDuBzIkLkT9DnixeYPtFBwRmRQjHyb9xB5fLMfyUiXpCZBCKrVlXYynkg5ZbzSGdVeU9Clw+NiBuju8f4RVVhN5fEJvbxyK+hVZW/w6KKTdwAgxkRdx9p7r7mAyIC6yhaKgwspvB1mYnHuCJtCQA64sMzk/hh2plYLYP94GbqBDEEcAbquAcfnYzFE5h5ly0AwP9jDDF592nu/xaZKZw7diYuXQcBAGbxiSjozMQgTt+J6AJRJIgkPr8EgBct6Rsmz0JZ4xmwjoJOL5wOSDOAtmbThrJ+0ynR1dzG45sHAQA8x3MFtLp/aA7oGb49Mx/e3r7++qrM/IGzHn0Tb8miLwHAS7p4xZ13XPpPmr//q/4gs0swZzoLRMqIOL5KHH8JAPMPrSq8/1duI6A6SIOjB8o1/WBVsRIfGxGWqvudEAA/FRG/vs3CLLwvlpJ4BUvJ8oygFbbGfgKBCWFQUczocP/GUv5kRFx/BFhV2W6+c2Z+0gzYg1wuIp69jdsYJXW7runnsujkdO/Wfbimd5xzAcKFj81MLN50ppmF3+HnVYWj95GuFTwRrVoLi7YPcSQAernBxOlMwFlrPUseiF9oqdaKMq0qmgIziFmlLPrsLQBgTQzyr8wp0w4pk5+xAjrItT+fmeLni62lYULSa6HVqhKGNth4CuSVQb39KIfrcDPL97aZ+coeHEvhZy28NyLo/1h6MnMxht+T8qhrjCO2FLlHoLIhdp0DgAlEBq0JQqqK1Ak/YDCEKEnHsGEG4K3HD5rMBk7kPgDA+Il1f+yc9aoqSwxhiPWRhaC1m4IS//1U/kNV3X8LAKiNiDwIOVgqwk7PQuiM67ZIm+8hVOHbfF7TyhuimGYezX7fZtmYvo9wMuaSFdQEjVbvXFWWq1+LCKJSA0LHgBNA5a4tXdvAd5yfNxFkUj1sl8BnSgZBCwICfbiGlKq6e5tZH/kVmfnIdpxcfyILUFXWRjPgQ+YAmnUs50qc/ocz0zpt4OgD8Aj+9vXbADC7jw43s5+BrOr74NXNIrOSJXJvYH9EZlrH5xaJ5uDOmTn3CfwdMex7RQSdADr7kS1UXekQGwRYTt/Eb8GOvltmWsZOtbUS+l0igjO/MfPHh00BAPE08bz0+YePHXWnkQatKjOFWaHzm1+/0wK0Bo93zkSuCSeWeqGqCExQv3YYOhvbtybdnvyd+PlTttyH1009Y+a5j7WWT8OXGTz9qmIxMKLYylWbzH6hYkvK9HdMNqf1vTIToNyHMNa7rHQOC/3Eilx3EgFOP0PYmAVZ5Caqim9k18ZibSid3WMKACixRVopb2cfyeRySh5aVbxz2xw6fXTu3gBoxw14zOIx0WKrpKmqbtgiU9slauGNtqcFuFs7Q3ec+gJVxSzbXXyqZahzI/5+PhGqCkuoI4lU599rICwN92k5PEtJrm55vOPC9STxrBAHTX7F2jZwHwev/adXRcQzM5MQZ7H1ttvk5thb4tfaAIC+yAWLnHFfw7wReTBvOHNJG2vy8ariE8zNo/05XnpoenjhTV+amYiY8RrrJIdMIx4h8vihbeqYHT7A6Ee4D/HoZ8yVwc2+kaL7JltYwlj5CMNup9959Pw/PTPpBjbaRKTCqmh2CGRm5O/jfdzb4Nv5yI3Qhxsq5D0dPD4Fepo6G+C2tqoanPue4Ju7gE6cIIo8RP529eQ5+11VialY44HqRI3NY4as5VuzZk5058MfnVkPVBVrTEpnS04Of2wN5/hyBzLozIbp7G5cVXYoN9mVD7nv0w8A2LenrtLrDgC4Sgd23886AGDfnrpKrzt1AFQV5g6z9zPbnJOqkj8nfDuGZyWObI1WXaV9fy4+6ywA8CWdAydd+usz8yunX9ppTTJx8ApCsxi9D8hMhMyqVZU4gHjAH8/JKRdVldQqQSJBFDF+GUgPmev6q0oqt8AT8ugNm44dkkeqCnePA9Akfdqz0ye41/RdlnQFXzTVMXQizFzmLj18zqsIgbvOJJCLgXwb0sxUTEGVZ6Z4xNCqSiBJZHKML/gZ7mIekNLXdBTj3wlETRNd0OUb8YK9AdDbRZTsRjRpCcqdHCr758bTqhpVJa7/g5mJLx9fVpTxS6cdX1UqbfgAYg173bVQZgNA2BoBo5MMEuHIStHbfANqWugXlSxsLdqJHh0BoJjF9boyiTDwkHSamajb8f3c++8yE9O32BoAqN6t2UUtLRfOdh8RSPyLqiNDRZZ9ATB5L4EliaiLNQ0m1wEWku+SACCaNxR/2CevvarMNlEuVK9B8oEyg6Q73aLZKjEIpIiOx52TXo+droN0PNGIWTG3JCyA6OUQl68qtOefZqbZ7t8EGH/eCaVmw0ZrCzAAYPJcrCcwrpJMW1l0SQCoKvfD8S9WILliAOhU44EdmzWdKUN31XrQRAt/MzOZ+KVONajAguLE3iFIRvoVUhVPMHhSpPEOQOKeVEGWBYM3mn8ki9krBCv4MX2XAQD4iS4R4x7IqqGGUIc/kS3SqzZKuvQ1loA5AG7WPsyqCEQDwHd96+QVfmfKYh5lATpULLvZ/RdbWwDvPOUPSNKohlZLwASsl24BjgOA7jQdYRkQH/+IBer4w1piJVKl5Iq6Q0OrKmsrjl5ipxxAFoEZ9CEYOfSw66zRmLRbVxVKE1Bumpkqj4z3Gn2A8UfWclnGo9hC4ul3Z6b33dbhSwAYS+HcLDMlqXqfJR9ADuIqnXyLD6AK2i/1PWgDfOMd2hpQWGl/mZlv09cw1Wv+R1/zN2cGgG2ds+vnk6xTM3ONP6gqIg6VP9ZURf2BCBkAAQrkDytgx0BR9PZjynVV8Ql+fFzbqoqThzZd5e2NPoAloKlafDxtwlAgoqo+unUEEk0Xy75sWQLUJMJ04ukHZvSUlgC+yF2nWoKqwuI9bgaAI53A07YAqMzBRM/ar2WmzlhrzRziDRRj2CCPWsZFDbtEE+P+sYW8e2yWjjaoBBEElI/tv196nzmrOPcBePv8E8vGVO2zNlOnH7MFAMw81RAvfWinBADSLuZdCHcE1uUCAB/rx6a+zvhte+8CuiMGXrnFhYsCg5ZRU9UgmNbKnlSVAlGoSTOaU0dWBkRUMnyAV1UVVTJefUUrVxVRBXNMrTTU6ZvsAlC5RA/eTQUv9xoHjjBErAHn/uctMP3QUVw6BUD7HTx4sm3aABbl1ADQ78yy8cQ5r79fVQpgfO9ZWID2OTjInifZ9B+XlEd7A6CdKp1sK7g1aFNVHDnr3fvOiypWlfWQl87kE3JaQymDmPtBFl5VnDhBpNWOoH/Og1ZvYNjyTOIA/gkUPpLkepW82cIVmgUWxozWGXSEQzmVSRxALMHyZF22fK0VytziAyzFAY7aBrK2lj0iW4JaS9MTJwql04wDkKSNxTL08wMyc/Q7VoZwbwBsLBAn+EEraqWFb9QhPMHtDn9yCj1wuQFgBjCDtp1iA7SGagWSSx/aFeiBywqANrtM8Rd0aJY8TMUNUvNDuwI9cNkBcAW+8fDIHT1wAMA1Do8DAA4AuMZ74Br//DEvgPZexsszqkoKFX2/QxhW9QI74VMMYDF3oJMfETOfOWa6dBHmW49ZNpMQstKwgkX24oI40r6meQHKrdrHkjvT66tFgEiZJoeOXICsGEEijN+3zFK797kPfsF19uQCVI/JzEdNcVFVgklCufL6sXqeqYD1EAyrKhwGifZSeyc1ArZEHXERT1Nbue9DHyE5da3YZSevPF1qXFWh0QW85nESuyragidWlTiHWg7vOe79O+UN/yLEvYrjLAFA8gdP/aOmKUd7AECwRUo0pvCOza9LXFB8cXwOlhC4eP/qB/zZHABNI0uvIhoRJnaCCFZSCvcUkCMbOLJnCKafnTCK6Oh97gMAgks6FsMphP2Jo+6h30fal3dALr20VbkiaxtHyFTVIkO3JwAIOmgRVjzKJDT+Hk5PqSpBqr/KTMKbVasqYXWJoEMV86oyGV+VmXfrGgeSYL9snoa2BgCpTF3vnmiCQmb6APH/XRZACJbYARmDwZP6heUi7FCH/7VtAQgzZOxA8YMXACBKJv38bca086ZJfRDCaMglnJJB/W+D902ZCTB+v3Qf8Xgxh+l9BgBMRCJmtWjhQDx16TgU9gdnJo3CznaJABhzMD8wM00ez6cgkmGEOfVvUVZU9Zo4pQkz5NxQfbQrloyHchgXwhPU8lqbAkAhRNU/PmxMcDwmAOTGY/qEVSVaImckcAo/qnv38gkAULXi9KhXH7ZaAsaCjNO8+F6WmH/JpEMdgQUAMIly9+Tm+/1Q2HF2H6ZWCvhHTu6zAkDL1SRZfMy0GEVVMa/qBxCKjCXeF4FwKQDo9yb3ovIZju2pKhNG/t9g8lspZYLeu6pQ4MLoj+qS975rSE7ta4FYAXD6CkvWcCzPtE0BwJw52GGx3v4eSwDwWCutPczp72Xm7atK3F8h5hdNAEBLMNTdb/57CgBLkCzltfLnVSXGj+8fOPgGAD/BgFlLB+3fyFB23X4zZek+9xwlX1U1+gBuy+p9eWaureedrGnmIW/o+ABhsaT+KQBAVrHvvGkvNZY6a/l4eBbLqnws4kqJ+V/ll1WVd8c0rrKtW8ZHH4FiXjwMYwoAJA09HDO6VBzhqCXAizPbD6gqxIqiDip7ezFW5QUjAIgburK4bF+VNDgvgxNYVQaV+GOV8TqRlzFjQ1mWBgDa2Af6aOvz6oiWquLI6ZCl+3ifUTk0+gB8Cf99rfdemt5NLvFDOIREmEtH65zYB+jvGplPCihLlsonqqCMs9pJJJYFPgngy3q25OqHN5gm0HZavYFXj0DfbSxhcx+AeWRWrPVrJ1DsYQGAh7+3Ji/rwxiY5ufOAICZw/ChcxVdGAFgd6BjLRuDkKOrdJv5AKYWz8YSMB+wrsgNTPP7EKpK2x6qgrcFGHyALmLtbziuW88IrCpkFjWUJW+t7bAAdjTMOYHKeIiWwQTcsRr6OMjMOEuKHfy5KdB6t2WCEtVQKjHxrKmKJFPlsIpnNJw0HZ/SZXYwtGvlfJZ2AXh6KHfxIK/qjjrKAvBOyZvWjpyrKj4Az/aZUwD0PW2fDDavdgQACZf0afTuUH6+aWPbI8vM+D5rgpCFgRhTus2U6X2UTsdFjPeZ+gDMO7GGekh2FQCiUIR6ASMYXcNSWC43qp3vAICaCkSqLON3tmjV9taJaWv36VoEZjan0LZteuyenRRHFoj4UPwsgDD7WQLvrPye73KAxgP73yabFPu1Q7qWAOBn45FvnK6heEFbAGZ+2lZ16KuK2VQ7j6Bi1aoKmm0/nroAAJ2psMLrZnEAH8WicOhYJbPhCxfiACtV8BwA/c62poQdagRplMPiHdN4wnwXwLzajqlI8ro+nJJTa1upAYIaAQQvG8e8bANAvw+TzomU1Tu+D899VYugryOFtxtRJIrEbtqfo2B2iKW0g2yiKoc31BqqKqomlsHWUf/5Gf/Fe9thrMQ810QouEvK2HYuHiu3BJ5r5WfXCgCojyiZ+RGWBse5rUX7rpUBn3/nNQGANoFCuLZPfBJh1TM79OEigemaAcBFGpTL+a4HAFzO3j6HzzoA4BwOyuV8pVMHQFfMHLX5QpBrdfK6eKHI3+JBzr1e2zMPx8h1Exo9E91gVamKLhfBtm4x12GfAakq1dRlJx9JGO1zv/GaqrJv/9uTOq1dZ5FUX56FyKlKr6vtqyph0rXfJDPHM/jsGQ2A/bmkxEdP8vPm775WM78Hz75bkGRR+t2ZRerxr5Wj39YpXcJO2HUDAB1MEXbG3g15hSdpDQLBFO91IhBUlSDPJR0oufTunZPwmrHs/HG+r8+CVART3gSaW/yB/mANAGLPQonCscNpmI06IVk1+tXiVbBgWsBBWpeBFsZcKy/XFmAXAET6RNu2ViWdfuQRAAAyYJVcIjS7Sh49TkedxrXnFACYVmQZ7cVGUojvHiOBwq5i1SJQwogEEOrPLR4h2wkeZrCo0lri5VEAaIBJB4Nqpndn2waArqYpQqfyB3pZdc+N2PxR99/n91UlLCsMLa6OlRNP+JpZNVEWgLmWOsfcEr5gHdeihV3oGpcvTVw4VxratFiGOAU2kvJKHoUo4ROmFqDNuhC378WSWn5UI1mrwtpaC8WxjeliGwEg3s6UohrFn/HK26RfQIIoMvgbM25PAGytTD5/yx0AAKLfwlz2aSVkYRQxp+4rtJpHbT4cAAkbwYqYviLWQ2sLYDJgNxE1KoxIaEVTj9cITStYjYvwno67odpZ+Q1VJVRsPIwFsAlgvXgGAPdWJ5gIhsYBCwokQy3lqvIOQAZMrMCQot4h9zWfbOUEVpX4t7LwAiboUvq4tdZrijVSlQ+Ci422DwD6JTmBnMGd5WmXANDxb2FdtXaH4g+dlCrBdJGn32em73tN8x6qdE9JJRbgwWNSaZ+m7v0GgqbfEYmDv18jzCa/p6BiMRTVGOoqzH2AlnexCsi6YQJ2Iij/Y8jm7voDyuGYrORuUuW1f56fujIFgLWUsyBMuq36B1EhipLSZvGgo2MAwBIinXvnYQm7fIB9B+xSr+vjXgw2SdVQzKEZw+E8oO70NSew/+Yp0wIVVWVplVSqktrS5CE6RcS90YQyRvmunMDJOQ3zv/+TKdj6nViro5eAyUdsLTlSVV6OCVSdeut5tvsCoF9w43yi+VedEwBg29RDGGoeLHnmcyewdzuqlq2qefW3oGgJSpYAMPoODqQaGMvepXGqx8OnxrMJnDW0oom33O90ANAHKzudixqHZGtslLFAs2rHBIAdhJz/jUMqJqC05CxuA5c++rR/1tVHyKjpBGka+EacQHTs3AIoMfe4dlDpCB81TTWvKro+1lWNAvy8AX7L0Zls5RMthLoJFNYcT1I0u63ps/Q5a8LsD+nw0/tM+u7UALCtds2r50erHBMAtoRyElblWM6pBTBwZNi/0Tsn22bnIk4Hhe+hopm8ChI15ffn5xxZZk0g141NMYyVBK1PU6GFsMQCmllu7Z4+61Z9ENZYCY2Yhv/x6NlkPB4ATmP2HAcAjVxOoFNKF8vVn4cl4DT65bze46xCwdYvKh5bnNWBkFvWKVtCEbiVELVLubA6mv0upe6xtndtqrf1O+naUAHsWm9nAQDbyVFaTtIkMeRYrbebQ3HJbhywrdzBFmBtnEM4uc4Zgquyqsd6uavs4lMHwFXWP1f95xwAcNUP8e4PPADgAID9emBfvrv3sjz75823JfMn9b5Ydc95MokY+3N25eFVlT3yeOKm3LnF0PR+X3ftXrW3BdiX7myOXoTvWZkpI2Vr65Kw15ufMt4JkTj+FdmyAB4soKiYlDZ7cpTwoU16oCeYGMJapfVpJ506ANy86UpBokW+YHyBBssbztOw9gHA5B4YMMmkBwDM4N+nt6j6LjNqsY10sBO8ET137lLu1EAaTYDQ5Eh34rvNOFnAOOz7z7JsjjTLVSXEKVlxbM9fqIiBEBksQItRRM9essSiVdUiAKpKdpHKH9KuMGwiebaWKoCslpxe2mTSiEP4Lty6VLaVJK2qpIbjAfAhMm0UYfjcaRn6vo93EdBa1AN0ti4q2e9x/dK1VUVdpWu1GEf/uwaohXzvl5kKQAyts5WxfBJfZQohojCIQ02HPtdZTQDfIyYzhJ37WWsJrSMAJGiSDgk3ykoltFBkebWX7iXAjHZjeXmIIZnEa+HHfoG9ZmVVQaYY+0qO1n8/AKDDpkQpEhoFi6Y6wbEztgGAosnAYh0ph6SHyQtAcytYMaa86TyUsu8S8/ddkkVXiSN9RAvOXoweeDF0cgvmdLD3JE7ZpgcQHAMmGgHFG3D9fzgL87q3OIqws3sJC1M7AfP4zfrcON1FnzT38IpJ/qIKL8LDaGdhaYIf7WWZaZxXbQSATlCFwqncEAQAihg/ZvJQ16AyIdg1ZqWyrxvHqGybldMH9z12AQAozWLPJQrdVvJ9FwCohG5bVWLqBtagus+NJpVG3B9rN8Tj59/VZwur4e+I+TEzGZCuI8aY0LY79QCTSiNDqZd+1hrVO/kZQYjBJceTH4lXWAk5un8puPAIW2Vwx1kC8NNSiy0D+G7hV7TvNCt1zneTLfHgKVfW2ikBQPq2ZMqbH/GRuwCg1s+dGwBmm93JEgBWYs4+j3f1XVVlFqoZMC0fb1Cwo28xSb6c9w8RxpNHPUBVkW+xqNP08G0A+Ovx6Jt53zZIqICQT5Q/lL7Eu2unu/R1xnUvH0B1KqZCtq5Bp3dbnfTRN7vcALAEkGEBmHN2Bl9kX7B1VazTAMDt2y/gaI55/You4CZQuePP5v3jJLAHjTuctiQsK3CNKiYi3BXXP7EAOwEwscomLSvJxPNJ1gpbtHLJ0rBWdWxtCWjHBCWrowk9rI20bPOU5csOgHYCpTQTVVAhbZSp3+EE8gFOAwAmhcnwSJq71kaoLiLnYeVdt4806gEA17LxpEltH+nlZisnGng4zGr4WGqnVC+rcJQFUGB7WruBv6DsvOIWq1ZVUvVZottNy+gv+QBEhZwKZpeGTeIkvd5U0HgkALacZ+ekCg7W0uzd6QROdgE6HDB9yFjZY+nsvNWzTssC9Ky05pPBMwCj/VMAAAVnSURBVL0EGI6dk0iy8ksaAGOlDwPNh+G9rw6s6gJPvHeCTuJQ4HIa2XEBACRqBI01Cwh1lPVbnZXQ782X8B6KSmjGdE3uJzGEzo3KV+k03j1HaBSAKMky/OwsWlU5POHdM1NJtwvd9g2UzWYon0R1lBUALncnAIC9LapVNZDn9Nl+9s68UFuWU2utaOVUqRrCKbI3d5LFTmXwqb3AGd7ohADYcALP8BUXbz1uA5UPsZ1jkjShXJ7vVvHnSV60AxhKw41Ho9re7HUS6Umedzn/Zl+uZGYBLinv7zS+b+9Q8Gk87HCP89cDBwD0mPTSRyq2uN08f0N3Om90AMD/B4CQM83+2olhp9PN5/cu1wQAujydPbIMZylV8iDXWlVtBUCfZSgVzf5d2HjtPMTzO7xHv9m1AgAxAyTIA3dEFHdagKoCHqFVyR5rAZeju/n8XnGtAMCMVe59a/GHXRZgHL4uEYvMsZW9Ktq4DVwrb9I16lUNQUUKDN2lKUwU8Rj7lnk6nILZZwHInnGkugjXqlUVHl2C4tOrSqRMvNr2b2QeH9CmWZ489suz7t/n947PkuKM2h2e1e+EEh1Kw0+ak0NVA52bd9E4FcsHFm6p7QkAkUtAWoxsXkRETOngXYyYgySEN++UmWhVoMDCqTwhTOrfg3xLVKuqcNfSp1/ZlcMdI6MItesMOH7e4BGiyF13zPp4QAKC4xVd+388/QLQCB4IVoZWVSpoj8WR5dkLKmEwCSimABRzECK9wZzfmF13pBNYVcKoqOmN0ustXBHVxBJemLYXALrD8d//lJn36fx8g/Qps5ksHn3XqpJ1g8R5WIs5bjyjlgWDECYijYoWraVLVxXNgQzZu3fxBzwE9dHS7L5h19WlZ5gmkwAJFkwc/OVHJajsaQHE1hVnQOs67dzhzJ7jO/AVNIpi73dDE1cVp1HRinMLiuMAADdvltALUKwwwcqqj8oaggVLBotgNttPmykvzExJkdNZafANqvOFlo6oF57WyZ6lWDKAEGSsaQw7hYxlWcz06QLX9+2j01eVxi9hCfDexCWOZXn2BACyjLwzfp5lVKrdsirGr1z91sO2r7SpGAFAgyYmP4RlWxWj/Pia2KOqhhBx1543eKtKYD0LFCRSUVzWL3NJjarKN39hCgAzHAlFXnXvzGQt1lpVoWCBzN+awWuHJPV78jsAU7r1toIVKmPROpCBDUziJQBABRXVvXHw0+9RjcPy51QUDB2wkbkpG3eslLbLDYgRAOhgHa6enA5loqlZ5gCQ56cMufVbSrdZPO0I9Cj+QAchlByIQFug44bWNK1ZwjSzJKyG82zWpE3tK6Cj1Syy/qteMn0Wi0NjpyzMRtn22bWcwJtlJh3epQDAkuLkjavOCWSqzX5kkDWMinRD7lVVozOojMzg/M06muBS7f9btpbN2qe4w5CI2eFW4krHoGDC/IypVDHLQK747CaO+BkSRNYKG/XfYRSBY9quy8yxSOUULAcAbAH+uY0D9LFnnMl7jGvtttl71M+riuLprvMCSTPw7rMLIKl2EOQGyI56h/P6+3MHgKoaM34c2cK0k4Ov1b87bmdWlXOCWDdCVodLbvgCR4SCSayVhuFzOJ10a8bScd/tSl9/HgFgnaUQ4pM4Bm6r47Zv57WDKpDEOVW8cc136SXF7La1s82bL20KRYpfeCdSsCEYdTW0cweAq6FTL9I3HABwkUbrDN71AIAz6NSLdMsDAC7SaJ3Bux4AcAadepFueQDARRqtM3jXAwDOoFMv0i0PALhIo3UG73oAwBl06kW65QEAF2m0zuBdDwA4g069SLc8AOAijdYZvOsBAGfQqRfplv8P04s0rcIFE9wAAAAASUVORK5CYII=";
            FontInfo.s_img = img;
            return img;
        },
        enumerable: true,
        configurable: true
    });
    FontInfo.glyphData = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, { "x": 0, "y": 16, "x1": 2.92578125, "x2": 4.73046875, "y1": 6.3408203125, "y2": 16.123046875, "lb": 2.92578125, "rb": 2.966796875 }, { "x": 9, "y": 16, "x1": 10.763671875, "x2": 14.93359375, "y1": 6.3408203125, "y2": 9.546875, "lb": 1.763671875, "rb": 1.763671875 }, { "x": 18, "y": 16, "x1": 18.2939453125, "x2": 25.4033203125, "y1": 7.0654296875, "y2": 16, "lb": 0.2939453125, "rb": 0.2939453125 }, { "x": 27, "y": 16, "x1": 27.7587890625, "x2": 33.86328125, "y1": 5.7802734375, "y2": 17.61328125, "lb": 0.7587890625, "rb": 0.833984375 }, { "x": 36, "y": 16, "x1": 36.13671875, "x2": 43.560546875, "y1": 6.2451171875, "y2": 16.095703125, "lb": 0.13671875, "rb": 0.13671875 }, { "x": 45, "y": 16, "x1": 45.3896484375, "x2": 52.697265625, "y1": 6.5390625, "y2": 16.095703125, "lb": 0.3896484375, "rb": 0 }, { "x": 54, "y": 16, "x1": 57.0693359375, "x2": 58.634765625, "y1": 6.3408203125, "y2": 9.546875, "lb": 3.0693359375, "rb": 3.0625 }, { "x": 63, "y": 16, "x1": 65.05078125, "x2": 68.919921875, "y1": 5.8212890625, "y2": 18.87109375, "lb": 2.05078125, "rb": 1.77734375 }, { "x": 72, "y": 16, "x1": 73.77734375, "x2": 77.646484375, "y1": 5.8212890625, "y2": 18.87109375, "lb": 1.77734375, "rb": 2.05078125 }, { "x": 81, "y": 16, "x1": 82.12109375, "x2": 87.5830078125, "y1": 6.3408203125, "y2": 12.1376953125, "lb": 1.12109375, "rb": 1.1142578125 }, { "x": 90, "y": 16, "x1": 90.57421875, "x2": 97.123046875, "y1": 8.986328125, "y2": 15.5830078125, "lb": 0.57421875, "rb": 0.57421875 }, { "x": 99, "y": 16, "x1": 100.626953125, "x2": 103.9287109375, "y1": 13.798828125, "y2": 18.337890625, "lb": 1.626953125, "rb": 2.7685546875 }, { "x": 108, "y": 16, "x1": 109.8046875, "x2": 113.892578125, "y1": 11.7138671875, "y2": 12.8349609375, "lb": 1.8046875, "rb": 1.8046875 }, { "x": 117, "y": 16, "x1": 119.6591796875, "x2": 121.9287109375, "y1": 13.8466796875, "y2": 16.123046875, "lb": 2.6591796875, "rb": 2.7685546875 }, { "x": 0, "y": 32, "x1": 0.7861328125, "x2": 6.6103515625, "y1": 22.3408203125, "y2": 33.4697265625, "lb": 0.7861328125, "rb": 1.0869140625 }, { "x": 9, "y": 32, "x1": 9.6015625, "x2": 16.095703125, "y1": 22.9423828125, "y2": 32.123046875, "lb": 0.6015625, "rb": 0.6015625 }, { "x": 18, "y": 32, "x1": 18.9228515625, "x2": 24.8154296875, "y1": 23.0244140625, "y2": 32, "lb": 0.9228515625, "rb": 0.8818359375 }, { "x": 27, "y": 32, "x1": 28.0048828125, "x2": 33.890625, "y1": 22.9423828125, "y2": 32, "lb": 1.0048828125, "rb": 0.806640625 }, { "x": 36, "y": 32, "x1": 37.12109375, "x2": 42.7197265625, "y1": 22.9423828125, "y2": 32.123046875, "lb": 1.12109375, "rb": 0.9775390625 }, { "x": 45, "y": 32, "x1": 45.2939453125, "x2": 52.3349609375, "y1": 23.0654296875, "y2": 32, "lb": 0.2939453125, "rb": 0.3623046875 }, { "x": 54, "y": 32, "x1": 55.216796875, "x2": 60.6650390625, "y1": 23.0654296875, "y2": 32.123046875, "lb": 1.216796875, "rb": 1.0322265625 }, { "x": 63, "y": 32, "x1": 63.8408203125, "x2": 70, "y1": 23.0654296875, "y2": 32.123046875, "lb": 0.8408203125, "rb": 0.697265625 }, { "x": 72, "y": 32, "x1": 72.7998046875, "x2": 78.8427734375, "y1": 23.0654296875, "y2": 32, "lb": 0.7998046875, "rb": 0.8544921875 }, { "x": 81, "y": 32, "x1": 81.8134765625, "x2": 87.890625, "y1": 22.9423828125, "y2": 32.123046875, "lb": 0.8134765625, "rb": 0.806640625 }, { "x": 90, "y": 32, "x1": 90.68359375, "x2": 96.8427734375, "y1": 22.9423828125, "y2": 32, "lb": 0.68359375, "rb": 0.8544921875 }, { "x": 99, "y": 32, "x1": 101.802734375, "x2": 103.9013671875, "y1": 25.013671875, "y2": 32.123046875, "lb": 2.802734375, "rb": 2.7958984375 }, { "x": 108, "y": 32, "x1": 109.708984375, "x2": 113.0107421875, "y1": 25.013671875, "y2": 34.337890625, "lb": 1.708984375, "rb": 2.6865234375 }, { "x": 117, "y": 32, "x1": 117.9365234375, "x2": 123.275390625, "y1": 24.439453125, "y2": 32.109375, "lb": 0.9365234375, "rb": 1.421875 }, { "x": 0, "y": 48, "x1": 0.9091796875, "x2": 6.7880859375, "y1": 42.5791015625, "y2": 45.962890625, "lb": 0.9091796875, "rb": 0.9091796875 }, { "x": 9, "y": 48, "x1": 10.4287109375, "x2": 15.7607421875, "y1": 40.439453125, "y2": 48.109375, "lb": 1.4287109375, "rb": 0.9365234375 }, { "x": 18, "y": 48, "x1": 20.0712890625, "x2": 24.302734375, "y1": 38.3408203125, "y2": 48.123046875, "lb": 2.0712890625, "rb": 1.39453125 }, { "x": 27, "y": 48, "x1": 27.068048650568183, "x2": 34.6015625, "y1": 38.2587890625, "y2": 50.84375, "lb": 0.0615234375, "rb": 0.095703125 }, { "x": 36, "y": 48, "x1": 36.068359375, "x2": 43.62890625, "y1": 39.0654296875, "y2": 48, "lb": 0.068359375, "rb": 0.068359375 }, { "x": 45, "y": 48, "x1": 46.080078125, "x2": 51.9453125, "y1": 39.0654296875, "y2": 48, "lb": 1.080078125, "rb": 0.751953125 }, { "x": 54, "y": 48, "x1": 54.62890625, "x2": 60.8017578125, "y1": 38.9560546875, "y2": 48.109375, "lb": 0.62890625, "rb": 0.8955078125 }, { "x": 63, "y": 48, "x1": 63.7451171875, "x2": 70.1982421875, "y1": 39.0654296875, "y2": 48, "lb": 0.7451171875, "rb": 0.4990234375 }, { "x": 72, "y": 48, "x1": 73.3740234375, "x2": 78.453125, "y1": 39.0654296875, "y2": 48, "lb": 1.3740234375, "rb": 1.244140625 }, { "x": 81, "y": 48, "x1": 82.4013671875, "x2": 87.439453125, "y1": 39.0654296875, "y2": 48, "lb": 1.4013671875, "rb": 1.2578125 }, { "x": 90, "y": 48, "x1": 90.451171875, "x2": 96.91796875, "y1": 38.9423828125, "y2": 48.123046875, "lb": 0.451171875, "rb": 0.779296875 }, { "x": 99, "y": 48, "x1": 99.7587890625, "x2": 105.9453125, "y1": 39.0654296875, "y2": 48, "lb": 0.7587890625, "rb": 0.751953125 }, { "x": 108, "y": 48, "x1": 109.17578125, "x2": 114.521484375, "y1": 39.0654296875, "y2": 48, "lb": 1.17578125, "rb": 1.17578125 }, { "x": 117, "y": 48, "x1": 118.244140625, "x2": 122.9951171875, "y1": 39.0654296875, "y2": 48.095703125, "lb": 1.244140625, "rb": 1.7021484375 }, { "x": 0, "y": 64, "x1": 1.06640625, "x2": 7.1572265625, "y1": 55.0654296875, "y2": 64, "lb": 1.06640625, "rb": 0.5400390625 },
        { "x": 9, "y": 64, "x1": 10.5927734375, "x2": 15.7333984375, "y1": 55.0654296875, "y2": 64, "lb": 1.5927734375, "rb": 0.9638671875 }, { "x": 18, "y": 64, "x1": 18.3349609375, "x2": 25.3623046875, "y1": 55.0654296875, "y2": 64, "lb": 0.3349609375, "rb": 0.3349609375 }, { "x": 27, "y": 64, "x1": 27.8134765625, "x2": 33.890625, "y1": 55.0654296875, "y2": 64, "lb": 0.8134765625, "rb": 0.806640625 }, { "x": 36, "y": 64, "x1": 36.3896484375, "x2": 43.3212890625, "y1": 54.9423828125, "y2": 64.123046875, "lb": 0.3896484375, "rb": 0.3759765625 }, { "x": 45, "y": 64, "x1": 46.080078125, "x2": 51.9453125, "y1": 55.0654296875, "y2": 64, "lb": 1.080078125, "rb": 0.751953125 }, { "x": 54, "y": 64, "x1": 54.3896484375, "x2": 61.697265625, "y1": 54.9423828125, "y2": 66.4609375, "lb": 0.3896484375, "rb": 0 }, { "x": 63, "y": 64, "x1": 64.162109375, "x2": 70.1845703125, "y1": 55.0654296875, "y2": 64, "lb": 1.162109375, "rb": 0.5126953125 }, { "x": 72, "y": 64, "x1": 72.7587890625, "x2": 78.8154296875, "y1": 54.9423828125, "y2": 64.123046875, "lb": 0.7587890625, "rb": 0.8818359375 }, { "x": 81, "y": 64, "x1": 81.587890625, "x2": 88.109375, "y1": 55.0654296875, "y2": 64, "lb": 0.587890625, "rb": 0.587890625 }, { "x": 90, "y": 64, "x1": 90.7451171875, "x2": 96.958984375, "y1": 55.0654296875, "y2": 64.123046875, "lb": 0.7451171875, "rb": 0.73828125 }, { "x": 99, "y": 64, "x1": 99.02734375, "x2": 106.669921875, "y1": 55.0654296875, "y2": 64, "lb": 0.02734375, "rb": 0.02734375 }, { "x": 108, "y": 64, "x1": 108.3076171875, "x2": 115.3896484375, "y1": 55.0654296875, "y2": 64, "lb": 0.3076171875, "rb": 0.3076171875 }, { "x": 117, "y": 64, "x1": 117.123046875, "x2": 124.533203125, "y1": 55.0654296875, "y2": 64, "lb": 0.123046875, "rb": 0.1640625 }, { "x": 0, "y": 80, "x1": 0, "x2": 7.697265625, "y1": 71.0654296875, "y2": 80, "lb": 0, "rb": 0 }, { "x": 9, "y": 80, "x1": 9.7587890625, "x2": 15.931640625, "y1": 71.0654296875, "y2": 80, "lb": 0.7587890625, "rb": 0.765625 }, { "x": 18, "y": 80, "x1": 20.3583984375, "x2": 23.728515625, "y1": 70.1015625, "y2": 82.802734375, "lb": 2.3583984375, "rb": 1.96875 }, { "x": 27, "y": 80, "x1": 28.09375, "x2": 33.91796875, "y1": 70.3408203125, "y2": 81.4697265625, "lb": 1.09375, "rb": 0.779296875 }, { "x": 36, "y": 80, "x1": 37.96875, "x2": 41.3388671875, "y1": 70.1015625, "y2": 82.802734375, "lb": 1.96875, "rb": 2.3583984375 }, { "x": 45, "y": 80, "x1": 45.8271484375, "x2": 51.931640625, "y1": 71.0654296875, "y2": 75.43359375, "lb": 0.8271484375, "rb": 0.765625 }, { "x": 54, "y": 80, "x1": 54, "x2": 61.697265625, "y1": 81.818359375, "y2": 82.802734375, "lb": 0, "rb": 0 }, { "x": 63, "y": 80, "x1": 63, "x2": 67.56640625, "y1": 70.3408203125, "y2": 73.13671875, "lb": 0, "rb": 3.130859375 }, { "x": 72, "y": 80, "x1": 72.9091796875, "x2": 78.5693359375, "y1": 73.013671875, "y2": 80.123046875, "lb": 0.9091796875, "rb": 1.1279296875 }, { "x": 81, "y": 80, "x1": 82.09375, "x2": 87.958984375, "y1": 70.3408203125, "y2": 80.08203125, "lb": 1.09375, "rb": 0.73828125 }, { "x": 90, "y": 80, "x1": 91.080078125, "x2": 96.42578125, "y1": 73.041015625, "y2": 80.095703125, "lb": 1.080078125, "rb": 1.271484375 }, { "x": 99, "y": 80, "x1": 99.7451171875, "x2": 105.5693359375, "y1": 70.3408203125, "y2": 80.123046875, "lb": 0.7451171875, "rb": 1.1279296875 }, { "x": 108, "y": 80, "x1": 108.7998046875, "x2": 114.890625, "y1": 73.013671875, "y2": 80.123046875, "lb": 0.7998046875, "rb": 0.806640625 }, { "x": 117, "y": 80, "x1": 117, "x2": 124.1845703125, "y1": 70.2587890625, "y2": 80, "lb": 0, "rb": 0.5126953125 }, { "x": 0, "y": 96, "x1": 0.642578125, "x2": 7.13671875, "y1": 89.013671875, "y2": 98.87109375, "lb": 0.642578125, "rb": 0.560546875 }, { "x": 9, "y": 96, "x1": 10.09375, "x2": 15.6103515625, "y1": 86.3408203125, "y2": 96, "lb": 1.09375, "rb": 1.0869140625 }, { "x": 18, "y": 96, "x1": 19.17578125, "x2": 24.6787109375, "y1": 86.2587890625, "y2": 96, "lb": 1.17578125, "rb": 1.0185546875 }, { "x": 27, "y": 96, "x1": 27.8955078125, "x2": 32.9609375, "y1": 86.2587890625, "y2": 98.87109375, "lb": 0.8955078125, "rb": 1.736328125 }, { "x": 36, "y": 96, "x1": 37.244140625, "x2": 43.2666015625, "y1": 86.3408203125, "y2": 96, "lb": 1.244140625, "rb": 0.4306640625 }, { "x": 45, "y": 96, "x1": 46.17578125, "x2": 51.6787109375, "y1": 86.3408203125, "y2": 96, "lb": 1.17578125, "rb": 1.0185546875 }, { "x": 54, "y": 96, "x1": 54.615234375, "x2": 61.08203125, "y1": 89.013671875, "y2": 96, "lb": 0.615234375, "rb": 0.615234375 }, { "x": 63, "y": 96, "x1": 64.09375, "x2": 69.6103515625, "y1": 89.013671875, "y2": 96, "lb": 1.09375, "rb": 1.0869140625 }, { "x": 72, "y": 96, "x1": 72.62890625, "x2": 79.068359375, "y1": 89.013671875, "y2": 96.123046875, "lb": 0.62890625, "rb": 0.62890625 }, { "x": 81, "y": 96, "x1": 82.09375, "x2": 87.958984375, "y1": 89.013671875, "y2": 98.802734375, "lb": 1.09375, "rb": 0.73828125 }, { "x": 90, "y": 96, "x1": 90.7451171875, "x2": 96.5693359375, "y1": 89.013671875, "y2": 98.802734375, "lb": 0.7451171875, "rb": 1.1279296875 }, { "x": 99, "y": 96, "x1": 100.3740234375, "x2": 106.01651688945087, "y1": 89.013671875, "y2": 96, "lb": 1.3740234375, "rb": 0.642578125 }, { "x": 108, "y": 96, "x1": 109.244140625, "x2": 114.5283203125, "y1": 89.013671875, "y2": 96.123046875, "lb": 1.244140625, "rb": 1.1689453125 }, { "x": 117, "y": 96, "x1": 117.4306640625, "x2": 123.6240234375, "y1": 86.9423828125, "y2": 96.095703125, "lb": 0.4306640625, "rb": 1.0732421875 }, { "x": 0, "y": 112, "x1": 1.09375, "x2": 6.6103515625, "y1": 105.13671875, "y2": 112.123046875, "lb": 1.09375, "rb": 1.0869140625 }, { "x": 9, "y": 112, "x1": 9.451171875, "x2": 16.1982421875, "y1": 105.13671875, "y2": 112, "lb": 0.451171875, "rb": 0.4990234375 }, { "x": 18, "y": 112, "x1": 18.2529296875, "x2": 25.451171875, "y1": 105.13671875, "y2": 112, "lb": 0.2529296875, "rb": 0.24609375 }, { "x": 27, "y": 112, "x1": 27.478515625, "x2": 34.2802734375, "y1": 105.13671875, "y2": 112, "lb": 0.478515625, "rb": 0.4169921875 }, { "x": 36, "y": 112, "x1": 36.4033203125, "x2": 43.1982421875, "y1": 105.13671875, "y2": 114.84375, "lb": 0.4033203125, "rb": 0.4990234375 }, { "x": 45, "y": 112, "x1": 46.12109375, "x2": 51.6513671875, "y1": 105.13671875, "y2": 112, "lb": 1.12109375, "rb": 1.0458984375 }, { "x": 54, "y": 112, "x1": 55.107421875, "x2": 60.1318359375, "y1": 102.1015625, "y2": 114.802734375, "lb": 1.107421875, "rb": 1.5654296875 }, { "x": 63, "y": 112, "x1": 66.2880859375, "x2": 67.4091796875, "y1": 100.802734375, "y2": 114.802734375, "lb": 3.2880859375, "rb": 3.2880859375 }, { "x": 72, "y": 112, "x1": 73.5654296875, "x2": 78.5966796875, "y1": 102.1015625, "y2": 114.802734375, "lb": 1.5654296875, "rb": 1.1005859375 }, { "x": 81, "y": 112, "x1": 81.44976963149384, "x2": 88.25330946178292, "y1": 106.845703125, "y2": 109.6484375, "lb": 0.4375, "rb": 0.4375 }];
    return FontInfo;
}());

var TextBuilder = /** @class */ (function () {
    function TextBuilder(defaultSize, grender) {
        if (defaultSize === void 0) { defaultSize = 512; }
        this.m_isdirty = true;
        this.textPosBuffer = new IndexedTypedBuffer(Float32Array, defaultSize);
        this.textUVBuffer = new IndexedTypedBuffer(Float32Array, defaultSize);
        var indicesArray = new Uint16Array(128 * 6);
        MeshBufferUtility.IndicesBufferFillQuad(indicesArray, 128);
        TextBuilder.s_indicesBuffer = indicesArray;
        var mesh = new DynamicMesh('textbatch');
        mesh.setIndices(indicesArray, GLConst.UNSIGNED_SHORT, MeshTopology.Triangles);
        mesh.setPosition(this.textPosBuffer.array, GLConst.FLOAT, 3);
        mesh.setUV(this.textUVBuffer.array, GLConst.FLOAT, 2);
        mesh.refreshMeshBuffer(grender.glctx);
        var mat = this.material;
        if (mat == null) {
            mat = new Material(grender.shaderLib.shaderText);
            var tex = Texture2D.createTexture2DImage(FontInfo.image, {
                internalformat: GL.RGBA,
                format: GL.RGBA,
                mipmap: true,
            }, grender.glctx);
            mat.setTexture(ShaderFX.UNIFORM_MAIN_TEXTURE, tex);
            this.material = mat;
        }
        var vao = this.vao;
        if (vao == null) {
            this.vao = MeshRender.CreateVertexArrayObj(grender.glctx, mesh, mat.program);
        }
        this.mesh = mesh;
    }
    TextBuilder.prototype.refreshData = function (glctx) {
        if (!this.m_isdirty)
            return;
        this.m_isdirty = false;
        var mesh = this.mesh;
        var posbuffer = this.textPosBuffer;
        var uvbuffer = this.textUVBuffer;
        mesh.uploadDataBufferPosition(glctx, posbuffer.array, posbuffer.size * 4);
        mesh.uploadDataBufferUV(glctx, uvbuffer.array, uvbuffer.size * 4);
        mesh.setIndicesCount(posbuffer.size / 4 * 3);
    };
    TextBuilder.prototype.drawTextRect = function (content, rect) {
        this.drawText(content, rect.x, rect.y, rect.z, rect.w);
    };
    TextBuilder.prototype.drawText = function (content, x, y, w, h) {
        if (content == null || content === '')
            return;
        var len = content.length;
        var posbuffer = this.textPosBuffer;
        var uvbuffer = this.textUVBuffer;
        var posary = posbuffer.array;
        var possize = posbuffer.size;
        var uvary = uvbuffer.array;
        var uvsize = uvbuffer.size;
        var xbase = x;
        var ybase = y;
        for (var t = 0; t < len; t++) {
            var c = content.charCodeAt(t);
            var g = FontInfo.glyphData[c];
            if (g == null)
                continue;
            var x1 = xbase + g.lb;
            var x2 = x1 + g.x2 - g.x1;
            var y1 = ybase - g.y + g.y1;
            var y2 = ybase + g.y2 - g.y;
            if (posbuffer.checkExten(12)) {
                posary = posbuffer.array;
            }
            posary[possize] = x1;
            posary[possize + 1] = y1;
            posary[possize + 2] = 0;
            posary[possize + 3] = x2;
            posary[possize + 4] = y1;
            posary[possize + 5] = 0;
            posary[possize + 6] = x2;
            posary[possize + 7] = y2;
            posary[possize + 8] = 0;
            posary[possize + 9] = x1;
            posary[possize + 10] = y2;
            posary[possize + 11] = 0;
            if (uvbuffer.checkExten(8)) {
                uvary = uvbuffer.array;
            }
            var u1 = g.x1 / 128.0;
            var u2 = g.x2 / 128.0;
            var v1 = g.y1 / 128.0;
            var v2 = g.y2 / 128.0;
            uvary[uvsize] = u1;
            uvary[uvsize + 1] = v1;
            uvary[uvsize + 2] = u2;
            uvary[uvsize + 3] = v1;
            uvary[uvsize + 4] = u2;
            uvary[uvsize + 5] = v2;
            uvary[uvsize + 6] = u1;
            uvary[uvsize + 7] = v2;
            uvsize += 8;
            possize += 12;
            xbase = x2 + g.rb;
        }
        posbuffer.size = possize;
        uvbuffer.size = uvsize;
        this.m_isdirty = true;
    };
    return TextBuilder;
}());

var debugRegister = {};
function DebugEntry(cmd) {
    return function (target, funcname, descriptor) {
        if (target instanceof Function) {
            debugRegister[cmd] = target[funcname];
            return;
        }
        console.warn('debug entry only support static function.');
    };
}
function DebugCmd(cmd, obj) {
    var func = debugRegister[cmd];
    if (func == null) {
        console.warn("[DebugEntry] no cmd found: " + cmd);
        return;
    }
    func(obj);
}
window['DebugCmd'] = DebugCmd;

var __extends$i = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UIRender = /** @class */ (function (_super) {
    __extends$i(UIRender, _super);
    function UIRender(grender) {
        var _this = _super.call(this) || this;
        var batch = new SpriteBatch(512, grender);
        batch.drawRect([100, 100, 100, 10], Color.YELLOW, 0);
        batch.drawRect([200, 10, 30, 100], Color.BLUE, 0);
        _this.m_sprBatch = batch;
        var text = new TextBuilder(512, grender);
        text.drawText("HELLOWORLD-&", 0, 100, 100, 20);
        _this.m_text = text;
        return _this;
    }
    Object.defineProperty(UIRender.prototype, "renderQueue", {
        get: function () { return RenderQueue.Overlay; },
        enumerable: true,
        configurable: true
    });
    UIRender.prototype.refreshData = function (glctx) {
        this.m_sprBatch.refreshData(glctx);
        this.m_text.refreshData(glctx);
    };
    UIRender.prototype.release = function (glctx) {
    };
    UIRender.prototype.draw = function (gl, model) {
        this.refreshData(gl);
        var sb = this.m_sprBatch;
        model.drawMeshWithMat(sb.mesh, sb.material, sb.vao, null, true);
        var text = this.m_text;
        model.drawMeshWithMat(text.mesh, text.material, text.vao, null, true);
    };
    return UIRender;
}(BaseRender));

var __extends$j = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SampleGame = /** @class */ (function (_super) {
    __extends$j(SampleGame, _super);
    function SampleGame(canvas) {
        var _this = _super.call(this, canvas) || this;
        SampleGame.Instance = _this;
        var grender = _this.m_graphicsRender;
        GraphicsContext.activeRender(grender);
        var sc = grender.shadowConfig;
        sc.shadowDistance = 20;
        var pipeline = new StackedPipeline({
            passes: [
                PassShadow,
                PassOpaque,
                PassSkybox,
                PassGizmos,
                PassDebug,
                PassOverlay
            ],
            clearinfo: {
                clearMask: GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT,
                color: glmath.vec4(0, 0, 0, 1),
                depth: 1000
            }
        });
        grender.setPipeline(pipeline);
        _this.m_pipeline = pipeline;
        _this.m_scene = SceneBuilder.Build({
            "children": {
                "camera": {
                    comp: [
                        Camera.persepctive(null, 60.0, 1.0, 0.1, 50),
                        new CameraFreeFly()
                    ],
                    oncreate: function (g) {
                        g.transform.applyTranslate(glmath.vec3(0, 1.0, 5));
                        var camera = g.getComponent(Camera);
                        // camera.clearType = ClearType.Background;
                        // camera.background = new vec4( Color.WHITE);
                        camera.clearType = ClearType.Skybox;
                        camera.skybox = Skybox.createFromProcedural();
                    }
                },
                "ui": {
                    oncreate: function (g) {
                        g.render = new UIRender(grender);
                    }
                },
            }
        });
        var scene = _this.m_scene;
        // (async function(){
        //     let model = await GLTFtool.LoadGLTFBinary("res/gltf/blender.glb");
        //     let builder = new GLTFSceneBuilder(model,grender.glctx,grender.shaderLib);
        //     let g = builder.createScene();
        //     g.transform.setPosition(glmath.vec3(0,1,0));
        //     g.transform.parent = scene.transform;
        // })();
        _this.m_sceneMgr = new SceneManager();
        _this.onResize();
        return _this;
    }
    SampleGame.prototype.onFrame = function (ts) {
        _super.prototype.onFrame.call(this, ts);
        this.m_sceneMgr.onFrame(this.m_scene);
        var gredner = this.m_graphicsRender;
        gredner.render(this.m_scene, ts);
        gredner.renderToCanvas();
    };
    SampleGame.cmdReload = function (target) {
    };
    SampleGame.cmdPassDebug = function () {
    };
    __decorate$2([
        DebugEntry('cmd.reload')
    ], SampleGame, "cmdReload", null);
    __decorate$2([
        DebugEntry('cmd.passDebug')
    ], SampleGame, "cmdPassDebug", null);
    return SampleGame;
}(ProgramBase));
window['SampleGame'] = SampleGame;



var iris = /*#__PURE__*/Object.freeze({
    Frustum: Frustum,
    glmath: glmath,
    vec2: vec2,
    vec4: vec4,
    vec3: vec3,
    quat: quat,
    mat4: mat4,
    mat3: mat3,
    Plane: Plane,
    Ray: Ray,
    FrameBuffer: FrameBuffer,
    get GLConst () { return GLConst; },
    GL: GL,
    GLContext: GLContext,
    GLFenceSync: GLFenceSync,
    GLPixelPack: GLPixelPack,
    GLProgram: GLProgram,
    GLTFaccessor: GLTFaccessor,
    GLTFanimation: GLTFanimation,
    GLTFanimationSampler: GLTFanimationSampler,
    GLTFasset: GLTFasset,
    GLTFbuffer: GLTFbuffer,
    GLTFbufferView: GLTFbufferView,
    GLTFcamera: GLTFcamera,
    GLTFchannel: GLTFchannel,
    GLTFimage: GLTFimage,
    GLTFindices: GLTFindices,
    GLTFmaterial: GLTFmaterial,
    GLTFmesh: GLTFmesh,
    GLTFnode: GLTFnode,
    GLTFnormalTextureInfo: GLTFnormalTextureInfo,
    GLTFocclusionTextureInfo: GLTFocclusionTextureInfo,
    GLTForthographic: GLTForthographic,
    GLTFpbrMetallicRoughness: GLTFpbrMetallicRoughness,
    GLTFperspective: GLTFperspective,
    GLTFprimitive: GLTFprimitive,
    GLTFsampler: GLTFsampler,
    GLTFscene: GLTFscene,
    GLTFskin: GLTFskin,
    GLTFsparse: GLTFsparse,
    GLTFtarget: GLTFtarget,
    GLTFtexture: GLTFtexture,
    GLTFtextureInfo: GLTFtextureInfo,
    GLTFvalues: GLTFvalues,
    GLTFfile: GLTFfile,
    GLTFdata: GLTFdata,
    GLTFbinary: GLTFbinary,
    GLTFtool: GLTFtool,
    GLUtility: GLUtility,
    GLVertexArray: GLVertexArray,
    PassShadow: PassShadow,
    BufferDebugInfo: BufferDebugInfo,
    PassDepth: PassDepth,
    PassGizmos: PassGizmos,
    PassOpaque: PassOpaque,
    PassDebug: PassDebug,
    PassSkybox: PassSkybox,
    PassOverlay: PassOverlay,
    PassTest: PassTest,
    RenderPass: RenderPass,
    get ShadowCascade () { return ShadowCascade; },
    ShadowConfig: ShadowConfig,
    ShadowMapData: ShadowMapData,
    get RenderQueue () { return RenderQueue; },
    get Comparison () { return Comparison; },
    get BlendOperator () { return BlendOperator; },
    get BlendFactor () { return BlendFactor; },
    get CullingMode () { return CullingMode; },
    ShaderTags: ShaderTags,
    ShaderProgram: ShaderProgram,
    ShaderPass: ShaderPass,
    Shader: Shader,
    ShaderSubData: ShaderSubData,
    ShaderData: ShaderData,
    ShaderFX: ShaderFX,
    ShaderFile: ShaderFile,
    ShaderInc: ShaderInc,
    ShaderFXLibs: ShaderFXLibs,
    ShaderDataUniformObj: ShaderDataUniformObj,
    ShaderDataUniformLight: ShaderDataUniformLight,
    ShaderDataUniformShadowMap: ShaderDataUniformShadowMap,
    ShaderDataBasis: ShaderDataBasis,
    ShaderDataRender: ShaderDataRender,
    ShaderDataCamera: ShaderDataCamera,
    ShaderDataAmbientFog: ShaderDataAmbientFog,
    ShaderGen: ShaderGen,
    ShaderPreprocessor: ShaderPreprocessor,
    ShaderSource: ShaderSource,
    ShaderUniformBuffer: ShaderUniformBuffer,
    ShaderVariant: ShaderVariant,
    ShaderOptions: ShaderOptions,
    ShaderOptionsConfig: ShaderOptionsConfig,
    RenderTexture: RenderTexture,
    BaseRender: BaseRender,
    Component: Component,
    DynamicMesh: DynamicMesh,
    FrameTimer: FrameTimer,
    GameObject: GameObject,
    get GizmosCmdType () { return GizmosCmdType; },
    GizmosCmd: GizmosCmd,
    Gizmos: Gizmos,
    ReleaseGraphicObj: ReleaseGraphicObj,
    get LightType () { return LightType; },
    Light: Light,
    MaterialPorpertyBlock: MaterialPorpertyBlock,
    Material: Material,
    get MeshTopology () { return MeshTopology; },
    MeshVertexAttrDesc: MeshVertexAttrDesc,
    MeshVertexDesc: MeshVertexDesc,
    MeshIndicesDesc: MeshIndicesDesc,
    Mesh: Mesh,
    MeshBufferUtility: MeshBufferUtility,
    MeshBuilder: MeshBuilder,
    MeshRender: MeshRender,
    RenderNodeList: RenderNodeList,
    get AmbientType () { return AmbientType; },
    get ClearType () { return ClearType; },
    get ProjectionType () { return ProjectionType; },
    Camera: Camera,
    Scene: Scene,
    SceneBuilder: SceneBuilder,
    SceneManager: SceneManager,
    get SkyboxType () { return SkyboxType; },
    Skybox: Skybox,
    SpriteRender: SpriteRender,
    get TextureType () { return TextureType; },
    TextureDescUtility: TextureDescUtility,
    Texture2D: Texture2D,
    TextureCubeMap: TextureCubeMap,
    TextureSampler: TextureSampler,
    Transform: Transform,
    Delayter: Delayter,
    Utility: Utility,
    WindowUtility: WindowUtility,
    undefinedOr: undefinedOr,
    GraphicsRenderCreateInfo: GraphicsRenderCreateInfo,
    GraphicsRender: GraphicsRender,
    GraphicsContext: GraphicsContext,
    Color: Color,
    PipelineUtility: PipelineUtility,
    RenderModel: RenderModel,
    RenderPipeline: RenderPipeline,
    StackedPipeline: StackedPipeline,
    GLTFSceneBuilder: GLTFSceneBuilder,
    InputSnapShot: InputSnapShot,
    Input: Input,
    ProgramSetupConfig: ProgramSetupConfig,
    ProgramBase: ProgramBase,
    CameraFreeFly: CameraFreeFly,
    ControlHandlerComponent: ControlHandlerComponent,
    SpriteBatch: SpriteBatch,
    TextBuilder: TextBuilder,
    DoubleBuffered: DoubleBuffered,
    IndexedBuffer: IndexedBuffer,
    IndexedTypedBuffer: IndexedTypedBuffer,
    SampleGame: SampleGame,
    DebugEntry: DebugEntry,
    DebugCmd: DebugCmd
});

console.log(iris);
