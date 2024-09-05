import { createSlice } from "@reduxjs/toolkit";
import { googleLogin, login, logout, verifyRegistrationToken, verifyToken } from "../api/store";

enum AuthStatus {
  idle = "idle",
  loading = "loading",
  succeeded = "succeeded",
  failed = "failed",
}

interface AuthState {
  isLogged: boolean;
  status: AuthStatus;
  hasLoggedOut?: boolean;
}

const initialState: AuthState = {
  isLogged: false,
  status: AuthStatus.idle,
  hasLoggedOut: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.status = AuthStatus.succeeded;
      state.isLogged = true;
      state.hasLoggedOut = false;
    },
    loginFailed: (state) => {
      state.status = AuthStatus.failed;
      state.isLogged = false;
      state.hasLoggedOut = false;
    },
    logout: (state) => {
      state.status = AuthStatus.idle;
      state.isLogged = false;
      state.hasLoggedOut = true;
    },
  },
  extraReducers(builder) {
    // standard login
    builder.addMatcher(login.matchPending, (state) => {
      state.status = AuthStatus.loading;
    });
    builder.addMatcher(login.matchFulfilled, (state) => {
      authSlice.caseReducers.loginSuccess(state);
    });
    builder.addMatcher(login.matchRejected, (state) => {
      authSlice.caseReducers.loginFailed(state);
    });
    // google login
    builder.addMatcher(googleLogin.matchPending, (state) => {
      state.status = AuthStatus.loading;
    });
    builder.addMatcher(googleLogin.matchFulfilled, (state) => {
      authSlice.caseReducers.loginSuccess(state);
    });
    builder.addMatcher(googleLogin.matchRejected, (state) => {
      authSlice.caseReducers.loginFailed(state);
    });
    // verify access token
    builder.addMatcher(verifyToken.matchPending, (state) => {
      state.status = AuthStatus.loading;
    });
    builder.addMatcher(verifyToken.matchFulfilled, (state) => {
      authSlice.caseReducers.loginSuccess(state);
    });
    builder.addMatcher(verifyToken.matchRejected, (state) => {
      authSlice.caseReducers.loginFailed(state);
    });
    // logout action
    builder.addMatcher(logout.matchPending, (state) => {
      state.status = AuthStatus.loading;
    });
    builder.addMatcher(logout.matchFulfilled, (state) => {
      authSlice.caseReducers.logout(state);
    });
    // registration with token verification
    builder.addMatcher(verifyRegistrationToken.matchPending, (state) => {
      state.status = AuthStatus.loading;
    });
    builder.addMatcher(verifyRegistrationToken.matchFulfilled, (state) => {
      authSlice.caseReducers.loginSuccess(state);
    });
    builder.addMatcher(verifyRegistrationToken.matchRejected, (state) => {
      authSlice.caseReducers.loginFailed(state);
    });
  },
});
