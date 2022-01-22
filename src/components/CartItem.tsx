import { Button } from "@material-ui/core";
import { Product } from "../util/types";
import { Wrapper } from "./CartItem.styles";
// import { CartItemType } from "../App";



type Props = {
  item: Product;
  addToCart: (clickedItem: any) => void;
  removeFromCart: (id: number) => void;
};

const CartItem = ({ item, addToCart, removeFromCart }: Props) => {

  return (
    <>
    {item?.id? ( 
    <Wrapper>
      <div>
        <h3>{item?.category?.Name}</h3>
        <div className="information">
          <p>Price: ${item?.price}</p>
          {/* <p>Total: ${(item.amount * item.price).toFixed(2)}</p> */}
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item?.id)}
          >
            -
          </Button>
          {/* <p>{item.amount}</p> */}
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
          >
            +
          </Button>
        </div>
      </div>
      {/* <img src={item.image} alt={item?.category.name} /> */}
    </Wrapper>
    ) : (<></>)}
    </>
  );
};

export default CartItem;
