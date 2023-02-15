// I don't actually have much use for this. My brother just pointed out that my new keyboard doesn't have a calculator button (oh no, what will I do? This I suppose)

import { addHotkey } from "./util/hotkeys.js";
import childProcess from "child_process";
import { Key, tapKeys } from "./util/instantKeyboard.js";

addHotkey("F1", _ => {
	childProcess.execFile("C:\\Windows\\System32\\calc.exe", [], {
		env: {} // Don't give it my environment variables
	});
});