# PantryShare

PantryShare is a community focused solution designed to help international university students manage their shared kitchen experiences more effectively. It allows users to share and save recipes while addressing food waste through the communal pantry system. Additionally, PantryShare includes a unique feature allowing students to store some extra ingredients that they don't plan to use before its expiration date, thereby reducing food waste and fostering a sense of community responsibility.

## Description

The project features a user-friendly website that allows students to explore, share and save recipes tailored to their cultural and dietary preferences. The platform encourages interaction through a like system to save the recipes for later, enabling users to find recipes suited to their dietary preferences, and connect with other through their cuisines. 
The platform combines bith digital and physical elements to simulate a real world experience. Students can browse through recipes, check their available ingredients, and manage their pantry directly through the website. If they find that they’re missing an ingredient, they can check the shared pantry for available items. To access the pantry, users simulate an NFC-like tap using a Playground Circuit Express with a color detection system. When a student scans a colored card, the system mimics unlocking the pantry, allowing them to store or pick up ingredients. This process integrates technology with practical needs, providing an efficient way for students to collaborate, share, and maintain their shared kitchen environment while learning from each other’s culinary experiences.

## Getting Started

### Installing

For the website
  1. Download the **Website PantryShareFinal** file with the images from the **Final Code** file

For the NFC room card tapping system
  1. Download Arduino
  2. Install Playground circuit express libraries
  3. Download the **Colourdetection.ino** code from the **Final Code** file

### Executing program
  1. Upload the **Colourdetection.ino** code to your Playground Circuit Express for colour detection
  2. Place a coloured room card on top of the light sensor <br>
<img width="106" alt="Screenshot 2024-10-21 at 1 25 18 pm" src="https://github.com/user-attachments/assets/f591e8cb-140d-45d1-9e42-e63319555d13"> <br>
  3. Click either of the buttons <br>
<img width="156" alt="Screenshot 2024-10-21 at 1 27 08 pm" src="https://github.com/user-attachments/assets/e5479542-0083-45d1-b04d-016a14d7eac0"> <br>
  4. The LED lights on the circuit will lit up the colour light sensor detected <br>
<img width="285" alt="Screenshot 2024-10-21 at 1 29 41 pm" src="https://github.com/user-attachments/assets/3117d9ab-45f4-485a-8740-99f75092ef2d"> <br>

## Authors

**FoodDesigners**
  1. Madhul Chand (47699043)
  2. Sri Indriyani Diartiwi (47736827)
  3. Annabelle Emma Nardy (47197811)
  4. YiLiang Sun (44426444)

## Acknowledgments

The colour detection code was adapted from https://github.com/make2explore/Circuit-Playground-Express/blob/main/Codes/Arduino/ColorSensor/ColorSensor.ino

In this report, We used chatGPT and Grammarly to improve and polish the report writing.
We critically reviewed and edited all AI-generated content to ensure it reflects our own
understanding and perspective.
We have applied the GenAI and MT Usage Framework to ensure my use of these tools
supports our learning objectives and adheres to academic integrity standards.
