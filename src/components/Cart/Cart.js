import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const cartState = useSelector((state) => state.cart.items);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartState.map((itemVal) => (
          <CartItem
            key={itemVal.id}
            item={{
              id: itemVal.id,
              title: itemVal.name,
              quantity: itemVal.qty,
              total: itemVal.totalPrice,
              price: itemVal.price,
            }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
