export function RescueEndpoints(builder) {
  return {
    addRescue: builder.mutation({
      query: (form) => {
        const formData = new FormData(form);
        const entries = Array.from(formData.entries());
        const data = entries.reduce((pet, [key, value]) => {
          pet[key] = Number.parseInt(value) || value;
          return pet;
        }, {});
        return {
          method: "POST",
          url: "/api/rescues/",
          credentials: "include",
          body: data,
        };
      },
      invalidateTags: [{ type: "Rescue", id: "LIST" }],
    }),
    listRescues: builder.query({
      query: () => `/api/rescues/`,
      providesTags: (data) => {
        const tags = [{ type: "Rescue", id: "LIST" }];
        if (!data || !data.rescues) return tags;
        const { rescues } = data;
        if (rescues) {
          tags.concat(...rescues.map(({ id }) => ({ type: "Rescue", id })));
        }
        return tags;
      },
    }),
    getRescue: builder.query({
      query: (rescueId) => `/api/rescues/${rescueId}/`,
      providesTags: (rescue) => [{ type: "Rescue", id: rescue.id }],
    }),
    putRescue: builder.mutation({
      query: (rescueId) => ({
        method: "PUT",
        url: `/api/rescues/${rescueId}/`,
      }),
      invalidatesTags: (result, error, rescueId) => [
        { type: "Rescue", id: rescueId },
      ],
    }),
    deleteRescue: builder.mutation({
      query: (rescueId) => ({
        method: "DELETE",
        url: `/api/rescues/${rescueId}/`,
      }),
      invalidatesTags: (result, error, rescueId) => [
        { type: "Rescue", id: rescueId },
      ],
    }),
  };
}
