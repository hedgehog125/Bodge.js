import { KeyboardClass, providerRegistry } from "@nut-tree/nut-js";

export { Key } from "@nut-tree/nut-js";
export const keyboard = new KeyboardClass(providerRegistry);
keyboard.config.autoDelayMs = 0;

export async function tapKeys(keys, duration = 500) {
	if (! Array.isArray(keys)) keys = [keys];

	await keyboard.pressKey(...keys);
	await new Promise(resolve => setTimeout(resolve, duration));
	await keyboard.releaseKey(...keys);
};