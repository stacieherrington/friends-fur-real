export function adoptionApplicationEndpoints(builder) {
  return {
    addAdoptionApplication: builder.mutation({
      query: (form) => {
        const formData = new FormData(form);
        const entries = Array.from(formData.entries());
        const data = entries.reduce((app, [key, value]) => {
          app[key] = Number.parseInt(value) || value;
          return app;
        }, {});
        return {
          method: "POST",
          url: "/api/adoption_applications/",
          credentials: "include",
          body: data,
        };
      },
      invalidateTags: [{ type: "AdoptionApplication", id: "LIST" }],
    }),
    listAdoptionApplications: builder.query({
      query: () => `/api/adoption_applications/`,
      providesTags: ["AdoptionApplication"],
    }),
    getAdoptionApplication: builder.query({
      query: (adoptionApplicationId) =>
        `/api/adoption_applications/${adoptionApplicationId}`,
      providesTags: (result, error, adoptionApplicationId) => [
        { type: "AdoptionApplication", id: adoptionApplicationId },
      ],
    }),
    patchAdoptionApplication: builder.mutation({
      query: (adoptionApplicationId) => ({
        method: "PATCH",
        url: `/api/adoption_applications/${adoptionApplicationId}`,
      }),
      invalidatesTags: (result, error, adoptionApplicationId) => [
        { type: "AdoptionApplication", id: adoptionApplicationId },
      ],
    }),
    deleteAdoptionApplication: builder.mutation({
      query: (adoptionApplicationId) => ({
        method: "DELETE",
        url: `/api/adoption_applications/${adoptionApplicationId}`,
      }),
      invalidatesTags: (result, error, adoptionApplicationId) => [
        { type: "AdoptionApplication", id: adoptionApplicationId },
      ],
    }),
  };
}
