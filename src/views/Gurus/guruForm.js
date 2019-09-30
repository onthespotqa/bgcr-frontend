/* eslint-disable */
import React, {Component} from 'react';

import ReactDOM from 'react-dom';
import {withRouter} from 'react-router';
import shadeCategories from "../../utils/shadeCategories";
import * as Yup from 'yup';

import { Form, Field } from 'react-final-form';
import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  CssBaseline,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';

const guru = {
  blog: '',
  undertone: [],
  skin: '',
  group: ''
}

const onSubmit = async values => {
  fetch(`${process.env.REACT_APP_API_URL}/api/v1/gurus`,{
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(response => {
    response.json().then(data =>{
      console.log("Successful" + data);
      this.props.history.push(
        `/gurus/${data.id}`
      );
    })
  })
}

const validate = values => {

}

const undertoneOptions = ['Yellow', 'Olive', 'Pink', 'Red', 'Neutral', 'Golden']
const skinTypeOptions = ['Dry', 'Oily', 'Combination/Dry', 'Combination/Oily', 'Normal/Dry', 'Normal']
const shadeOptions = ['Fair', 'Light', 'Medium', 'Tan', 'Deep', 'Dark']

class GuruForm extends Component {
  render() {
    return (
      <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
        <Form
          onSubmit={onSubmit}
          initialValues={guru}
          validate={validate}
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Paper style={{ padding: 16 }}>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      required
                      name="blog"
                      component={TextField}
                      type="text"
                      label="Guru Name"
                    />
                  </Grid>
                  <Grid item>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Skin Type</FormLabel>
                      <FormGroup row>
                        <FormControlLabel
                          label="Dry"
                          control={
                            <Field
                              name="skin"
                              component={Radio}
                              type="checkbox"
                              value="dry"
                            />
                          }
                        />
                        <FormControlLabel
                          label="Oily"
                          control={
                            <Field
                              name="skin"
                              component={Radio}
                              type="checkbox"
                              value="oily"
                            />
                          }
                        />
                        <FormControlLabel
                          label="Combination/Dry"
                          control={
                            <Field
                              name="skin"
                              component={Radio}
                              type="checkbox"
                              value="combo_dry"
                            />
                          }
                        />
                        <FormControlLabel
                          label="Combination/Oly"
                          control={
                            <Field
                              name="skin"
                              component={Radio}
                              type="checkbox"
                              value="combo_oily"
                            />
                          }
                        />
                        <FormControlLabel
                          label="Normal/Dry"
                          control={
                            <Field
                              name="skin"
                              component={Radio}
                              type="checkbox"
                              value="normal_dry"
                            />
                          }
                        />
                        <FormControlLabel
                          label="Normal"
                          control={
                            <Field
                              name="skin"
                              component={Radio}
                              type="checkbox"
                              value="normal"
                            />
                          }
                        />
                      </FormGroup>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Undertone</FormLabel>
                      <FormGroup row>
                        <FormControlLabel
                          label="Yellow"
                          control={
                            <Field
                              name="undertone"
                              component={Checkbox}
                              type="checkbox"
                              value="yellow"
                            />
                          }
                        />
                        <FormControlLabel
                          label="Olive"
                          control={
                            <Field
                              name="undertone"
                              component={Checkbox}
                              type="checkbox"
                              value="olive"
                            />
                          }
                        />
                        <FormControlLabel
                          label="Pink"
                          control={
                            <Field
                              name="undertone"
                              component={Checkbox}
                              type="checkbox"
                              value="pink"
                            />
                          }
                        />
                        <FormControlLabel
                          label="Red"
                          control={
                            <Field
                              name="undertone"
                              component={Checkbox}
                              type="checkbox"
                              value="red"
                            />
                          }
                        />
                        <FormControlLabel
                          label="Neutral"
                          control={
                            <Field
                              name="undertone"
                              component={Checkbox}
                              type="checkbox"
                              value="neutral"
                            />
                          }
                        />
                        <FormControlLabel
                          label="Golden"
                          control={
                            <Field
                              name="undertone"
                              component={Checkbox}
                              type="checkbox"
                              value="golden"
                            />
                          }
                        />
                      </FormGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormLabel htmlFor="group">Shade Category</FormLabel>
                    <Field
                      name="group"
                      component={Select}
                      placeholder={'Select Shade Group'}
                      format={value => Array.isArray(value) ? value : []} // eslint-disable-line
                    >
                      {shadeCategories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      type="button"
                      variant="contained"
                      onClick={reset}
                      disabled={submitting || pristine}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={submitting}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
          )}
        />
      </div>
    );
  }
}

export default GuruForm;