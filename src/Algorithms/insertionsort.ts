import { Data, State, init } from './animation'

// animation movement cases: 
// 1) pointer is at j, that's our cursor. so when the j for loop starts:
// push {idx,idx,val,State.Cursor} and when it ends, push {idx,idx,val,State.Unsorted}

// 2) j and j-1 are swapped, so we need to highlight both then unhighlight
// push {idx, idx of j-1, value, State.Compared}, {idx,idx of j, value, State.Compared}
// push {idx, ... , State.Unsorted}, {idx, ... , State.Unsorted}

// 3) at the end, iterate through every index and change state to State.Sorted

function sort(arr: Data[]): Data[] {
    let queue: Data[] = []
    //console.log(`array to be sorted: ${arr}`)

    for(let i = 0; i < arr.length; i++) {
        //console.log(`${arr[i]}`)
        let cursor: Data = new Data(i,i,arr[i].getVal(),State.Cursor)
        queue.push(cursor)
        for(let j = i; j > 0; j--) {
            if (arr[j].getVal() < arr[j-1].getVal()) {
                let swapped_j: Data = new Data(j,j-1,arr[j].getVal(),State.Compared)
                let swapped_j1: Data = new Data(j-1,j,arr[j-1].getVal(),State.Compared)
                queue.push(swapped_j)
                queue.push(swapped_j1)
                swap(arr,j,j-1)
                queue.push(Data.copy(swapped_j,State.Unsorted))
                queue.push(Data.copy(swapped_j1,State.Unsorted))
            }
        }
        queue.push(Data.copy(cursor,State.Unsorted))
    }

    // visual assertion that everything is sorted
    // data information not stored accurately
    for (let j = 1; j < arr.length; j++) {
        if (arr[j-1].getVal() < arr[j].getVal()){
            queue.push(new Data(j-1,j-1,arr[j].getVal(),State.Sorted))
        } else
            throw new Error('Array not sorted!')
    } 
    
    /* for(let i = 0; i < arr.length; i++) 
        console.log(arr[i].getVal()) */

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

console.log(insertionSort([3,2,1]))