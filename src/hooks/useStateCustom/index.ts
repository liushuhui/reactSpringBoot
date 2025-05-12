const state: unknown[] = [];
let stateIndex = 0;
const useStateCustom = (initialState: any): any  => {
    const currentIndex = stateIndex;
    stateIndex++;
    state[currentIndex] = state[currentIndex] || initialState;
    console.log('stateIndex111', stateIndex, state)
    function setState(newState: any) {
        state[currentIndex] = newState;
        console.log('stateIndex', stateIndex, state)
    }
    return [state[currentIndex], setState]
}

export default useStateCustom;