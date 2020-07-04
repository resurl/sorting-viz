// for each of the algorithms, we want to return a tuple [index, value, state]
// each data bar that is affected by the algorithm will change state somehow

export default function quicksort(arr: number[], start: number, end: number): number[] {

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