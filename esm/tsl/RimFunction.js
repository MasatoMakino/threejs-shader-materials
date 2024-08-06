// Three.js Transpiler r165
import { max, pow, sub, transformedNormalView, tslFn, vec3, } from "three/webgpu";
export const rimEffect = tslFn(([rimColor, rimPow, rimStrength, insideColor, insidePow, insideStrength]) => {
    return rimAngleEffect(rimColor, rimPow, rimStrength, insideColor, insidePow, insideStrength, vec3(0.0, 0.0, 1.0));
});
export const rimAngleEffect = tslFn(([rimColor, rimPow, rimStrength, insideColor, insidePow, insideStrength, angle,]) => {
    const addColor = vec3(0.0, 0.0, 0.0).toVar();
    const rimAngle = max(0.0, transformedNormalView.dot(vec3(angle)));
    const rimGlow = sub(1.0, rimAngle);
    rimGlow.assign(pow(rimGlow, rimPow));
    addColor.rgb.addAssign(rimColor.mul(rimGlow.mul(rimStrength)));
    const insideGlow = pow(rimAngle, insidePow);
    addColor.rgb.addAssign(insideColor.mul(insideGlow.mul(insideStrength)));
    return addColor;
});
