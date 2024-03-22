import React from "react";
import AdminNavBar from "../components/AdminNavBar";
import AddnEdit from "../components/AddnEdit";

const AddNewProblem = () => {
  return (
    <AdminNavBar>
      <AddnEdit title={`Add New Problem`}/>
    </AdminNavBar>
  );
};

export default AddNewProblem;
