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
      providesTags: (data) => {
        const tags = [{ type: "AdoptionApplication", id: "LIST" }];
        if (!data || !data.adoptions) return tags;
        const { adoptionApplications } = data;
        if (adoptionApplications) {
          tags.concat(
            ...adoptionApplications.map(({ id }) => ({
              type: "AdoptionApplication",
              id,
            }))
          );
        }
        return tags;
      },
    }),
    getAdoptionApplication: builder.query({
      query: (adoptionApplicationId) =>
        `/api/adoption_applications/${adoptionApplicationId}`,
      providesTags: (adoptionApplication) => [
        { type: "AdoptionApplication", id: adoptionApplication.id },
      ],
    }),
    patchAdoptionApplication: builder.mutation({
      query: (adoptionApplicationId) => ({
        method: "PATCH",
        url: `/api/adoption_applications/${adoptionApplicationId}`,
      }),
      providesTags: (adoptionApplication) => [
        { type: "AdoptionApplication", id: adoptionApplication.id },
      ],
      invalidateTags: (adoptionApplication) => [
        { type: "AdoptionApplication", id: adoptionApplication.id },
      ],
    }),
    deleteAdoptionApplication: builder.mutation({
      query: (adoptionApplicationId) => ({
        method: "DELETE",
        url: `/api/adoption_applications/${adoptionApplicationId}`,
      }),
      invalidateTags: (adoptionApplication) => [
        { type: "AdoptionApplication", id: adoptionApplication.id },
      ],
    }),
  };
}
