# 45SecondTimer-Wearable
A wearable version of a 45 second timer designed for roller hockey referees based on the BBC micro:bit

Uses the BBC micro:bit radio to communicate with other micro:bits so multiple referees can share the timer.

The radio channel number is configurable in the source as you might want to avoid malicious interference.

The BBC micro:bit watch kit from Cool Components is a suitable souce of the components https://coolcomponents.co.uk/products/micro-bit-watch-kit (but don't forget to make sure you have CR2025 batteries for this one).

See the Wiki pages for more details and an alternative kit

5th May 2020
Added resume functionality (i.e. 2nd click of stop button) for the scenarios where a ball goes out of play and so you restart the 45 second count from where it was rather than a fresh 45 seconds.  When stopped an LED at the top of the middle row will be lit, and another click of the stop button will carry on from that point.
