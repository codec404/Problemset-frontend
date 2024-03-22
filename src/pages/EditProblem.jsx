import React, { useEffect, useState } from "react";
import AdminNavBar from "../components/AdminNavBar";
import AddnEdit from "../components/AddnEdit";
import { useParams } from "react-router-dom";
import axios from "axios"

const EditProblem = () => {
  const [problem, setProblem] = useState({});
  const { id } = useParams();
  const fetchProblem = async () => {
    try {
      const res = await axios.get(`/api/v1/admin/problem/${id}`);
      if (res?.data?.success) {
        setProblem(res?.data?.problem);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProblem();
  }, []);

  return (
    <AdminNavBar>
      <AddnEdit title={`Edit Problem`} problem={problem} />
    </AdminNavBar>
  );
};

export default EditProblem;
