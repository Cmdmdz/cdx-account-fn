import { Card, CardContent, Typography, CardActions, Button, Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { FormikProps, Form, Field, Formik, FieldProps } from "formik";
import { TextField } from "formik-material-ui";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { RootReducers } from "../../../reducers";
import { CustomSelect } from "../../layouts/CustomUI/CustomSelect";
import * as accountAction from "../../../actions/account.action";



const PaymentPage: React.FC<any> = () => {
  const dispatch = useDispatch<any>();
  // const stockEditReducer = useSelector((state: RootReducers) => state.stockEditReducer);
  const actionReducer = useSelector((state: RootReducers) => state.accountReducer);
  const navigate = useNavigate();

  const options = [
    { label: "Visa", id: "Visa" },
    { label: "Credit", id: "Credit" },
    { label: "Transfer", id: "Transfer" },
    { label: "Cash", id: "Cash" },
  ];

  const showForm = ({ values, setFieldValue, isSubmitting }: FormikProps<any>) => {

    const styles = {
      width: `${400}px`,
      marginTop: 16,
    };

    const handlePaymentChange = (event: { target: { value: any; }; }) => {

      const { value } = event.target;
      const findOption = actionReducer.result.find((item) => item.accountId === value);
      setFieldValue("amount", findOption?.amount)

    };

    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h5">
              Payment
            </Typography>
            <Typography>Account Type</Typography>
            <Field name="account">
              {({ field }: FieldProps) => (
                <FormControl style={styles}>
                  <InputLabel>Account Type</InputLabel>
                  <Select
                    {...field}
                    value={field.value.accountId || ""}
                    defaultValue=""
                    onChange={(e) => {
                      const selectedOption = actionReducer.result.find(
                        (option) => option.accountId === e.target.value
                      );
                      field.onChange({
                        ...e,
                        target: { ...e.target, value: selectedOption },
                      });
                      handlePaymentChange(e)
                    }}
                  >
                    {actionReducer.result.map((option) => (
                      <MenuItem key={option.accountId} value={option.accountId}>
                        {option.accountType}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Field>

            {/* <br /> */}
            <Typography style={{ marginTop: 16 }}>Payment Method</Typography>
            <CustomSelect name="visa" options={options} width={400} />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="amount"
              type="number"
              label="amount be to paid"
            />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="amountPaid"
              type="number"
              label="amount pay"
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
              confirm
            </Button>
            <Button component={Link} to="/stock" variant="outlined" fullWidth>
              Cancl
            </Button>
          </CardActions>
        </Card>
      </Form>

    );
  };

  const initialValues: any = { account: "", visa: "", amount: 0, amountPaid: 0,accountId: undefined };

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
          let accountId = values.account.accountId;
          dispatch(accountAction.updatePayment(values,accountId,navigate));
          setSubmitting(false);
        }}
      >
        {(props: any) => showForm(props)}
      </Formik>
    </Box>
  );
};

export default PaymentPage;
