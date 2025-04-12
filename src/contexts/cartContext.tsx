import { createContext, useContext, useState, ReactNode } from "react";

// Định nghĩa kiểu sản phẩm
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  desc: string;
};

// Định nghĩa kiểu sản phẩm trong giỏ
type CartItem = Product & { quantity: number };

// Định nghĩa kiểu CartContext
type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  decreaseQuantity: (id: number) => void; // Thêm chức năng giảm số lượng
  clearCart: () => void; // Thêm chức năng xóa giỏ hàng
};

// Khởi tạo context với CartContextType hoặc undefined nếu không có CartProvider
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Thêm sản phẩm vào giỏ
  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Xóa sản phẩm khỏi giỏ
  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Cập nhật số lượng sản phẩm trong giỏ
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return; // Không cho phép số lượng nhỏ hơn 1
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Giảm số lượng sản phẩm trong giỏ
  const decreaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity }
          : item
      )
    );
  };

  // Xóa tất cả sản phẩm trong giỏ
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        decreaseQuantity, // Cung cấp hàm decreaseQuantity
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook để sử dụng context Cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
