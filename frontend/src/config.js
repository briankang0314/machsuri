// config.js
const SERVER_PORT =
  process.env.REACT_APP_SERVER_PORT || "http://localhost:5001";
const FRONT_PORT = process.env.REACT_APP_FRONT_PORT || "http://localhost:3000";
export { SERVER_PORT, FRONT_PORT };
