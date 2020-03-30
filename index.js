const cors = require("cors");
const express = require("express");

// Add a stripe key
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const uuid = require("uuid/v4");

const app = express();

app.use(express.json());
app.use(cors());

// routes

app.get("/", (req, res) => {
  res.send("It works!");
});

app.post("/payment", (req, res) => {
  const { product, token } = req.body;
  console.log({ product });
  const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id
    })
    .then(customer => {
      stripe.charges.create(
        // cents is default value
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchase of ${product.name}`
          //   shipping: {
          //     name: token.card.name,
          //     address: {
          //       country: token.card.address_country
          //     }
          //   }
        },
        { idempotencyKey }
      );
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.error(err));
});

// listen
app.listen(3001, () => {
  console.log("Listening on port : 3001");
});
