import { Animate, State, init } from './animation'

// for each of the algorithms, we want to return a state [idx, newIdx, value, state]
// merge sorted elements have the following behaviours:
// 

// might have to change this to iterative merge sort so that it's easier 
// to work in animation
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
    let animations = init(arr)
    return sort(animations)
}