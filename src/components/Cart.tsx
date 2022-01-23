import { Button } from "@material-ui/core";
import CartItem from "./CartItem";
import { Wrapper } from "./Cart.styles";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../util/userContext";
import { Product } from "../util/types";
import { Link } from "react-router-dom";

type Props = {
  addToCart: (clickedItem: any) => void;
  removeFromCart: (id: number) => void;
  isPopover?: boolean;
};

const Cart = ({ addToCart, removeFromCart, isPopover }: Props) => {

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
  }, [user, data]);

  const productsWithAmount = cartItems.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
  const productAmountPairs = [...Array.from(productsWithAmount.entries())]; // to get the pairs [element, frequency]

  const calculateTotal = (items: any[]) =>
    items.reduce((acc, item) => acc + item.category.price ?? 0, 0);

  return (
    <div style={{ display: "block", maxWidth: "500px", margin: "auto", padding: 20 }}>
      {/* <h5>Your Cart</h5> */}
      {productAmountPairs.length === 0 ? <p>No items in cart.</p> : null}
      {productAmountPairs.map((item, index) => (
        <CartItem
          key={index}
          productAmountPair={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h4>Total: ${calculateTotal(cartItems).toFixed(2)}</h4>
      <Link
        to={{
          pathname: "/checkout",
        }}
      >
       {!isPopover && <button className="btn btn-secondary">Checkout</button>}
      </Link>
    </div>
  );
};

export default Cart;
