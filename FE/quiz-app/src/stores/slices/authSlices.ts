import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  name: "",
  active_avatar: "",
  highest_score: 0,
  total_score: 0,
  diamond: 0,
};

export const playerData = createSlice({
  name: "player",
  initialState,
  reducers: {
    DATA_PLAYER: (state, action) => {
      const payload = action.payload;

      const player = {
        id: payload.id,
        name: payload.name,
        active_avatar: payload.active_avatar,
        highest_score: payload.highest_score,
        total_score: payload.total_score,
        diamond: payload.diamond,
      };

      (state.id = player.id),
        (state.name = player.name),
        (state.active_avatar = player.active_avatar),
        (state.highest_score = player.highest_score),
        (state.total_score = player.total_score);
      state.diamond = player.diamond;
      //  AsyncStorage.setItem("@player",player)

      return state;
    },
  },
});

export const { DATA_PLAYER } = playerData.actions;

export default playerData.reducer;
