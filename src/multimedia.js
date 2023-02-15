import { swapKeys, Key } from "./util/swapKeys.js";

swapKeys([Key.F7, "F7"], [Key.AudioPrev, "MEDIA_PREV_TRACK"]);
swapKeys([Key.F8, "F8"], [Key.AudioPause, "MEDIA_PLAY_PAUSE"]);
swapKeys([Key.F9, "F9"], [Key.AudioNext, "MEDIA_NEXT_TRACK"]);