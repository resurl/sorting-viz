"use strict";
exports.__esModule = true;
var animation_1 = require("./animation");
// animation movement cases: 
// 1) pointer is at j, that's our cursor. so when the j for loop starts:
// push {idx,idx,val,State.Cursor} and when it ends, push {idx,idx,val,State.Unsorted}
// 2) j and j-1 are swapped, so we need to highlight both then unhighlight
// push {idx, idx of j-1, value, State.Compared}, {idx,idx of j, value, State.Compared}
// push {idx, ... , State.Unsorted}, {idx, ... , State.Unsorted}
// 3) at the end, iterate through every index and change state to State.Sorted
function sort(arr) {
    var queue = [];
    //console.log(`array to be sorted: ${arr}`)
    for (var i = 0; i < arr.length; i++) {
        //console.log(`${arr[i]}`)
        var cursor = new animation_1.Data(i, i, arr[i].getVal(), animation_1.State.Cursor);
        queue.push(cursor);
        for (var j = i; j > 0; j--) {
            if (arr[j].getVal() < arr[j - 1].getVal()) {
                var swapped_j = new animation_1.Data(j, j - 1, arr[j].getVal(), animation_1.State.Compared);
                var swapped_j1 = new animation_1.Data(j - 1, j, arr[j - 1].getVal(), animation_1.State.Compared);
                queue.push(swapped_j);
                queue.push(swapped_j1);
                swap(arr, j, j - 1);
                queue.push(animation_1.Data.copy(swapped_j, animation_1.State.Unsorted));
                queue.push(animation_1.Data.copy(swapped_j1, animation_1.State.Unsorted));
            }
        }
        queue.push(animation_1.Data.copy(cursor, animation_1.State.Unsorted));
    }
    // visual assertion that everything is sorted
    for (var j = 1; j < arr.length; j++) {
        if (arr[j - 1].getVal() < arr[j].getVal()) {
            queue.push(new animation_1.Data(j - 1, j - 1, arr[j].getVal(), animation_1.State.Sorted));
        }
        else
            throw new Error('Array not sorted!');
    }
    /* for(let i = 0; i < arr.length; i++)
        console.log(arr[i].getVal()) */
    return queue;
}
var swap = function (list, i, j) {
    var _a;
    _a = [list[j], list[i]], list[i] = _a[0], list[j] = _a[1];
};
/**
 * Provides steps to animate an insertion sorted collection
 * of data
 * @param arr  unsorted array to be animated
 * @returns  an array containing animation steps
 */
function insertionSort(arr) {
    var animationArr = animation_1.init(arr);
    return sort(animationArr);
}
exports["default"] = insertionSort;
console.log(insertionSort([3, 2, 1]));
