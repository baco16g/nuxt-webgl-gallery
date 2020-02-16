import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm//controls/OrbitControls'
import { ExplodeModifier } from 'three/examples/jsm/modifiers/ExplodeModifier'
import { FresnelShader } from 'three/examples/jsm/shaders/FresnelShader'

import vertexCoverShader from '~/pages/works/001/cover.vert'
import fragmentCoverShader from '~/pages/works/001/cover.frag'
import vertexEnvShader from '~/pages/works/001/env.vert'
import fragmentEnvShader from '~/pages/works/001/env.frag'

type Position = {
  x: number
  y: number
  z: number
}
type Size2d = {
  width: number
  height: number
}

export default class Gl {
  renderer: THREE.WebGLRenderer
  camera: THREE.Camera
  lights: { [key: string]: THREE.Light }
  cover: THREE.Mesh
  controls: OrbitControls
  scene: THREE.Scene

  constructor(canvas: HTMLCanvasElement) {
    const rendererSize = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    this.renderer = this.createRenderer(canvas, rendererSize)
    this.camera = this.createCamera(rendererSize, { x: 0, y: 0, z: -50 })
    this.lights = this.createLights()
    this.cover = this.createCoverMesh()
    this.scene = new THREE.Scene()
    this.controls = this.createControls(this.camera, this.renderer)

    this.addObjectsToScene(this.scene, [
      this.camera,
      this.lights.point,
      this.lights.ambient,
      this.cover,
      this.createCoreMesh(),
      this.createEnvMesh()
    ])
    this.renderer.render(this.scene, this.camera)
  }

  public tick() {
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
    ;(this.cover.material as THREE.ShaderMaterial).uniforms.time.value += 0.01

    requestAnimationFrame(this.tick.bind(this))
  }

  public addObjectsToScene(scene: THREE.Scene, objects: THREE.Object3D[]) {
    scene.add(...objects)
  }

  public createControls(camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    return controls
  }

  public createRenderer(
    canvas: HTMLCanvasElement,
    size: Size2d
  ): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(size.width, size.height)
    return renderer
  }

  public createCamera(rendererSize: Size2d, position: Position): THREE.Camera {
    const camera = new THREE.PerspectiveCamera(
      40,
      rendererSize.width / rendererSize.height
    )
    camera.position.set(position.x, position.y, position.z)
    return camera
  }

  public createLights(): { [key: string]: THREE.Light } {
    return {
      point: new THREE.PointLight(0xFFFFFF, 2, 50, 1.0),
      ambient: new THREE.AmbientLight(0xbbbbbb)
    }
  }

  public generateVertices(): {
    faces: THREE.Face3[]
    vertices: THREE.Vector3[]
  } {
    const geometry = new THREE.IcosahedronGeometry(10, 3)
    new ExplodeModifier().modify(geometry)
    return { faces: geometry.faces, vertices: geometry.vertices }
  }

  public getFaceNomarls(faces: THREE.Face3[]): number[] {
    return faces
      .map((face) => face.vertexNormals.map(() => face.normal.toArray()))
      .flat()
      .flat()
  }

  public createCoverGeometry() {
    const { faces } = this.generateVertices()
    const geometry = new THREE.IcosahedronBufferGeometry(10, 3)
    geometry.setAttribute(
      'aNormal',
      new THREE.BufferAttribute(new Float32Array(this.getFaceNomarls(faces)), 3)
    )
    return geometry
  }

  public createCoverShaderMaterial(): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
      vertexShader: vertexCoverShader,
      fragmentShader: fragmentCoverShader,
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.lights,
        {
          time: { type: 'f', value: 0 }
        }
      ]),
      side: THREE.DoubleSide,
      lights: true
    })
  }

  public createCoverMesh(): THREE.Mesh {
    return new THREE.Mesh(
      this.createCoverGeometry(),
      this.createCoverShaderMaterial()
    )
  }

  public createCoreMesh(): THREE.Mesh {
    const textureCube = new THREE.CubeTextureLoader().load(
      ['px', 'nx', 'py', 'ny', 'pz', 'nz'].map((t) => `cubemap/${t}.png`)
    )
    textureCube.format = THREE.RGBFormat
    const shader = FresnelShader
    const uniforms = THREE.UniformsUtils.clone(shader.uniforms)
    uniforms.tCube.value = textureCube

    return new THREE.Mesh(
      new THREE.SphereGeometry(9, 32, 32),
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader,
        blending: THREE.NormalBlending
      })
    )
  }

  public createEnvMesh(): THREE.Mesh {
    return new THREE.Mesh(
      new THREE.SphereGeometry(50, 50, 50),
      new THREE.ShaderMaterial({
        vertexShader: vertexEnvShader,
        fragmentShader: fragmentEnvShader,
        side: THREE.BackSide
      })
    )
  }
}
