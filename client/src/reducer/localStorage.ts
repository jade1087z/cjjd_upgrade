import { initialState } from "./user";

export const saveState = (state: any) => { // 스테이트 저장
    try {
        const serializedState = JSON.stringify(state.user);
        localStorage.setItem('state',serializedState)
    } catch (error) {
        console.log(error)
    }
}

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        
        if (serializedState === null) {
            return initialState;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        return initialState;
    }
}

export default {saveState,loadState}