// This project is for a 45 second timer for roller hockey matches
// It will communicate with other micro:bits running the same app
// so that both referees/timekeepers can be in sync
// © Tony Sollars 2020 
// contact me at tony dot sollars at gmail dot com

led.setBrightness(100); // set the brightness level as appropriate for your situation
radio.setGroup(169);  // configure the same for all micro:bits in a group
radio.setTransmitPower(7);  // set the power so it works across the distance of a roller hockey rink
let startTime = 0
let elapsed = 0
let lastNumber = 0
let remaining = 0
let tens = 0
let ones = 0
basic.showString("S")
let controller = 0  // for future use - designed so a device knows if it was the one that started the timer running

input.onButtonPressed(Button.A, function () {
    startTime = input.runningTime()
    radio.sendValue("start", 0);
    controller = 1;
})
input.onButtonPressed(Button.B, function () {
    startTime = 0
    radio.sendValue("stop", 0);
    basic.showString("S");
    controller = 0;
})

radio.onReceivedValue(function (name: string, value: number) {
    if (name == "start") {
        startTime = input.runningTime();
        controller = 0;
    }
    else if (name == "stop") {
        startTime = 0;
        basic.showString("S");
        controller = 0;
    }
})

control.inBackground(function () {
    while (true) {
        if (startTime != 0) {
            elapsed = input.runningTime() - startTime;
            remaining = Math.ceil(((45000 - elapsed) / 1000));
            if (remaining < 0) {
                basic.showNumber(0)
                music.playTone(262, music.beat(BeatFraction.Whole))
                startTime = 0
            }
            else {
                if (remaining <= 10) {
                    if (remaining != lastNumber) {
                        if (remaining <= 9) {
                            basic.showNumber(remaining);
                            music.playTone(262, music.beat(BeatFraction.Sixteenth))
                        }
                        else {
                            basic.showString("X");
                            music.playTone(262, music.beat(BeatFraction.Sixteenth));

                        }
                        lastNumber = remaining;
                    }
                }
                else {
                    ones = remaining % 10
                    tens = Math.floor(remaining / 10)
                    basic.clearScreen()
                    switch (tens) {
                        case 4:
                            led.plot(0, 1)
                        case 3:
                            led.plot(0, 2)
                        case 2:
                            led.plot(0, 3)
                        case 1:
                            led.plot(0, 4)
                    }
                    switch (ones) {
                        case 9:
                            led.plot(4, 0)
                        case 8:
                            led.plot(3, 1)
                        case 7:
                            led.plot(4, 1)
                        case 6:
                            led.plot(3, 2)
                        case 5:
                            led.plot(4, 2)
                        case 4:
                            led.plot(3, 3)
                        case 3:
                            led.plot(4, 3)
                        case 2:
                            led.plot(3, 4)
                        case 1:
                            led.plot(4, 4)

                    }
                }
            }
        }
        basic.pause(100)
    }
})