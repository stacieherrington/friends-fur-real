export function petEndpoints(builder) {
  return {
    addPet: builder.mutation({
      query: (form) => {
        const formData = new FormData(form);
        const entries = Array.from(formData.entries());
        const data = entries.reduce((pet, [key, value]) => {
          pet[key] = Number.parseInt(value) || value;
          return pet;
        }, {});
        return {
          method: "POST",
          url: "/api/pets/",
          credentials: "include",
          body: data,
        };
      },
      invalidateTags: [{ type: "Pet", id: "LIST" }],
    }),
    // listPets: builder.query({
    //   query: () => `/api/pets/`,
    //   providesTags: ["Pet"],
    // }),
    // listPets: builder.query({
    //   query: () => `/api/pets/`,
    //   providesTags: (data) =>
    //     data
    //       ? [
    //           ...data.map(({ id }) => ({ type: "Pet", id })),
    //           { type: "Pet", id: "LIST" },
    //         ]
    //       : [{ type: "Pet", id: "LIST" }],
    // }),
    listPets: builder.query({
      query: () => `/api/pets/`,
      providesTags: (data) => {
        const tags = [{ type: "Pet", id: "LIST" }];
        if (!data || !data.pets) return tags;
        const { pets } = data;
        if (pets) {
          tags.concat(...pets.map(({ id }) => ({ type: "Pet", id })));
        }
        return tags;
      },
    }),
    getPet: builder.query({
      query: (petId) => `/api/pets/${petId}/`,
      providesTags: (pet) => [{ type: "Pet", id: pet.id }],
    }),
    putPet: builder.mutation({
      query: (petId, ...put) => ({
        method: "put",
        url: `/api/pets/${petId}/`,
        body: put,
      }),
      // providesTags: (pet) => [{ type: "Pet", id: pet.id }],
      invalidatesTags: (pet) => [{ type: "Pet", id: pet.id }],
    }),
    deletePet: builder.mutation({
      query: (petId) => ({
        method: "delete",
        url: `/api/pets/${petId}/`,
      }),
      invalidatesTags: (pet) => [{ type: "Pet", id: pet.id }],
    }),
  };
}
