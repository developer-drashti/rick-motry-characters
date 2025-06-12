import { useNavigate, useParams } from "@tanstack/react-router";

const useCharacterListState = () => {
  const navigate = useNavigate();
  const params = useParams({ from: "/characters/$page" });
  const currentPage = Number(params.page);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (value < 1) return; // prevent going below page 1
    navigate({ to: "/characters/$page", params: { page: String(value) } });
  };

  const onRawClick = (id: number) => {
    navigate({ to: "/character/$id", params: { id } });
  };

  return {
    currentPage,
    onRawClick,
    handlePageChange,
  };
};

export default useCharacterListState;
