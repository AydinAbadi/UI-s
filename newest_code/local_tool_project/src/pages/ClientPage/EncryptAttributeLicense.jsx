/**
 * Author: JIN XIAO
 * Email: xiaojin971212@gmail.com
 */
import "date-fns";
import React from "react";
import Input from "@material-ui/core/Input";
import Upload from '../../components/Upload';
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

export default function LicenseNode(props) {
  const {
    theme,
    classes,
    license,
    licenseDescription,
    licenseExpireDate,
    handleChange,
    handleFileUpload,
    handleDateChange,
    proofOfLicenseOriginalValue
  } = props;
  return (
    <React.Fragment>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="client-license">License</InputLabel>
        <Input
          value={license}
          onChange={handleChange}
          inputProps={{
            name: "license",
            id: "client-license",
            placeholder: "Pleace Input License"
          }}
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="none"
            id="license-expire-date"
            label="License Expire Date"
            format="MM/dd/yyyy"
            value={licenseExpireDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
      </FormControl>

      <FormControl className={classes.formControl}>
        <TextField
          label="License Description"
          value={licenseDescription}
          onChange={handleChange}
          name="licenseDescription"
          placeholder="Pleace Input License Description"
          multiline
          //   variant="outlined"
          rows="6"
          rowsMax="6"
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <Typography
          variant="caption"
          style={{
            marginBottom: theme.spacing(1)
          }}
        >
          Upload Proof of License:
        </Typography>
        <Upload 
          handleFileUpload={files => {
            handleFileUpload(
              "proofOfLicense",
              files.map(file => file.file)
            );
          }}
          files={proofOfLicenseOriginalValue}
        />
      </FormControl>
    </React.Fragment>
  );
}
