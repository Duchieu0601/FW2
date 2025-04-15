import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Input, message, Popconfirm, Row, Col, Layout, Carousel, Spin } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";

const { Header, Content, Footer } = Layout;

function ProductList() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  // Gọi API lấy danh sách sản phẩm
  const getAllProduct = async () => {
    const { data } = await axios.get("http://localhost:3000/products");
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
  });

  // Xóa sản phẩm
  const deleteProduct = async (id: any) => {
    await axios.delete(`http://localhost:3000/products/${id}`);
  };

  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      message.success("Xóa sản phẩm thành công!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      message.error("Xóa thất bại!");
    },
  });

  // Lọc sản phẩm theo tìm kiếm
  const filteredProducts = data?.filter((product: { name: string; }) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout style={{ backgroundColor: "#f4f6f9" }}>
      {/* Header */}
      

     


      {/* Nội dung */}
      <Content style={{ padding: "40px" }}>
        {/* Ô tìm kiếm sản phẩm */}
        <div style={{ maxWidth: "600px", margin: "0 auto 30px", textAlign: "center" }}>
          <Input.Search
            placeholder=" Tìm kiếm sản phẩm..."
            allowClear
            enterButton
            size="large"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ borderRadius: "8px", boxShadow: "0 3px 8px rgba(0,0,0,0.1)" }}
          />
        </div>

        {/* Hiển thị danh sách sản phẩm */}
        {isLoading ? (
          <Spin size="large" style={{ display: "block", margin: "0 auto" }} />
        ) : (
          <Row gutter={[24, 24]} justify="center">
            {filteredProducts?.map((product: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; image: string | undefined; price: { toLocaleString: () => string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }; }) => (
              <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={product.name ? String(product.name) : 'Product image'}
                      src={product.image}
                      style={{
                        height: "250px",
                        objectFit: "cover",
                        borderRadius: "8px 8px 0 0",
                        transition: "transform 0.3s",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                  }
                  style={{
                    borderRadius: "10px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    transition: "box-shadow 0.3s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)")}
                  onMouseOut={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)")}
                >
                  <Card.Meta
                    title={<span style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>{product.name}</span>}
                    description={<span style={{ color: "#ff4d4f", fontWeight: "bold" }}>Giá: {product.price.toLocaleString()} VND</span>}
                  />
                  <div style={{ marginTop: "15px", textAlign: "center" }}>
                    <Button type="link" style={{ marginRight: "10px", fontWeight: "bold", color: "#1890ff" }}>
                      <Link to={`/admin/product/edit/${product.id}`}> Sửa</Link>
                    </Button>
                    <Popconfirm
                      title="Bạn có chắc muốn xóa?"
                      onConfirm={() => mutate(product.id)}
                      okText="Có"
                      cancelText="Không"
                    >
                      <Button type="primary" danger> Xóa</Button>
                    </Popconfirm>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Content>

      {/* Footer */}
      {/* <Footer
        style={{
          textAlign: "center",
          background: "#001529",
          color: "white",
          padding: "20px",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
       
      </Footer> */}
    </Layout>
  );
}

export default ProductList;
