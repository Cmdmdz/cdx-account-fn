import { Card, CardContent, Typography, CardActions, Button, Box, InputLabel, MenuItem, FormControl, Select, IconButton } from "@mui/material";
import { FormikProps, Form, Field, Formik, FieldProps, FieldArray } from "formik";
import { TextField } from "formik-material-ui";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useMatch, useNavigate } from "react-router-dom";
import * as contactAction from "../../../actions/contact.action";



const ContactPage: React.FC<any> = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const showForm = ({ values, setFieldValue, isSubmitting }: FormikProps<any>) => {

    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h5">
              Contact admin
            </Typography>
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="title"
              label="Title"
            />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              multiline
              rows={4}
              component={TextField}
              name="description"
              label="Description"
            />
          </CardContent>
          <CardActions>
            <Button
              disabled={isSubmitting}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginRight: 1 }}
            >
              Confirm
            </Button>
            <Button component={Link} to="/stock" variant="outlined" fullWidth>
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Form>

    );
  };

  const initialValues: any = { title: "", description: "" };

  return (
    <Box>
      <Formik
        validate={(values) => {
          let errors: any = {};
          return errors;
        }}
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(contactAction.feedback(values, navigate));
          setSubmitting(false);
        }}
      >
        {(props: any) => showForm(props)}
      </Formik>
    </Box>
  );
};

export default ContactPage;
