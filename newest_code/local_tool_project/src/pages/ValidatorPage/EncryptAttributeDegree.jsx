/**
 * Author: JIN XIAO
 * Email: xiaojin971212@gmail.com
 */
import React from "react";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Upload from '../../components/Upload';

export default function DegreeNode(props) {
  const {
    theme,
    classes,
    degree,
    degreeDescription,
    handleChange,
    handleFileUpload,
    proofOfDegreeOriginalValue,
    degreeRandomValue,
    degreeDescriptionRandomValue,
    proofOfDegreeRandomValue,
    canEdit
  } = props;
  return (
    <React.Fragment>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="validator-degree">Degree</InputLabel>
        <Input
          value={degree}
          onChange={handleChange}
          inputProps={{
            name: "degree",
            id: "validator-degree",
            placeholder: "Pleace Input Degree"
          }}
          disabled={canEdit}
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="validator-degree">
          Random Value of Degree
        </InputLabel>
        <Input
          value={degreeRandomValue}
          onChange={handleChange}
          inputProps={{
            name: "degreeRandomValue",
            id: "validator-degree-random",
            placeholder: "Pleace Input Random Value of Degree"
          }}
          disabled={canEdit}

        />
      </FormControl>

      <FormControl className={classes.formControl}>
        {/* <InputLabel htmlFor="validator-degree">Degree Description</InputLabel> */}
        <TextField
          label="Degree Description"
          value={degreeDescription}
          onChange={handleChange}
          name="degreeDescription"
          placeholder="Pleace Input Degree Description"
          multiline
          rows="6"
          rowsMax="6"
          disabled={canEdit}

        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="validator-degree">
          Random Value of Degree Description
        </InputLabel>
        <Input
          value={degreeDescriptionRandomValue}
          onChange={handleChange}
          inputProps={{
            name: "degreeDescriptionRandomValue",
            id: "validator-degree-description-random",
            placeholder: "Pleace Input Random Value of Degree Description"
          }}
          disabled={canEdit}

        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <Typography
          variant="caption"
          style={{
            marginBottom: theme.spacing(1)
          }}
        >
          Proof of Degree:
        </Typography>
        {canEdit ? (
          <Chip
            label={
              proofOfDegreeOriginalValue.length &&
              proofOfDegreeOriginalValue[0].name
            }
            className={classes.chip}
            variant="outlined"
            color="default"
          />
        ) : (
          <Upload
            handleFileUpload={files => {
              handleFileUpload(
                "proofOfDegree",
                files.map(file => file.file)
              );
            }}
            files={proofOfDegreeOriginalValue}
          />
        )}
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="validator-proof-of-degree">
          Proof of Degree's Random Value
        </InputLabel>
        <Input
          value={proofOfDegreeRandomValue}
          onChange={handleChange}
          inputProps={{
            name: "proofOfDegreeRandomValue",
            id: "validator-proof-of-degree-random",
            placeholder: "Pleace Input Proof of Degree's Random Value"
          }}
          disabled={canEdit}
        />
      </FormControl>
    </React.Fragment>
  );
}
