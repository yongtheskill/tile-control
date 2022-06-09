#include <stdio.h>
#include <pico/stdlib.h>
#include "Wire.h"


static const uint I2C_SLAVE_ADDRESS = 0x01;
static const uint I2C_BAUDRATE = 1000000; // 1M

static const uint I2C_SLAVE_SDA_PIN = PICO_DEFAULT_I2C_SDA_PIN; // 4
static const uint I2C_SLAVE_SCL_PIN = PICO_DEFAULT_I2C_SCL_PIN; // 5

static void slave_on_receive(int count) {
    // writes always start with the memory address
    hard_assert(Wire.available());
    while (Wire.available()) {        
        printf("Got  0x%02X\n", Wire.read());
    }
}

static void slave_on_request() {
    // load from memory
    uint8_t value = 0x22;
    Wire.write(value);
    gpio_put(PICO_DEFAULT_LED_PIN, 1);
    sleep_ms(100);
    gpio_put(PICO_DEFAULT_LED_PIN, 0);
}

static void setup_slave() {
    gpio_init(I2C_SLAVE_SDA_PIN);
    gpio_set_function(I2C_SLAVE_SDA_PIN, GPIO_FUNC_I2C);
    gpio_pull_up(I2C_SLAVE_SDA_PIN);

    gpio_init(I2C_SLAVE_SCL_PIN);
    gpio_set_function(I2C_SLAVE_SCL_PIN, GPIO_FUNC_I2C);
    gpio_pull_up(I2C_SLAVE_SCL_PIN);

    i2c_init(i2c0, I2C_BAUDRATE);

    // setup Wire for slave mode
    Wire.onReceive(slave_on_receive);
    Wire.onRequest(slave_on_request);
    // in this implementation, the user is responsible for initializing the I2C instance and GPIO
    // pins before calling Wire::begin()
    Wire.begin(I2C_SLAVE_ADDRESS);
}

int main(void)
{  
    stdio_init_all();
    
    gpio_init(PICO_DEFAULT_LED_PIN);
    gpio_set_dir(PICO_DEFAULT_LED_PIN, GPIO_OUT);

    setup_slave();

    printf("Init done\n");

    for (int i=0; i < 10; i++)
    {
        printf("Waiting...\n");
        gpio_put(PICO_DEFAULT_LED_PIN, 1);
        sleep_ms(100);
        gpio_put(PICO_DEFAULT_LED_PIN, 0);
        sleep_ms(100);
    }

    while (true){
    }
}
