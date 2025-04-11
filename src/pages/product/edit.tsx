import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

type ProductForm = {
  name: string;
  price: number;
  image: string;
  desc: string;
};

function ProductEdit() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const nav = useNavigate();

  // Lấy chi tiết sản phẩm
  const getProductDetail = async () => {
    if (!id) return;
    const { data } = await axios.get(`http://localhost:3000/products/${id}`);
    return data;
  };

  const { data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: getProductDetail,
  });

  // Đưa dữ liệu vào form
  useEffect(() => {
    if (!product) return;
    form.setFieldsValue(product);
  }, [product]);

  // Hàm cập nhật sản phẩm
  const updateProduct = async (data: ProductForm) => {
    if (!id) return;
    await axios.put(`http://localhost:3000/products/${id}`, data);
  };

  const { mutate } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      message.success("Cập nhật sản phẩm thành công!");
      nav("/admin/products");
    },
    onError: () => {
      message.error("Lỗi khi cập nhật sản phẩm!");
    },
  });

  // Xử lý khi submit form
  function onFinish(values: ProductForm) {
    mutate(values);
  }

  return (
    <div style={{ marginTop: 30 }}>
      <h2>Sửa Sản Phẩm</h2>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: "Vui lòng nhập tên" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Giá" name="price" rules={[{ required: true, type: "number", min: 0, message: "Vui lòng nhập giá hợp lệ" }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Hình ảnh" name="image" rules={[{ required: true, message: "Vui lòng nhập link ảnh" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Mô tả" name="desc" rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}>
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">Lưu</Button>
      </Form>
    </div>
  );
}

export default ProductEdit;
