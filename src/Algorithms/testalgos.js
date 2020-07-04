

function mergesort(arr){
    if (arr.length < 2) return arr;
    let mid = Math.floor(arr.length/2);
    console.log(`${arr}`)
    console.log(arr.slice(0,mid));
    console.log(arr.slice(mid));
    let left = mergesort(arr.slice(0,mid));
    let right = mergesort(arr.slice(mid));
    return merge(left,right);
}

function merge(left, right) {
    let merged_array = []
    
    while (left.length && right.length) {
        if (left[0] < right[0]) merged_array.push(left.shift());
        else merged_array.push(right.shift());
    }
    
    return merged_array.concat(left.slice().concat(right.slice()))
}

function main() {
    const array = [20,19,18,17,16,15,14,13,12,11,10,9,8,7,];
    console.log(`result ${mergesort(array)}`)
}

main();