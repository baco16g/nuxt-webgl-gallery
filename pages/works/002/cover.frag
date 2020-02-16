varying vec3 vaNormal;
varying vec3 vPosition;
varying float vExtrusion;
varying float vExtrusionDistance;

uniform samplerCube envMap;

void main(void) {
    gl_FragColor = vec4(textureCube(envMap, vaNormal).rgb, max(0.0, vExtrusionDistance - vExtrusion));
}