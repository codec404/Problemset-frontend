import React, { useEffect, useState } from "react";
import "../styles/AdminProblem.css";
import { Link, useNavigate } from "react-router-dom";
import { Select, Input } from "antd";
import axios from "axios";

const { Option } = Select;

const AdminProblem = () => {
  const [problems, setProblems] = useState([]);
  const fetchProblems = async () => {
    try {
      const res = await axios.get("/api/v1/admin/problems");
      if (res?.data?.success) {
        setProblems(res?.data?.problems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, [problems]);
  const [query, setQuery] = useState("");
  const [diff, setDiff] = useState("");
  const [tagQuery, setTagQuery] = useState("");
  const navigate = useNavigate();
  const handleAddProblem = () => {
    navigate("/add-new-problem");
  };
  const handleEdit = (id) => {
    navigate(`/edit/problem/${id}`);
  };
  const handleGetDifficulty = (value) => {
    setDiff(value);
  };
  return (
    <>
      <div className="home-main-container">
        <div className="home-main-container-title">
          <div className="main-title">
            <span>HUNT Problems</span>
          </div>
          <div className="search-bar">
            <div className="search-icon">
              <i className="fa-solid fa-magnifying-glass" />
            </div>
            <input
              type="text"
              name="searchitem"
              placeholder="Search"
              className="search-container"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <div className="search-button">
              <button type="submit">
                <i className="fa-solid fa-arrow-right" />
              </button>
            </div>
          </div>
        </div>
        <div className="home-main-container-body">
          <div className="filtertags-container">
            <div className="filter-title">Filter</div>
            <div className="filterBody">
              <div className="filterTags filterOptions">
                <label htmlFor="filterTags">Tags</label>
                <Input
                  onChange={(e) => {
                    setTagQuery(e.target.value);
                  }}
                />
              </div>
              <div className="filterOptions filterDifficulty">
                <label htmlFor="filterDifficulty">Difficulty</label>
                <Select
                  className="filter-difficulty-options"
                  value={diff}
                  onChange={handleGetDifficulty}
                >
                  <Option value={""}>-</Option>
                  <Option value="easy">Easy</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="hard">Hard</Option>
                </Select>
              </div>
            </div>
          </div>
          <div className="add-new-problem">
            <button className="add-new-btn" onClick={handleAddProblem}>
              <span>+</span>Add Problem
            </button>
          </div>
          <div className="problem-header">
            <div className="edit"></div>
            <div className="problemTitle">Title</div>
            <div className="problemTags">Tags</div>
            <div className="problemDifficulty">Difficulty</div>
          </div>
          {problems
            .filter((problem) =>
              problem.problemName.toLowerCase().includes(query.toLowerCase())
            )
            .filter((problem) => (diff ? problem.difficulty === diff : problem))
            .filter((problem) =>
              problem.problemTags.some((problemTag) =>
                problemTag.toLowerCase().includes(tagQuery.toLowerCase())
              )
            )
            .map((item, index) => (
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
        </div>
      </div>
    </>
  );
};

export default AdminProblem;
