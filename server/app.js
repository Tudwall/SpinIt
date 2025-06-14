import express from "express";
import "dotenv/config";

import userRoutes from "./routes/user.routes.js";
import releaseRoutes from "./routes/release.routes.js";
import ErrorHandler from "./middlewares/exception.middleware.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/users", userRoutes);
app.use("/releases", releaseRoutes);

app.use(ErrorHandler);

app.listen(PORT, () => console.info(`server running on ${PORT}`));
