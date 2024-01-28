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

        deleteProduct: builder.mutation({
            query: (slug:string) => ({
                url: `/products/${slug}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"] as any
        }),

        updateProduct: builder.mutation({
            query: ({slug, body}) => ({
                url: `/products/${slug}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["Products"] as any
        }),

        multipleDeleteProduct: builder.mutation({
            query: (body) => ({
                url: `/products/multiple-delete`,
                method: "POST",
                body
            }),
            invalidatesTags: ["Products"] as any
        }),
    })
});

export const { useGetAllProductsQuery, useAddProductMutation, useDeleteProductMutation, useUpdateProductMutation, useMultipleDeleteProductMutation } = productsApi;