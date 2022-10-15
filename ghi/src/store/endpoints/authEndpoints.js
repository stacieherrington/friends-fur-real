import { clearForm } from "./accountSlice";

export function AuthEndpoints(builder) {
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
          formData = new FormData(info);
        } else {
          formData = new FormData();
          formData.append("email", info.email);
          formData.append("password", info.password);
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
        credentials: "include,",
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
      // invalidatesTags: (result, error, account_id) => [
      //   { type: "Account", id: account_id },     ],
      invalidatesTags: [{ type: "Account", id: "LIST" }],
    }),
  };
}
