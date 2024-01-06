const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler.js");
const connectDb = require("./config/dbConnection.js");

connectDb();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoutes.js"));
// app.use("/api/users", require("./routes/userRoutes.js"));
app.use("/api/users", require("./routes/userRoutes.js"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


