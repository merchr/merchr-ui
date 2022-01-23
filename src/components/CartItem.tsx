import { Button } from "@material-ui/core";
import { Product } from "../util/types";
import { Wrapper } from "./CartItem.styles";
// import { CartItemType } from "../App";



type Props = {
  productAmountPair: [any,any];
  addToCart: (clickedItem: any) => void;
  removeFromCart: (id: number) => void;
};

const CartItem = ({ productAmountPair, addToCart, removeFromCart }: Props) => {

  return (
    <>
    {productAmountPair[0]?.id? ( 
    <Wrapper>
      <div>
        <h5>{productAmountPair[0]?.category?.Name}</h5>
        <div className="information">
          <p>Price: ${productAmountPair[0]?.category.price}</p>
          <p>Total: ${(productAmountPair[1] * productAmountPair[0].category.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(productAmountPair[0]?.id)}
          >
            -
          </Button>
          <p>{productAmountPair[1]}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(productAmountPair[0])}
          >
            +
          </Button>
        </div>
      </div>
      {/* <img src={productAmountPair[0].image} alt={productAmountPair[0]?.category.name} /> */}
    </Wrapper>
    ) : (<></>)}
    </>
  );
};

export default CartItem;
