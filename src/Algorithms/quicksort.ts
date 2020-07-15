import { Animate, State, init } from './animation'
// for each of the algorithms, we want to return a tuple [index, value, state]
// each data bar that is affected by the algorithm will change state somehow

function swap(items: Animate[], leftIndex: number, rightIndex: number){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

function partition(items: Animate[], queue: Animate[], left: number, right: number) {
    var pivot   = items[Math.floor((right + left) / 2)].val, //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (items[i].val < pivot) 
            i++;
        
        while (items[j].val > pivot) 
            j--;
        
        if (i <= j) {
            queue.push(new Animate(i,i,items[i].val,State.Cursor))
            queue.push(new Animate(j,j,items[j].val,State.Cursor))
            swap(items, i, j);
            queue.push(new Animate(i,i,items[i].val,State.Unsorted))
            queue.push(new Animate(j,j,items[j].val,State.Unsorted))
            i++;
            j--;
        }
    }
    return i;
}

function quickSortHelper(items: Animate[], queue: Animate[], left:number, right:number) {
    let index;
    if (items.length > 1) {
        index = partition(items, queue, left, right); //index returned from partition
        if (left < index - 1)  //more elements on the left side of the pivot
            quickSortHelper(items, queue, left, index - 1);
        
        if (index < right)  //more elements on the right side of the pivot
            quickSortHelper(items, queue, index, right);
        
    }
    return items;
}

function sort(arr: Animate[],queue:Animate[]) {
    quickSortHelper(arr,queue,0,arr.length-1)
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].val < arr[i-1].val)
            console.log('not sorted')
    }

    for(let i = 0; i< arr.length;i++) {
        queue.push(new Animate(i,i,arr[i].val,State.Sorted))
    }
    return queue
}
/**
 * Provides animation instructions for quick sorting an array
 * @param arr - the array of numbers to be sorted 
 * @returns array of objects representing animation states
 */
export default function quickSort(arr: number[]): any[] {
    let animations = init(arr)
    let queue: Animate[] = []
    sort(animations,queue)
    return queue 
}