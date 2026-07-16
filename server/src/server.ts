import app from "./app";
import { db } from "./config/db.config";
import ENV_CONFIG from "./config/env.config";
import { verifyMailServerConnection } from "./config/nodemailer.config";

//* connect database
db(ENV_CONFIG.DB_URI);

//* listen
app.listen(ENV_CONFIG.PORT, () => {
  console.log(`Server is running at port: ${ENV_CONFIG.PORT}`);
  verifyMailServerConnection();
});
