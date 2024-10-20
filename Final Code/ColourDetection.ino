//https://github.com/make2explore/Circuit-Playground-Express/blob/main/Codes/Arduino/ColorSensor/ColorSensor.ino

#include <Adafruit_CircuitPlayground.h>
#include <Wire.h>
#include <SPI.h>

#define NUMPIXELS 10  // Number of NeoPixels on the Circuit Playground Express

void setup() {
  Serial.begin(115200);
  // Initialize Circuit Playground library.
  CircuitPlayground.begin();
  CircuitPlayground.strip.setBrightness(50);
  CircuitPlayground.playTone(1600, 200);
  delay(50);
}

void loop() {
  // Detect if the left or right button is pressed to trigger color detection
  if (CircuitPlayground.leftButton() || CircuitPlayground.rightButton()) {
    detectColor();
  }
}

// Function to detect color
void detectColor() {
  // Turn off all pixels before starting the color detection process
  CircuitPlayground.clearPixels();
  
  // Declare variables to store color intensity readings
  uint8_t red, green, blue;

  // Call the senseColor function to get the red, green, blue components
  CircuitPlayground.senseColor(red, green, blue);

  // Print out the color components
  Serial.print("Color Detected: Red = ");
  Serial.print(red);
  Serial.print(" | Green = ");
  Serial.print(green);
  Serial.print(" | Blue = ");
  Serial.println(blue);

  // Apply gamma correction to make the LED brightness appear more linear
  red   = CircuitPlayground.gamma8(red);
  green = CircuitPlayground.gamma8(green);
  blue  = CircuitPlayground.gamma8(blue);

  // Set all NeoPixels to the detected color
  for (int i = 0; i < NUMPIXELS; ++i) {
    CircuitPlayground.strip.setPixelColor(i, red, green, blue);
  }
  CircuitPlayground.strip.show();

  // Play a tone to indicate successful detection
  CircuitPlayground.playTone(1600, 150);
  
  // Wait for 3 seconds before resetting the pixels
  delay(3000);
  CircuitPlayground.clearPixels();
  delay(50);
}

// Optional: Function to create a rainbow cycle effect
void rainbowCycle(uint8_t wait) {
  uint16_t i, j;
  for (j = 0; j < 256 * 5; j++) { // 5 cycles of all colors on wheel
    for (i = 0; i < CircuitPlayground.strip.numPixels(); i++) {
      CircuitPlayground.strip.setPixelColor(i, Wheel(((i * 256 / CircuitPlayground.strip.numPixels()) + j) & 255));
    }
    CircuitPlayground.strip.show();
    delay(wait);
  }
}

// Input a value 0 to 255 to get a color value.
// The colors are a transition r - g - b - back to r.
uint32_t Wheel(byte WheelPos) {
  WheelPos = 255 - WheelPos;
  if (WheelPos < 85) {
    return CircuitPlayground.strip.Color(255 - WheelPos * 3, 0, WheelPos * 3);
  }
  if (WheelPos < 170) {
    WheelPos -= 85;
    return CircuitPlayground.strip.Color(0, WheelPos * 3, 255 - WheelPos * 3);
  }
  WheelPos -= 170;
  return CircuitPlayground.strip.Color(WheelPos * 3, 255 - WheelPos * 3, 0);
}
