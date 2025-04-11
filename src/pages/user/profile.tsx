import { Form, Input, Button, message, Descriptions } from "antd";
import { useUser } from "../../contexts/userContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useUser();
  const [form] = Form.useForm();
  const [history, setHistory] = useState<any[]>([]);
  const nav = useNavigate();

  // API giả lập lấy đơn hàng của người dùng từ DB
  const getUserOrders = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/order?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Không thể tải đơn hàng");
      }
      const orders = await response.json();
      setHistory(orders);
    } catch (error) {
      message.error("Có lỗi xảy ra khi tải đơn hàng");
    }
  };

  useEffect(() => {
    // Thiết lập giá trị cho form khi người dùng có dữ liệu
    if (user) {
      form.setFieldsValue({
        name: user.name,
        address: user.address || "",
        email: user.email,
      });

      // Fetch đơn hàng của người dùng
      if (user.id) {
        getUserOrders(user.id);
      }
    }
  }, [user, form]);

  const onFinish = (values: any) => {
    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, ...values }) // Cập nhật localStorage
    );
    message.success("Cập nhật thành công!");
    nav("/");
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Chỉnh sửa thông tin cá nhân</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Email" name="email">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Tên" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Địa chỉ" name="address">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Lưu thông tin
        </Button>
      </Form>

      <h3 style={{ marginTop: 40 }}>Lịch sử mua hàng</h3>
      {history.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        history.map((order, idx) => (
          <Descriptions
            key={idx}
            title={`Đơn hàng #${order.id}`}
            bordered
            column={1}
            style={{ marginBottom: 24 }}
          >
           
            <Descriptions.Item label="Sản phẩm">
              {order.items.map((item: any) => (
                <div key={item.id}>
                  {item.name} x {item.quantity}
                </div>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng tiền">
              {order.total.toLocaleString("vi-VN")}₫
            </Descriptions.Item>
          </Descriptions>
        ))
      )}
    </div>
  );
};

export default ProfilePage;
