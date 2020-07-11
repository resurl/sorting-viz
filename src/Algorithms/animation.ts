/**
 *  Represents an animation state
 *  idx: the original position of an object
 *  newIdx: the changed position of an object
 *  value: the value of the object
 *  animation: the animation status of the object
 */
export class Data {
    private idx: number         // should remain unchanged from initialization
    //private newIdx: number
    private value: number       // should remain unchanged from initialization
    private animation: State    
    public constructor(index:number, val:number, state: State) {
        this.idx = index;
        //this.newIdx = changed;
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

    /* public getNewIdx(): number {
        return this.newIdx
    } */

    // create new animation information based on a previously unchanged object
    static copy(orig: Data, state?: State) {
        return new Data(orig.getIdx(), orig.getVal(), state as State)
    }
}

export enum State { Unsorted='#9c9c9c', Sorted='#4ead67', Cursor='#4ead67', Compared='#bf3b3b' };

// init array to have original state {idx, value, Unsorted}
export function init(arr: number[]): Data[] {
    let animationArray:Data[] = arr.map((val, idx) => new Data(idx, val, State.Unsorted))
    return animationArray
}