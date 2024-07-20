import { Box } from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../../hooks";
import { User } from "../../types";
import Cards from "./usersTab/Cards";
import CreateAdminComponent from "./usersTab/CreateAdminComponent";
import EditUserComponent from "./usersTab/EditUserComponent";
import UsersTable from "./usersTab/UsersTable";

const Users = ({
  setSelectedUserType,
  selectedUserType,
}: {
  selectedUserType: "clients" | "artisans" | "admins";
  setSelectedUserType: React.Dispatch<
    React.SetStateAction<"clients" | "artisans" | "admins">
  >;
}) => {
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
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        height: "100%",
      }}
    >
      <Cards
        numOfClients={numOfClients}
        numOfArtisans={numOfArtisans}
        numOfJoinedToday={numOfJoinedToday}
      />
      {screenToShow === "table" ? (
        <UsersTable
          setScreenToShow={setScreenToShow}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          setNumOfClients={setNumOfClients}
          setNumOfArtisans={setNumOfArtisans}
          setNumOfJoinedToday={setNumOfJoinedToday}
          setSelectedUserType={setSelectedUserType}
          selectedUserType={selectedUserType}
        />
      ) : screenToShow === "creating" ? (
        <CreateAdminComponent setScreenToShow={setScreenToShow} />
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
