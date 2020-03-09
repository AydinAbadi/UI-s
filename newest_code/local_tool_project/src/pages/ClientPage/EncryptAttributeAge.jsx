/**
 * Author: JIN XIAO
 * Email: xiaojin971212@gmail.com
 */
import React from "react";
import Input from "@material-ui/core/Input";
import { DropzoneArea } from "material-ui-dropzone";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

export default function AgeNode(props) {
  const { theme, classes, age, handleChange, handleFileUpload } = props;
  return (
    <React.Fragment>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="client-age">Age</InputLabel>
        <Input
          value={age}
          onChange={handleChange}
          inputProps={{
            name: "age",
            id: "client-age",
            placeholder: "Pleace Input Age"
          }}
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
          Proof of Age:
        </Typography>
        <DropzoneArea
          name="Proof of Age"
          onChange={(files) => { handleFileUpload("proofOfAge", files) }}
          dropzoneText="Drag and drop file here or click"
          dropzoneClass={classes.dropzone}
          useChipsForPreview
          showPreviewsInDropzone={false}
          showPreviews
          filesLimit={1}
        />
      </FormControl>
    </React.Fragment>
  );
}
