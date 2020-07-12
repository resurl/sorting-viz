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
        let ptr = new Animate(i, arr[i].getVal(), State.Cursor) // keep track of the cursor.
        queue.push(ptr)
        for(let j = i; j > 0; j--) {
            if (arr[j].getVal() < arr[j-1].getVal()) {
                // keep track of what's being switched
                let jSwap = new Animate(j-1, arr[j].getVal(), State.Compared)
                let prevJswap = new Animate(j, arr[j-1].getVal(), State.Compared)
                queue.push(jSwap)
                queue.push(prevJswap)
                
                swap(arr,data,j,j-1)
                
                // elements are switched, move on to next pair
                queue.push(Animate.copy(jSwap, State.Unsorted))
                queue.push(Animate.copy(prevJswap, State.Unsorted))
                
                // if the cursor's state was overwritten, restore it
                if (j===i)
                    queue.push(new Animate(i, arr[i].getVal(),State.Cursor))
            }
        }
        queue.push(Animate.copy(ptr,State.Unsorted))
        
    }
    
    // assert that everything is sorted
    queue.push(new Animate(0, arr[0].getVal(), State.Sorted))
    for (let j = 1; j < arr.length; j++) {
        if (arr[j-1] > arr[j])
            throw new Error('Array not sorted!')
        queue.push(new Animate(j, arr[j].getVal(), State.Sorted))
    }
    
    // for debug
    // console.log(queue)

    return queue;
}

const swap = (list: Animate[], list2:number[], i: number, j: number) => {
    [list[i], list[j]] = [list[j], list[i]];
    [list2[i], list2[j]] = [list2[j], list2[i]]
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
