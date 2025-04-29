import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SidebarState {
  isOpen: boolean;
}

export const initialState: SidebarState = {
  isOpen: false,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<SidebarState>) => {
      state.isOpen = action.payload.isOpen;
    },
    reset: (state) => {
      state.isOpen = false;
    }
  },
})

export const { setIsOpen, reset } = sidebarSlice.actions;
export const selectSidebar = (state: { sidebar: SidebarState }) => state.sidebar;
export default sidebarSlice.reducer;