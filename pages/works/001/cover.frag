varying vec3 vNormal;
varying vec3 vPosition;

#include <common>
#include <bsdfs>
#include <lights_pars_begin>

void main(void) {
    vec4 addedLights = vec4(0.3, 0.3, 0.3, 1.0);
    for(int l = 0; l < NUM_POINT_LIGHTS; l++) {
        vec3 adjustedLight = pointLights[l].position;
        vec3 lightDirection = normalize(vPosition - adjustedLight);
        addedLights.rgb += clamp(dot(-lightDirection, vNormal), 0.0, 1.0) * pointLights[l].color;
    }
    vec3 lights = ambientLightColor * addedLights.xyz;
    gl_FragColor = vec4(vec3(1.0) * lights, 1.0);
}