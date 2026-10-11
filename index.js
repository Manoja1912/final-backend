require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");
const errorHandler = require("./middlewear/errorHandler");

const app = express();

dotenv.config();
app.use(express.json());


const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
    res.status(200).json({
        message: "working"
    });
});

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});
app.use("/products", productsRoutes)
app.use("/auth", authRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: "Page not found"
    })
})

app.use(errorHandler);

app.listen(PORT, () => {
    connectDB();
    console.log("server listening on " + PORT);
})

//penumetchamanoja_db_user
//kgr0UgMHxxfsxrxT