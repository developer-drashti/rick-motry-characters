import { useQuery } from "@tanstack/react-query";

const useCharacterDetailQuery = ({ id }: { id: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["character", id],
    queryFn: async () => {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      return res.json();
    },
  });

  return {
    data,
    isLoading,
  };
};

export default useCharacterDetailQuery;
