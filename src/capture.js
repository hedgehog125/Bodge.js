import { addHotkey } from "./util/hotkeys.js";
import { tapKeys, Key } from "./util/instantKeyboard.js";

addHotkey(["NUMPAD DIVIDE", "C"], _ => {
	tapKeys(Key.LeftSuper, Key.LeftAlt, Key.G);
});