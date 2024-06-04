import { useFetchData } from "../hooks/useFetchData";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ONE_HOUR = 60 * 60 * 1000; /* ms */
export const Home = () => {
  const { data } = useFetchData();

  const checkDateIsLessThanHour = (actualDate, estimateDate) => {
    return (
      new Date(estimateDate.getTime) - new Date(actualDate.getTime) <
      ONE_HOUR / 2
    );
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Flight number</TableCell>
              <TableCell align="right">updated at</TableCell>
              <TableCell align="right">latitude</TableCell>
              <TableCell align="right">longitude</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(data ?? []).map((row, index) => {
              const actualDate = row.departure.actual;
              const estimateDate = row.departure.estimated;
              return (
                <TableRow
                  style={{
                    color: checkDateIsLessThanHour(actualDate, estimateDate)
                      ? "red"
                      : "white",
                  }}
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.flight.number}
                  </TableCell>
                  <TableCell align="right">{`${new Date(
                    row.live.updated
                  )}`}</TableCell>
                  <TableCell align="right">{row.live.latitude}</TableCell>
                  <TableCell align="right">{row.live.longitude}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
