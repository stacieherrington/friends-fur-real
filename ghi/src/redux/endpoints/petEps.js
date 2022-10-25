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
          url: "/api/pets/",
          credentials: "include",
          body: data,
        };
      },
      invalidateTags: [{ type: "Pet", id: "LIST" }],
    }),
    listPets: builder.query({
      query: () => ({
        method: "get",
        url: `/api/pets/`,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }),
      providesTags: () => ["Pet"],
    }),
    getPet: builder.query({
      query: (petId) => `/api/pets/${petId}/`,
      providesTags: () => ["Pet"],
    }),
    putPet: builder.mutation({
      query: (petId, ...put) => ({
        method: "put",
        url: `/api/pets/${petId}/`,
        body: put,
      }),
      invalidatesTags: () => ["Pet"],
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
