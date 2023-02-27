import MaterialTable from "material-table";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootReducers } from "../../../reducers";
import * as historyAction from "../../../actions/history.action"


const HistoryPaymentPage: React.FC<any> = () => {
  const dispatch = useDispatch<any>();
  const historyReducer = useSelector((state: RootReducers) => state.historyReducer);
  const navigate = useNavigate();

  let userId = localStorage.getItem("userId")

  React.useEffect(() => {
    if (userId) {
      dispatch(historyAction.loadAccount(userId));
    }
  }, []);


  const [columns, setColumns] = useState<any>([
    { title: "Payment ID", field: "paymentId", type: "numeric", editable: 'never' },
    {
      title: "Account Type",
      field: "accountType",
      type: "string" as const,
    },
    { title: "Amount to be paid", field: "amount", type: "numeric" as const },
    { title: "Payment method", field: "visa", type: "string" as const, editable: 'never' },

    { title: "Amount paid", field: "amountPaid", type: "numeric" as const, editable: 'never' },
    {
      title: "Status",
      field: "isPayment",
      type: "string",
    },
    { title: "Update date", field: "updateDate", type: "string" as const, editable: 'never' },



  ]);

  return (
    <MaterialTable
      title="History Payment"
      columns={columns}
      data={historyReducer.result}
    />
  );
};

export default HistoryPaymentPage;
