attribute vec3 aNormal;

varying vec3 vaNormal;
varying vec3 vPosition;
varying float vExtrusion;
varying float vExtrusionDistance;

uniform float time;

const float PI = 3.141592657;

float exponentialInOut(float t) {
  return t == 0.0 || t == 1.0
    ? t
    : t < 0.5
      ? +0.5 * pow(2.0, (20.0 * t) - 10.0)
      : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;
}

mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
	mat4 m = rotationMatrix(axis, angle);
	return (m * vec4(v, 1.0)).xyz;
}

const float EXTRUSION_DISTANCE = 3.; 
const float ACTION_GAP = 0.2;
const float ROTATE_SPEED = 3.;
const float TIME_AMPLITUDE = 1.2;

void main() {
	vaNormal = aNormal;
  vPosition = position;
  vExtrusionDistance = EXTRUSION_DISTANCE;

  float offset = smoothstep(0.0, 1.0, tan(-aNormal.y * aNormal.y * ACTION_GAP * PI + time * TIME_AMPLITUDE));
  float angle = exponentialInOut(offset) * ROTATE_SPEED;
  float extrusion = exponentialInOut(offset) * EXTRUSION_DISTANCE;

  vExtrusion = extrusion;
  
	vec3 newPos = rotate(position, aNormal, angle);
  newPos = (aNormal * extrusion) + newPos;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}