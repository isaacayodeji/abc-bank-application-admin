import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../service/authApi";
import authReducer from "../features/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { globalReducer } from "../features/globalSlice";
import { setAllGlobalState, setGlobalState } from "../features/globalSlice";
import { setAuthKey, setAllAuthKey } from "../features/authSlice";
import { globalApi } from "../service/global";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    globalState: globalReducer,
    [authApi.reducerPath]: authApi.reducer,
    [globalApi.reducerPath]: globalApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware, globalApi.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);

export { setAllGlobalState, setGlobalState, setAllAuthKey, setAuthKey };
export {
  useGetDataQuery,
  usePostDataMutation,
  useGetSelectedValueQuery,
  useGetDataOnActionMutation,
} from "../service/global";

export {
  useAdminLoginMutation,
  useUserLoginMutation,
  useRegisterMutation,
} from "../service/authApi";
