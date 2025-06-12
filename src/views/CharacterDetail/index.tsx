import { useParams } from "@tanstack/react-router";
import { Box, Button, Container, Typography, Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";

import Loading from "../../components/Loading";
import { useCharacterDetailQuery } from "../../hooks";

function CharacterDetail() {
  const { t } = useTranslation("local", { keyPrefix: "default" });
  const { id } = useParams({ from: "/character/$id" });
  const { data, isLoading } = useCharacterDetailQuery({ id });

  if (isLoading) return <Loading />;

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        minWidth: "100vh",
      }}
    >
      <Typography variant="h4">{data.name}</Typography>
      {DisplayDetail({ title: t("header.status"), value: data.status })}
      {DisplayDetail({ title: t("header.species"), value: data.species })}
      {DisplayDetail({ title: t("header.gender"), value: data.gender })}
      {DisplayDetail({ title: t("header.origin"), value: data.origin.name })}
      {data.image ? (
        <img src={data.image} alt={data.name} style={{ marginTop: 16 }} />
      ) : (
        <Skeleton variant="rectangular" width={300} height={300} sx={{ marginTop: 2 }} />
      )}
      <Box mt={2}>
        <Button variant="contained" onClick={() => history.back()}>
          {t("buttons.back")}
        </Button>
      </Box>
    </Container>
  );
}

const DisplayDetail = ({ title, value }: { title: string; value: string }) => {
  return (
    <Typography>
      {`${title}:`} {value}
    </Typography>
  );
};

export default CharacterDetail;
