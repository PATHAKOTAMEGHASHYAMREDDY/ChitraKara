// const express = require('express');
// const dotenv = require('dotenv');
// const authRoutes=require('./routes/auth');
// const mongoose = require('mongoose');
// const app = express();
// dotenv.config();

// const cors = require('cors');
// app.use(cors());
// app.use(express.json());
// mongoose.connect(process.env.MOBGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
//     .then(()=>console.log("MongoDB Connected"))
//     .catch((error)=>console.log(error));
// app.use("/api",authRoutes);
// app.listen(process.env.PORT,()=>{
//     console.log(`Server is running on port ${process.env.PORT}`);
// })
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
dotenv.config();

// Middleware
app.use(cors());
// app.use(cors({ 
//   origin: "", 
//   credentials: true }));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.error("MongoDB Connection Error:", error));

// Routes
app.use("/api", authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
