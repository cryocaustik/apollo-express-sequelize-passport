const server = require("./config/server");
const vars = require("./config/vars");

server.listen(
  {
    port: process.env.PORT,
  },
  () => console.log(`Server is running on http://localhost:${process.env.PORT}`)
);
