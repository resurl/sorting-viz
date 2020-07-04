"use strict";
exports.__esModule = true;
exports.init = exports.State = exports.Data = void 0;
var Data = /** @class */ (function () {
    function Data(index, changed, val, state) {
        this.idx = index;
        this.newIdx = changed;
        this.value = val;
        this.animation = state;
    }
    /*  should not be used i think
    public setState(val: State) {
        this.animation = val
    }

    public setNewIdx(val: number) {
        this.newIdx = val
    } */
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
    Data.copy = function (orig, state, changed) {
        return new Data(orig.getIdx(), changed | orig.getNewIdx(), orig.getVal(), state);
    };
    return Data;
}());
exports.Data = Data;
var State;
(function (State) {
    State[State["Unsorted"] = 0] = "Unsorted";
    State[State["Sorted"] = 1] = "Sorted";
    State[State["Cursor"] = 2] = "Cursor";
    State[State["Compared"] = 3] = "Compared";
})(State = exports.State || (exports.State = {}));
;
// init array to have original state [idx, idx, value, Unsorted]
function init(arr) {
    var animationArray = arr.map(function (val, idx) { return new Data(idx, idx, val, State.Unsorted); });
    return animationArray;
}
exports.init = init;
module.exports = {
    State: State,
    Data: Data,
    init: init
};
