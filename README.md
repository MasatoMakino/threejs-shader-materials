# threejs-shader-materials

Collection of shader materials for three.js

[Github repository](https://github.com/MasatoMakino/threejs-shader-materials)

## Demo

[HexGrid](https://masatomakino.github.io/threejs-shader-materials/demo/hexGrid.html)

[HalftoneGrid](https://masatomakino.github.io/threejs-shader-materials/demo/halftoneGrid.html)

[SquareGrid](https://masatomakino.github.io/threejs-shader-materials/demo/squareGrid.html)

[CrossGrid](https://masatomakino.github.io/threejs-shader-materials/demo/crossGrid.html)

[ContourMaterial](https://masatomakino.github.io/threejs-shader-materials/demo/contour.html)

[SkyCloudMaterial](https://masatomakino.github.io/threejs-shader-materials/demo/skyCloud.html)

[FBMDissolveMaterial](https://masatomakino.github.io/threejs-shader-materials/demo/fbmDissolve.html)

[FBMFireMaterial](https://masatomakino.github.io/threejs-shader-materials/demo/fbmFire.html)

[RimEffectMaterial](https://masatomakino.github.io/threejs-shader-materials/demo/rimEffect)

[ExpansionMaterial](https://masatomakino.github.io/threejs-shader-materials/demo/expansion)

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

threejs-billboard is [MIT licensed](LICENSE).
