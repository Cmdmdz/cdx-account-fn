import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, FormikProps } from "formik";
import { Alert, Box, Button, Card, CardContent, Stack, SxProps, TextField, Theme, Typography } from "@mui/material";
import * as registerActions from "../../../actions/register.action";
import { useDispatch, useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import { User_regis } from "../../../types/user.type";


const RegisterPage: React.FC<any> = () => {
  const registerReducer = useSelector((state: RootReducers) => state.registerReducer);

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const classes: SxProps<Theme> | any = {
    root: { display: "flex", justifyContent: "center" },
    buttons: { marginTop: 2 },
  };

  const showFormV2 = ({ handleSubmit, handleChange, isSubmitting, values }: FormikProps<User_regis>) => {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          onChange={handleChange}
          value={values.username}
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="firstname"
          label="First Name"
          onChange={handleChange}
          value={values.firstname}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="lastname"
          label="Last Name"
          onChange={handleChange}
          value={values.lastname}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          onChange={handleChange}
          value={values.email}
          autoComplete="email"
        />


        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          onChange={handleChange}
          value={values.password}
          type="password"
        />
        <br />

        {registerReducer.isError && <Alert severity="error">Register failed</Alert>}

        <Stack direction="row" spacing={2} sx={classes.buttons}>
          <Button onClick={() => navigate("/login")} type="button" fullWidth variant="outlined">
            Cancel
          </Button>
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={registerReducer.isFetching}>
            Create
          </Button>
        </Stack>
      </form>
    );
  };

  const initialValues: User_regis = { username: "", password: "", firstname: "", lastname: "",email: "" };

  return (
    <>
      <Box sx={classes.root}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Register
            </Typography>
            <Formik
              onSubmit={async (values) => {
                dispatch(registerActions.register(values, navigate));
              }}
              initialValues={initialValues}
            >
              {(props) => showFormV2(props)}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
export default RegisterPage;
