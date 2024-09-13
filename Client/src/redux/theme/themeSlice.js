import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  curTheme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: { 
    themeChange: (state) => {
      state.curTheme = state.curTheme === "light" ? "dark" : "light";
    }, 
  },
});

export const { themeChange } = themeSlice.actions;
export default themeSlice.reducer;
