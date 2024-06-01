import { Box } from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../../hooks";
import { User } from "../../types";
import Cards from "./usersTab/Cards";
import EditUserComponent from "./usersTab/EditUserComponent";
import UsersTable from "./usersTab/UsersTable";

const Users = () => {
  const [numOfClients, setNumOfClients] = useState(0);
  const [numOfArtisans, setNumOfArtisans] = useState(0);
  const [numOfJoinedToday, setNumOfJoinedToday] = useState(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [screenToShow, setScreenToShow] = useState<
    "table" | "editing" | "creating"
  >("table");
  const { data: currentUser } = useAppSelector((state) => state.auth);
  return (
    <Box
      sx={{
        margin: "1em",
        display: "flex",
        flexDirection: "column",
        gap: "2em",
      }}
    >
      {screenToShow === "table" ? (
        <>
          <Cards
            numOfClients={numOfClients}
            numOfArtisans={numOfArtisans}
            numOfJoinedToday={numOfJoinedToday}
          />
          <UsersTable
            setScreenToShow={setScreenToShow}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            setNumOfClients={setNumOfClients}
            setNumOfArtisans={setNumOfArtisans}
            setNumOfJoinedToday={setNumOfJoinedToday}
          />
        </>
      ) : (
        selectedUser &&
        currentUser && (
          <EditUserComponent
            selectedUser={selectedUser}
            setScreenToShow={setScreenToShow}
            currentUser={currentUser}
          />
        )
      )}
    </Box>
  );
};

export default Users;
