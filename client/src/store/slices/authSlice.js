import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from '../../services/apis/user';

// POST : api/users/login
export const login = createAsyncThunk(
  'api/login',
  async ({ email, password, remember }, thunkAPI) => {
    const { data } = await userAPI.login({ email, password });
    if (remember) localStorage.setItem('userInfo', JSON.stringify(data.user));
    return data.user;
  }
);

// export const loginGoogle = createAsyncThunk(
//   'api/google',
//   async ({ res }, thunkAPI) => {
//     const googleUser = {};
//     // googleUser.user_name = res.profileObj.name;
//     // googleUser.email = res.profileObj.email;
//     // googleUser.image = res.profileObj.imageUrl;
//     // googleUser.token = res.tokenId;
//     // googleUser.user_id = res.googleId;
//     localStorage.setItem('userInfo', JSON.stringify(googleUser));
//   }
// );

//API
// POST : Register
export const registerApi = createAsyncThunk(
  'api/register',
  async ({ user_name, email, password }, { rejectWithValue }) => {
    console.log(user_name, email, password);
    try {
      const { data } = await userAPI.register({ user_name, email, password });
      localStorage.setItem('userInfo', JSON.stringify(data.user));
      return data;
    } catch (err) {
      //err.response.data - contains error returned from server
      return rejectWithValue(err.response.data.err.errors[0].message);
    }
  }
);

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      console.log('OK LOG');
      localStorage.removeItem('userInfo');
      return {};
    },
    reset_auth: (state) => {
      state.error = null;
    },
    loginGoogle: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return state;
    },
  },
  extraReducers: {
    // login list
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = 'User name or password is  wrong';
    },

    // // register
    [registerApi.pending]: (state) => {
      state.loading = true;
    },
    [registerApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    [registerApi.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logout, reset_auth, loginGoogle } = authSlice.actions;

export default authSlice.reducer;
