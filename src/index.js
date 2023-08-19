const app = require("./app");
const {PORT}  = process.env || 3000;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Virtue server running on http://localhost:${PORT}`);
  });
};

startServer();
