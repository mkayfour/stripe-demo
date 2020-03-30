import React, { useState } from "react";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";

function App() {
  const [product, setProduct] = useState({
    name: "Pretend I'm Dead",
    price: 10,
    productBy: "Alexa"
  });

  const makePayment = token => {
    const body = {
      token,
      product
    };
    const headers = {
      "Content-Type": "application/json"
    };

    return fetch(`http://localhost:3001/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
      .then(response => {
        console.log(response);
        const { status } = response;
        console.log({ status });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="App">
      <h3>
        <u>Buy ebooks at cheap prices</u>
      </h3>
      <div style={{ align: "center", alignContent: "center" }}>
        <div
          align="center"
          style={{
            // border: "1px solid black",
            height: "90%",
            width: "100%",
            align: "center",
            alignSelf: "center"
          }}
        >
          <img
            src="https://s26162.pcdn.co/wp-content/uploads/2018/12/pretend-im-dead-9781501183935_hr-668x1024.jpg"
            width="20%"
            height="20%"
            alt="book-cover"
          ></img>
          <div>{/* <p>Pretend I'm dead- Jen Beagin</p> */}</div>
        </div>
        <StripeCheckout
          stripeKey={process.env.REACT_APP_PUBLIC_KEY}
          token={makePayment}
          name="Pretend I'm Dead"
          amount={product.price * 100}
          // shippingAddress
          // billingAddress
        >
          <button className="btn-large red">
            {" "}
            Buy <b>{product.name}</b> at just <b>{product.price}</b>
          </button>
        </StripeCheckout>
      </div>
    </div>
  );
}

export default App;
