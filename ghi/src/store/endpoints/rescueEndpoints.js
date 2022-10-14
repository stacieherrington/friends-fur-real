export function rescueEndpoints(builder) {
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
      providesTags: ["Rescue"],
    }),
    getRescue: builder.query({
      query: (rescueId) => `/api/rescue/${rescueId}/`,
      providesTags: rescue => [{ type: "Rescue", id:rescue.id }],
    }),
    putRescue: builder.mutation({
      query: (rescueId) => ({
        method: "PUT",
        url: `/api/rescue/${rescueId}/`,
      }),
      invalidatesTags: (result, error, rescueId) => [
        { type: "Rescue", id: rescueId },
      ],
    }),
    deleteRescue: builder.mutation({
      query: (rescueId) => ({
        method: "DELETE",
        url: `/api/rescue/${rescueId}/`,
      }),
      invalidatesTags: (result, error, rescueId) => [
        { type: "Rescue", id: rescueId },
      ],
    }),
  };
}
