const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
const v1Router = require("./routes");

const PORT = process.env.PORT || 3000;

// For testing purposes
app.get("/", (req, res) => {
  res.send("<h2>It's Working!</h2>");
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});

// *** ADD ***
app.use("/api/v1", v1Router);
