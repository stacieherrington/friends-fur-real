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
          url: "/api/pets",
          credentials: "include",
          body: data,
        };
      },
      invalidateTags: [{ type: "Pet", id: "LIST" }],
    }),
    listPets: builder.query({
      query: () => `/api/pets/`,
      providesTags: ["Pet"],
    }),
    getPet: builder.query({
      query: (petId) => `/api/pets/${petId}/`,
      providesTags: (result, error, id) => [{ type: "Pet", id }],
    }),
    putPet: builder.mutation({
      query: (petId) => ({
        method: "PUT",
        url: `/api/pets/${petId}/`,
      }),
      invalidatesTags: (result, error, petId) => [{ type: "Pet", id: petId }],
    }),
    deletePet: builder.mutation({
      query: (petId) => ({
        method: "DELETE",
        url: `/api/pets/${petId}/`,
      }),
      invalidatesTags: (result, error, petId) => [{ type: "Pet", id: petId }],
    }),
  };
}
