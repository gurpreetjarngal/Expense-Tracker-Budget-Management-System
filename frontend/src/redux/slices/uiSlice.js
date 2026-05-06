import { createSlice } from '@reduxjs/toolkit';

const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: false,
    darkMode: localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDark
  },
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    closeSidebar(state) {
      state.sidebarOpen = false;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem('theme', state.darkMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', state.darkMode);
    }
  }
});

document.documentElement.classList.toggle('dark', uiSlice.getInitialState().darkMode);

export const { closeSidebar, toggleDarkMode, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
