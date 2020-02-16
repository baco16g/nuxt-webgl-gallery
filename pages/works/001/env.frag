varying vec3 vNormal;

void main(void) {
    gl_FragColor = vec4(vec3(dot(vNormal, vec3(0.2)) * .5), 1.0);
}