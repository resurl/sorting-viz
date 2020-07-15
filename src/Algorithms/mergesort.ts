import { Animate, State, init } from './animation'

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
                if (sorted[left].val < sorted[right].val) {
                    queue.push(new Animate(left,sorted[i].val,State.Compared))
                    buffer[i] = sorted[left]
                    queue.push(new Animate(left,buffer[i].val,State.Unsorted))
                    i++
                    left++
                }
                else {
                    queue.push(new Animate(right,sorted[i].val,State.Compared))
                    buffer[i] = sorted[right]
                    queue.push(new Animate(right,buffer[i].val,State.Unsorted))
                    i++
                    right++
                }
            }
            
            while (left < leftBound) {
                queue.push(new Animate(left,sorted[i].val,State.Compared))
                buffer[i] = sorted[left]
                queue.push(new Animate(left,buffer[i].val,State.Unsorted))
                i++
                left++
            }

            while (right < rightBound){
                queue.push(new Animate(right,sorted[i].val,State.Compared))
                buffer[i] = sorted[right]
                queue.push(new Animate(right,buffer[i].val,State.Unsorted))    
                i++
                right++
            }
        }
        let temp = sorted
        sorted = buffer
        buffer = temp
    }

    for (let i = 0; i < sorted.length; i++) {
        queue.push(new Animate(i,sorted[i].val,State.Sorted))
        data[i] = sorted[i].val
    }

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