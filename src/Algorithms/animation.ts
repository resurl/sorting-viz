export enum State { Unsorted='#3c99dc', Sorted='#66d3fa', Cursor='#d5f3fe', Compared='#2565ae' };
/**
 *  Represents an animation state
 *  idx: the original position of an object
 *  value: the value of the object
 *  animation: the animation status of the object
 */
export class Animate {
    private idx: number         // should remain unchanged from initialization
    private value: number
    private animation: State    
    public constructor(index:number, val:number, state: State) {
        this.idx = index;
        this.value = val;
        this.animation = state;
    }

    public get index() : number {
        return this.idx
    }

    public get val() : number {
        return this.value
    }

    public get state() : State {
        return this.animation
    }

    // create new animation information based on a previously unchanged object
    static copy(orig: Animate, state?: State) {
        return new Animate(orig.index, orig.val, state as State)
    }

    // create new animation Step
    static swap(list: Animate[], idx1: number, idx2: number, queue: Animate[]) {
        queue.push(new Animate(idx1,list[idx1].val,State.Compared));
        queue.push(new Animate(idx2,list[idx2].val,State.Compared));
        [list[idx1], list[idx2]] = [list[idx2],list[idx1]];
        queue.push(new Animate(idx1,list[idx1].val,State.Unsorted));
        queue.push(new Animate(idx2,list[idx2].val,State.Unsorted))
    }
}

// init array to have original state {idx, value, Unsorted}
export function init(arr: number[]): Animate[] {
    let animationArray:Animate[] = arr.map((val, idx) => new Animate(idx, val, State.Unsorted))
    return animationArray
}