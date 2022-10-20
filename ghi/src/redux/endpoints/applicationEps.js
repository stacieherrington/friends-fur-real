import { clearForm } from "../slices/applicationSlice";
export function applicationEndpoints(builder) {
  return {
    // addApplication: builder.mutation({
    //   query: (form) => {
    //     const formData = new FormData(form);
    //     const entries = Array.from(formData.entries());
    //     const data = entries.reduce((app, [key, value]) => {
    //       app[key] = Number.parseInt(value) || value;
    //       return app;
    //     }, {});
    //     return {
    //       method: "POST",
    //       url: "/api/applications/",
    //       credentials: "include",
    //       body: data,
    //     };
    //   },
    //   invalidateTags: [{ type: "Application", id: "LIST" }],
    // }),
    addApplication: builder.mutation({
      query: (data) => ({
        url: "/api/applications/",
        method: "post",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Application"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearForm());
        } catch (error) {}
      },
    }),
    listApplications: builder.query({
      query: () => `/api/applications/`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Application", id }))
          : ["Application"],
    }),
    getApplication: builder.query({
      query: (applicationId) => `/api/applications/${applicationId}/`,
      providesTags: (result, error, applicationId) => [
        { type: "Application", id: applicationId },
      ],
    }),
    patchApplication: builder.mutation({
      query: (applicationId) => ({
        method: "PATCH",
        url: `/api/applications/${applicationId}/`,
      }),
      invalidatesTags: (result, error, applicationId) => [
        { type: "Application", id: applicationId },
      ],
    }),
    deleteApplication: builder.mutation({
      query: (applicationId) => ({
        method: "DELETE",
        url: `/api/applications/${applicationId}/`,
      }),
      invalidatesTags: (result, error, applicationId) => [
        { type: "Application", id: applicationId },
      ],
    }),
  };
}
