import { Button } from "@material-ui/core";
import CartItem from "./CartItem";
import { Wrapper } from "./Cart.styles";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../util/userContext";
import { Product } from "../util/types";

type Props = {
  addToCart: (clickedItem: any) => void;
  removeFromCart: (id: number) => void;
};

const Cart = ({ addToCart, removeFromCart }: Props) => {

  const [data, setData] = useState<{ data: Product[] }>()
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:1337/api/products')
      .then(res => res.json())
      .then(res => setData(res));
  }, []);

  const cartItemIds = user.cart;
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    let arr = [] as Product[];
    const uniq = data?.data?.map((item) => {
      cartItemIds.map((id: number) => {
        if (item.id === id) {
          arr = [...arr, item];
        }
      });
    });
    setCartItems(arr);
    console.log("arr", arr);
  }, [user,data]);

  const calculateTotal = (items: any[]) =>
    items.reduce((acc, item) => acc + item.category.price??0, 0);

  return (
    <Wrapper>
      <h2>Your Cart</h2>
      {cartItemIds.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
