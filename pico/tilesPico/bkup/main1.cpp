#include <Arduino.h>

#include "HX711.h"
HX711 loadcell;

// 1. HX711 circuit wiring
const int LOADCELL_DOUT_PIN = 12;
const int LOADCELL_SCK_PIN = 13;

// 2. Adjustment settings
const long LOADCELL_OFFSET = -4800;
const long LOADCELL_DIVIDER = 23100;

void setup() {
    stdio_init_all();
    

    for (int i=0; i < 5; i++)
    {
        printf("Waiting...\n");
        gpio_put(PICO_DEFAULT_LED_PIN, 1);
        sleep_ms(500);
        gpio_put(PICO_DEFAULT_LED_PIN, 0);
        sleep_ms(500);
    }

    // 3. Initialize library
    loadcell.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
    digitalWrite(13, LOW);
    loadcell.set_scale(LOADCELL_DIVIDER);
    loadcell.set_offset(LOADCELL_OFFSET);

    printf("calibrating");
    loadcell.tare(100);
    printf("Offset: %ld\n", loadcell.get_offset());
}

void loop() {
    // 4. Acquire reading
    printf("Weight: %.6f\n", loadcell.get_units(1));
}