import React, { useEffect, useContext } from "react";
import { Form, Input, Button, Select } from "antd";
import UserContext from "../context/user";
import axios from "axios";

const { Option } = Select;
const styleOutline = {
  border: "0",
  outline: "none",
};

const EditForm = ({ form }) => {
  const { getFieldDecorator } = form;
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = function(e) {
    e.preventDefault();
    const edited = form.getFieldsValue();

    axios
      .patch(`/api/v1/users`, edited)
      .then(({ data }) => {
        // console.log(data);
        setUser(data);
        alert("Profile updated");
      })
      .catch(err => {
        // console.log(err.message);
        alert("Please, Verify your info and try again!");
      });
  };

  useEffect(() => form.setFieldsValue(user), []);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator("username", {
          rules: [{ required: true, message: "Please enter your username!" }],
        })(<Input placeholder="Username" style={styleOutline} />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("firstName", {
          rules: [{ required: true, message: "Please enter your First Name!" }],
        })(<Input placeholder="First Name" style={styleOutline} />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("lastName", {
          rules: [{ required: true, message: "Please enter your Last Name!" }],
        })(<Input placeholder="Last Name" style={styleOutline} />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("email", {
          rules: [
            { required: true, message: "Please enter your Email Address!" },
          ],
        })(<Input placeholder="Email Address" style={styleOutline} />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("language", {
          rules: [
            { required: true, message: "Choose your prefered language!" },
          ],
        })(
          <Select style={{ width: "32%" }} onChange={() => {}}>
            <Option value="ar">Arabic</Option>
            <Option value="en">English</Option>
            <Option value="fr">French</Option>
            <Option value="es">Spanish</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="edit-form-button">
          Edit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create({ name: "edit" })(EditForm);
