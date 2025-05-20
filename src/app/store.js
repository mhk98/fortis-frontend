// import cartSlice from "@/Redux-Thunk/reducers/cartSlice";

import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/auth";
import { tblMenuApi } from "../features/tblMenu/tblMenu";







const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [tblMenuApi.reducerPath]: authApi.reducer,
  
 
  
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        // contactApi.middleware,
        authApi.middleware,
        tblMenuApi.middleware,
      
      
    ),
});

export default store;