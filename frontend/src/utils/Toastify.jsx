import { Alert, Snackbar } from "@mui/material";

export const Toastify = ({ alertState, setAlertState }) => {
  return (
    <Snackbar
   
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={alertState.open}
      autoHideDuration={3000}
      key={"top" + "center"}
      onClose={() => setAlertState({ ...alertState, open: false })}
    >
      <Alert
        onClose={() => setAlertState({ ...alertState, open: false })}
        severity={alertState.severity}
        // sx={{ width: "100%" }}
      >
        {alertState.message}
      </Alert>
    </Snackbar>
  );
};
