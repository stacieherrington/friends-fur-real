import { clearForm } from "../slices/accountSlice";
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
      invalidateTags: () => [{ type: "Account", id: "LIST" }],
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
    
  };
}
