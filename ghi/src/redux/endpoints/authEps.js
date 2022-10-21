import { clearForm } from "../slices/accountSlice";

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
        credentials:'include',
      }),
      invalidatesTags: [{ type: "Account", id: "LIST" }],
    }),
  };
}
