const express = require("express");
const errorMiddleware = require("./middleware/error");

const app = express();

app.use(express.json());


//Route Imports
 const organiserRoutes = require("./routes/organiserRoutes");
 const teamRoutes = require("./routes/teamRoutes");

 app.use("/api/v1", organiserRoutes);
 app.use("/api/v1", teamRoutes);

// MiddleWare for Error

app.use(errorMiddleware);

module.exports = app;
