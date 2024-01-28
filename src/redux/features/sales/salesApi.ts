import { baseApi } from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllSales: builder.query({
            query: (query) => ({
                url: "/sales/all-sales",
                method: "GET",
                params: query
            }),
            providesTags: ["Sales"] as any
        }),

        addSale: builder.mutation({
            query: (body) => ({
                url: "/sales/create-sale",
                method: "POST",
                body
            }),
            invalidatesTags: ["Sales", "Products"] as any
        }),

        getSalesReportByCategory: builder.query({
            query: (query : {startDate: string, endDate: string, type: 'daily' | 'weekly' | 'monthly' | 'yearly'}) => ({
                url: "/sales/sales-report-by-category",
                method: "GET",
                params: query
            }),
            providesTags: ["Sales"] as any
        }),
    })
});

export const { useGetAllSalesQuery, useAddSaleMutation, useGetSalesReportByCategoryQuery } = salesApi;