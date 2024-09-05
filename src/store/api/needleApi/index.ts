import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

const needleApi = createApi({
  reducerPath: "needleApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    test: builder.query<{ id: string }, void>({
      query: () => "/test",
    }),
  }),
});

export { needleApi };
