const express = require("express");
const axios = require("axios");

const app = express();
const port = process.argv[2] || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/lab4.js", (req, res) => {
  res.sendFile(__dirname + "/lab4.js");
});

app.get("/lab4.css", (req, res) => {
  res.sendFile(__dirname + "/lab4.css");
});

app.get("/api", async (req, res) => {
  const expression = req.query.expression;
  const url = `http://api.mathjs.org/v4/?expr=${encodeURIComponent(
    expression
  )}`;

  axios
    .get(url)
    .then((response) => {
      const results = response.data;
      res.json(results);
    })
    .catch((error) => {
      console.error("Error:", error.message);
      res.status(500).send("An error occurred");
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
