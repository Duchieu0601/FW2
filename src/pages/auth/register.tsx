import { Button, Form, Input, Select } from "antd";
import { useAuth } from "../../hooks";

const { Option } = Select;

function Register() {
  const { mutate } = useAuth({ resource: "register" });

  const onFinish = (values: any) => {
    const { confirmPassword, ...params } = values;
    mutate(params); // gửi email, password, role
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 30,
        marginTop: 30,
        width: 400,
        margin: "30px auto",
      }}
    >
      <h2>Register</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }, { min: 6, message: "Minimum 6 characters" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Re-enter your password" />
        </Form.Item>

        <Form.Item label="Role" name="role" rules={[{ required: true }]}>
          <Select placeholder="Select a role">
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
