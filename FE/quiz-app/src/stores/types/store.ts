import { configureStore } from "@reduxjs/toolkit";
import {
  playerDataReducer,
  playerRoomReducer,
  playerScoreReducer,
} from "../slices/authSlices";
import { ScorePlayReducer } from "../slices/sliceScore";

export const store = configureStore({
  reducer: {
    player: playerDataReducer,
    room: playerRoomReducer,
    score: playerScoreReducer,
    score1: ScorePlayReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
