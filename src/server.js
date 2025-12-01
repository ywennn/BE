const app = require("./application/web");

const PORT = 5000;

app.listen(PORT, () => {
  console.info("App running");
});
