import { clearForm } from "../slices/applicationSlice";
export function ApplicationEndpoints(builder) {
  return {
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
    listAccountApplications: builder.query({
      query: (accountId) => `/api/accounts/${accountId}/applications/`,
      providesTags: (data) => {
        const tags = [{ type: "Application", id: "LIST" }];
        if (!data || !data.adoptions) return tags;
        const { Applications } = data;
        if (Applications) {
          tags.concat(
            ...Applications.map(({ id }) => ({
              type: "Application",
              id,
            }))
          );
        }
        return tags;
      },
    }),
    // listRescueApplications: builder.query({
    //   query: (rescueId) => `/api/${rescueId}/applications/`,
    //   providesTags: (data) => {
    //     const tags = [{ type: "Application", id: "LIST" }];
    //     if (!data || !data.adoptions) return tags;
    //     const { Applications } = data;
    //     if (Applications) {
    //       tags.concat(
    //         ...Applications.map(({ id }) => ({
    //           type: "Application",
    //           id,
    //         }))
    //       );
    //     }
    //     return tags;
    //   },
    // }),
    listRescueApplications: builder.query({
      query: () => ({
        method: "get",
        url: `/api/manage/applications/`,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }),
      providesTags: () => ["Application"],
    }),
    listAllApplications: builder.query({
      query: () => `/api/applications/`,
      providesTags: () => ["Application"],
    }),
    getApplication: builder.query({
      query: (applicationId) => `/api/applications/${applicationId}/`,
      providesTags: (application) => [
        { type: "Application", id: application.id },
      ],
    }),
    patchApplication: builder.mutation({
      query: (applicationId) => ({
        method: "PATCH",
        url: `/api/applications/${applicationId}/`,
      }),
      invalidateTags: (application) => [
        { type: "Application", id: application.id },
      ],
    }),
    approveApplication: builder.mutation({
      query: (applicationId) => ({
        method: "PATCH",
        url: `/api/applications/${applicationId}/approve/`,
      }),
      invalidateTags: (application) => [
        { type: "Application", id: application.id },
      ],
    }),
    rejectApplication: builder.mutation({
      query: (applicationId) => ({
        method: "PATCH",
        url: `/api/applications/${applicationId}/reject/`,
      }),
      invalidateTags: (application) => [
        { type: "Application", id: application.id },
      ],
    }),
    deleteApplication: builder.mutation({
      query: (applicationId) => ({
        method: "DELETE",
        url: `/api/applications/${applicationId}/`,
      }),
      invalidateTags: (application) => [
        { type: "Application", id: application.id },
      ],
    }),
  };
}
