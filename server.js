/* main requires */
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

// routes ========================================================================================
const { usersRoutes } = require("./src/routes/userRoutes.js");
const { wordsRoutes } = require("./src/routes/wordRoutes.js");
const { phraseRoutes } = require("./src/routes/phraseRoutes.js");

// middlewares ===================================================================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// call routes ===================================================================================
app.get("/api/v1/test", (request, response) => { response.status(200).json({ msg:"Keep moving..." }); });
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/words", wordsRoutes);
app.use("/api/v1/phrase", phraseRoutes);

app.listen(9101, () => {
    console.log('Server it is live...');
});