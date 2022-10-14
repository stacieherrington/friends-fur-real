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
          url: `/api/pets{id}/story/`,
          credentials: "include",
          body: data,
        };
      },
      invalidateTags: [{ type: "SuccessStory", id: "LIST" }],
    }),
    listSuccessStory: builder.query({
      query: () => `/api/stories/`,
      providesTags: (data) => {
        const tags = [{ type: "SuccessStory", id: "LIST" }];
        if (!data || !data.stories) return tags;
        const { stories } = data;
        if (stories) {
          tags.concat(...stories.map(({ id }) => ({ type: "SuccessStory", id })));
        }
        return tags;
      },
    }),
    getSuccessStory: builder.query({
      query: (petId) => `/api/pets/${petId}/story${petId}/`,
      providesTags: (result, error, petId) => [
        { type: "SuccessStory", id: petId },
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
