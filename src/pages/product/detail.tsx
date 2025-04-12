import { useNavigate, useParams } from "react-router-dom";
import { useOne } from "../../hooks";
import { Button, Card, Typography, Skeleton } from "antd";
import { useCart } from "../../contexts/cartContext";

const { Title, Paragraph } = Typography;

export const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useOne({ resource: "products", id });
  const { addToCart } = useCart();
  const nav = useNavigate();
  if (isLoading) return <Skeleton active />;
  
  const handleBuy = () => {
    addToCart(data);
    nav("/cart");
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="w-full">
        <img
          src={data.image}
          alt={data.name}
          className="rounded-2xl w-full object-cover shadow-lg"
        />
      </div>
      <div>
        <Card className="rounded-2xl shadow-md">
          <Title level={2}>{data.name}</Title>
          <Title level={4} type="secondary">
            Giá: {data.price.toLocaleString()}VND
          </Title>
          <Paragraph className="text-base mt-4">{data.desc}</Paragraph>
          <Button
            type="primary"
            size="large"
            className="mt-6 bg-blue-500 hover:bg-blue-600"
            onClick={handleBuy}
          >
            Mua hàng
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
