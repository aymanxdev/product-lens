import dotenv from "dotenv";
import { establishMongoConnection, createExpressApp } from "./config";

// Environment variables
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: ".env.test" });
} else {
  dotenv.config({ path: ".env.development" });
}

establishMongoConnection();

const app = createExpressApp();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
