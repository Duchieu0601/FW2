import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Table, Select, Button, message } from "antd";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";


const ListOrder = () => {
  const queryClient = useQueryClient();
  const [statuses, setStatuses] = useState<{ [key: string]: string }>({});

  const getOrders = async () => {
    const { data } = await axios.get("http://localhost:3000/order");
    return data;
  };

  const { data: orders, isLoading } = useQuery({ queryKey: ["order"], queryFn: getOrders });

  // Mutation cập nhật trạng thái đơn hàng
  const updateOrderStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await axios.patch(`http://localhost:3000/order/${id}`, { status });
    },
    onSuccess: () => {
      message.success("Cập nhật trạng thái thành công!");
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
    onError: () => {
      message.error("Lỗi khi cập nhật trạng thái!");
    },
  });

  const handleStatusChange = (id: string, value: string) => {
    setStatuses((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleConfirm = (id: string) => {
    const status = statuses[id] || "pending";
    updateOrderStatus.mutate({ id, status });
  };
  
  const columns: ColumnsType<any> = [
    {
      title: "ID Đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Mã sản phẩm",
      key: "productId",
      align: "center",
      render: (_: any, record: any) => (
        <div className="text-center">
          {record.items.map((item: any) => (
            <div key={item.id}>{item.id}</div>
          ))}
        </div>
      ),
    },
    {
      title: "Số lượng",
      key: "quantity",
      align: "center",
      render: (_: any, record: any) => (
        <div className="text-center">
          {record.items.map((item: any) => (
            <div key={item.id}>{item.quantity}</div>
          ))}
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      key: "total",
      render: (_: any, record: any) =>
        record.total.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any) => (
        <Select
          defaultValue={status || "pending"}
          onChange={(value) => handleStatusChange(record.id, value)}
          style={{ width: 120 }}
          disabled={status === "canceled"}
        >
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="success">Success</Select.Option>
          <Select.Option value="canceled">Canceled</Select.Option>
        </Select>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Button
          type="primary"
          onClick={() => handleConfirm(record.id)}
          disabled={record.status === "canceled"}
        >
          Xác nhận
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Danh sách đơn hàng</h2>
      <Table dataSource={orders} columns={columns} loading={isLoading} rowKey="id" />
    </div>
  );
};

export default ListOrder;
