import * as React from "react";
import MaterialTable from "material-table";
import * as contactAction from "../../../actions/contact.action";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import { useState } from "react";


const FeedbackPage: React.FC<any> = () => {

  const dispatch = useDispatch<any>();
  const contactReducer = useSelector((state: RootReducers) => state.contactReducer);
  const navigate = useNavigate();

  let userId = localStorage.getItem("userId")

  React.useEffect(() => {
    if (userId) {
      dispatch(contactAction.loadContact());
    }
  }, []);

  const handleRowDelete = (oldData: any, resolve: any) => {
    dispatch(contactAction.deleteAccount(oldData.contactId));
    resolve();
  };

  const handleEmailClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, rowData: any) => {
    event.preventDefault();
    const email = rowData.email;
    const subject = "My Subject";
    const body = "My email body.";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const [columns, setColumns] = useState<any>([
    { title: "Contact Id", field: "contactId", type: "numeric" as const, editable: 'never' },
    { title: "Title", field: "title", type: "string" as const },
    { title: "Username", field: "username", type: "string" as const },
    {
      title: "Email",
      field: "email",
      type: "string",
      render: (rowData: any) => (
        <a href={`mailto:${rowData.email}`} onClick={(e) => handleEmailClick(e, rowData)}>{rowData.email}</a>
      )
    },
    { title: "Desdcription", field: "description", type: "numeric" as const },
    { title: "Contact Date", field: "createDate", type: "string" as const, editable: 'never' },

  ]);

  return (
    <MaterialTable
      title="Account"
      columns={columns}
      data={contactReducer.result}
      editable={{
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            handleRowDelete(oldData, resolve);
          }),
      
      }}
    />
  );
};

export default FeedbackPage;
