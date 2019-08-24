# threejs-shader-materials

Collection of shader materials for three.js

[Github repository](https://github.com/MasatoMakino/threejs-shader-materials)

## Demo

[HexGrid](https://masatomakino.github.io/threejs-shader-materials/demo/hexGrid)

[HalftoneGrid](https://masatomakino.github.io/threejs-shader-materials/demo/halftoneGrid)

[SquareGrid](https://masatomakino.github.io/threejs-shader-materials/demo/squareGrid)

[CrossGrid](https://masatomakino.github.io/threejs-shader-materials/demo/cross_grid)

[ContourMaterial](https://masatomakino.github.io/threejs-shader-materials/demo/contour)

[SkyCloudMaterial](https://masatomakino.github.io/threejs-shader-materials/demo/skyCloud)

[FBMDissolveMaterial](https://masatomakino.github.io/threejs-shader-materials/demo/fbmDissolve)

[FBMFireMaterial](https://masatomakino.github.io/threejs-shader-materials/demo/fbmFire)

[RimEffectMaterial](https://masatomakino.github.io/threejs-shader-materials/demo/rimEffect)

[ExpansionMaterial](https://masatomakino.github.io/threejs-shader-materials/demo/expansion)

[OuterGlowMaterial](https://masatomakino.github.io/threejs-shader-materials/demo/outerGlow)

[ExpansionDissolveMaterial](https://masatomakino.github.io/threejs-shader-materials/demo/expansion_dissolve)

[SpriteCloudMaterial](https://masatomakino.github.io/threejs-shader-materials/demo/spriteCloud)

[SwirlMaterial](https://masatomakino.github.io/threejs-shader-materials/demo/swirl)

[CellularNoiseMaterial](https://masatomakino.github.io/threejs-shader-materials/demo/cellular)

[SolidClippingMaterial](https://masatomakino.github.io/threejs-shader-materials/demo/solid_clipping)

## Getting Started

### Install

```bash
npm install https://github.com/MasatoMakino/threejs-shader-materials.git --save-dev
```

### Import

threejs-shader-materials is composed of ES6 modules and TypeScript d.ts files.

At first, import classes,

```js
import { HexGridMaterial } from "threejs-shader-materials";
```

and set material.

```js
const geo = new SphereGeometry(10, 64, 64);
const mat = new HexGridMaterial();
const mesh = new Mesh(geo, mat);
scene.add(mesh);
```

## API documents

[API documents](https://masatomakino.github.io/threejs-shader-materials/api/)

## License

[MIT licensed](LICENSE).
