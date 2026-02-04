import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userId: string | null;
  token: string | null;
  userEmail: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  userId: null,
  token: null,
  userEmail: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
    },
    loginSuccess(state, action: PayloadAction<{ userId: string; token: string; email: string }>) {
      state.loading = false;
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.userEmail = action.payload.email;
      state.isAuthenticated = true;
    },
    loginFailure(state) {
      state.loading = false;
      state.isAuthenticated = false;
    },
    logout(state) {
      state.userId = null;
      state.token = null;
      state.userEmail = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
