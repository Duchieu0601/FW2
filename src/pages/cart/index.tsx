import { Card, Button, Typography, Divider, Empty, InputNumber } from "antd";
import { useCart } from "../../contexts/cartContext";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return <Empty description="Giỏ hàng trống" className="mt-20" />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      <Title level={2}>Giỏ hàng của bạn</Title>
      {cartItems.map((item) => (
        <Card key={item.id} className="mb-4 shadow-md rounded-xl">
          <div className="flex gap-6 items-center">
            <img
              src={item.image}
             
              className="w-8 h-8 object-cover rounded-md" // Giảm kích thước hình ảnh
            />

            <div className="flex-1">
              <Title level={4}>{item.name}</Title>
              <Text>Giá: {item.price.toLocaleString()}₫</Text>
              <br />
              <Text className="mr-2">Số lượng:</Text>
              <InputNumber
                min={1}
                value={item.quantity}
                onChange={(value) => {
                  if (typeof value === "number") {
                    updateQuantity(item.id, value);
                  }
                }}
              />
              <br />
              <Text strong>
                Tổng: {(item.price * item.quantity).toLocaleString()}₫
              </Text>
            </div>
            <Button danger onClick={() => removeFromCart(item.id)}>
              Xóa
            </Button>
          </div>
        </Card>
      ))}

      <Divider />

      <div className="text-right">
        <Title level={4}>
          Tổng tiền: {totalPrice.toLocaleString()}₫
        </Title>
        <Button
          type="primary"
          size="large"
          className="mt-2 bg-green-500 hover:bg-green-600"
          onClick={handleCheckout}
        >
          Tiến hành thanh toán
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
