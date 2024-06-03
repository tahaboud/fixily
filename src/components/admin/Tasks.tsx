import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { adminGetUsers } from "../../state/actions/adminAction";
import { User } from "../../types";
import EditRequest from "./tasksTab/EditRequest";
import RequestsTable from "./tasksTab/RequestsTable";

const Tasks = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const { data } = useAppSelector((state) => state.admin);
  const [requests, setRequests] = useState<Array<User>>([]);
  const [selectedRequest, setSelectedRequest] = useState<User | null>(null);
  useEffect(() => {
    if (token) {
      dispatch(adminGetUsers({ token }));
    }
  }, [token, dispatch]);
  useEffect(() => {
    if (data) {
      const localRequests: Array<User> = [];
      data.map((user) => {
        if (user.id_status === "review_asked") {
          localRequests.push(user);
        }
      });
      setRequests(localRequests);
    }
  }, [data]);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "1em",
        height: "100%",
        padding: "2em",
      }}
    >
      <RequestsTable
        requests={requests}
        selectedRequest={selectedRequest}
        setSelectedRequest={setSelectedRequest}
      />
      {selectedRequest && (
        <EditRequest
          request={selectedRequest}
          setSelectedRequest={setSelectedRequest}
        />
      )}
    </Box>
  );
};

export default Tasks;
