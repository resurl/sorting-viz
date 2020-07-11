import { Data, State, init } from './animation'

// how this works: each element in an array has 3 behaviours
// 1) the element is being considered (either compared or is the cursor): nothing should 
// happen to it yet, except for a color change [i, j]. then it should change color again
// once it is not being considered (out of scope)
// 2) element at j must be swapped with j-1: the value of j is swapped with j-1
// we keep the original index for later
// 3) we affirm element is sorted: color change to Sorted 
// whenever an element must perform one of these behaviours, a new Data object is made 
// to represent a new animation state

// [{0,3,unchanged},{1,2,unchanged},{2,1,unchanged}] i = 0 array looks like |:.
// [{0,3,cursor},{1,2,unchanged},{2,1,unchanged}]
// [{0,3,unchanged},{1,2,cursor},{2,1,unchanged}] i = 1
// [{0,3,cursor},{1,2,cursor},{2,1,unchanged}] i = 1, j=1, j-1 = 0... 
// next is if arr[j].getval() < arr[j-1].getval() swap
// [{1,2,cursor},{0,3,cursor},{2,1,unchanged}] :|.

// in the swap, we want to preserve the value because we need to use it in the loops
// we also need to preserve the index (first field) because we need it to reference the
// original bar graph. so then we push a new Data with the SAME index and SWAPPED value 
// so that in the client, we can see that the bar in position (index) changes to height x

/**
 * Animates insertion sort. Runs through each step of insertion sort and adds the corresponding 
 * animation state to a queue
 * 
 * @param data initial animation states of number array
 * @param arr array to be sorted
 * @returns a queue of animation states
 */
function sort(arr: Data[]): Data[] {
    let queue: Data[] = []
    for(let i = 0; i < arr.length; i++) {
        let ptr = new Data(i, arr[i].getVal(), State.Cursor) // select i.
        queue.push(ptr)
        for(let j = i; j > 0; j--) {
            if (j < i) {
                queue.push(new Data(j,arr[j].getVal(),State.Compared))
            }
            if (arr[j].getVal() < arr[j-1].getVal()) {
                let jSwap = new Data(j-1, arr[j].getVal(), State.Compared)
                let prevJswap = new Data(j, arr[j-1].getVal(), State.Compared)
                queue.push(jSwap)
                queue.push(prevJswap)
                swap(arr,j,j-1)
                queue.push(Data.copy(jSwap, State.Unsorted))
                queue.push(Data.copy(prevJswap, State.Unsorted))
            }
        }
        queue.push(Data.copy(ptr,State.Unsorted))
        
    }
    
    for (let j = 1; j < arr.length; j++) {
        if (arr[j-1] > arr[j])
            throw new Error('Array not sorted!')
    } 
    
    for(let k = 0; k < arr.length;k++)
        queue.push(new Data(k,arr[k].getVal(), State.Sorted))

    return queue;
}

const swap = (list: Data[], i: number, j: number) => {
    [list[i], list[j]] = [list[j], list[i]]
}

/**
 * Provides steps to animate an insertion sorted collection
 * of data
 * @param arr  unsorted array to be animated
 * @returns  an array containing animation steps
 */
export default function insertionSort(arr: number[]): Data[] {
    let animationArr = init(arr)
    return sort(animationArr)
}
