export class Data {
    private idx: number
    private newIdx: number
    private value: number
    private animation: State
    public constructor(index:number, changed:number, val:number, state: State) {
        this.idx = index;
        this.newIdx = changed;
        this.value = val;
        this.animation = state;
    }

    public setState(val: State) {
        this.animation = val
    }

    public setNewIdx(val: number) {
        this.newIdx = val
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

    static copy(orig: Data, state?: State, changed?: number) {
        return new Data(orig.getIdx(), (changed as number) | orig.getNewIdx(), orig.getVal(), state as State)
    }
}

export enum State { Unsorted, Sorted, Cursor, Compared };

// init array to have original state [idx, idx, value, Unsorted]
export function init(arr: number[]): Data[] {
    let animationArray:Data[] = arr.map((val, idx) => new Data(idx, idx,val, State.Unsorted))
    return animationArray
}

module.exports = {
    State,
    Data,
    init
}