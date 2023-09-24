// NeoPixel simple sketch (c) 2013 Shae Erisson, adapted to tinyNeoPixel library by Spence Konde 2019.
// released under the GPLv3 license to match the rest of the AdaFruit NeoPixel library

#if (F_CPU>7370000) //neopixel library required 7.37MHz minimum clock speed; this line is used to skip this sketch in internal testing. It is not needed in your sketches.

#include <tinyNeoPixel_Static.h>


// Which pin on the Arduino is connected to the NeoPixels?
// This example uses pin 3, which is on PORTA on all megaTinyCore boards, so default menu option will work.
#define PIN            1  

// How many Neo1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111100000000000000000000iPixels are attached to the Arduino?
#define NUMPIXELS      24

// Since this is for the static version of the library, we need to supply the pixel array
// This saves space by eliminating use of malloc() and free(), and makes the RAM used for
// the frame buffer show up when the sketch is compiled.

byte pixels[NUMPIXELS * 3];

// When we setup the NeoPixel library, we tell it how many pixels, and which pin to use to send signals.
// Note that for older NeoPixel strips you might need to change the third parameter--see the strandtest
// example for more information on possible values.

tinyNeoPixel leds = tinyNeoPixel(NUMPIXELS, PIN, NEO_GRB, pixels);

int delayval = 500; // delay for half a second

void setup() {
  pinMode(PIN,OUTPUT);
  //with tinyNeoPixel_Static, you need to set pinMode yourself. This means you can eliminate pinMode()
  //and replace with direct port writes to save a couple hundred bytes in sketch size (note that this
  //savings is only present when you eliminate *all* references to pinMode).
  //leds.begin() not needed on tinyNeoPixel
}

void loop() {

/*
  // For a set of NeoPixels the first NeoPixel is 0, second is 1, all the way up to the count of pixels minus one.
  leds.setPixelColor(0, leds.Color(0,150,0));
  delay(delayval);
  leds.setPixelColor(0, leds.Color(0,0,0));
  delay(delayval);
  */
  for (int i = 0; i < NUMPIXELS; i++) {

    // pixels.Color takes RGB values, from 0,0,0 up to 255,255,255
    leds.setPixelColor(i, leds.Color(150,150,150)); // Moderately bright green color.

    leds.show(); // This sends the updated pixel color to the hardware.

    delay(delayval); // Delay for a period of time (in milliseconds).
  }
  
  leds.fill(leds.Color(150, 0, 0), 0, 25);
  leds.show();
  delay(delayval);
  leds.fill(leds.Color(0, 150, 0), 0, 25);
  leds.show();
  delay(delayval);
  leds.fill(leds.Color(0, 0, 150), 0, 25);
  leds.show();
  delay(delayval);
}
#else //neopixel library required 7.37MHz minimum clock speed; these and following lines are used to skip this sketch in internal testing. It is not needed in your sketches.
#warning "Neopixel control requires F_CPU > 7.37MHz"
void setup() {}
void loop() {}
#endif
