 import { Animate, init } from './animation'
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
            Animate.swap(items,i,j,queue)
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

function sort(arr: Animate[],queue:Animate[],data:number[]) {
    quickSortHelper(arr,queue,0,arr.length-1)
    //Animate.assertSort(arr,queue)
    for (let i = 0; i < data.length; i++)
        data[i] = arr[i].val
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
    sort(animations,queue,arr)
    return queue 
} 