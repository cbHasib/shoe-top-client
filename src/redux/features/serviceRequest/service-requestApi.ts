import { baseApi } from "../../api/baseApi";

const serviceRequestApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllServiceRequest: builder.query({
            query: (query) => ({
                url: "/service-request/all-service-request",
                method: "GET",
                params: query
            }),
            providesTags: ["ServiceRequest"]
        }),

        addServiceRequest: builder.mutation({
            query: (body) => ({
                url: "/service-request/create-service-request",
                method: "POST",
                body
            }),
            invalidatesTags: ["ServiceRequest"]
        }),

       getMyServiceRequest: builder.query({
            query: (query) => ({
                url: "/service-request/my-service-request",
                method: "GET",
                params: query
            }),
            providesTags: ["ServiceRequest"]
        }),

       getMyServiceRequestStats: builder.query({
            query: (query) => ({
                url: "/service-request/service-request-stats",
                method: "GET",
                params: query
            }),
            providesTags: ["ServiceRequestStats"]
        }),

        updateServiceRequest: builder.mutation({
            query: ({ id, body }) => ({
                url: `/service-request/update-service-request/${id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ["ServiceRequest"]
        }),

        getServiceRequestById: builder.query({
            query: (id) => ({
                url: `/service-request/service-request/${id}`,
                method: "GET"
            }),
            providesTags: ["ServiceRequest"]
        }),
    })
});

export const { useGetAllServiceRequestQuery, useGetMyServiceRequestStatsQuery, useAddServiceRequestMutation, useGetMyServiceRequestQuery, useUpdateServiceRequestMutation, useGetServiceRequestByIdQuery } = serviceRequestApi;