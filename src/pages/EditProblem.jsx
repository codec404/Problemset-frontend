import React, { useEffect, useRef, useState } from "react";
import AdminNavBar from "../components/AdminNavBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Input, Flex, Tag, theme, Tooltip, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const tagInputStyle = {
  width: 64,
  height: 22,
  marginInlineEnd: 8,
  verticalAlign: "top",
};

const EditProblem = () => {
  const navigate = useNavigate();
  const [problem, setProblem] = useState({});
  const [tags, setTags] = useState([]);
  const { id } = useParams();
  const fetchProblem = async () => {
    try {
      const res = await axios.get(`/api/v1/admin/problem/${id}`);
      if (res?.data?.success) {
        setProblem(res?.data?.problem);
        setTags(res?.data?.problem?.problemTags);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      problem.problemTags = tags;
      const res = await axios.put(`/api/v1/admin/problem/${id}`, problem);
      if (res?.data?.success) {
        message.success("Saved successfully");
      }
    } catch (error) {
      console.log(error);
      message.error("Couldn't save");
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.delete(`/api/v1/admin/problem/${id}`);
      if (res?.data?.success) {
        message.success("Problem Deleted Successfully");
        navigate("/problems");
      }
    } catch (error) {
      console.log(error);
      message.error("Couldn't delete problem");
    }
  };

  //TAG
  const { token } = theme.useToken();
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };
  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  };
  const tagPlusStyle = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  useEffect(() => {
    fetchProblem();
  }, []);
  return (
    <AdminNavBar>
      <>
        <div className="main-new-problem-container">
          <div className="new-problem-title">
            <span>Edit Problem</span>
          </div>
          <div className="new-problem-body">
            <form className="editForm" onSubmit={handleSave}>
              <div className="row">
                <div className="column">
                  <div className="form-item">
                    <label htmlFor="problemName">
                      <span className="required">* </span>Problem Title
                    </label>
                    <input
                      type="text"
                      name="problemName"
                      value={problem.problemName || ""}
                      onChange={(e) =>
                        setProblem({
                          ...problem,
                          problemName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="difficulty">
                      <span className="required">* </span>Difficulty
                    </label>
                    <div className="radio-group">
                      <label className="radioLabel">
                        <input
                          type="radio"
                          name="difficulty"
                          value="easy"
                          checked={problem.difficulty === "easy"}
                          onChange={(e) =>
                            setProblem({
                              ...problem,
                              difficulty: e.target.value,
                            })
                          }
                        />
                        Easy
                      </label>
                      <label className="radioLabel">
                        <input
                          type="radio"
                          name="difficulty"
                          value="medium"
                          checked={problem.difficulty === "medium"}
                          onChange={(e) =>
                            setProblem({
                              ...problem,
                              difficulty: e.target.value,
                            })
                          }
                        />
                        Medium
                      </label>
                      <label className="radioLabel">
                        <input
                          type="radio"
                          name="difficulty"
                          value="hard"
                          checked={problem.difficulty === "hard"}
                          onChange={(e) =>
                            setProblem({
                              ...problem,
                              difficulty: e.target.value,
                            })
                          }
                        />
                        Hard
                      </label>
                    </div>
                  </div>
                  <div className="form-item">
                    <label htmlFor="problemStatement">
                      <span className="required">* </span>Problem Statement
                    </label>
                    <textarea
                      type="text"
                      name="problemStatement"
                      value={problem.problemStatement || ""}
                      onChange={(e) =>
                        setProblem({
                          ...problem,
                          problemStatement: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="constraints">
                      <span className="required">* </span>Constraints
                    </label>
                    <textarea
                      type="text"
                      name="constraints"
                      value={problem.constraints || ""}
                      onChange={(e) =>
                        setProblem({
                          ...problem,
                          constraints: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="column">
                  <div className="form-item">
                    <label htmlFor="inputFormat">Input Format</label>
                    <textarea
                      type="text"
                      name="inputFormat"
                      value={problem.inputFormat || ""}
                      onChange={(e) =>
                        setProblem({
                          ...problem,
                          inputFormat: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="outputFormat">Output Format</label>
                    <textarea
                      type="text"
                      name="outputFormat"
                      value={problem.outputFormat || ""}
                      onChange={(e) =>
                        setProblem({
                          ...problem,
                          outputFormat: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="sampleTestCase">
                      <span className="required">* </span>Sample Test Case
                    </label>
                    <textarea
                      type="text"
                      name="sampleTestCase"
                      value={problem.sampleTestCase || ""}
                      onChange={(e) =>
                        setProblem({
                          ...problem,
                          sampleTestCase: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-item form-tag">
                    <Flex gap="4px 0" wrap="wrap">
                      {tags.map((tag, index) => {
                        if (editInputIndex === index) {
                          return (
                            <Input
                              ref={editInputRef}
                              key={tag}
                              size="small"
                              style={tagInputStyle}
                              value={editInputValue}
                              onChange={handleEditInputChange}
                              onBlur={handleEditInputConfirm}
                              onPressEnter={handleEditInputConfirm}
                            />
                          );
                        }
                        const isLongTag = tag.length > 20;
                        const tagElem = (
                          <Tag
                            key={tag}
                            closable={index >= 0}
                            style={{
                              userSelect: "none",
                            }}
                            onClose={() => handleClose(tag)}
                          >
                            <span
                              onDoubleClick={(e) => {
                                if (index !== 0) {
                                  setEditInputIndex(index);
                                  setEditInputValue(tag);
                                  e.preventDefault();
                                }
                              }}
                            >
                              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </span>
                          </Tag>
                        );
                        return isLongTag ? (
                          <Tooltip title={tag} key={tag}>
                            {tagElem}
                          </Tooltip>
                        ) : (
                          tagElem
                        );
                      })}
                      {inputVisible ? (
                        <Input
                          ref={inputRef}
                          type="text"
                          size="small"
                          style={tagInputStyle}
                          value={inputValue}
                          onChange={handleInputChange}
                          onBlur={handleInputConfirm}
                          onPressEnter={handleInputConfirm}
                        />
                      ) : (
                        <Tag
                          style={tagPlusStyle}
                          icon={<PlusOutlined />}
                          onClick={showInput}
                        >
                          New Tag
                        </Tag>
                      )}
                    </Flex>
                  </div>
                  <div className="form-item btn-item">
                    <button className="save-btn" type="submit">
                      Save
                    </button>
                    <button className="delete-btn" onClick={handleDelete}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    </AdminNavBar>
  );
};

export default EditProblem;
