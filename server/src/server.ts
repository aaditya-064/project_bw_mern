import app from "./app";
import { db } from "./config/db.config";
const PORT = 8080;
const DB_URI = "mongodb://localhost:27017/project_bw";

//* connect database
db(DB_URI);

//* listen
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log("Press Ctrl + C to close the server");
});
