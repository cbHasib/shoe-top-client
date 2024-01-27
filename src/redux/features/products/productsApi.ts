import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: (query) => ({
                url: "/academic-semesters",
                method: "GET",
                query,
            })
        }),
    })
});

export const { useGetAllProductsQuery } = productsApi;