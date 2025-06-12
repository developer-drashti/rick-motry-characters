import { useNavigate } from "@tanstack/react-router";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Grid,
  Box,
  Paper,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  Pagination,
  TableContainer,
  Tooltip,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import Loading from "../../components/Loading";
import type { Character } from "../../types";
import { useCharacterListState, useCharacterListQuery } from "../../hooks";

function CharacterList() {
  const navigate = useNavigate();
  const { t } = useTranslation("local", { keyPrefix: "default" });
  const { currentPage, onRawClick, handlePageChange } = useCharacterListState();
  const { data, isLoading, isError, refetch } = useCharacterListQuery();

  const columns: ColumnDef<Character>[] = [
    {
      accessorKey: "name",
      header: t("header.name"),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "status",
      header: t("header.status"),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "species",
      header: t("header.species"),
      cell: (info) => info.getValue(),
    },
  ];

  const table = useReactTable({
    data: data?.results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <Typography color="error">{t("error.character_list_error")}</Typography>
    );

  return (
    <Grid
      container
      sx={{
        border: "1px solid",
        borderColor: "grey.400",
        borderRadius: 2,
        p: 2,
        m: 2,
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid width={"100%"} display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h4" gutterBottom>
          {t("title")}
        </Typography>
        <Tooltip title={t("tooltip.refresh")}>
          <Button
            variant="contained"
            onClick={() => {
              refetch();
              navigate({ to: "/characters/$page", params: { page: 1 } });
            }}
            sx={{ mb: 2 }}
          >
            {t("buttons.refresh")}
          </Button>
        </Tooltip>
      </Grid>
      <TableContainer component={Paper} sx={{ border: "1px solid #ccc" }}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{ borderRight: "1px solid #eee" }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.original.id}
                hover
                style={{ cursor: "pointer" }}
                onClick={() => onRawClick(row.original.id)}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    sx={{
                      borderRight:
                        index !== row.getVisibleCells().length - 1
                          ? "1px solid #eee"
                          : undefined,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={data.info.pages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Grid>
  );
}

export default CharacterList;
