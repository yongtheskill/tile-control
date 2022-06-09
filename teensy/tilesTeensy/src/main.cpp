// Copyright © 2019-2020 Richard Gemmell
// Released under the MIT License. See license.txt. (https://opensource.org/licenses/MIT)

// A Simple Sensor
// Shows how to use a typical I2C sensor.
// The program configures the sensor and then reads
// from a register. This is a common pattern.
// To use it, connect a master to the Teensy on pins 18 and 19.
//
// Consider using the I2CDevice class instead of Wire to read a sensor.

#include <Arduino.h>
#include <i2c_driver.h>
#include <i2c_driver_wire.h>

int pico1 = 0x01;

void setup()
{
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);                    // start serial for output

  Wire.setClock(1000 * 1000);   // Set the clock speed before calling begin()
  Wire.begin();                         // join i2c bus
}

int inByte = 0;

void loop()
{
  digitalWrite(LED_BUILTIN, HIGH);


  if (Serial.available() > 0) {
    inByte = Serial.read();
    Serial.println(inByte);

    if (inByte == 49){
        Wire.beginTransmission(pico1);
        Wire.write(0);
        Wire.endTransmission(true);
    } 
    else if (inByte == 51){
        // Read the register
        Wire.requestFrom(pico1, 1, true);
        while(Wire.available()) {
            uint8_t c = Wire.read();
            Serial.print(c, HEX);   // Note that the byte order has changed!
        }
        Serial.println();
    } 
    else {
        Wire.beginTransmission(pico1);
        Wire.write(1);
        Wire.endTransmission(true);
    }

  }

}