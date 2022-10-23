export function AccountEndpoints(builder) {
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
      providesTags: (data) => {
        const tags = [{ type: "Account", id: "LIST" }];
        if (!data || !data.accounts) return tags;
        const { accounts } = data;
        if (accounts) {
          tags.concat(...accounts.map(({ id }) => ({ type: "Pet", id })));
        }
        return tags;
      },
    }),
    singleAccount: builder.query({
      query: (allAccountSliceId) => `/api/accounts/${allAccountSliceId}/`,
      providesTags: (account) => [{ type: "Account", id: account.id }],
    }),
    getCurrentAccount: builder.query({
      query: () => ({
        url: `/api/accounts/profile/`,
        credentials: "include",
      }),
      providesTags: (account) => {
        if (account === undefined) {
          return []
        }
        return [{ type: "Account", id: account.id }]
      },
    }),
    patchUpdateAccount: builder.mutation({
      query: (allAccountSliceId, ...patch) => ({
        method: "PATCH",
        url: `/api/accounts/${allAccountSliceId}`,
        body: patch,
      }),
      providesTags: (account) => [{ type: "Account", id: account.id }],
      invalidatesTags: (account) => [{ type: "Account", id: account.id }],
    }),
    patchPromoteAccount: builder.mutation({
      query: (allAccountSliceId, ...patch) => ({
        method: "PATCH",
        url: `/api/accounts/promote/${allAccountSliceId}/`,
        body: patch,
      }),
      providesTags: (account) => [{ type: "Account", id: account.id }],
      invalidatesTags: (account) => [{ type: "Account", id: account.id }],
    }),
    patchDemoteAccount: builder.mutation({
      query: (allAccountSliceId, ...patch) => ({
        method: "PATCH",
        url: `/api/accounts/demote/${allAccountSliceId}/`,
        body: patch,
      }),
      providesTags: (account) => [{ type: "Account", id: account.id }],
      invalidatesTags: (account) => [{ type: "Account", id: account.id }],
    }),
    patchLocalizeAccount: builder.mutation({
      query: (allAccountSliceId, ...patch) => ({
        method: "PATCH",
        url: `/api/accounts/localize/${allAccountSliceId}/`,
        body: patch,
      }),
      providesTags: (account) => [{ type: "Account", id: account.id }],
      invalidatesTags: (account) => [{ type: "Account", id: account.id }],
    }),
  };
}
