# Lightning bolt generator

A script that generates a realistic looking lightning bolt.

![alt text](example2.png?raw=true)


https://github.com/user-attachments/assets/8b5c7afe-1b2a-4c01-ab6a-471026355c38


## Usage

```js
import LightningBolt from './lightningbolt.js'

const options = {
  bgFill: false,
  margin: 100
}

const lightning = new LightningBolt(document.querySelector('canvas'), Math.random, options)

lightning.generate()
```

Generates the list of connected nodes of a class:
```js
class Node
{
  constructor(x, y, nextNode = null, fork = 0)
  {
    Object.assign(this, {x, y, nextNode, fork})
  }
}
```
Then strokes lines between all connected nodes.

## Methods and options

### Methods:
* `constructor(canvas, rand, options)` - Constructs the object of a LightningBolt class.
    * `canvas` - The canvas element.
    * `rand` - Random number generator. You can provide seedable RNG to be able to reproduce the exact bolt. See example.js.
    * `options` - The options listed [below](#the-options-and-default-values-are).
* `generate(x, y)` - generates list of nodes and draws strokes between.
    * `x, y` - The width and the height of a base rectangle for a bolt.
* `draw()` - Draws strokes between nodes. Called by `generate()`.
* `clear()` - Clears the canvas of drawn pixels. Fills with `bgColor` if `bgFill` is set. Called by `constructor()`.
* `gradientFill(x1, y1, x2, y2)` - Draws a flicker effect around the bolt. Called by `draw()` if `flicker` is set.
    * `x1, y1, x2, y2` - The coordinates of a base segment. The gradient will be centered at the middle of it.
* `drawGlow()` - Draws a glow effect around the bolt. Called by `draw()` if `glow` is set.

### The options and default values are:
```js
{
  // Distance between top and bottom
  originalSegmentLength: canvas.height * 2 / 7 >> 0, 
  // Margin from the edges of canvas
  margin: 50, 
  // Stops when the segment length * minLengthFactor is smaller
  // than originalSegmentLength
  minLengthFactor: 0.025, 
  // The base color of the bolt
  boltColor: `rgba(255, 255, 255, 0.3)`, 
  // The base width of the bolt
  boltWidth: 1, 
  // Whether to draw the flow effect surrounding the bolt
  glow: true, 
  // How many layers of glow effect to draw
  glowLayers: 4, 
  // The color of the glow effect
  glowColor: `hsl(0deg 5% 70% / 0.0%s)`, 
  // The color of the canvas background
  bgColor: `rgb(17, 14, 51)`, 
  // Whether to fill canvas with bgColor when clear() is called
  bgFill: true, 
  // Linecap effect for strokes
  lineCap: "round", 
  // Defines how likely the current node will create a fork
  // Fork is an offshoot of the current segment
  forkDepth: 4, 
  // Deepest generated fork. Used to define the width segments
  maxFork: 0, 
  // Stores all generated nodes
  nodes: [], 
  // An offset for a normal from the center of the current segment
  normalOffset: 0, 
  // Used to calculate the quotient by which normals are scaled 
  normalMultiplier: 3, 
  // Used to calculate the quotient by which normals are scaled
  normalDivider: 10, 
  // A minimum quotient for a scaling factor of normals
  normalMin: 0.4, 
  // Whether to add a flicker effect around the bolt 
  flicker: true, 
  // Configures the flicker effect
  flickerStops: [ 
    {distance: 0, color: `rgba(255, 255, 255, 0.1)`},
    {distance: 0.4, color: `rgba(255, 255, 255, 0.05)`},
    {distance: 1, color: `rgba(255, 255, 255, 0)`}
  ]
}
```

![alt text](example.png?raw=true)
![alt text](example3.png?raw=true)


https://github.com/user-attachments/assets/e808330a-60b7-4e2b-9deb-6118e9382e64


