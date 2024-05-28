import { Box, Button, Fade, Tooltip } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Table from "../Components/Table/Table";
import GetAppIcon from "@mui/icons-material/GetApp";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";

export default function ApiHandling() {
  const [userData, setUserData] = useState<any>([]);
  const [loader, setLoader] = useState(false);
  const [delLoader, setDelLoader] = useState<number | null>(null);
  const fetchData = () => {
    setLoader(true);
    axios
      .get("https://jsonplaceholder.org/users")
      .then((response) => {
        setUserData([...response.data]);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const handleDelete = (obj: any) => {
    setDelLoader(obj.id);
    axios
      .delete(`https://jsonplaceholder.org/users/${obj.id}`)
      .then((res) => {
        setDelLoader(null);
        setUserData(userData.filter((user: any) => user.id !== obj.id));
        console.log(userData);
      })
      .catch((err) => {
        setDelLoader(null);
      });
  };

  return (
    <>
      <Box className="text-center mt-2">
        <h1 className="display-4 fw-bold mb-4 text-decoration-underline">API Playground</h1>
        <Button
          sx={{ margin: 1, textTransform: "capitalize" }}
          className="fs-5"
          onClick={fetchData}
          variant="contained"
          disabled={loader}
          color="secondary"
        >
          {loader ? (
            <span>
              <CircularProgress size={24} /> <span>Get Data</span>
            </span>
          ) : (
            <span>
              <GetAppIcon /> Get Data
            </span>
          )}
        </Button>

        <Tooltip TransitionComponent={Fade} title="Currently Disabled" arrow>
          <span>
            <Button
              disabled={true}
              className="fs-5"
              sx={{ margin: 1, textTransform: "capitalize" }}
              variant="contained"
              startIcon={<BorderColorIcon />}
              color="secondary"
            >
              <span>Post Data</span>
            </Button>
          </span>
        </Tooltip>

        <Tooltip TransitionComponent={Fade} title="Currently Disabled" arrow>
          <span>
            <Button
              disabled={true}
              className="fs-5"
              sx={{ margin: 1, textTransform: "capitalize" }}
              variant="contained"
              startIcon={<BorderColorIcon />}
              color="secondary"
            >
              <span>Put Data</span>
            </Button>
          </span>
        </Tooltip>

        <Tooltip TransitionComponent={Fade} title="Currently Disabled" arrow>
          <span>
            <Button
              disabled={true}
              className="fs-5"
              sx={{ margin: 1, textTransform: "capitalize" }}
              variant="contained"
              startIcon={<DeleteIcon />}
              color="secondary"
            >
              <span>Delete Data</span>
            </Button>
          </span>
        </Tooltip>
      </Box>
      <Table
        loader={loader}
        cols={[
          {
            key: "id",
            col: "Id",
          },
          {
            key: "firstname",
            col: "First Name",
          },
          {
            key: "lastname",
            col: "Last Name",
          },
          {
            key: "email",
            col: "Email",
          },
          {
            key: "birthDate",
            col: "Birth Date",
          },
          {
            key: "",
            col: "Delete",
            DisplayField: (row: any) => (
              <Tooltip TransitionComponent={Fade} placement="right" title="Delete" arrow>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(row)}
                >
                  {delLoader == row.id ? (
                    <CircularProgress color="inherit" size={24} />
                  ) : (
                    <DeleteIcon className="fs-4" />
                  )}
                </Button>
              </Tooltip>
            ),
          },
        ]}
        data={userData}
      />
    </>
  );
}
