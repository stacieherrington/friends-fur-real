export function PetEndpoints(builder) {
  return {
    addPet: builder.mutation({
      query: (form) => {
        form.enctype = "multipart/form-data";
        const formData = new FormData(form);
        return {
          method: "POST",
          url: "/api/pets/",
          credentials: "include",
          body: formData,
        };
      },
      invalidateTags: [{ type: "Pet", id: "LIST" }],
    }),
    listPets: builder.query({
      query: () => ({
        url: `/api/pets/`,
        credentials: "include",
      }),
      transformResponse: (response, meta, arg) => response.pets,
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
    getThreePets: builder.query({
      query: () => `/api/random/pets/`,
      transformResponse: (response, meta, arg) => response.pets,
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
      providesTags: () => ["Pet"],
    }),
    putPet: builder.mutation({
      query: ({petId, form}) => {
        form.enctype = "multipart/form-data";
        const formData = new FormData(form);
        return {
          method: "PUT",
          url: `/api/pets/${petId}`,
          credentials: "include",
          body: formData,
        };
      },
      invalidatesTags: (pet) => [{ type: "Pet", id: pet.id }],
    }),
    deletePet: builder.mutation({
      query: (petId) => {
        return {
          method: "delete",
          url: `/api/pets/${petId}/`,
          credentials: "include",
        };
      },
      invalidatesTags: (pet) => [{ type: "Pet", id: pet.id }],
    }),
  };
}
