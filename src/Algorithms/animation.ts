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
    static copy(orig: Animate, newIdx: number, state?: State) {
        return new Animate(orig.index, newIdx, orig.val, state as State)
    }
}

export enum State { Unsorted='#9c9c9c', Sorted='#4ead67', Cursor='#4ead67', Compared='#bf3b3b' };

// init array to have original state {idx, value, Unsorted}
export function init(arr: number[]): Animate[] {
    let animationArray:Animate[] = arr.map((val, idx) => new Animate(idx, idx, val, State.Unsorted))
    return animationArray
}