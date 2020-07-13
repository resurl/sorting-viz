import { Animate, State, init } from './animation'

// merge sorted element behaviour to emulate:
// 1) highlight the size of the subarray
// 2) swap 


function sort(arr: Animate[], data: number[]): Animate[] {
    let queue: Animate[] = []
    let sorted: Animate[] = arr
    let len: number = arr.length
    let buffer: Animate[] = []

    for (let sz = 1; sz < len+len; sz *= 2) {
        for (let pos = 0; pos < len; pos += 2*sz) {
            let left = pos,
                right = Math.min(left+sz, len),
                leftBound = right,
                rightBound = Math.min(right+sz, len),
                i = left
            
            
            while (left < leftBound && right < rightBound) {
                queue.push(new Animate(left,left,sorted[left].val,State.Compared))
                if (sorted[left].val < sorted[right].val) {
                    buffer[i] = sorted[left]
                    queue.push(new Animate(left,i,buffer[i].val,State.Unsorted))
                    i++
                    left++
                }
                else {
                    buffer[i] = sorted[right]
                    queue.push(new Animate(left,i,buffer[i].val,State.Unsorted))
                    i++
                    right++
                }
            }
            
            while (left < leftBound) {
                queue.push(new Animate(left,left,sorted[left].val,State.Compared))
                buffer[i] = sorted[left]
                queue.push(new Animate(left,i,buffer[i].val,State.Unsorted))
                i++
                left++
            }

            while (right < rightBound){
                queue.push(new Animate(right,right, sorted[right].val,State.Compared))
                buffer[i] = sorted[right]
                queue.push(new Animate(left,i,buffer[i].val,State.Unsorted))    
                i++
                right++
            }
        }
        let temp = sorted
        sorted = buffer
        buffer = temp
    }

    /* for (let i = 1; i < arr.length; i++)   {
        if (arr[i-1].val > arr[i].val)
            console.log('not sorted ')
        console.log(`${arr[i-1].val} ${arr[i].val}`)} */

    return queue
}

/**
 * Provides animation instructions for merge sorting an array
 * @param arr - the array of numbers to be sorted 
 * @returns array of objects representing animation states
 */
export default function mergesort(arr: number[]): any[] {
    let animations = init(arr)
    return sort(animations, arr)
}