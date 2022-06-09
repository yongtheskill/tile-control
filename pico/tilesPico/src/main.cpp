#include <Arduino.h>
#include <Adafruit_NeoPixel.h>

#include "HX711.h"
HX711 loadcell;

#define NPPIN 6

Adafruit_NeoPixel strip = Adafruit_NeoPixel(48, NPPIN, NEO_GRB + NEO_KHZ800);

void fillColour(uint16_t n, uint32_t c)
{
    for (uint16_t i = n * 24; i < (n + 1) * 24; i++)
    {
        strip.setPixelColor(i, c);
        strip.show();
    }
}

// 1. HX711 circuit wiring
const int LOADCELL_DOUT_PIN = 12;
const int LOADCELL_SCK_PIN = 13;

// 2. Adjustment settings
const long LOADCELL_OFFSET = -4800;
const long LOADCELL_DIVIDER = 23100;

void setup()
{
    stdio_init_all();

    for (int i = 0; i < 5; i++)
    {
        printf("Waiting...\n");
        gpio_put(PICO_DEFAULT_LED_PIN, 1);
        sleep_ms(500);
        gpio_put(PICO_DEFAULT_LED_PIN, 0);
        sleep_ms(500);
    }

    printf("init leds");
    strip.begin();
    strip.setBrightness(50);
    strip.show(); // Initialize all pixels to 'off'

    fillColour(0, strip.Color(255, 255, 255));
    sleep_ms(2000);
    fillColour(1, strip.Color(255, 255, 255));

    // 3. Initialize library
    loadcell.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
    digitalWrite(13, LOW);
    loadcell.set_scale(LOADCELL_DIVIDER);
    loadcell.set_offset(LOADCELL_OFFSET);

    printf("calibrating");
    loadcell.tare(100);
    printf("Offset: %ld\n", loadcell.get_offset());
}

void loop()
{
    loadcell.set_gain(32);
    const double weight1 = loadcell.get_units(1);
    // 4. Acquire reading
    printf("Weight: %.6f\n", weight1);

    if (weight1 < 20)
    {
        fillColour(0, strip.Color(255, 0, 0));
    }
    else if (weight1 < 40)
    {
        fillColour(0, strip.Color(255, 150, 0));
    }
    else
    {
        fillColour(0, strip.Color(0, 255, 0));
    }

    loadcell.set_gain(128);
    const double weight2 = (loadcell.get_units(1) - 2.91) * 4;
    // const double weight2 = loadcell.get_units(1);
    printf("Weight2: %.6f\n", weight2);

    if (weight2 < 20)
    {
        fillColour(1, strip.Color(255, 0, 0));
    }
    else if (weight2 < 40)
    {
        fillColour(1, strip.Color(255, 150, 0));
    }
    else
    {
        fillColour(1, strip.Color(0, 255, 0));
    }
}