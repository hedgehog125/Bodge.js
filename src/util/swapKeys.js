import { tapKeys } from "./instantKeyboard.js";
import { addHotkey } from "./hotkeys.js";
export { Key } from "@nut-tree/nut-js";

export function swapKeys([keyEnum1, keyName1], [keyEnum2, keyName2]) {
	addHotkey(keyName1, _ => {
		tapKeys(keyEnum2);
	});
	addHotkey(keyName2, _ => {
		tapKeys(keyEnum1);
	});
};