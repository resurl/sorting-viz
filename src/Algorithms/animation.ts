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

    public getIdx(): number {
        return this.idx
    }

    public getVal(): number {
        return this.value
    }

    public getAnimation(): State {
        return this.animation
    }

    // create new animation information based on a previously unchanged object
    static copy(orig: Animate, state?: State) {
        return new Animate(orig.getIdx(), orig.getVal(), state as State)
    }
}

export enum State { Unsorted='#9c9c9c', Sorted='#4ead67', Cursor='#4ead67', Compared='#bf3b3b' };

// init array to have original state {idx, value, Unsorted}
export function init(arr: number[]): Animate[] {
    let animationArray:Animate[] = arr.map((val, idx) => new Animate(idx, val, State.Unsorted))
    return animationArray
}