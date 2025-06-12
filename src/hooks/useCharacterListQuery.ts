import { useQuery } from "@tanstack/react-query";

import useCharacterListState from "./useCharacterListState";

const useCharacterListQuery = () => {
  const { currentPage } = useCharacterListState();

  const fetchCharacters = async (page: number) => {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["characters", currentPage],
    queryFn: () => fetchCharacters(currentPage),
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};

export default useCharacterListQuery;
