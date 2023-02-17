import express from "express";
import { currentlyDown } from "./hotkeys.js";

let app;
let port;
let logHistory = [];

export function start(_port) {
	port = _port;

	app = express();

	app.get("/", (req, res) => {
		res.set("Content-Type", "text/plain; charset=utf-8");
		res.send(`Bodge.js is running. Log:\n\n${logHistory.join("\n")}\nKeys currently pressed:\n${Array.from(currentlyDown).join(", ")}`);
	})

	app.listen(port, () => {
		console.log(`Running. Server URL: http://localhost:${port}/\n`);
	});
};

export function log(msg) {
	logHistory.push(`${new Date()}: ${msg}`);
};

export function clearLogHistory() {
	logHistory = [];
	log("The log was cleared");
};