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
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Empty description="Giỏ hàng của bạn đang trống 😢" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      <Title level={2} className="text-center mb-6">
        Giỏ hàng
      </Title>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <Card key={item.id} className="shadow-sm rounded-xl">
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14!important object-cover rounded border"
              />
              <div className="flex-1">
                <Title level={5} className="mb-0">{item.name}</Title>
                <Text>Giá: {item.price.toLocaleString()}₫</Text>
                <div className="mt-1 flex items-center gap-2">
                  <Text>Số lượng:</Text>
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) => {
                      if (typeof value === "number") {
                        updateQuantity(item.id, value);
                      }
                    }}
                    size="small"
                  />
                </div>
                <Text strong className="block mt-1 text-sm">
                  Tổng: {(item.price * item.quantity).toLocaleString()}₫
                </Text>
              </div>
              <Button danger size="small" onClick={() => removeFromCart(item.id)}>
                Xóa
              </Button>
            </div>
          </Card>
        ))}
      </div>

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
