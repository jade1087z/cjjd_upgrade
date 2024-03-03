import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

export interface userInterface {
    youId: string;
    youName: string;
    youNick: string;
    youEmail: string;
    youBirth: string;
    youAddress: string;
    loginTrue: boolean;
}
export const initialState: userInterface = {
    youId: '',
    youName: '',
    youNick: '',
    youEmail: '',
    youBirth: '',
    youAddress: '',
    loginTrue: false,
}

export const userSlice: Slice<userInterface> = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userInterface | null>) => {
            if(action.payload) {
                state.youId = action.payload.youId;
                state.youName = action.payload.youName;
                state.youNick = action.payload.youNick;
                state.loginTrue = true;
            }
        },
        logOut: (state) => {
            return initialState;
        },
    }
})

export const {setUser, logOut} = userSlice.actions;
export default userSlice.reducer;