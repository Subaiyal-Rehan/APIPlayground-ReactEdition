import { Badge } from "@mui/material";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";

export default function Table(props: any) {
  const { data, cols, loader } = props;
  return (
    <>
      <div className="my-4 container p-2 rounded bg-white">
        <div className="d-flex justify-content-end">
          <Badge badgeContent={data.length} max={99} color="secondary">
            <ViewHeadlineIcon sx={{ fontSize: "32px" }} color="action" />
          </Badge>
        </div>
        <table className="table table-hover rounded">
          <thead>
            <tr>
              {cols.map((a: any, i: any) => {
                return (
                  <th key={i} className="fs-4" scope="col">
                    {a.col}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {loader ? (
              <tr>
                <td colSpan={cols.length}>
                  <div className="d-flex justify-content-center py-2">
                    <div
                      className="spinner-border"
                      style={{
                        width: "6rem",
                        fontSize: "28px",
                        height: "6rem",
                      }}
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((dataItem: any, dataIndex: any) => {
                return (
                  <tr key={dataIndex}>
                    {cols.map((colsItem: any, colsIndex: any) => {
                      return (
                        <td
                          key={colsIndex}
                          scope={colsIndex == 0 ? "row" : undefined}
                          className="fs-5"
                        >
                          {colsItem.DisplayField
                            ? colsItem.DisplayField(dataItem)
                            : dataItem[colsItem.key]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
