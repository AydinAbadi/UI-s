/**
 * Author: JIN XIAO
 * Email: xiaojin971212@gmail.com
 */
import React from "react";
import FormControl from "@material-ui/core/FormControl";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

export default function AgeNode(props) {
  const { classes, handleChange, recieverEmail, senderEmail } = props;

  return (
    <React.Fragment>
      <ValidatorForm>
        <FormControl className={classes.formControl}>
          <TextValidator
            label="Your Email Address"
            onChange={handleChange}
            name="senderEmail"
            value={senderEmail}
            validators={["required", "isEmail"]}
            errorMessages={["This field is required", "Email is not valid"]}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextValidator
            label="Reciever's Email Address"
            onChange={handleChange}
            name="recieverEmail"
            value={recieverEmail}
            validators={["required", "isEmail"]}
            errorMessages={["This field is required", "email is not valid"]}
          />
        </FormControl>
      </ValidatorForm>
    </React.Fragment>
  );
}
