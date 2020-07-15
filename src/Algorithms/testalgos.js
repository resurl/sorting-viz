function swap(items, leftIndex, rightIndex){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}
function partition(items, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) 
            i++;
        
        while (items[j] > pivot) 
            j--;
        
        if (i <= j) {
            swap(items, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(items, left, right) {
    let index;
    if (items.length > 1) {
        index = partition(items, left, right); //index returned from partition
        if (left < index - 1)  //more elements on the left side of the pivot
            quickSort(items, left, index - 1);
        
        if (index < right)  //more elements on the right side of the pivot
            quickSort(items, index, right);
        
    }
    return items;
}

function sort(arr) {
    return quickSort(arr,0,arr.length-1)
}

function main() {
    const array = [21,22,23,24,25,26,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
    console.log(`result ${sort(array)}`)
}

main();