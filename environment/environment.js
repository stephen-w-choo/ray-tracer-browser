"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tick = void 0;
var Tuple_1 = require("../types/Tuple");
function tick(env, proj) {
    var position = proj.position.plus(proj.velocity);
    var velocity = proj.velocity.plus(env.gravity).plus(env.wind);
    return { position: position, velocity: velocity };
}
exports.tick = tick;
// run the tick function 100 times
function run() {
    var env = {
        gravity: new Tuple_1.Vector(0, -0.1, 0),
        wind: new Tuple_1.Vector(-0.01, 0, 0)
    };
    var proj = {
        position: new Tuple_1.Point(0, 1, 0),
        velocity: new Tuple_1.Vector(1, 1, 0).normalize()
    };
    for (var i = 0; i < 100; i++) {
        var newProj = tick(env, proj);
        proj.position = newProj.position;
        proj.velocity = newProj.velocity;
    }
}
