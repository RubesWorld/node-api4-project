const server = require("./api/server");
server.listen(port, () => {
  console.log(`Server is alive on port ${port}`);
});
