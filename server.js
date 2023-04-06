// Server-side entry point

const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3000;

// /public paths sent to server will be served to root directory 
app.use("/public", express.static(path.resolve(__dirname, "frontend", "public")));

// All paths sent to server return to index.html (important to making this website an SPA)
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"))
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));