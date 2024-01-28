import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    
        getAllProducts: builder.query({
            query: (query) => ({
                url: "/products",
                method: "GET",
                params: query
            }),
            providesTags: ["Products"] as any
        }),

        addProduct: builder.mutation({
            query: (body) => ({
                url: "/products",
                method: "POST",
                body
            }),
            invalidatesTags: ["Products"] as any
        }),
    })
});

export const { useGetAllProductsQuery, useAddProductMutation } = productsApi;