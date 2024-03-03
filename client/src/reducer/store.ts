import { configureStore  } from "@reduxjs/toolkit";
import {userInterface, userSlice} from "./user";
import { loadState, saveState } from "./localStorage";

const preloadedState = {
    user: loadState(),  // loadState는 userInterface 타입을 반환해야 합니다.
  }
export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
    preloadedState,
});
store.subscribe(() => {
   saveState(store.getState())
  });


 export type RootState = ReturnType<typeof store.getState>;
export type AppDistpatch = typeof store.dispatch;