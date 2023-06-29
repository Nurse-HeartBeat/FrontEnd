import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: object | null;
  csrf: string | null;
  employer: boolean | null;
}

const initialState: UserState = {
  user: null,
  csrf: null,
  employer: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<object | null>) => {
      state.user = action.payload;
      console.log(state.user);
    },
    setCsrf: (state: UserState, action: PayloadAction<string>) => {
      state.csrf = action.payload;
    },
    setEmployer: (state: UserState, action: PayloadAction<boolean | null>) => {
      state.employer = action.payload;
    }
  },
});

export const { setUser, setCsrf, setEmployer } = userSlice.actions;

export default userSlice.reducer;
