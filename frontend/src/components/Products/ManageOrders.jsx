import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../../store/orderSlice.js'; // Update the path to your orderSlice
import Loading from '../../utils/Loading';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from '@mui/material';



const ManageOrders = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  if (status === 'loading') {
    return <Loading isLoading={true} />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Manage Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>User Email</TableCell> {/* Update this line */}
              <TableCell>Total Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.user.email}</TableCell> {/* Update this line */}
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

export default ManageOrders;

