# screen

single node routine for managing your screen

## Installation

```sh
npm install @bugsounet/screen
```

## Sample with screen contructor

```js
const Screen = require("@bugsounet/screen")

this.config = {
  delay: 10 * 1000,
  turnOffDisplay: true,
  ecoMode: true,
  displayCounter: true,
  displayBar: true,
  detectorSleeping: true,
  governorSleeping: true,
  mode: 1
}

var debug = true

this.screen = new Screen(this.config, callback, debug, detectorControl, governorControl)
this.screen.start()
setTimeout(() => { this.screen.state() } , 5 * 1000)
setTimeout(() => { this.screen.stop() } , 15 * 1000)

function callback(noti, value) {
  if (noti == "SCREEN_TIMER") console.log ("Turn off in", value)
  else if (noti == "SCREEN_BAR") console.log("Bar value", value)
  else if (noti == "SCREEN_STATE") console.log ("Status:", value)
  else console.log("Screen Notification:", noti)
}

function detectorControl(noti) {
  console.log("detectorControl Notification:", noti)
}

function governorControl(noti) {
  console.log("governorControl Notification:", noti)
}
```

## constructor of screen

Screen(screenConfig, callback, debug, detectorControl, governorControl)

### screenConfig {}

- `delay` - Time before turns off the display. (in ms).
- `turnOffDisplay` - Should the display turn off after timeout?
- `ecoMode` - send a notification to hide all module after timeout?
- `displayCounter` - send a notification with count-down before sleeping
- `displayBar` - send a notification with actual count since start (for progress bar)
- `detectorSleeping` - send a notification to manage detector when screen is off
- `governorSleeping` - send a notification to manage governor when screen is off
- `mode` - mode for turn off screen

5 modes are available:
 - mode 1: use vgencmd (RPI only)
 - mode 2: use dpms (version RPI)
 - mode 3: use tvservice (RPI only)
 - mode 4: use HDMI CEC
 - mode 5: use dpms (linux version for debian, ubuntu, ...)

note: the mode 0 disable turnOffDisplay too

### callback (notification,value)

- `SCREEN_TIMER` - Display the count down before sleeping mode (require `displayCounter`)
- `SCREEN_BAR` - Display the counter since start to sleeping mode (require `displayBar`)
- `SCREEN_SHOWING` - return notification for showing modules or other (require `ecoMode`)
- `SCREEN_HIDING` - return notification for hiding modules or other (require `ecoMode`)
- `SCREEN_PRESENCE` - return notification for USER_PRESENCE true/false
- `SCREEN_STATE` - return object with actual screen state<br>
object value:
  * `mode`: return the configuration of mode
  * `running`: return `true` if `screen` main script with count down is running
  * `locked`: return `true` if `screen` function is locked
  * `power`: return `true` if your display is On
```js
{
  mode: 1,
  running: true,
  locked: false,
  power: true
}
```
### detectorControl [optional]

require [@bugsounet/snowboy](https://www.npmjs.com/package/@bugsounet/snowboy) or compatible<br>
require `detectorSleeping` and only work with `activate()` or `start()` function

- `SNOWBOY_START` - return notification for start your detector
- `SNOWBOY_STOP` - return notification for stop your detector

### governorControl [optional]

require [@bugsounet/governor](https://www.npmjs.com/package/@bugsounet/governor)<br>
require `governorSleeping` and only work with `activate()` or `start()` function

- `GOVERNOR_WORKING` - return notification to change your governor to working configuration
- `GOVERNOR_SLEEPING` - return notification to change your governor to sleeping configuration

### debug

if you want debuging information, just set to `true`

## Functions
 * `activate()`: activate main `screen` script with count down (use it with first use)<br>
 it force turn on display when escape the script (ctl + c)
 * `start()`: start `screen` script with count down
 * `stop()`: stop `screen` script
 * `reset()`: reset count down
 * `wakeup()`: wake up the screen
 * `lock()`: lock the screen (start/stop/reset/wakeup will be ignored)
 * `unlock()`: unlock the screen
 * `wantedPowerDisplay(wanted)`: comparate actual screen state and apply it if not set.<br>
  `wanted` value is boolean:
   * `true`: turn on screen
   * `false`: turn off screen 
 * `setPowerDisplay(set)`: like `wantedPowerDisplay()` but you force to apply it
  `set` value is boolean:
   * `true`: force turn on screen
   * `false`: force turn off screen
 * `state()`: return state of `screen` in object

### Notes
 * `turnOffDisplay` work only with `activate()` or `start()` function
 * you can use only `wantedPowerDisplay()` or `setPowerDisplay()` without main script !
