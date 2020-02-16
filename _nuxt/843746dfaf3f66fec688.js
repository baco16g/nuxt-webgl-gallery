(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{162:function(e,n,t){"use strict";t.r(n);t(152);var r=t(158),o=t(153),c=t(154),l=t(151),v=t(155),h=t(156),m=t(157);t.d(n,"default",(function(){return d}));var d=function(){function e(canvas){Object(o.a)(this,e);var n={width:window.innerWidth,height:window.innerHeight};this.renderer=this.createRenderer(canvas,n),this.camera=this.createCamera(n,{x:0,y:0,z:-50}),this.lights=this.createLights(),this.cover=this.createCoverMesh(),this.scene=new l.p,this.controls=this.createControls(this.camera,this.renderer),this.addObjectsToScene(this.scene,[this.camera,this.lights.point,this.lights.ambient,this.cover,this.createCoreMesh(),this.createEnvMesh()]),this.renderer.render(this.scene,this.camera)}return Object(c.a)(e,[{key:"tick",value:function(){this.controls.update(),this.renderer.render(this.scene,this.camera),this.cover.material.uniforms.time.value+=.01,requestAnimationFrame(this.tick.bind(this))}},{key:"addObjectsToScene",value:function(e,n){e.add.apply(e,Object(r.a)(n))}},{key:"createControls",value:function(e,n){var t=new v.a(e,n.domElement);return t.enableDamping=!0,t.dampingFactor=.1,t}},{key:"createRenderer",value:function(canvas,e){var n=new l.y({canvas:canvas,antialias:!0});return n.setPixelRatio(window.devicePixelRatio),n.setSize(e.width,e.height),n}},{key:"createCamera",value:function(e,n){var t=new l.l(40,e.width/e.height);return t.position.set(n.x,n.y,n.z),t}},{key:"createLights",value:function(){return{point:new l.m(16777215,2,50,1),ambient:new l.a(12303291)}}},{key:"generateVertices",value:function(){var e=new l.h(10,3);return(new h.a).modify(e),{faces:e.faces,vertices:e.vertices}}},{key:"getFaceNomarls",value:function(e){return e.map((function(e){return e.vertexNormals.map((function(){return e.normal.toArray()}))})).flat().flat()}},{key:"createCoverGeometry",value:function(){var e=this.generateVertices().faces,n=new l.g(10,3);return n.setAttribute("aNormal",new l.c(new Float32Array(this.getFaceNomarls(e)),3)),n}},{key:"createCoverShaderMaterial",value:function(){return new l.q({vertexShader:"attribute vec3 aNormal;\n\nvarying vec3 vNormal;\nvarying vec3 vPosition;\n\nuniform float time;\n\nconst float PI = 3.141592657;\n\nfloat exponentialInOut(float t) {\n  return t == 0.0 || t == 1.0\n    ? t\n    : t < 0.5\n      ? +0.5 * pow(2.0, (20.0 * t) - 10.0)\n      : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;\n}\n\nmat4 rotationMatrix(vec3 axis, float angle) {\n    axis = normalize(axis);\n    float s = sin(angle);\n    float c = cos(angle);\n    float oc = 1.0 - c;\n    \n    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,\n                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,\n                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,\n                0.0,                                0.0,                                0.0,                                1.0);\n}\n\nvec3 rotate(vec3 v, vec3 axis, float angle) {\n\tmat4 m = rotationMatrix(axis, angle);\n\treturn (m * vec4(v, 1.0)).xyz;\n}\n\nconst float EXTRUSION = 4.; \nconst float ACTION_GAP = 0.2;\nconst float ROTATE_SPEED = 5.;\nconst float TIME_AMPLITUDE = 1.2;\n\nvoid main() {\n\tvNormal = normal;\n  vPosition = position;\n\n  float offset = smoothstep(0.0, 1.0, sin(aNormal.x * ACTION_GAP * PI + time * TIME_AMPLITUDE));\n  float angle = exponentialInOut(offset) * ROTATE_SPEED;\n  float extrusion = exponentialInOut(offset) * EXTRUSION;\n  \n\tvec3 newPos = rotate(position, aNormal, angle);\n  newPos = (aNormal * extrusion) + newPos;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);\n}",fragmentShader:"varying vec3 vNormal;\nvarying vec3 vPosition;\n\n#include <common>\n#include <bsdfs>\n#include <lights_pars_begin>\n\nvoid main(void) {\n    vec4 addedLights = vec4(0.3, 0.3, 0.3, 1.0);\n    for(int l = 0; l < NUM_POINT_LIGHTS; l++) {\n        vec3 adjustedLight = pointLights[l].position;\n        vec3 lightDirection = normalize(vPosition - adjustedLight);\n        addedLights.rgb += clamp(dot(-lightDirection, vNormal), 0.0, 1.0) * pointLights[l].color;\n    }\n    vec3 lights = ambientLightColor * addedLights.xyz;\n    gl_FragColor = vec4(vec3(1.0) * lights, 1.0);\n}",uniforms:l.v.merge([l.u.lights,{time:{type:"f",value:0}}]),side:l.e,lights:!0})}},{key:"createCoverMesh",value:function(){return new l.j(this.createCoverGeometry(),this.createCoverShaderMaterial())}},{key:"createCoreMesh",value:function(){var e=(new l.d).load(["px","nx","py","ny","pz","nz"].map((function(e){return"/001/cubemap/".concat(e,".png")})));e.format=l.o;var n=m.a,t=l.v.clone(n.uniforms);return t.tCube.value=e,new l.j(new l.r(9,32,32),new l.q({uniforms:t,vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,blending:l.k}))}},{key:"createEnvMesh",value:function(){return new l.j(new l.r(50,50,50),new l.q({vertexShader:"varying vec3 vNormal;\n\nvoid main() {\n\tvNormal = normal;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}",fragmentShader:"varying vec3 vNormal;\n\nvoid main(void) {\n    gl_FragColor = vec4(vec3(dot(vNormal, vec3(0.2)) * .5), 1.0);\n}",side:l.b}))}}]),e}()}}]);