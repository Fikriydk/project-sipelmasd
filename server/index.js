const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require('express-graphql');
const cors = require("cors");
const schema = require('./graphql/schema'); //
require("dotenv").config();

const authRoutes = require("./routes/auth");
const reportRoutes = require("./routes/report");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/report", reportRoutes);

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Server dan MongoDB terhubung di port: ", process.env.PORT);
        });
    })
    .catch(err => console.error("MongoDB Error:", err));