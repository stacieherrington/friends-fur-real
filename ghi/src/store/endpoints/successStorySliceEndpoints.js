export function successStoryEndpoints(builder) {
  return {
    addSuccessStory: builder.mutation({
      query: (form) => {
        const formData = new FormData(form);
        const entries = Array.from(formData.entries());
        const data = entries.reduce((app, [key, value]) => {
          app[key] = Number.parseInt(value) || value;
          return app;
        }, {});
        return {
          method: "POST",
          url: "/api/pets{id}/story/",
          credentials: "include",
          body: data,
        };
      },
      invalidateTags: [{ type: "SuccessStory", id: "LIST" }],
    }),
    listSuccessStory: builder.query({
      query: () => `/api/stories/`,
      providesTags: ["SuccessStory"],
    }),
    getSuccessStory: builder.query({
      query: (successStoryId) => `/api/pets/{id}/story${successStoryId}/`,
      providesTags: (result, error, successStoryId) => [
        { type: "SuccessStory", id: successStoryId },
      ],
    }),
    listRescueStories: builder.query({
      query: () => `/api/rescues/{rescue_id}/stories/`,
      providesTags: ["SuccessStory"],
    }),
    threeRandomStories: builder.query({
      query: () => `/api/stories/random/`,
      providesTags: ["SuccessStory"],
    }),
    patchSuccessStory: builder.mutation({
      query: (successStoryId) => ({
        method: "PATCH",
        url: `/api/stories/${successStoryId}/`,
      }),
      invalidatesTags: (result, error, successStoryId) => [
        { type: "SuccessStory", id: successStoryId },
      ],
    }),
    deleteSuccessStory: builder.mutation({
      query: (successStoryId) => ({
        method: "DELETE",
        url: `/api/stories/${successStoryId}/`,
      }),
      invalidatesTags: (result, error, successStoryId) => [
        { type: "SuccessStory", id: successStoryId },
      ],
    }),
  };
}
