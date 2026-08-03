const app=require("./src/app")
const connectDB=require('./src/db/db')
const dotenv=require("dotenv")
dotenv.config();


const port=3000
const MONGO_URI= process.env.MONGO_URI;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});