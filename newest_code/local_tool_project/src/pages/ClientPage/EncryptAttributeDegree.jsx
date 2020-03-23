/**
 * Author: JIN XIAO
 * Email: xiaojin971212@gmail.com
 */
import React from "react";
import Input from "@material-ui/core/Input";
import Upload from '../../components/Upload';
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from '@material-ui/core/TextField';

export default function DegreeNode(props) {
  const { theme, classes, degree, degreeDescription, handleChange, handleFileUpload, proofOfDegreeOriginalValue } = props;
  return (
    <React.Fragment>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="client-age">Degree</InputLabel>
        <Input
          value={degree}
          onChange={handleChange}
          inputProps={{
            name: "degree",
            id: "client-degree",
            placeholder: "Pleace Input Degree",
          }}
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        {/* <InputLabel htmlFor="client-age">Degree Description</InputLabel> */}
        <TextField
          label="Degree Description"
          value={degreeDescription}
          onChange={handleChange}
          name = "degreeDescription"
          placeholder="Pleace Input Degree Description"
          multiline
          rows="6"
          rowsMax="6"
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <Typography
          variant="caption"
          style={{
            marginBottom: theme.spacing(1),
          }}
        >
          Upload Proof of Degree:
        </Typography>
        <Upload 
          handleFileUpload={files => {
            handleFileUpload(
              "proofOfDegree",
              files.map(file => file.file)
            );
          }}
          files={proofOfDegreeOriginalValue}
        />
      </FormControl>
    </React.Fragment>
  );
}
