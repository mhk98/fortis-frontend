import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Helper function to get the auth token
const getAuthToken = () => {
  return localStorage.getItem("token");  // You can use sessionStorage or other storage methods as well
};

export const tblRestNameApi = createApi({
  reducerPath: "tblRestNameApi",
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
  tagTypes: ["tblRestName"], 
  endpoints: (build) => ({
    createTblRestName: build.mutation({
      query: (registerData) => ({
        url: "/tblRestName/register",
        method: "POST",
        body: registerData,
      }),
      invalidatesTags: ["tblRestName"], 
    }),

    deleteTblRestName: build.mutation({
      query: (id) => ({
        url: `/tblRestName/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tblRestName"],
    }),

    updateTblRestName: build.mutation({
      query: ({ id, data }) => ({
        url: `/tblRestName/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["tblRestName"],
    }),

    getAllTblRestName: build.query({
      query: () => ({
        url: "/tblRestName",
      }),
      providesTags: ["tblRestName"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),

    getTblRestNameDataById: build.query({
      query: (id) => ({
        url: `/tblRestName/${id}`,
      }),
      providesTags: ["tblRestName"],
      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),

  }),
});

// Export hooks to use in your components
export const {
  useCreateTblRestNameMutation,
  useGetAllTblRestNameQuery,
  useUpdateTblRestNameMutation,
  useDeleteTblRestNameMutation,
  useGetTblRestNameDataByIdQuery

} = tblRestNameApi;