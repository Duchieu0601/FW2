import { Card, Col, Row, Button } from "antd";
import { Link } from "react-router-dom";
import { useList } from "../hooks";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCart } from "../contexts/cartContext";


export const Homepage = () => {
  const { data: products } = useList({ resource: "products" });
  const { addToCart } = useCart(); // Hook để thêm sản phẩm vào giỏ hàng

  const handleAddToCart = (product: any) => {
    addToCart(product); // Gọi hàm addToCart từ context
  };

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[16, 16]}>
        {products?.map((product: any) => (
          <Col span={6} key={product.id}>
            <Card
              hoverable
              cover={<img alt={product.name} src={product.image} />}
            >
              <Card.Meta title={product.name} description={`${product.price} VND`} />
              <div style={{ marginTop: 10 }}>
                <Link to={`/product/${product.id}`}>
                  <Button type="primary" block>
                    Xem chi tiết
                  </Button>
                </Link>
                <Button
                  type="default"
                  block
                  icon={<ShoppingCartOutlined />}
                  style={{ marginTop: 10 }}
                  onClick={() => handleAddToCart(product)} // Gọi hàm khi click vào icon
                >
                  Thêm vào giỏ
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
