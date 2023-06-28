import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import auth from '../../firebaseConfig';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    csrf: null
  },
  reducers: {
    // login: (state, action) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   // I added parse here because it was giving errors in console
    //   state.user = JSON.parse(action.payload);
    // },
    // logout: (state) => {
    //   auth.signOut();
    //   state.user = null;
    // },
    setUser: (state: any, action: PayloadAction<object | null>) => {
      state.user = action.payload
      console.log(state.user)
    },
    setCsrf: (state:any, action: PayloadAction<string>) => {
      state.csrf = action.payload
    }
  },
},);

// Action creators are generated for each case reducer function
export const { setUser, setCsrf } = userSlice.actions;

export default userSlice.reducer;
