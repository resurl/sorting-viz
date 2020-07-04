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
    for(let i = 0; i < arr.length; i++) {
        let cursor: Data = new Data(i,i,arr[i].getVal(),State.Cursor)
        queue.push(cursor)
        for(let j = i; j > 0; j--) {
            if (arr[j] < arr[-1]) {
                swap(arr,j,j-1)
            }
        }
        queue.push(Data.copy(cursor,State.Unsorted))
    }
    return arr;
}

const swap = (list: Data[], i: number, j: number) => {
    [list[i], list[j]] = [list[j], list[i]]
}

export default function insertionSort(arr: any[]): any[] {
    let animationArr = init(arr)
    return sort(animationArr)
}