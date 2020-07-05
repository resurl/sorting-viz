/**
 *  Represents an animation state
 *  idx: the original position of an object
 *  newIdx: the changed position of an object
 *  value: the value of the object
 *  animation: the animation status of the object
 */
export class Data {
    private idx: number         // should remain unchanged from initialization
    private newIdx: number
    private value: number       // should remain unchanged from initialization
    private animation: State    
    public constructor(index:number, changed:number, val:number, state: State) {
        this.idx = index;
        this.newIdx = changed;
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

    public getNewIdx(): number {
        return this.newIdx
    }

    // create new animation information based on a previously unchanged object
    static copy(orig: Data, state?: State, changed?: number) {
        return new Data(orig.getIdx(), (changed as number) | orig.getNewIdx(), orig.getVal(), state as State)
    }
}


// init array to have original state {idx, idx, value, Unsorted}
export function init(arr: number[]): Data[] {
    let animationArray:Data[] = arr.map((val, idx) => new Data(idx, idx,val, State.Unsorted))
    return animationArray
}

export enum State { Unsorted, Sorted, Cursor, Compared };

module.exports = {
    State,
    Data,
    init
}