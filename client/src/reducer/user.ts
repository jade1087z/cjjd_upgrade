import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { reducerUser } from '../interface/user/userInterface';


const initialState: reducerUser = {
  myMemberId: 0,
  youId: '',
  youName: '',
  youNick: '',
  youEmail: '',
  youBirth: '',
  youAddress: '',
  youImgFile:'',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<reducerUser>) => {
      return action.payload;
    },
    clearUser: (state, action: PayloadAction<null>) => {
      return initialState;
    },
    setUserImage: (state, action: PayloadAction<string>) => {
      state.youImgFile = action.payload
    }
  }
});
const {setUser, clearUser, setUserImage} = userSlice.actions;

export { setUser, clearUser, setUserImage};
export default userSlice.reducer;