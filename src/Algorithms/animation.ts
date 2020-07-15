export enum State { Unsorted='#3389eb', Sorted='#66d3fa', Cursor='#d5f3fe', Compared='#2565ae' };
/**
 *  Represents an animation state
 *  idx: the original position of an object
 *  value: the value of the object
 *  animation: the animation status of the object
 */
export class Animate {
    private idx: number         // should remain unchanged from initialization
    private curr: number
    private value: number
    private animation: State    
    public constructor(index:number, current: number, val:number, state: State) {
        this.idx = index;
        this.curr = current;
        this.value = val;
        this.animation = state;
    }

    public get index() : number {
        return this.idx
    }

    public get current() : number {
        return this.curr
    }

    public get val() : number {
        return this.value
    }

    public get state() : State {
        return this.animation
    }

    // create new animation information based on a previously unchanged object
    static copy(orig: Animate, state?: State) {
        return new Animate(orig.index,orig.current, orig.val, state as State)
    }

    // create new Animation information from initial animation state in list
    static create(list: Animate[], idx: number, state:State=State.Unsorted) {
        return new Animate(list[idx].idx,idx,list[idx].val,state)
    }

    /**
     * Animates a swap operation
     * @param list list containing initial animation information
     * @param idx1 first idx to be swapped
     * @param idx2 second idx to be swapped
     * @param queue list that must be returned by sort function
     */
    static swap(list: Animate[], idx1: number, idx2: number, queue: Animate[]) {
        queue.push(Animate.create(list,idx1, State.Compared));
        queue.push(Animate.create(list,idx2, State.Compared));
        [list[idx1], list[idx2]] = [list[idx2],list[idx1]];
        queue.push(Animate.create(list,idx1))
        queue.push(Animate.create(list,idx2))
    }

    /**
     * Create animation that visually asserts a sorted array
     * @param list list with init'd animation steps
     * @param queue queue that must be returned by sort function
     */
    static assertSort(list:Animate[], queue: Animate[]) {
        queue.push(Animate.create(list,0,State.Sorted))
        for (let j = 1; j < list.length; j++) {
            if (list[j-1].val > list[j].val)
                throw new Error('Array not sorted!')
            queue.push(Animate.create(list,j,State.Sorted))
        }
    }
}

// init array to have original state {idx, value, Unsorted}
export function init(arr: number[]): Animate[] {
    let animationArray:Animate[] = arr.map((val, idx) => new Animate(idx, idx, val, State.Unsorted))
    return animationArray
}