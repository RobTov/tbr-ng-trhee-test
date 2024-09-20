import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import * as THREE from 'three';

@Component({
  selector: 'app-model',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './model.component.html',
  styleUrl: './model.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelComponent {
  @ViewChild('container') containerRef!: ElementRef;
  @ViewChild('canvas') canvasRef!: ElementRef;

  // * Stage Properties
  fieldOfView: number = 1;
  nearClippingPane: number = 1;
  farClippingPane: number = 1000;

  // * Scene Properties
  camera!: THREE.PerspectiveCamera;
  controls!: OrbitControls;
  ambientLight!: THREE.AmbientLight;
  ligth1!: THREE.PointLight;
  ligth2!: THREE.PointLight;
  ligth3!: THREE.PointLight;
  ligth4!: THREE.PointLight;
  private model: any;
  directionalLight!: THREE.DirectionalLight;

  // * Helper Properties
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  loaderGLTF = new GLTFLoader();
  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;

  private getAspectRatio(): number {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private createScene(): void {
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0xd4d4d8);
    this.scene.background = new THREE.Color(0x000924);
    this.loaderGLTF.load('model/ancient_coin/scene.gltf', (gtlf: GLTF) => {
      this.model = gtlf.scene.children[0];
      // console.log(this.model);
      let box = new THREE.Box3().setFromObject(this.model);
      box.getCenter(this.model.position);
      this.model.position.multiplyScalar(-1);
      this.scene.add(this.model);
    });

    // * Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );

    this.camera.position.x = 100;
    this.camera.position.y = 100;
    this.camera.position.z = 100;
    4;
    this.ambientLight = new THREE.AmbientLight(0x00000, 100);
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffdf04, 100);
    this.directionalLight.position.set(0, 1, 0);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);

    this.ligth1 = new THREE.PointLight(0x4b371c, 10);
    this.ligth1.position.set(0, 200, 400);
    this.scene.add(this.ligth1);

    this.ligth2 = new THREE.PointLight(0x4b371c, 10);
    this.ligth2.position.set(500, 100, 0);
    this.scene.add(this.ligth2);

    this.ligth3 = new THREE.PointLight(0x4b371c, 10);
    this.ligth3.position.set(0, 100, -500);
    this.scene.add(this.ligth3);

    this.ligth4 = new THREE.PointLight(0x4b371c, 10);
    this.ligth4.position.set(-500, 300, 500);
    this.scene.add(this.ligth4);
  }

  createControls(): void {
    const renderer = new CSS2DRenderer();
    renderer.domElement = this.canvasRef.nativeElement;
    renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight);
    this.containerRef.nativeElement.appendChild(renderer.domElement);
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.autoRotate = true;
    this.controls.enableZoom = true;
    this.controls.enablePan = false;
    this.controls.update();
  }

  private animateModel(): void {
    if (this.model) {
      this.model.rotation.z += 0.005;
    }
  }

  private startRenderingLoop() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    let component: ModelComponent = this;
    (function render() {
      component.renderer.render(component.scene, component.camera);
      component.animateModel();
      requestAnimationFrame(render);
    })();
  }

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
    this.createControls();
  }
}
