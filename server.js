const express = require("express")
const app = express()
const cors =  require("cors")


app.use(cors())
app.use(express.json())
require("dotenv").config()


app.use("/api/user", require("./routes/userRoutes"))
app.use("/api/admin", require("./routes/adminRoutes"))
app.use("/api/products", require("./routes/productRoutes"));


const connectDB = require("./config/connectDB")
connectDB()

const port = process.env.PORT || 8081
app.listen(port, ()=> console.log("my server is running on port :", port))