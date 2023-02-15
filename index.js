const PORT = 7001;

import express from "express";
import { enableKeyDebug } from "./src/util/hotkeys.js";
//enableKeyDebug();
/* ^^ uncomment to get the key names to use with addHotKey */

/* Import your automations here */
import "./src/multimedia.js";
import "./src/capture.js";
//import "./src/calculator.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Bodge.js is running");
})

app.listen(PORT, () => {
	console.log(`Running. Server URL: http://localhost:${PORT}/\n`);
});