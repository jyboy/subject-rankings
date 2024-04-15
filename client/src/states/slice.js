import { createSlice } from '@reduxjs/toolkit';

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    value: ''
  },
  reducers: {
    toggle: (state) => {
      state.value = state.value === 'en' ? 'zh' : 'en';
    },
    change: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { toggle: toggleLanguage, change: changeLanguage } =
  languageSlice.actions;

export default languageSlice.reducer;
