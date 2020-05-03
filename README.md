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

this.screen = new Screen(this.config, callback, debug, governorControl)
this.screen.start()
setTimeout(() => { this.screen.stop() } , 15 * 1000)

function callback(noti, value) {
  if (noti == "SCREEN_TIMER") console.log ("Turn off in", value)
  else console.log("Screen Notification:", noti)
}

function governorControl(noti) {
  console.log("governorControl Notification:", noti)
}
```

## constructor of screen

Screen(screenConfig, callback, debug, governorControl)

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

- ...

### debug

if you want debuging information, just set to `true`

## Functions
 * `start()` :
 * `stop()` :
 * ...
 
## Notes
 * ...
