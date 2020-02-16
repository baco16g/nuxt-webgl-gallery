varying vec3 vNormal;
varying vec3 vPosition;

uniform samplerCube envMap;

void main(void) {
    gl_FragColor = vec4(textureCube(envMap, vNormal).rgb, 1.0);
}