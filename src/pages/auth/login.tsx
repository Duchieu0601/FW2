import { Button, Form, Input } from "antd";
import { useAuth } from "../../hooks";

const Login = () => {
  const { mutate } = useAuth({ resource: "login" });
  const onFinish = (values: any) => {
    mutate(values);
  };
  return (
    <div>
      <h1>Login</h1>
      <Form style={{ padding: "100px" }} onFinish={onFinish}>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
