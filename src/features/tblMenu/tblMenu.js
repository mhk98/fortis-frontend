import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Helper function to get the auth token
const getAuthToken = () => {
  return localStorage.getItem("token");  // You can use sessionStorage or other storage methods as well
};

export const tblMenuApi = createApi({
  reducerPath: "tblMenuApi",
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
  tagTypes: ["tblMenu"], 
  endpoints: (build) => ({
    createTblMenu: build.mutation({
      query: (registerData) => ({
        url: "/tblMenu/register",
        method: "POST",
        body: registerData,
      }),
      invalidatesTags: ["tblMenu"], 
    }),

    deleteTblMenu: build.mutation({
      query: (id) => ({
        url: `/tblMenu/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tblMenu"],
    }),

    updateTblMenu: build.mutation({
      query: ({ id, data }) => ({
        url: `/tblMenu/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["tblMenu"],
    }),

    getAllTblMenu: build.query({
      query: ({searchTerm, page, limit}) => ({
        url: "/tblMenu",
        params:{searchTerm, page, limit}
      }),
      providesTags: ["tblMenu"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),

    getTblMenuDataById: build.query({
      query: (id) => ({
        url: `/tblMenu/${id}`,
      }),
      providesTags: ["tblMenu"],
      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),

  }),
});

// Export hooks to use in your components
export const {
  useCreateTblMenuMutation,
  useGetAllTblMenuQuery,
  useUpdateTblMenuMutation,
  useDeleteTblMenuMutation,
  useGetTblMenuDataByIdQuery

} = tblMenuApi;