/**
 * Author: JIN XIAO
 * Email: xiaojin971212@gmail.com
 */
import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Notification(props) {
  const { onClose, open, message, type } = props;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <React.Fragment>
          <Alert onClose={onClose} severity={type ? type : 'error'}>
            {message}
          </Alert>
        </React.Fragment>
      </Snackbar>
  );
}
