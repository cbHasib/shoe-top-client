import { BaseQueryApi, BaseQueryFn, DefinitionType, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://shoes-top-back.vercel.app/api/v1",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set("authorization", `${token}`);
        }
        return headers;
    }
});

const baseQueryWithRefreshToken : BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType>= async (args, api, extraOptions) : Promise<any> => {
        const res = await baseQuery(args, api, extraOptions);

        if (res.error?.status === 401) {
            const refreshRes = await fetch("https://shoes-top-back.vercel.app/api/v1/auth/refresh-token", {
                method: "POST",
                credentials: "include"
            });
            const data = await refreshRes.json();

            const user = (api.getState() as RootState).auth.user;

            if (data?.success && user) {
                api.dispatch(setUser({user, token: data.data?.accessToken}));
                return await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(logout());
            }
        }
        return res;
};

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithRefreshToken,
    endpoints: () => ({}),
})