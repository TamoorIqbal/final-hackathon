import React, { useContext } from "react";
import { Container, Box, Typography } from "@mui/material";
import { MyContext } from "../Context/AppContext.jsx";
import AllProducts from "./Products/AllProducts.jsx";
const Home = ({ showToast }) => {
  const { user } = useContext(MyContext);

  return (
    <>
      <Container>
        <Box py={5}>
          {/* {user ? <CreatePost showToast={showToast} /> : null} */}
          <AllProducts showToast={showToast} />
        </Box>
      </Container>
    </>
  );
};

export default Home;
