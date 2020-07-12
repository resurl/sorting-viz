import { Animate, State, init } from './animation'

/**
 * Animates insertion sort. Runs through each step of insertion sort and adds the corresponding 
 * animation state to a queue
 * 
 * @param data initial animation states of number array
 * @param arr array to be sorted
 * @returns a queue of animation states
 */
function sort(arr: Animate[], data: number[]): Animate[] {
    let queue: Animate[] = []
    for(let i = 0; i < arr.length; i++) {
        let ptr = new Animate(i, i, arr[i].val, State.Cursor) // keep track of the cursor.
        queue.push(ptr)
        for(let j = i; j > 0; j--) {
            if (arr[j].val < arr[j-1].val) {
                // keep track of what's being switched
                let jSwap = new Animate(j-1, j-1,arr[j].val, State.Compared)
                let prevJswap = new Animate(j, j,arr[j-1].val, State.Compared)
                queue.push(jSwap)
                queue.push(prevJswap)
                
                swap(arr,j,j-1)
                
                // elements are switched, move on to next pair
                queue.push(Animate.copy(jSwap, jSwap.current, State.Unsorted))
                queue.push(Animate.copy(prevJswap, prevJswap.current, State.Unsorted))
                
                // if the cursor's state was overwritten, restore it
                if (j===i)
                    queue.push(new Animate(i, i, arr[i].val,State.Cursor))
            }
        }
        queue.push(new Animate(i,i,arr[i].val, State.Unsorted))
        
    }
    
    // assert that everything is sorted
    queue.push(new Animate(0,0, arr[0].val, State.Sorted))
    for (let j = 1; j < arr.length; j++) {
        if (arr[j-1] > arr[j])
            throw new Error('Array not sorted!')
        queue.push(new Animate(j,j, arr[j].val, State.Sorted))
    }

    for (let i = 0; i < arr.length; i++) 
        data[i] = arr[i].val
    
    // for debug
    // console.log(queue)

    return queue;
}

const swap = (list: Animate[], i: number, j: number) => {
    [list[i], list[j]] = [list[j], list[i]];
}

/**
 * Provides steps to animate an insertion sorted collection
 * of data
 * @param arr  unsorted array to be animated
 * @returns  an array containing animation steps
 */
export default function insertionSort(arr: number[]): Animate[] {
    let animationArr = init(arr)
    return sort(animationArr, arr)
}
