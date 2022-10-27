export function SuccessStoryEndpoints(builder) {
  return {
    addSuccessStory: builder.mutation({
      query: ({ applicationId, form }) => {
        form.enctype = "multipart/form-data";
        const formData = new FormData(form);
        return {
          method: "POST",
          url: `/api/applications/${applicationId}/story/`,
          credentials: "include",
          body: formData,
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
          tags.concat(
            ...stories.map(({ id }) => ({ type: "SuccessStory", id }))
          );
        }
        return tags;
      },
    }),
    getSuccessStory: builder.query({
      query: (petId) => `/api/pets/${petId}/`,
      providesTags: (result) => [{ type: "SuccessStory", id: result.story_id }],
    }),
    listRescueStories: builder.query({
      query: (rescueId) => `/api/rescues/${rescueId}/stories/`,
      providesTags: ["SuccessStory"],
    }),
    threeRandomStories: builder.query({
      query: () => ({
        method: "get",
        url: `/api/stories/random/`,
      }),
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
