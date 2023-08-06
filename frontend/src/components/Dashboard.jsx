import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../utils/Loading";
import { MyContext } from "../Context/AppContext";
import { Tabs, Tab, Typography, Box, Container } from "@mui/material";
import ManageOrders from "./Products/ManageOrders.jsx";
import CreateProduct from "./Products/CreateProduct";

const styles = {
  dashboard: {
    paddingTop: "20px",
    paddingBottom: "20px",
  },
  tabContent: {
    marginTop: "15px",
  },
};

const Dashboard = ({ showToast }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      {loading ? (
        <Loading isLoading={loading} />
      ) : (
        <Container maxWidth="lg" style={styles.dashboard}>
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab label="Create Product" />
            <Tab label="Manage Orders" />
          </Tabs>
          <div style={styles.tabContent}>
            <TabPanel value={activeTab} index={0}>
              <CreateProduct showToast={showToast} />
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
              <ManageOrders showToast={showToast} />
            </TabPanel>
          </div>
        </Container>
      )}
    </>
  );
};

// Helper component for handling tabs
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default Dashboard;
