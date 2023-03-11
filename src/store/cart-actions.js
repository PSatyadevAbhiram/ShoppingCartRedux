import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "Pending",
        title: "Sending",
        message: "Sending Cart Data",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://shopping-cart-bba9d-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQty: cart.totalQty,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending Cart data");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Dispatched Cart Data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Error in Sending Cart Data",
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://shopping-cart-bba9d-default-rtdb.firebaseio.com/cart.json"
      ); 
      if (!response.ok) {
        throw new Error("Sending Cart data");
      }
      const data = await response.json();
      return data;
    };
    try{
        let cartData = await fetchData();
        dispatch(cartActions.replaceCart({
            items: cartData.items || [],
            totalQty: cartData.totalQty
        }));
    }
    catch(error){
        dispatch(
            uiActions.showNotification({
              status: "error",
              title: "Error",
              message: "Error in Fetching Cart Data",
            })
          );
    }
  };
};
