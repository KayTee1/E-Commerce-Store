const app = require("./app");
require("dotenv").config();

const PORT = 5000;

app.listen(PORT, () => {
  console.info(`Backend is listening on port ${PORT}`);
});
