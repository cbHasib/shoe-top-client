import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: (query) => ({
                url: "/products",
                method: "GET",
                params: query
            })
        }),
    })
});

export const { useGetAllProductsQuery } = productsApi;