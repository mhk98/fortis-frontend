// import cartSlice from "@/Redux-Thunk/reducers/cartSlice";

import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/auth";
import { tblMenuApi } from "../features/tblMenu/tblMenu";
import { tblSalesApi } from "../features/tblSales/tblSales";
import { tblRestNameApi } from "../features/tblRestName/tblRestName";







const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [tblMenuApi.reducerPath]: authApi.reducer,
    [tblSalesApi.reducerPath]: tblSalesApi.reducer,
    [tblRestNameApi.reducerPath]: tblSalesApi.reducer,
  
 
  
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        // contactApi.middleware,
        authApi.middleware,
        tblMenuApi.middleware,
        tblSalesApi.middleware,
        tblRestNameApi.middleware,
      
      
    ),
});

export default store;