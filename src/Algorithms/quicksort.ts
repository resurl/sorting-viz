import { Animate, State, init } from './animation'
// for each of the algorithms, we want to return a tuple [index, value, state]
// each data bar that is affected by the algorithm will change state somehow

function sort(arr: Animate[], start: number, end: number): Animate[] {

    const partition = (list: Animate[], lo: number, hi: number) => {
        let piv = list[lo], i = lo, j = hi
        while(true) {
            while (list[i] > piv)
                if (list[i] === piv) break;
            if (i >= j) break
            swap(list, i, j);
        }
        swap(list,lo,j)
        return j
    }

    let pivot = partition(arr, start, end)
    if (end < start) return arr;
    sort(arr,start, pivot)
    sort(arr, pivot+1, end)
    return arr
}

const swap = (list: Animate[], i: number, j: number) => {
    [list[i], list[j]] = [list[j], list[i]]
}

/**
 * Provides animation instructions for quick sorting an array
 * @param arr - the array of numbers to be sorted 
 * @returns array of objects representing animation states
 */
export default function quickSort(arr: number[]): any[] {
    let animations = init(arr)
    return sort(animations,0,arr.length-1)
}