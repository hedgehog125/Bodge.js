const PORT = 7001;

import { start } from "./src/util/server.js";
import { enableKeyDebug } from "./src/util/hotkeys.js";
//enableKeyDebug();
/* ^^ uncomment to get the key names to use with addHotKey */

/* Import your automations here */
import "./src/multimedia.js";
import "./src/capture.js";
//import "./src/calculator.js";


// Start the server
start(PORT);