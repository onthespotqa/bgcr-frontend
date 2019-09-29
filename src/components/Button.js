import React from "react";
import Button from '@material-ui/core/Button';
const FormButton = props => {
    return (
        <Button
            type={"button"}
            variant={props.variant}
            color={props.color}
            onClick={props.action}
        >
            {props.title}
        </Button>
    );
};

export default FormButton;
