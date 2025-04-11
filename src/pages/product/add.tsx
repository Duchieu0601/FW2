import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type ProductForm = {
  name: string;
  price: number;
};

function ProductAdd() {
  const nav = useNavigate();
  const addProduct = async (data: ProductForm) => {
    await axios.post("http://localhost:3000/products", data);
  };

  const { mutate } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      message.success("them thanh cong");
      nav("/admin/products");
    },
    onError: () => {},
  });

  function onFinish(values: ProductForm) {
    mutate(values);
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 30,
        marginTop: 30,
      }}
    >
      ProductAdd
      <Form onFinish={onFinish}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true }, { type: "number", min: 0 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Image" name="image" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="desc" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default ProductAdd;
