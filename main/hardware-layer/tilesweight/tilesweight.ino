#include "HX711.h"
HX711 loadcell;

#include <tinyNeoPixel_Static.h>
#define PIN            1
#define NUMPIXELS      24
byte pixels[NUMPIXELS * 3];
tinyNeoPixel leds = tinyNeoPixel(NUMPIXELS, PIN, NEO_GRB, pixels);


void setup() {
  pinMode(PIN,OUTPUT);

  // 1. HX711 circuit wiring
  const int LOADCELL_DOUT_PIN = 2;
  const int LOADCELL_SCK_PIN = 7;

  // 2. Adjustment settings
  const long LOADCELL_OFFSET = 50682624;
  const long LOADCELL_DIVIDER = 5895655;

  // 3. Initialize library
  loadcell.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  loadcell.set_scale(LOADCELL_DIVIDER);
  loadcell.set_offset(LOADCELL_OFFSET);

  // 4. Acquire reading
  if (loadcell.wait_ready_timeout(2000)) {
      loadcell.set_scale();
      loadcell.tare();
      
  }
}

void loop() {
  long reading = loadcell.get_units(10);  
  if(reading < 10000) {
    leds.fill(leds.Color(0, 150, 0), 0, 25);
  } else {
    if(reading < 400000){
    leds.fill(leds.Color(0, 0, 150), 0, 25);
    } else {
      leds.fill(leds.Color(150, 0, 0), 0, 25);
    }
  }
  leds.show();
}
