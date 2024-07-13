import { Avatar, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IdVerifiedIcon } from "../../../assets/Icons";
import { ChatRoom } from "../../../types";

const Chat = ({ chatRoom }: { chatRoom: ChatRoom }) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ padding: "1em" }}>
      <Box
        sx={{
          display: "flex",
          gap: "1em",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Avatar
          src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL}${
            chatRoom.artisan.picture
          }`}
          sx={{ height: "3em", width: "3em" }}
        />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
            <Typography
              sx={{ fontWeight: 600 }}
            >{`${chatRoom.artisan.first_name} ${chatRoom.artisan.last_name}`}</Typography>
            {chatRoom.artisan.id_status === "verified" && <IdVerifiedIcon />}
          </Box>
          <Typography sx={{ color: "#2C3E5080" }}>
            {chatRoom.sub_category.name_en}
          </Typography>
        </Box>
        {chatRoom.num_of_unread_messages !== 0 && (
          <Box
            sx={{
              height: "2em",
              width: "2em",
              borderRadius: "50%",
              backgroundColor: "#1ABC9C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              color: "#FFFFFF",
            }}
          >
            {chatRoom.num_of_unread_messages}
          </Box>
        )}
      </Box>
      {chatRoom.latest_message &&
      (chatRoom.latest_message.text !== null ||
        chatRoom.latest_message.image !== null) ? (
        <Box sx={{ margin: "1em 0 0 0" }}>
          <Typography>
            {chatRoom.latest_message.text
              ? chatRoom.latest_message.text
              : chatRoom.latest_message.image
              ? t("sent_image")
              : null}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
};

export default Chat;
