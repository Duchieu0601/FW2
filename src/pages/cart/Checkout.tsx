import { useCart } from "../../contexts/cartContext";
import {
  Card,
  Form,
  Input,
  Radio,
  Button,
  Typography,
  Divider,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const { Title } = Typography;

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [form] = Form.useForm();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async (values: any) => {
    const order = {
      id: `ORD${Date.now()}`,
      customerName: values.name,
      address: values.address,
      phone: values.phone,
      paymentMethod,
      total: totalPrice,
      items: cartItems,
    };

    try {
      const res = await fetch("http://localhost:3000/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      console.log("Server response:", res.status);

      if (!res.ok) {
        throw new Error("Lỗi khi gửi đơn hàng");
      }

      message.success("Đặt hàng thành công!");
      clearCart();
      navigate("");
    } catch (err) {
      console.error(err);
      message.error("Có lỗi xảy ra khi đặt hàng!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Title level={2}>Thanh toán</Title>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <Card title="Sản phẩm trong giỏ">
          {cartItems.length === 0 ? (
            <p>Không có sản phẩm nào trong giỏ hàng.</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded object-cover"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p>Số lượng: {item.quantity}</p>
                    <p>Giá: {item.price.toLocaleString()}₫</p>
                  </div>
                </div>
              ))}
              <Divider />
              <p className="text-right font-semibold text-lg">
                Tổng cộng: {totalPrice.toLocaleString()}₫
              </p>
            </>
          )}
        </Card>

        <Card title="Thông tin khách hàng">
          <Form layout="vertical" form={form} onFinish={handleCheckout}>
            <Form.Item
              label="Họ và tên"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Hình thức thanh toán"
              name="payment"
              initialValue="cod"
            >
              <Radio.Group
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <Radio value="cod">Thanh toán khi nhận hàng (COD)</Radio>
                <Radio value="bank">Chuyển khoản ngân hàng</Radio>
                <Radio value="qr">Quét mã QR</Radio>
              </Radio.Group>
            </Form.Item>

            {paymentMethod === "qr" && (
              <div className="mb-4 text-center">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?data=DUYSHOP_THANHTOAN"
                  alt="QR Code"
                  className="mx-auto w-40 h-40"
                />
                <p className="mt-2 text-gray-500 text-sm">
                  Quét mã để thanh toán {totalPrice.toLocaleString()}₫
                </p>
              </div>
            )}

            {paymentMethod === "bank" && (
              <div className="text-sm text-gray-600 mb-4">
                <p>Ngân hàng: Vietcombank</p>
                <p>Số tài khoản: 0123456789</p>
                <p>Chủ tài khoản: Nguyễn Văn A</p>
                <p>
                  Nội dung: {form.getFieldValue("name")} - {form.getFieldValue("phone")}
                </p>
              </div>
            )}

            <Button type="primary" htmlType="submit" className="bg-blue-500 mt-2">
              Thanh toán
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
