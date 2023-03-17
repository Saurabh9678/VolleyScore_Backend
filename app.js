const express = require("express");
const errorMiddleware = require("./middleware/error");

const app = express();

app.use(express.json());


//Route Imports
 const organiserRoutes = require("./routes/organiserRoutes");
 const teamRoutes = require("./routes/teamRoutes");
 const matchRoutes = require("./routes/matchRoutes");
 const commonRoutes = require("./routes/commonRoutes")

 app.use("/api/v1", organiserRoutes);
 app.use("/api/v1", teamRoutes);
 app.use("/api/v1", matchRoutes);
 app.use("/api/v1",commonRoutes)

// MiddleWare for Error

app.use(errorMiddleware);

module.exports = app;
