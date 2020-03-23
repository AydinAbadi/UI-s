/**
 * Author: JIN XIAO
 * Email: xiaojin971212@gmail.com
 */
import React from "react";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from "@material-ui/core/Chip";
import Upload from '../../components/Upload';


export default function AgeNode(props) {
  const {
    theme,
    classes,
    age,
    handleChange,
    handleFileUpload,
    proofOfAgeOriginalValue,
    ageRandomValue,
    proofOfAgeRandomValue,
    canEdit
  } = props;
  return (
    <React.Fragment>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="validator-age">Age</InputLabel>
        <Input
          value={age}
          onChange={handleChange}
          inputProps={{
            name: "age",
            id: "validator-age",
            placeholder: "Pleace Input Age, Range from 18 to 100"
          }}
          disabled={canEdit}
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="validator-age">Random Value of Age</InputLabel>
        <Input
          value={ageRandomValue}
          onChange={handleChange}
          inputProps={{
            name: "ageRandomValue",
            id: "validator-age-random",
            placeholder: "Pleace Input Random Value of Age"
          }}
          disabled={canEdit}
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <Typography
          variant="caption"
          style={{
            marginBottom: theme.spacing(1),
            marginTop: theme.spacing(2)
          }}
        >
          Upload Proof of Age:
        </Typography>

        {canEdit ? (
          <Chip
            label={proofOfAgeOriginalValue.length && proofOfAgeOriginalValue[0].name}
            className={classes.chip}
            variant="outlined"
            color="default"
          />
        ) : <Upload 
        handleFileUpload={files => {
          handleFileUpload(
            "proofOfAge",
            files.map(file => file.file)
          );
        }}
        files={proofOfAgeOriginalValue}
      />}
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="validator-age">
          Proof of Age's Random Value
        </InputLabel>
        <Input
          value={proofOfAgeRandomValue}
          onChange={handleChange}
          inputProps={{
            name: "proofOfAgeRandomValue",
            id: "validator-proof-of-age-random",
            placeholder: "Pleace Input Random Value of Proof of Age"
          }}
          disabled={canEdit}
        />
      </FormControl>
    </React.Fragment>
  );
}
