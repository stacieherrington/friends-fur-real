import { clearForm } from "../slices/accountSlice";

export function AccountEndpoints(builder) {
  return {
    signup: builder.mutation({
      query: (data) => ({
        url: "/api/accounts/",
        method: "post",
        body: data,
        credentials: "include",
      }),

      provideTags: ["Account"],
      invalidatesTags: (result) => {
        return (result && ["Token"]) || [];
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearForm());
        } catch (error) {}
      },
    }),
    login: builder.mutation({
      query: (info) => {
        let formData = null;
        if (info instanceof HTMLElement) {
          formData = new FormData();
          formData.append("username", info.email.value);
          formData.append("password", info.password.value);
        }
        return {
          url: "/token",
          method: "post",
          body: formData,
          credentials: "include",
        };
      },
      providesTags: ["Account"],
      invalidatesTags: (result) => {
        return (result && ["Token"]) || [];
      },
      async onQueryStarted(arg, { dispatch, queryFufilled }) {
        try {
          await queryFufilled;
          dispatch(clearForm());
        } catch (error) {}
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/token",
        method: "delete",
        credentials: "include",
      }),
      invalidatesTags: ["Account", "Token"],
    }),
    getToken: builder.query({
      query: () => ({
        url: "/token/",
        method: "get",
        credentials: "include",
      }),
      providesTags: ["Token"],
    }),
    deleteSessions: builder.mutation({
      query: (account_id) => ({
        method: "DELETE",
        url: `/api/sessions/${account_id}/`,
      }),
      invalidatesTags: ["Account", "Token"],
    }),
    singleAccount: builder.query({
      query: () => ({
        method: "get",
        url: `/api/accounts/profile/`,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }),

      providesTags: () => ["Account"],
    }),
    patchUpdateAccount: builder.mutation({
      query: (data) => ({
        method: "PATCH",
        url: "/api/accounts/profile/",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: () => ["Account"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {}
      },
    }),
    patchPromoteAccount: builder.mutation({
      query: (accountId, ...patch) => ({
        method: "PATCH",
        url: `/api/accounts/promote/${accountId}/`,
        body: patch,
        credentials: "include",
      }),
      invalidatesTags: () => ["Account", "Token"],
    }),
    patchDemoteAccount: builder.mutation({
      query: (accountId, ...patch) => ({
        method: "PATCH",
        url: `/api/accounts/demote/${accountId}/`,
        body: patch,
        credentials: "include",
      }),
      providesTags: () => ["Account"],
      invalidatesTags: ["Account", "Token"],
    }),
    patchLocalizeAccount: builder.mutation({
      query: (accountId, ...patch) => ({
        method: "PATCH",
        url: `/api/accounts/localize/${accountId}/`,
        body: patch,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Account"],
    }),
    patchFavoritePet: builder.mutation({
      query: (pet) => ({
        method: "PATCH",
        url: "/api/accounts/profile/pets/",
        body: pet,
        credentials: "include",
        // headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: () => ["Account"],
    }),
    listAccounts: builder.query({
      query: () => `/api/accounts/`,
      providesTags: (data) => {
        const tags = [{ type: "Account", id: "LIST" }];
        if (!data || !data.accounts) return tags;
        const { accounts } = data;
        if (accounts) {
          tags.concat(...accounts.map(({ id }) => ({ type: "Account", id })));
        }
        return tags;
      },
    }),
    getCurrentAccount: builder.query({
      query: () => ({
        url: `/api/accounts/profile/`,
        credentials: "include",
      }),
      providesTags: (account) => {
        if (account === undefined) {
          return [];
        }
        return [{ type: "Account", id: account.id }];
      },
    }),
  };
}
