import React from "react";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";

export default function Upload(props) {
  const { handleFileUpload, files } = props;
  return (
    <FilePond
      files={files}
      allowMultiple={false}
      maxFiles={1}
      onupdatefiles={handleFileUpload}
    ></FilePond>
  );
}
