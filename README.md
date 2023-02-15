# Bodge.js
Bodge.js is a simple template for automating things with JavaScript, potentially being a replacement for AutoHotKey or AutoIt. This is currently... well, a bit botched. But I'd like to expand this in the future to have things like a command palette for uncommonly used automations.

At the moment, this mostly just provides a couple of utility functions to make things easier.

# How to use
To enable the automations, run `npm i` in the folder if you haven't already and then run `npm start` or `node index.js`. You can also run the program in the background on Windows by running the "startup.vbs" file. You can stop it by ending both of the 2 Node.js processes in the background tasks of Task Manager.

By default, the macros: capture.js and multimedia.js, run with this program. Capture.js remaps numpad divide + C to the gamebar clip shortcut (Windows + Alt + G), so that I can use clip that on a controller by mapping hold capture to numpad divide + C (it doesn't work if you map it to the gamebar shortcut directly). And multimedia.js swaps the F7-F9 keys with the multimedia keys (pressing function + the key makes them act as function keys), since I wanted most of my keys to act as function keys.

Write your automations as js files in the src folder, then import them in the index.js file. Like this:
```js
/* Import your automations here */
// ...
import "./src/newAutomation.js";
// ...
```

Once you've got your automations working, you'll probably want to configure them to run on startup. On Windows, you can do this as follows:
 * Open the template folder and find the startup.vbs file
 * Open run with Windows + R and type: `shell:startup`
 * Drag that startup.vbs file in the other File Explorer window while holding alt (to create a link)
 * Rename the link to something like "bodgeJS.vbs"

You'll need to either run the file manually or restart your computer to run it. You can then check if it's running by going to `http://localhost:7001` in your browser, it should say "Bodge.js is running". You can change its port in the index.js file.

If you want to work on your automations again, stop the server by stopping both of the Node.js processes in Task Manager, and run it again from the command line as normal. When you're done, run the vbs script again or restart.

# Uninstalling
Just delete the vbs script from your startup folder and optionally delete the template folder.

# API
Bodge.js mostly just adds a few wrappers for [nut.js](https://nutjs.dev/) and [node-global-key-listener](https://www.npmjs.com/package/node-global-key-listener). The first handles emulating keyboard and mouse inputs as well as scanning for things on screen, while the latter handles detecting hotkeys. Of course, you can still use both directly, and you'll generally need to for nut.js.

## src/util/hotkeys.js
This should be able to replace node-global-key-listener in most situations. The problem I had with the underlying API is that it seems to repeatly fire events instead of just firing one when the key is first pressed. This wrapper also provides logic for only calling the callback if a combo (or just a single key), is pressed.

Exports:
 * addHotKey(combo: **string[]** | **string**, callback(otherIsBlocking: **boolean**) -> **undefined** | **string**, strictness: **number** = **1**) -> **void**
 Adds a callback to be run when the combo (or single key) is pressed. Key names are from `globalKeyListenerEvent.name` or `globalKeyListenerEvent.rawKey.name` if the first is empty. You can find out key names by uncommenting out `enableKeyDebug()` in index.js.

 In the callback, returning a value sets the block mode: "BLOCK_ALL" hides the hotkey presses from all programs and other hotkeys, "BLOCK" hides it from just other programs and "NONE" just passively detects it. If you don't return a value, the default is "BLOCK_ALL". If a key press triggers 2 hotkeys, the one added first will run first, and then the second will run with it's "otherIsBlocking" argument set to true. But that's only if the hotkey before returned "BLOCK".

 * isPressed(keyName: **string**) -> **boolean**
 Returns if the key with that name is currently being pressed. Find out key names by uncommenting `enableKeyDebug()` in index.js.

 * currentlyDown: **Set**
 A set containing all the names of all the keys currently being pressed down. Find out key names by uncommenting `enableKeyDebug()` in index.js.

 * enableKeyDebug() -> **void** / disableKeyDebug() -> **void**
 Enables/disables the key debug. It logs to the console every time a key is pressed or released, as well as when a hotkey has been pressed.

## src/util/instantKeyboard.js
This is a pre-configured Nut.js keyboard that presses keys instantly.

Exports:
 * keyboard: KeyboardClass
 A Nut.js keyboard that's already configured to have no delay between keys.

 * tapKeys(keys: **Key[]** | **Key**) -> **Promise&lt;void&gt;**
 Presses the key or array of keys and immediately releases them. Unlike in the hotkeys module, keys are enums here rather than strings. The returned promise resolves when the keys have been released.

 * Key: enum
 Rexported from Nut.js

## src/util/swapKeys.js
Provides a function for easily swapping keys.

Exports:
 swapKeys(keyEnumNamePair1: **KeyEnumNamePair**, keyEnumNamePair2: **KeyEnumNamePair**) -> **void**
 Where **KeyEnumNamePair** is [keyName: **string** | **string\[\]**, keyEnum:**Key** | **Key\[\]**]

 Swaps the 2 keys by blocking them and emulating pressing the other. Since they're just hotkeys, the duration of the key presses aren't considered, so even a long press will just be remapped to a short tap. This function is primerally designed for single keys, but you can also use arrays of key names and enums.

* Key: enum
 Rexported from Nut.js

# Quick note
It should go without saying, but don't make keyloggers with this unless you've got permission, or otherwise do anything illegal or unethical. You should also make sure you're not using `enableKeyDebug()` once you're done developing an automation, as your key presses could potentially end up in a log somewhere (and probably take up a bunch of space). It's fine to use while you're developing, but you should probably disable it once you've got the few keys you wanted to check.