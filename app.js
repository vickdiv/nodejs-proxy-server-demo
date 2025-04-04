const axios = require("axios");
const https = require("https");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const PORT = process.env.PORT || 3002;

const url = "https://jsonplaceholder.typicode.com/posts";

app.post("/api/test", express.json(), async (req, res) => {
  const payload = JSON.stringify(req.body);
  console.log(payload);
  const httpreq = {
    httpsAgent: agent,
    method: "POST",
    url: url,
    body: payload,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = axios(httpreq)
    .then((response) => {
      // console.log(response.data);
      res.status(response.status).json(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
