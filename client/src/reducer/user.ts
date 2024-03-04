import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
export interface User {
    myMemberId: number;
    youId: string;
    youName: string;
    youNick: string;
    youEmail: string;
    youBirth: string;
    youAddress: string;
}
const initialState: User | null = null;
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
    clearUser: (state, action: PayloadAction<null>) => {
      return null;
    }
  }
});
const {setUser, clearUser} = userSlice.actions;

export { setUser, clearUser};
export default userSlice.reducer;