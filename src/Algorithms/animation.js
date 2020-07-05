"use strict";
exports.__esModule = true;
exports.State = exports.init = exports.Data = void 0;
/**
 *  Represents an animation state
 *  idx: the original position of an object
 *  newIdx: the changed position of an object
 *  value: the value of the object
 *  animation: the animation status of the object
 */
var Data = /** @class */ (function () {
    function Data(index, changed, val, state) {
        this.idx = index;
        this.newIdx = changed;
        this.value = val;
        this.animation = state;
    }
    Data.prototype.getIdx = function () {
        return this.idx;
    };
    Data.prototype.getVal = function () {
        return this.value;
    };
    Data.prototype.getAnimation = function () {
        return this.animation;
    };
    Data.prototype.getNewIdx = function () {
        return this.newIdx;
    };
    // create new animation information based on a previously unchanged object
    Data.copy = function (orig, state, changed) {
        return new Data(orig.getIdx(), changed | orig.getNewIdx(), orig.getVal(), state);
    };
    return Data;
}());
exports.Data = Data;
// init array to have original state {idx, idx, value, Unsorted}
function init(arr) {
    var animationArray = arr.map(function (val, idx) { return new Data(idx, idx, val, State.Unsorted); });
    return animationArray;
}
exports.init = init;
var State;
(function (State) {
    State[State["Unsorted"] = 0] = "Unsorted";
    State[State["Sorted"] = 1] = "Sorted";
    State[State["Cursor"] = 2] = "Cursor";
    State[State["Compared"] = 3] = "Compared";
})(State = exports.State || (exports.State = {}));
;
module.exports = {
    State: State,
    Data: Data,
    init: init
};
