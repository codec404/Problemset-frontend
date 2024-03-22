import React, { useEffect, useState } from "react";
import AdminNavBar from "../components/AdminNavBar";
import HomeNavBar from "../components/HomeNavBar";
import "../styles/ProblemPage.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProblemPage = () => {
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
  return localStorage.getItem("role") ? (
    <AdminNavBar>
      <div className="problemContainer">
        <div className="problem-title">
          <span>{problem.problemName}</span>
        </div>
        <div className="problem-Statement">
          <span>{problem.problemStatement}</span>
        </div>
        <div className="input-Format">
          <div className="inp-format-heading">
            <span>Input Format</span>
          </div>
          <div className="inp-format-body">
            <span>{problem.inputFormat}</span>
          </div>
        </div>
        <div className="output-Format">
          <div className="op-format-heading">
            <span>Output Format</span>
          </div>
          <div className="op-format-body">
            <span>{problem.outputFormat}</span>
          </div>
        </div>
        <div className="problem-constraints">
          <div className="constraint-heading">
            <span>Constraints</span>
          </div>
          <div className="constraint-body">
            <span>{problem.constraints}</span>
          </div>
        </div>
        <div className="sample-testcase">
          <div className="testCase-heading">
            <span>Sample Test Case</span>
          </div>
          <div className="testCase-body">
            <span>
              {problem?.sampleTestCase?.split("<br/>").map((items, index) => (
                <span key={index}>
                  {items}
                  <br />
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </AdminNavBar>
  ) : (
    <HomeNavBar></HomeNavBar>
  );
};

export default ProblemPage;
