import { KeyboardClass, providerRegistry } from "@nut-tree/nut-js";

export { Key } from "@nut-tree/nut-js";
export const keyboard = new KeyboardClass(providerRegistry);
keyboard.config.autoDelayMs = 0;

export async function tapKeys(keys) {
	if (! Array.isArray(keys)) keys = [keys];

	await keyboard.pressKey(...keys);
	await keyboard.releaseKey(...keys);
};