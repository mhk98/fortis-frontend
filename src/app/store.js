// import cartSlice from "@/Redux-Thunk/reducers/cartSlice";

import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/auth";
import { CashInApi } from "../features/cashIn/cashIn";






const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [CashInApi.reducerPath]: CashInApi.reducer,
 
  
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        // contactApi.middleware,
        authApi.middleware,
        CashInApi.middleware,
      
      
    ),
});

export default store;