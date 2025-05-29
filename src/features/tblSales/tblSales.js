import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Helper function to get the auth token
const getAuthToken = () => {
  return localStorage.getItem("token");  // You can use sessionStorage or other storage methods as well
};

export const tblSalesApi = createApi({
  reducerPath: "tblSalesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",

    // This will attach the token to every request that requires authorization
    prepareHeaders: (headers) => {
      const token = getAuthToken(); // Retrieve token from storage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Add token to headers if available
      }
      return headers;
    },
  }),
  tagTypes: ["tblSales"], 
  endpoints: (build) => ({
    createTblSales: build.mutation({
      query: (registerData) => ({
        url: "/tblSales/create",
        method: "POST",
        body: registerData,
      }),
      invalidatesTags: ["tblSales"], 
    }),

    deleteTblSales: build.mutation({
      query: (id) => ({
        url: `/tblSales/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tblSales"],
    }),

    updateTblSales: build.mutation({
      query: (data) => ({
        url: `/tblSales/bulk-update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["tblSales"],
    }),

    getAllTblSales: build.query({
      query: ({searchTerm, page, limit}) => ({
        url: "/tblSales",
        params:{searchTerm, page, limit}
      }),
      providesTags: ["tblSales"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),

    getPreviousKot: build.query({
      query: () => ({
        url: "/tblSales/kot",
      }),
      providesTags: ["tblSales"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),

    getTblSalesDataById: build.query({
      query: (id) => ({
        url: `/tblSales/kot/${id}`,
      }),
      providesTags: ["tblSales"],
      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),

  }),
});

// Export hooks to use in your components
export const {
  useCreateTblSalesMutation,
  useGetAllTblSalesQuery,
  useUpdateTblSalesMutation,
  useDeleteTblSalesMutation,
  useGetTblSalesDataByIdQuery,
  useGetPreviousKotQuery,

} = tblSalesApi;