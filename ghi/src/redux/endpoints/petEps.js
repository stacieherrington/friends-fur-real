export function PetEndpoints(builder) {
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
          url: "/api/pets",
          credentials: "include",
          body: data,
        };
      },
      invalidateTags: [{ type: "Pet", id: "LIST" }],
    }),
    listPets: builder.query({
      query: () => `/api/pets/`,
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
      providesTags: (pet) => [{ type: "Pet", id: pet.id }],
    }),
    putPet: builder.mutation({
      query: ({petId, data}) => (console.log(petId, data) || {
        method: "put",
        url: `/api/pets/${petId}/`,
        body: data,
        credentials: "include",
      }),
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
