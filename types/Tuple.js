"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatEquals = exports.createVector = exports.createPoint = exports.createTuple = exports.Vector = exports.Point = exports.Tuple = void 0;
var EPSILON = 0.00001;
var Tuple = /** @class */ (function () {
    function Tuple(x, y, z, w) {
        if (w === void 0) { w = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    // private function to compare two floats
    Tuple.prototype.floatEquals = function (a, b) {
        return Math.abs(a - b) < EPSILON;
    };
    Tuple.prototype.isValid = function () {
        return this.w === 0 || this.w === 1;
    };
    Tuple.prototype.equals = function (other) {
        return FloatEquals(this.x, other.x) && FloatEquals(this.y, other.y) && FloatEquals(this.z, other.z) && FloatEquals(this.w, other.w);
    };
    Tuple.prototype.plus = function (other) {
        return new Tuple(this.x + other.x, this.y + other.y, this.z + other.z, this.w + other.w);
    };
    Tuple.prototype.minus = function (other) {
        return new Tuple(this.x - other.x, this.y - other.y, this.z - other.z, this.w - other.w);
    };
    Tuple.prototype.times = function (scalar) {
        return new Tuple(this.x * scalar, this.y * scalar, this.z * scalar, this.w * scalar);
    };
    Tuple.prototype.divide = function (scalar) {
        return new Tuple(this.x / scalar, this.y / scalar, this.z / scalar, this.w / scalar);
    };
    Tuple.prototype.negate = function () {
        return new Tuple(-this.x, -this.y, -this.z, -this.w);
    };
    Tuple.prototype.magnitude = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2) + Math.pow(this.w, 2));
    };
    Tuple.prototype.normalize = function () {
        return new Tuple(this.x / this.magnitude(), this.y / this.magnitude(), this.z / this.magnitude(), this.w / this.magnitude());
    };
    Tuple.prototype.dot = function (other) {
        return this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w;
    };
    Tuple.prototype.cross = function (other) {
        return new Tuple(this.y * other.z - this.z * other.y, this.z * other.x - this.x * other.z, this.x * other.y - this.y * other.x, 0);
    };
    return Tuple;
}());
exports.Tuple = Tuple;
// class that extends Tuple and is used to represent a point
var Point = /** @class */ (function (_super) {
    __extends(Point, _super);
    function Point(x, y, z) {
        return _super.call(this, x, y, z, 1) || this;
    }
    return Point;
}(Tuple));
exports.Point = Point;
// class that extends Tuple and is used to represent a vector
var Vector = /** @class */ (function (_super) {
    __extends(Vector, _super);
    function Vector(x, y, z) {
        return _super.call(this, x, y, z, 0) || this;
    }
    return Vector;
}(Tuple));
exports.Vector = Vector;
function createTuple(x, y, z, w) {
    return new Tuple(x, y, z, w);
}
exports.createTuple = createTuple;
function createPoint(x, y, z) {
    return new Point(x, y, z);
}
exports.createPoint = createPoint;
function createVector(x, y, z) {
    return new Vector(x, y, z);
}
exports.createVector = createVector;
function FloatEquals(a, b) {
    return Math.abs(a - b) < EPSILON;
}
exports.FloatEquals = FloatEquals;
