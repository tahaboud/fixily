import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  adminGetPaymentReceipts,
  adminGetUsers,
} from "../../state/actions/adminAction";
import { PaymentReceipt } from "../../state/reducers/types";
import { User } from "../../types";
import CCPTransfer from "./tasksTab/CCPTransfer";
import EditRequest from "./tasksTab/EditRequest";
import RequestsTable from "./tasksTab/RequestsTable";
import UpdateReceipt from "./tasksTab/UpdateReceipt";

const Tasks = () => {
  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.auth);
  const { data, paymentReceipts } = useAppSelector((state) => state.admin);

  const [requests, setRequests] = useState<Array<User>>([]);
  const [selectedRequest, setSelectedRequest] = useState<User | null>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentReceipt | null>(
    null
  );

  useEffect(() => {
    if (token) {
      dispatch(adminGetUsers({ token }));
      dispatch(adminGetPaymentReceipts({ token }));
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
      {selectedReceipt ? (
        <UpdateReceipt
          selectedReceipt={selectedReceipt}
          setSelectedReceipt={setSelectedReceipt}
        />
      ) : (
        <RequestsTable
          requests={requests}
          selectedRequest={selectedRequest}
          setSelectedRequest={setSelectedRequest}
        />
      )}
      {selectedRequest ? (
        <EditRequest
          request={selectedRequest}
          setSelectedRequest={setSelectedRequest}
        />
      ) : (
        <CCPTransfer
          selectedReceipt={selectedReceipt}
          setSelectedReceipt={setSelectedReceipt}
          paymentReceipts={paymentReceipts}
        />
      )}
    </Box>
  );
};

export default Tasks;
