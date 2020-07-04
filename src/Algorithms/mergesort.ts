import * as Animation from './animation'

// for each of the algorithms, we want to return a state [idx, newIdx, value, state]
// each data bar that is affected by the algorithm will change state somehow

// to make things easier, we reinitialize the array-to-be-sorted as 
// [idx, 0, value, Unchanged] for each value.
// this happens before sort method runs

// in mergesort, animation movements are in merge:
// when comparing l[0], r[0] store {unchanged idx, idx, unchanged value, stateTypes.Compared}
// twice for both indices, then after, set them back to Unsorted, unless one is in the final
// position

function sort(arr: any[]): any[] {

    const merge = (l:number[], r:number[]) => {
        let sorted = []
        while (l.length && r.length) {
            if (l[0] < r[0]) sorted.push(l.shift() as number);
            else sorted.push(r.shift() as number);
        }
        return sorted.concat(l.slice().concat(r.slice()))
    }

    if (arr.length < 2) return arr;
    let mid = Math.floor(arr.length/2);
    let left = sort(arr.slice(0,mid));
    let right = sort(arr.slice(mid+1, arr.length-1));
    return merge(left,right);
}

/**
 * Provides animation instructions for merge sorting an array
 * @param arr - the array of numbers to be sorted 
 * @returns array of objects representing animation states
 */
export default function mergesort(arr: number[]): any[] {
    // init 
    let animations = Animation.init(arr)
    return sort(animations)
}