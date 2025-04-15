import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { auth, create, deleteOne, getList, getOne, update } from "../providers";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";

type Props = {
  resource: string;
  id?: number | string;
  values?: any;
};

export const useList = ({ resource = "products" }) => {
  return useQuery({
    queryKey: [resource],
    queryFn: () => getList({ resource }),
  });
};

// useOne: getDetail
export const useOne = ({ resource = "products", id }: Props) => {
  return useQuery({
    queryKey: [resource, id],
    queryFn: () => getOne({ resource, id }),
  });
};

// useCreate: addData
export const useCreate = ({ resource = "products" }) => {
  const nav = useNavigate();
  return useMutation({
    mutationFn: (values: any) => create({ resource, values }),
    onSuccess: () => {
      message.success("them thanh cong");
      // chuyen sang trang list: /products
      nav(`/${resource}`);
    },
  });
};

// useUpdate: updateData
export const useUpdate = ({ resource = "products", id }: Props) => {
  const nav = useNavigate();
  return useMutation({
    mutationFn: (values: any) => update({ resource, id, values }),
    onSuccess: () => {
      message.success("update thanh cong");
      // chuyen sang trang list: /products
      nav(`/${resource}`);
    },
  });
};
// useDelete : deleteOne
export const useDelete = ({ resource = "products" }: Props) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id?: string | number) => deleteOne({ resource, id }),
    onSuccess: () => {
      message.success("Xoa thanh cong");
      // cap nhat lai danh sach
      queryClient.invalidateQueries({ queryKey: [resource] });
    },
  });
};

export const useAuth = ({ resource = "register" }) => {
  const nav = useNavigate();
  const { login } = useUser();

  return useMutation({
    mutationFn: (values) => auth({ resource, values }),
    onSuccess: (data) => {
      message.success("Thành công");

      if (resource === "register") {
        nav("/login");
        return;
      }

      // Đăng nhập: lưu token & user (bao gồm role)
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      login(data.user);

      // Điều hướng dựa trên role
      if (data.user.role === "admin") {
        nav("/admin");
      } else {
        nav("/");
      }
    },
    onError: (err: any) => {
      message.error("Đăng ký hoặc đăng nhập thất bại");
      console.error(err);
    },
  });
  
  
};