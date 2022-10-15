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
      query: () => `/api/accounts`,
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
    // listAccounts: builder.query({
    //   query: () => `/api/accounts`,
    //   providesTags: (account) =>
    //     account
    //       ? [
    //           ...account.map(({ id }) => ({ type: "Account", id }), {
    //             type: "Account",
    //             id: "LIST",
    //           }),
    //         ]
    //       : [{ type: "Post", id: "LIST" }],
    // }),
    singleAccount: builder.query({
      query: (allAccountSliceId) => `/api/accounts/${allAccountSliceId}`,
      providesTags: (account) => [{ type: "Account", id: account.id }],
    }),
    patchUpdateAccount: builder.mutation({
      query: (allAccountSliceId, ...patch) => ({
        method: "PATCH",
        url: `/api/accounts/${allAccountSliceId}`,
        body: patch,
      }),
      providesTags: (account) => [{ type: "Account", id: account.id }],
      invalidatesTags: (account) => [{ type: "Account", id: account.id }],
      // invalidatesTags: (result, error, allAccountSliceId) => [
      //   { type: "Account", id: allAccountSliceId },
      // ],
    }),
    patchPromoteAccount: builder.mutation({
      query: (allAccountSliceId, ...patch) => ({
        method: "PATCH",
        url: `/api/accounts/promote/${allAccountSliceId}`,
        body: patch,
      }),
      providesTags: (account) => [{ type: "Account", id: account.id }],
      invalidatesTags: (account) => [{ type: "Account", id: account.id }],
      // invalidatesTags: (result, error, allAccountSliceId) => [
      //   { type: "Account", id: allAccountSliceId },
      // ],
    }),
    patchDemoteAccount: builder.mutation({
      query: (allAccountSliceId, ...patch) => ({
        method: "PATCH",
        url: `/api/accounts/demote/${allAccountSliceId}`,
        body: patch,
      }),
      providesTags: (account) => [{ type: "Account", id: account.id }],
      invalidatesTags: (account) => [{ type: "Account", id: account.id }],
      // invalidatesTags: (result, error, allAccountSliceId) => [
      //   { type: "Account", id: allAccountSliceId },
      // ],
    }),
    patchLocalizeAccount: builder.mutation({
      query: (allAccountSliceId, ...patch) => ({
        method: "PATCH",
        url: `/api/accounts/localize/${allAccountSliceId}`,
        body: patch,
      }),
      providesTags: (account) => [{ type: "Account", id: account.id }],
      invalidatesTags: (account) => [{ type: "Account", id: account.id }],
      // invalidatesTags: (result, error, allAccountSliceId) => [
      //   { type: "Account", id: allAccountSliceId },
      // ],
    }),
  };
}
