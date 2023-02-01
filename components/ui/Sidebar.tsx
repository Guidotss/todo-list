import { useContext } from "react";
import { InboxOutlined, MailOutlined } from "@mui/icons-material";
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { UIContext } from "../../context/ui";

const menuItems: string[] = ["Inbox", "Starred", "Send email", "Drafts"];

export const Sidebar = () => {

  const { isSidebarOpen,closeSideMenu } = useContext(UIContext);
  
  return (
    <Drawer anchor="left" open={ isSidebarOpen } onClose={ closeSideMenu }>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: "5px 10px" }}>
          <Typography variant="h4">Sidebar</Typography>
        </Box>
        <List>
          {menuItems.map((text: string, index: number) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 ? <InboxOutlined /> : <MailOutlined />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider/>
        <List>
          {menuItems.map((text: string, index: number) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 ? <InboxOutlined /> : <MailOutlined />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
