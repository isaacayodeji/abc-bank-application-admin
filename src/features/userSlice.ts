import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  data: [] | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: [],
  loading: false,
  error: "",
};

export const getUser = createAsyncThunk("user", async () => {
  return fetch(
    "https://test.xpresspayments.com:2300/api/Customer/GetAllPendingApproval"
  ).then((res) => res.json());
});
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      });
  },
});

export default userSlice.reducer