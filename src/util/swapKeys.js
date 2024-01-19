import { keyboard } from "./instantKeyboard.js";
import { listenForAnyKey } from "./hotkeys.js";
export { Key } from "@nut-tree/nut-js";

export function swapKeys([keyEnum1, keyName1], [keyEnum2, keyName2]) {
	let ignoreNext = false;
	listenForAnyKey(({ name, isDown }) => {
		const isKey1 = name === keyName1;
		const isKey2 = name === keyName2;
		if (isKey1 || isKey2) {
			if (ignoreNext) {
				ignoreNext = false;
				return;
			}

			if (isDown) {
				keyboard.pressKey(isKey1? keyEnum2 : keyEnum1);
			}
			else {
				keyboard.releaseKey(isKey1? keyEnum2 : keyEnum1);
			}
			ignoreNext = true;
			return "BLOCK_ALL";
		}
	});
};