/* main requires */
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

// routes ========================================================================================
const { usersRoutes } = require("./src/routes/userRoutes.js");

// middlewares ===================================================================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// call routes
app.get("/api/v1/test", (request, response) => { response.status(200).json({ msg:"Keep moving..." }); });
app.use("/api/v1/users", usersRoutes);

app.listen(9101, () => {
    console.log('Server it is live...');
});