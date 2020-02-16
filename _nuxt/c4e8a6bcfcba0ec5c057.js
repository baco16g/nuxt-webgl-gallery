(window.webpackJsonp=window.webpackJsonp||[]).push([[8,7],{163:function(e,n,t){"use strict";t.r(n);t(152);var r=t(158),o=t(153),c=t(154),v=t(151),l=t(155),m=t(156),f=t(157);t.d(n,"default",(function(){return x}));var x=function(){function e(canvas){Object(o.a)(this,e);var n={width:window.innerWidth,height:window.innerHeight};this.renderer=this.createRenderer(canvas,n),this.camera=this.createCamera(n,{x:70,y:0,z:0}),this.cover=this.createCoverMesh(),this.scene=new v.p,this.controls=this.createControls(this.camera,this.renderer),this.addObjectsToScene(this.scene,[this.camera,this.cover,this.createCoreMesh(),this.createEnvMesh()]),this.renderer.render(this.scene,this.camera)}return Object(c.a)(e,[{key:"tick",value:function(){this.controls.update(),this.renderer.render(this.scene,this.camera),this.cover.material.uniforms.time.value+=.01,requestAnimationFrame(this.tick.bind(this))}},{key:"addObjectsToScene",value:function(e,n){e.add.apply(e,Object(r.a)(n))}},{key:"createControls",value:function(e,n){var t=new l.a(e,n.domElement);return t.enableDamping=!0,t.dampingFactor=.1,t}},{key:"createRenderer",value:function(canvas,e){var n=new v.y({canvas:canvas,antialias:!0});return n.setPixelRatio(window.devicePixelRatio),n.setSize(e.width,e.height),n}},{key:"createCamera",value:function(e,n){var t=new v.l(40,e.width/e.height);return t.position.set(n.x,n.y,n.z),t}},{key:"generateVertices",value:function(){var e=new v.h(10,3);return(new m.a).modify(e),{faces:e.faces,vertices:e.vertices}}},{key:"getFaceNomarls",value:function(e){return e.map((function(e){return e.vertexNormals.map((function(){return e.normal.toArray()}))})).flat().flat()}},{key:"createCoverGeometry",value:function(){var e=this.generateVertices().faces,n=new v.g(10,3);return n.setAttribute("aNormal",new v.c(new Float32Array(this.getFaceNomarls(e)),3)),n}},{key:"createCoverShaderMaterial",value:function(){return new v.q({vertexShader:"attribute vec3 aNormal;\n\nvarying vec3 vaNormal;\nvarying vec3 vPosition;\nvarying float vExtrusion;\nvarying float vExtrusionDistance;\n\nuniform float time;\n\nconst float PI = 3.141592657;\n\nfloat exponentialInOut(float t) {\n  return t == 0.0 || t == 1.0\n    ? t\n    : t < 0.5\n      ? +0.5 * pow(2.0, (20.0 * t) - 10.0)\n      : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;\n}\n\nmat4 rotationMatrix(vec3 axis, float angle) {\n    axis = normalize(axis);\n    float s = sin(angle);\n    float c = cos(angle);\n    float oc = 1.0 - c;\n    \n    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,\n                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,\n                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,\n                0.0,                                0.0,                                0.0,                                1.0);\n}\n\nvec3 rotate(vec3 v, vec3 axis, float angle) {\n\tmat4 m = rotationMatrix(axis, angle);\n\treturn (m * vec4(v, 1.0)).xyz;\n}\n\nconst float EXTRUSION_DISTANCE = 3.; \nconst float ACTION_GAP = 0.2;\nconst float ROTATE_SPEED = 3.;\nconst float TIME_AMPLITUDE = 1.2;\n\nvoid main() {\n\tvaNormal = aNormal;\n  vPosition = position;\n  vExtrusionDistance = EXTRUSION_DISTANCE;\n\n  float offset = smoothstep(0.0, 1.0, tan(-aNormal.y * aNormal.y * ACTION_GAP * PI + time * TIME_AMPLITUDE));\n  float angle = exponentialInOut(offset) * ROTATE_SPEED;\n  float extrusion = exponentialInOut(offset) * EXTRUSION_DISTANCE;\n\n  vExtrusion = extrusion;\n  \n\tvec3 newPos = rotate(position, aNormal, angle);\n  newPos = (aNormal * extrusion) + newPos;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);\n}",fragmentShader:"varying vec3 vaNormal;\nvarying vec3 vPosition;\nvarying float vExtrusion;\nvarying float vExtrusionDistance;\n\nuniform samplerCube envMap;\n\nvoid main(void) {\n    gl_FragColor = vec4(textureCube(envMap, vaNormal).rgb, max(0.0, vExtrusionDistance - vExtrusion));\n}",uniforms:{time:{type:"f",value:0}},side:v.e,transparent:!0})}},{key:"createCoverMesh",value:function(){return new v.j(this.createCoverGeometry(),this.createCoverShaderMaterial())}},{key:"createCoreMesh",value:function(){var e=f.a,n=v.v.clone(e.uniforms);return new v.j(new v.r(9,32,32),new v.q({uniforms:n,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}))}},{key:"createEnvMesh",value:function(){var e=(new v.d).load(["px","nx","py","ny","pz","nz"].map((function(e){return"/002/cubemap/".concat(e,".jpg")})));return e.format=v.o,new v.j(new v.r(50,50,50),new v.q({vertexShader:"varying vec3 vNormal;\n\nvoid main() {\n\tvNormal = normal;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}",fragmentShader:"varying vec3 vNormal;\nvarying vec3 vPosition;\n\nuniform samplerCube envMap;\n\nvoid main(void) {\n    gl_FragColor = vec4(textureCube(envMap, vNormal).rgb, 1.0);\n}",uniforms:{envMap:{value:e}},side:v.b}))}}]),e}()},172:function(e,n,t){"use strict";t.r(n);var r=t(74),o=t(163),c=Object(r.a)({setup:function(){var canvas=Object(r.d)(null);return Object(r.c)((function(){canvas.value&&new o.default(canvas.value).tick()})),{canvas:canvas}}}),v=t(19),component=Object(v.a)(c,(function(){var e=this.$createElement,n=this._self._c||e;return n("section",{staticClass:"artwork"},[n("canvas",{ref:"canvas"})])}),[],!1,null,null,null);n.default=component.exports}}]);