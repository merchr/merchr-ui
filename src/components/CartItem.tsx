import { Button } from "@material-ui/core";
import { getProductImage } from "../util/images";
import { Wrapper } from "./CartItem.styles";



type Props = {
  productAmountPair: [any, any];
  addToCart: (clickedItem: any) => void;
  removeFromCart: (id: number) => void;
};

const CartItem = ({ productAmountPair, addToCart, removeFromCart }: Props) => {

  return (
    <>
    {/* check if productAmountPair if the first element, i.e product is not empty or undefined then display data for that product */}
      {productAmountPair[0]?.id ? (
        <Wrapper>
          <div>
            <h5>{productAmountPair[0]?.category?.Name}</h5>
            <div className="information">
              <p>Price: ${productAmountPair[0]?.category.price}</p>
              <p>Total: ${(productAmountPair[1] * productAmountPair[0].category.price).toFixed(2)}</p>
            </div>
            <div>
              <ul>
                <li>Color: {productAmountPair[0].color?.name}</li>
                {productAmountPair[0].size?.name && <li>Size: {productAmountPair[0].size?.name}</li>}
                {productAmountPair[0].sex?.name && <li>Sex: {productAmountPair[0].sex?.type}</li>}
              </ul>
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
                onClick={() => addToCart(productAmountPair[0].id)}
              >
                +
              </Button>
            </div>
          </div>
          <img src={getProductImage(productAmountPair[0].category?.id)} alt={productAmountPair[0]?.category?.Name} style={{ width: "115px", objectFit: "fill", maxWidth: "200px" }} />

        </Wrapper>
      ) : (<></>)}
    </>
  );
};

export default CartItem;
