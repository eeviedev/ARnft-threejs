!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).ARnftThreejs={})}(this,(function(t){"use strict";class e{constructor(){this._hasFound=!1,this._interpolationFactor=15,this._frameDrops=0,this._deltaAccuracy=10,this.trackedMatrix={delta:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],interpolated:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}}get deltaAccuracy(){return this._deltaAccuracy}set deltaAccuracy(t){this._deltaAccuracy=t}get interpolationFactor(){return this._interpolationFactor}set interpolationFactor(t){this._interpolationFactor=t}found(t){this.world=t}update(){if(this.world){let e=(new THREE.Matrix4).fromArray(this.getArrayMatrix(this.world));if(e.decompose(this.translation,this.rotation,this.scale),this._hasFound){let r=(new THREE.Vector3).setFromMatrixPosition(e);if(Math.abs(r.distanceTo(this._lastTranslation))>this._deltaAccuracy)return this._frameDrops+=1,void(this._frameDrops>3&&(this._lastTranslation=r));this._frameDrops=0,this._lastTranslation=r;for(t=0;t<16;t++)this.trackedMatrix.delta[t]=this.world[t]-this.trackedMatrix.interpolated[t],this.trackedMatrix.interpolated[t]=this.trackedMatrix.interpolated[t]+this.trackedMatrix.delta[t]/this._interpolationFactor}else{this._root.visible=!0;for(var t=0;t<16;t++)this.trackedMatrix.interpolated[t]=this.world[t];this._hasFound=!0,this._lastTranslation=(new THREE.Vector3).setFromMatrixPosition(e)}let r=(new THREE.Matrix4).fromArray(this.getArrayMatrix(this.trackedMatrix.interpolated)),i=new THREE.Matrix4;i.extractRotation(r);let a=(new THREE.Quaternion).setFromRotationMatrix(i),s=(new THREE.Euler).setFromQuaternion(a);this._root.setRotationFromEuler(s),this._root.position.set(this.translation.x,this.translation.y,this.translation.z)}else this._hasFound=!1,this._frameDrops=0,this._root.visible=!1}getArrayMatrix(t){var e=[];for(var r in t)e[r]=t[r];return e}static setMatrix(t,e){const r=[];for(const t in e)r[t]=e[t];"function"==typeof t.elements.set?t.elements.set(r):t.elements=[].slice.call(r)}}t.NFTImageTJS=class extends e{constructor(t){super(),this.imageRoot=t}addNFTImage(t,e,r){const i=new THREE.PlaneGeometry(e,r,30),a=(new THREE.TextureLoader).load(t),s=new THREE.MeshStandardMaterial({map:a}),n=new THREE.Mesh(i,s);this.imageRoot.add(n)}},t.NFTNodeTJS=e,t.ThreejsRenderer=class{constructor(t,e,r,i){this.root=r,this.renderer=new THREE.WebGLRenderer({canvas:e,context:t.renderer.context,alpha:t.renderer.alpha,premultipliedAlpha:t.renderer.premultipliedAlpha,antialias:t.renderer.antialias,stencil:t.renderer.stencil,precision:t.renderer.precision,depth:t.renderer.depth,logarithmicDepthBuffer:t.renderer.logarithmicDepthBuffer}),this.renderer.setPixelRatio(window.devicePixelRatio),this.scene=new THREE.Scene,this.extractor(i)?this.camera=new THREE.PerspectiveCamera(t.camera.fov,t.camera.ratio,t.camera.near,t.camera.far):this.camera=new THREE.Camera}extractor(t){return t}initRenderer(){this.camera.matrixAutoUpdate=!1,document.addEventListener("getProjectionMatrix",(t=>{e.setMatrix(this.camera.projectionMatrix,t.detail.proj)})),this.scene.add(this.camera);const t=new THREE.AmbientLight(16777215);this.scene.add(t),document.addEventListener("getMatrixGL_RH",(t=>{this.root.visible=!0})),document.addEventListener("nftTrackingLost",(t=>{this.root.visible=!1})),this.root.visible=!1,this.scene.add(this.root),document.addEventListener("getWindowSize",(t=>{this.renderer.setSize(t.detail.sw,t.detail.sh)}));const r=new CustomEvent("onInitThreejsRendering",{detail:{renderer:this.renderer,scene:this.scene,camera:this.camera}});document.dispatchEvent(r)}draw(){this.renderer.render(this.scene,this.camera)}},Object.defineProperty(t,"__esModule",{value:!0})}));
//# sourceMappingURL=ARnftThreejs.js.map
