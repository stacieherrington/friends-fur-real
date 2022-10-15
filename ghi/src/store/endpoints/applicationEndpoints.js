export function ApplicationEndpoints(builder) {
  return {
    addApplication: builder.mutation({
      query: (form) => {
        const formData = new FormData(form);
        const entries = Array.from(formData.entries());
        const data = entries.reduce((app, [key, value]) => {
          app[key] = Number.parseInt(value) || value;
          return app;
        }, {});
        return {
          method: "POST",
          url: "/api/applications/",
          credentials: "include",
          body: data,
        };
      },
      invalidateTags: [{ type: "Application", id: "LIST" }],
    }),
    // listApplications: builder.query({
    //   query: () => `/api/applications/`,
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
    listRescueApplications: builder.query({
      query: (rescueId) => `/api/${rescueId}/applications/`,
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
