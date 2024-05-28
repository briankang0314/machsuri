const { createServer } = require("http");
const express = require("express");
const routes = require("./routes");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const path = require("path");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// Serve static files from the 'uploads/profile_pictures' directory
app.use(
  "/uploads/profile_pictures",
  express.static(path.join(__dirname, "uploads", "profile_pictures"))
);

// Serve static files from the 'uploads/job_post_images' directory
app.use(
  "/uploads/job_post_images",
  express.static(path.join(__dirname, "uploads", "job_post_images"))
);

app.use(routes);

const server = createServer(app);
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    server.listen(PORT, () => console.log("Server is listening on " + PORT));
  } catch (err) {
    console.error("Error starting server:", err);
    await prisma.$disconnect();
    process.exit(1); // Exit the process with an error code
  }
};

start();
