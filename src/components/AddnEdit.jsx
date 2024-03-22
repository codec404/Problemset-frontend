import React, { useEffect, useRef, useState } from "react";
import "../styles/EditProblem.css";
import {
  Button,
  Form,
  Input,
  Flex,
  Tag,
  theme,
  Tooltip,
  message,
  Radio,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const tagInputStyle = {
  width: 64,
  height: 22,
  marginInlineEnd: 8,
  verticalAlign: "top",
};

const AddnEdit = ({ ...props }) => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [value, setValue] = useState({});

  const handleSave = () => {};

  // CREATE PROBLEM API
  const handleStore = (values) => {
    console.log(values);
    values.problemTags = tags;
    setValue(values);
  };
  const handleSubmit = async () => {
    // console.log(values);
    try {
      const res = await axios.post("/api/v1/admin/create-problem", value);
      if (res?.data?.success) {
        message.success("Successfully created the problem");
        navigate("/problems");
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 20,
      },
    },
  };

  // TAG
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

  return !props?.problem ? (
    <>
      <div className="main-new-problem-container">
        <div className="new-problem-title">
          <span>{props.title}</span>
        </div>
        <div className="new-problem-body">
          <Form
            {...formItemLayout}
            style={{
              maxWidth: 1750,
            }}
            layout="vertical"
            onFinish={handleStore}
          >
            <div className="row">
              <div className="column col-1">
                <Form.Item
                  label="Problem Title"
                  name="problemName"
                  rules={[
                    {
                      required: true,
                      message: "Please input Problem Title!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Difficulty"
                  name="difficulty"
                  rules={[
                    {
                      required: true,
                      message: "Please input difficulty!",
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value="easy"> Easy </Radio>
                    <Radio value="medium"> Medium </Radio>
                    <Radio value="hard"> Hard </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="Problem Statement"
                  name="problemStatement"
                  rules={[
                    {
                      required: true,
                      message: "Please input Problem Statement!",
                    },
                  ]}
                >
                  <Input.TextArea style={{ height: 180 }} />
                </Form.Item>
                <Form.Item
                  label="Constraints"
                  name="constraints"
                  rules={[
                    {
                      required: true,
                      message: "Please input Constraints!",
                    },
                  ]}
                >
                  <Input.TextArea style={{ height: 100 }} />
                </Form.Item>
              </div>
              <div className="column">
                <Form.Item label="Input Format" name="inputFormat">
                  <Input.TextArea style={{ height: 100 }} />
                </Form.Item>
                <Form.Item label="Output Format" name="outputFormat">
                  <Input.TextArea style={{ height: 100 }} />
                </Form.Item>
                <Form.Item
                  label="Sample Test Case"
                  name="sampleTestCase"
                  rules={[
                    {
                      required: true,
                      message: "Please input sample test case!",
                    },
                  ]}
                >
                  <Input.TextArea style={{ height: 100 }} />
                </Form.Item>
                <Form.Item>
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
                </Form.Item>
                <div className="buttons">
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="saveBtn"
                    >
                      Save
                    </Button>
                  </Form.Item>
                  <Button
                    type="primary"
                    onClick={handleSubmit}
                    className="doneBtn"
                  >
                    Done
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="main-new-problem-container">
        <div className="new-problem-title">
          <span>{props.title}</span>
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
                    defaultValue={props.problem.problemName}
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
                        checked={props.problem.difficulty === "easy"}
                      />
                      Easy
                    </label>
                    <label className="radioLabel">
                      <input
                        type="radio"
                        name="difficulty"
                        value="medium"
                        checked={props.problem.difficulty === "medium"}
                      />
                      Medium
                    </label>
                    <label className="radioLabel">
                      <input
                        type="radio"
                        name="difficulty"
                        value="hard"
                        checked={props.problem.difficulty === "hard"}
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
                    defaultValue={props.problem.problemStatement}
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
                    defaultValue={props.problem.constraints}
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
                    defaultValue={props.problem.inputFormat}
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="outputFormat">Output Format</label>
                  <textarea
                    type="text"
                    name="outputFormat"
                    defaultValue={props.problem.outputFormat}
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="sampleTestCase">
                    <span className="required">* </span>Sample Test Case
                  </label>
                  <textarea
                    type="text"
                    name="sampleTestCase"
                    defaultValue={props.problem.sampleTestCase}
                    required
                  />
                </div>
                <div className="form-item btn-item">
                  <button className="save-btn" type="submit">
                    Save
                  </button>
                  <button className="done-btn">Done</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddnEdit;
