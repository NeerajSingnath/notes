import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.userData = null;
    },
    updateCredits: (state, action) => {
      if (state.userData) {
        if (state.userData.user) {
          state.userData.user.credits = action.payload;
        } else {
          state.userData.credits = action.payload;
        }
      }
    },
  },
});
export const { setUserData, logout, updateCredits } = userSlice.actions;
export default userSlice.reducer;
