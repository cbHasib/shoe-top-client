import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    
        getAllProducts: builder.query({
            query: (query) => ({
                url: "/products/get-all",
                method: "GET",
                params: query
            }),
            providesTags: ["Products"]
        }),

        getProductByCode: builder.query({
            query: (code) => ({
                url: `/products/get-product-by-code/${code}`,
                method: "GET",
            }),
            providesTags: ["ViewProduct"]
        }),

        getAnalytics: builder.query({
            query: () => ({
                url: "/products/analytics",
                method: "GET",
            }),
            providesTags: ["Analytics"]
        }),

        addProduct: builder.mutation({
            query: (body) => ({
                url: "/products/add-product",
                method: "POST",
                body
            }),
            invalidatesTags: ["Products", "Analytics"]
        }),


        updateProduct: builder.mutation({
            query: ({slug, body}) => ({
                url: `/products/update-product/${slug}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["Products", "Analytics"]
        }),

        deleteProduct: builder.mutation({
            query: (slug:string) => ({
                url: `/products/delete-product/${slug}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products", "Analytics"]
        }),

        multipleDeleteProduct: builder.mutation({
            query: (body) => ({
                url: `/products/multiple-delete`,
                method: "POST",
                body
            }),
            invalidatesTags: ["Products", "Analytics"]
        }),
    })
});

export const { useGetAllProductsQuery, useGetProductByCodeQuery, useGetAnalyticsQuery, useAddProductMutation, useDeleteProductMutation, useUpdateProductMutation, useMultipleDeleteProductMutation } = productsApi;