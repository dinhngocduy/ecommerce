import React from "react";
import "../css/Subtotal.css";
import CurrencyFormat from "react-currency-format";
import StripeCheckout from "react-stripe-checkout";

import { getBasketTotal } from "../reducer";

function Subtotal({ cartProducts, handleToken }) {
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <div>
            <p>
              Subtotal: <strong>{value}</strong>
            </p>
            <p>
              Number Of Items: <strong>{cartProducts.length}</strong>
            </p>

            <StripeCheckout
              className="subtotal__button"
              stripeKey="pk_test_51KbJyQJhEN1R6X5pqpCLsScIAzzJpGz6KwfsOCtAUpyAPFlrf96zqVWtdCIyU5ckiam23kJezOZnndZMtcDOmQE600XeNV5lz6"
              token={handleToken}
              billingAddress
              shippingAddress
              name="All Products"
              amount={getBasketTotal(cartProducts) * 100}
            ></StripeCheckout>
          </div>
        )}
        decimalScale={2}
        value={getBasketTotal(cartProducts)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

export default Subtotal;
