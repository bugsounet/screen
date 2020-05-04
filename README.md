# screen

single node routine for managing your screen

## Installation

```sh
npm install @bugsounet/screen
```

## Sample with screen contructor

```js
const Screen = require("./index.js")

this.config = {
  delay: 10 * 1000,
  turnOffDisplay: true,
  ecoMode: true,
  displayCounter: true,
  detectorSleeping: true,
  governorSleeping: true,
  rpi4: false,
  linux: false
}

var debug = true

this.screen = new Screen(this.config, callback, debug, detectorControl, governorControl)
this.screen.activate()
setTimeout(() => { this.screen.stop() } , 15 * 1000)

function callback(noti, value) {
  if (noti == "SCREEN_TIMER") console.log ("Turn off in", value)
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
- `detectorSleeping` - send a notification to manage detector when screen is off
- `governorSleeping` - send a notification to manage governor when screen is off
- `rpi4` -  rpi4 support (use dpms)
- `linux` - linux support (use dpms)

### callback (notification,value)

- `SCREEN_TIMER` - Display the count down before sleeping mode
- `SCREEN_SHOWING` - return notification for showing modules or other (require `ecoMode`)
- `SCREEN_HIDING` - return notification for hiding modules or other (require `ecoMode`)
- `SCREEN_STATE` - return object with actual screen state<br>
object value:
  * `running`: return `true` if `screen` main script with count down is running
  * `locked`: return `true` if `screen` function is locked
  * `power`: return `true` if your display is On
```js
{
  running: true,
  locked: false,
  power: true
}
```
### detectorControl

require [@bugsounet/snowboy](https://www.npmjs.com/package/@bugsounet/snowboy) or compatible

- `SNOWBOY_START` - return notification for start your detector
- `SNOWBOY_STOP` - return notification for stop your detector

### governorControl

require [@bugsounet/governor](https://www.npmjs.com/package/@bugsounet/governor)

- `GOVERNOR_WORKING` - return notification to change your governor to working configuration
- `GOVERNOR_SLEEPING` - return notification to change your governor to sleeping configuration

### debug

if you want debuging information, just set to `true`

## Functions
 * `activate()`: activate main `screen` script with count down (use it with first use)
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
 * you can use only `wantedPowerDisplay()` or `setPowerDisplay()` without main script !
