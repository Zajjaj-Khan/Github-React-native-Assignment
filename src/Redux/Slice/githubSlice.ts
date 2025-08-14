import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchUsers, getUserDetails } from '../../services/gitHubApi';

export const fetchUsers = createAsyncThunk(
  'github/fetchUsers',
  async (query:string) => {
    const data = await searchUsers(query);
    console.log('Fetched users:', data.items);
    return data.items;
  }
);

export const fetchUserDetails = createAsyncThunk(
  'github/fetchUserDetails',
  async (username:string) => {
    const data = await getUserDetails(username);
    console.log(data);
    return data;
  }
);
const initialState = {
  users: [] as any[],
  selectedUser: null as any,
  loading: false,
  error: null as string | null,
};
const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
     resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch users';
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      });
  },
});

export const { clearSelectedUser,resetState } = githubSlice.actions;
export default githubSlice.reducer;
