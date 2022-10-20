export function accountEndpoints(builder) {
  return {
    addAccount: builder.mutation({
      query: (form) => {
        const formData = new FormData(form);
        const entries = Array.from(formData.entries());
        const data = entries.reduce((app, [key, value]) => {
          app[key] = Number.parseInt(value) || value;
          return app;
        }, {});
        return {
          method: "POST",
          url: "/api/accounts",
          credentials: "include",
          body: data,
        };
      },
      invalidateTags: [{ type: "Account", id: "LIST" }],
    }),
    listAccounts: builder.query({
      query: () => `/api/accounts/`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Account", id }))
          : ["Account"],
    }),
    singleAccount: builder.query({
      query: (allAccountSliceId) => `/api/accounts/${allAccountSliceId}/`,
      providesTags: (result, error, allAccountSliceId) => [
        { type: "Account", id: allAccountSliceId },
      ],
    }),
    patchUpdateAccount: builder.mutation({
      query: (allAccountSliceId) => ({
        method: "PATCH",
        url: `/api/accounts/${allAccountSliceId}/`,
      }),
      invalidatesTags: (result, error, allAccountSliceId) => [
        { type: "Account", id: allAccountSliceId },
      ],
    }),
    patchPromoteAccount: builder.mutation({
      query: (allAccountSliceId) => ({
        method: "PATCH",
        url: `/api/accounts/promote/${allAccountSliceId}/`,
      }),
      invalidatesTags: (result, error, allAccountSliceId) => [
        { type: "Account", id: allAccountSliceId },
      ],
    }),
    patchDemoteAccount: builder.mutation({
      query: (allAccountSliceId) => ({
        method: "PATCH",
        url: `/api/accounts/demote/${allAccountSliceId}/`,
      }),
      invalidatesTags: (result, error, allAccountSliceId) => [
        { type: "Account", id: allAccountSliceId },
      ],
    }),
    patchLocalizeAccount: builder.mutation({
      query: (allAccountSliceId) => ({
        method: "PATCH",
        url: `/api/accounts/localize/${allAccountSliceId}/`,
      }),
      invalidatesTags: (result, error, allAccountSliceId) => [
        { type: "Account", id: allAccountSliceId },
      ],
    }),
  };
}
