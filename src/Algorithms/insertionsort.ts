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
        let ptr = Animate.create(arr,i,State.Cursor) // keep track of the cursor.
        queue.push(ptr)
        for(let j = i; j > 0; j--) {
            if (arr[j].val < arr[j-1].val) {
                Animate.swap(arr,j-1,j,queue)
                // if the cursor's state was overwritten, restore it
                if (j===i)
                    queue.push(Animate.create(arr,i))
            }
        }
        queue.push(Animate.create(arr,i))
    }

    //Animate.assertSort(arr,queue)

    for (let i = 0; i < arr.length; i++) 
        data[i] = arr[i].val

    return queue;
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
