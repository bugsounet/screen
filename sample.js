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
