import * as React from "react";
import MaterialTable from "material-table";
import * as accountAction from "../../../actions/account.action";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import { useState } from "react";


const DashbordPage: React.FC<any> = () => {

  const dispatch = useDispatch<any>();
  const actionReducer = useSelector((state: RootReducers) => state.accountReducer);
  const navigate = useNavigate();

  let userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role") as string;


  React.useEffect(() => {
    if (userId) {
      dispatch(accountAction.loadAccount(userId));
    }
  }, []);

  const handleRowUpdate = (newData: any, resolve: any) => {
    dispatch(accountAction.updateAccount(newData, newData.accountId));
    resolve();
  };

  const handleRowDelete = (oldData: any, resolve: any) => {
    dispatch(accountAction.deleteAccount(oldData.accountId));
    resolve();
  };

  const handleRowAdd = (newData: any, resolve: any) => {
    dispatch(accountAction.createAccount(newData, navigate));

    if (userId) {
      dispatch(accountAction.loadAccount(userId));
    }
    resolve();
  };


  const [columns, setColumns] = useState<any>([
    { title: "ID", field: "accountId", type: "numeric" as const, editable: 'never' },
    {
      title: "Account Type",
      field: "accountType",
      type: "string" as const,
    },
    { title: "About", field: "about", type: "string" as const },
    { title: "Amount to be paid", field: "amount", type: "numeric" as const },
    { title: "Payment method", field: "visa", type: "string" as const, editable: 'never' },

    { title: "Amount paid", field: "amountPaid", type: "numeric" as const, editable: 'never' },
    {
      title: "Status",
      field: "isPayment",
      type: "string",
      lookup: {
        "Paid": "Paid",
        "Unpaid": "Unpaid"
      },
      editable: (rowData: any) => rowData.isPayment !== 'Unpaid',
    },
    { title: "Create date", field: "updateDate", type: "string" as const, editable: 'never' },

  ]);

  const [columnsV2, setColumnsV2] = useState<any>([
    { title: "ID", field: "accountId", type: "numeric" as const, editable: 'never' },
    { title: "Username", field: "username", type: "string", editable: 'never' },
    {
      title: "Account Type",
      field: "accountType",
      type: "string" as const,
    },
    { title: "About", field: "about", type: "string" as const },
    { title: "Amount to be paid", field: "amount", type: "numeric" as const },
    { title: "Payment method", field: "visa", type: "string" as const, editable: 'never' },

    { title: "Amount paid", field: "amountPaid", type: "numeric" as const, editable: 'never' },
    {
      title: "Status",
      field: "isPayment",
      type: "string",
      lookup: {
        "Paid": "Paid",
        "Unpaid": "Unpaid"
      },
      editable: (rowData: any) => rowData.isPayment !== 'Unpaid',
    },
    { title: "Create date", field: "updateDate", type: "string" as const, editable: 'never' },

  ]);

  const dataColums = (role: string) => {
    if (role === "admin") {
      return columnsV2;
    } else {
      return columns;
    }
  }


  const isEditable = () => {
    if (role === 'admin') {
      return {
        onRowUpdate: undefined,
        onRowAdd: undefined,
      }
    } else {
      return {
        onRowUpdate: (newData: any) =>
          new Promise((resolve: any) => {
            handleRowUpdate(newData, resolve);
          }),
        onRowAdd: (newData: any) =>
          new Promise((resolve: any) => {
            handleRowAdd(newData, resolve);
          }),
      }
    }
  }

    return (
      <MaterialTable
        title="Account"
        columns={dataColums(role)}
        data={actionReducer.result}
        editable={{
          onRowDelete: (oldData: any) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve);
            }),
          ...isEditable(),
        }}
      />
    );
  };

  export default DashbordPage;
