import { useSelector } from "react-redux";
import { useGetRescueQuery } from "./api";
import { useGetPetQuery } from "./api/";

function ContainerExample() {
  const singleRescue = useSelector((state) => state.search);
  const singlePet = useSelector((state) => state.pet);

  const {
    data: rescueData,
    error: rescueError,
    isLoading: rescueIsLoading,
  } = useGetRescueQuery(singleRescue);
  const {
    data: petData,
    error: petError,
    isLoading: petIsLoading,
  } = useGetPetQuery(singlePet);

  if (rescueIsLoading) {
    return <div>Loading...</div>;
  }

  if ("message" in rescueData) {
    return <div>Hello</div>;
  }

  return (
    <div>
      {rescueData.rescues.map((rescue) => {
        return (
          <div>
            {rescue.id}
            {rescue.name}
          </div>
        );
      })}
    </div>
  );
}

export default ContainerExample;
