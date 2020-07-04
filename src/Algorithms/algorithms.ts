// reference for algorithms to be performed without animation

export function insertionsort(arr: number[]): number[] {
    for(let i = 0; i < arr.length; i++) {
        for(let j = i; j > 0; j--) {
            if (arr[j] < arr[j-1]) {
                swap(arr,j,j-1)
            }
        }
    }
    return arr;
}

export function mergesort(arr: number[]): number[] {
    
    const merge = (l:number[], r:number[]) => {
        let sorted: number[] = []
        while (l.length && r.length) {
            if (l[0] < r[0]) sorted.push(l.shift() as number);
            else sorted.push(r.shift() as number);
        }
        return sorted.concat(l.slice().concat(r.slice()))
    }

    if (arr.length < 2) return arr;
    let mid = Math.floor(arr.length/2);
    let left = mergesort(arr.slice(0,mid));
    let right = mergesort(arr.slice(mid+1, arr.length-1));
    return merge(left,right);
}

export function quicksort(arr: number[], start: number, end: number): number[] {

    const partition = (list: number[], lo: number, hi: number) => {
        let piv = list[lo], i = lo, j = hi
        while(true) {
            while (list[i] > piv)
                if (list[i] === piv) break;
            if (i >= j) break
            swap(list, i, j);
        }
        swap(list,lo,j)
        return j
    }

    let pivot = partition(arr, start, end)
    if (end < start) return arr;
    quicksort(arr,start, pivot)
    quicksort(arr, pivot+1, end)
    return arr
}

const swap = (list: number[], i: number, j: number) => {
    [list[i], list[j]] = [list[j], list[i]]
}

module.exports = {
    mergesort,
    quicksort,
    insertionsort
}