import { userInterface } from "../interface/userInterface";
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
const initialState: userInterface = {
    youId: '',
    youPass: '',
    youPassC: '',
    youName: '',
    youNick: '',
    youEmail: '',
    youBirth: '',
    youAddress1: '',
    youAddress2: '',
    youAddress3: ''
}

export const userSlice: Slice<userInterface> = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userInterface>) => {
            state.youId = action.payload.youId;
            state.youPass = action.payload.youPass;
        }
    }
})

export const {setUser} = userSlice.actions;
export default userSlice.reducer;