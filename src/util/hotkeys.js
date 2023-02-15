import { GlobalKeyboardListener } from "node-global-key-listener";

const MODIFIERS = new Set([
	"LEFT CTRL",
	"LEFT META",
	"LEFT ALT",
	"LEFT SHIFT",
	"LEFT CTRL",
	"RIGHT ALT",
	"RIGHT CTRL",
	"RIGHT SHIFT"
]);
const IGNORE_FOR_TIME = 300;

let debugKeys = false;
export function enableKeyDebug() {
	debugKeys = true;
};
export function disableKeyDebug() {
	debugKeys = false;
};

let pressed = new Map();
let ignoreUntil = 0;

(new GlobalKeyboardListener()).addListener((e) => {
	const shouldIgnore = Date.now() < ignoreUntil;
	const name = e.name == ""? e.rawKey.name : e.name;

	const isThisKeyPressed = e.state == "DOWN";
	const wasPressed = !!pressed.get(name);
	if (isThisKeyPressed == wasPressed) return;

	pressed.set(name, isThisKeyPressed);

	if (isThisKeyPressed) {
		currentlyDown.add(name);
	}
	else {
		currentlyDown.delete(name);
		if (debugKeys) console.log(` -> Released: ${name} (${e.vKey})`);
	}

	let shouldBlock = false;
	if (isThisKeyPressed) {
		const keyListeners = listeners.get(name)?? [];
		for (const listenerData of keyListeners) {
			const [
				callback, otherKeys,
				strictness
			] = listenerData;

			let othersPressed = true;
			for (const key of otherKeys) {
				if (! isPressed(key)) {
					othersPressed = false;
					break;
				}
			}
			if (! othersPressed) continue;
			if (strictness != 0) {
				const excessKeys = Array.from(currentlyDown).filter(key =>
					! (otherKeys.includes(key) || key == name)
				);
				if (strictness == 1) {
					if (excessKeys.find(key => MODIFIERS.has(key)) != null) continue;
				}
				else if (strictness == 2) {
					if (excessKeys.length != 0) continue;
				}
			}

			if (shouldIgnore) {
				if (debugKeys) {
					console.log(`The hotkey ${[name, ...otherKeys]} was pressed, but no callbacks were called because it was too close to the last hotkey trigger. IGNORE_FOR_TIME is ${IGNORE_FOR_TIME}ms.`);
					return;
				}
			}
			else {
				if (debugKeys) console.log(`A hotkey has been pressed: ${[name, ...otherKeys]}, and a callback was called.`);
	
				const output = callback(shouldBlock); // If another function has already partly blocked the combo
				ignoreUntil = Date.now() + IGNORE_FOR_TIME;
				if (output === undefined || output == "BLOCK_ALL") return true;
				else if (output == "BLOCK") shouldBlock = true; // Still run other callbacks, but block the combo to other applications
			}
		}

		if (! shouldBlock) { // No hotkey was pressed
			if (debugKeys) console.log(`Pressed: ${name} (${e.vKey})`);
		}
	}

	return shouldBlock;
});

export const isPressed = keyName => !!pressed.get(keyName);
export const currentlyDown = new Set();

let listeners = new Map();
export function addHotkey(combo, callback, strictness = 1) {
	if (! Array.isArray(combo)) combo = [combo];
	combo = new Set(combo);

	for (const key of combo) {
		if (! listeners.has(key)) listeners.set(key, []);

		listeners.get(key).push([
			callback,
			Array.from(combo).filter(filterKey => filterKey != key),
			strictness
		]);
	}
};