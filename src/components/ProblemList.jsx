import React, { useContext } from "react";
import { ProblemContext } from "../context/ProblemContext";
import "../styles/Problem.css";
import { Link, useNavigate } from "react-router-dom";

const ProblemList = () => {
  const { problems } = useContext(ProblemContext);
  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/edit/problem/${id}`);
  };
  return localStorage.getItem("role") ? (
    <>
      <div className="problem-header">
        <div className="edit"></div>
        <div className="problemTitle">Title</div>
        <div className="problemTags">Tags</div>
        <div className="problemDifficulty">Difficulty</div>
      </div>
      {problems.map((item, index) => (
        <div
          className={`problem-container ${index & 1 ? "even" : ""}`}
          key={item._id}
        >
          <span className="editBtn">
            <button onClick={() => handleEdit(item._id)}>
              <i className="fa-solid fa-pen-to-square" />
            </button>
          </span>
          <span className="problem-name">
            <Link to={`/problem/${item._id}`}>{item.problemName}</Link>
          </span>
          <div className="problem-tags">
            {item.problemTags.map((tag) => (
              <span className="problem-tag" key={tag}>
                <div className="tags">
                  <span>{tag}</span>
                </div>
              </span>
            ))}{" "}
          </div>
          <span
            className={`problem-difficulty ${
              item.difficulty === "easy"
                ? "easy"
                : item.difficulty === "medium"
                ? "medium"
                : "hard"
            }`}
          >
            <span>
              {item.difficulty.charAt(0).toUpperCase() +
                item.difficulty.substring(1)}
            </span>
          </span>
        </div>
      ))}
    </>
  ) : (
    <>
      <div className="problem-header user-problem-header">
        <div className="edit mark"></div>
        <div className="problemTitle">Title</div>
        <div className="problemTags">Tags</div>
        <div className="problemDifficulty">Difficulty</div>
      </div>
      {problems.map((item, index) => (
        <div
          className={`problem-container user-problem-container ${
            index & 1 ? "even" : ""
          }`}
          key={item._id}
        >
          <span className="editBtn markBtn">
            {/* <span>{index + 1}</span> */}
          </span>
          <span className="problem-name">
            <Link to={`/problem/${item._id}`}>{item.problemName}</Link>
          </span>
          <div className="problem-tags">
            {item.problemTags.map((tag) => (
              <span className="problem-tag" key={tag}>
                <div className="tags">
                  <span>{tag}</span>
                </div>
              </span>
            ))}{" "}
          </div>
          <span
            className={`problem-difficulty ${
              item.difficulty === "easy"
                ? "easy"
                : item.difficulty === "medium"
                ? "medium"
                : "hard"
            }`}
          >
            <span>
              {item.difficulty.charAt(0).toUpperCase() +
                item.difficulty.substring(1)}
            </span>
          </span>
        </div>
      ))}
    </>
  );
};

export default ProblemList;
