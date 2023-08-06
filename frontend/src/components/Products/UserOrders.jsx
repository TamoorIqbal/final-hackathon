import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../utils/Loading";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from "@mui/material";
import { fetchOrderById } from "../../store/orderSlice.js";
import { MyContext } from "../../Context/AppContext";

const UserOrders = () => {
  const { user } = useContext(MyContext);
  console.log('user', user)
  const dispatch = useDispatch();
  const { userOrders, status, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (user) {
      dispatch(fetchOrderById(user?._id));
    }
  }, [dispatch]);

  if (status === "loading") {
    return <Loading isLoading={true} />;
  }

  if (status === "failed") {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userOrders?.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.totalAmount}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(order.updatedAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserOrders;
