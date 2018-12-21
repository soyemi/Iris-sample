import { IProgram } from "../SampleProgram";
import { GraphicsRender, Camera, CameraFreeFly, SceneManager, vec3, GameObject, glmath, vec4, Utility, Material, ShaderFX, Mesh, ShaderData, DebugEntry } from "iris-gl";
import { PathTracerPipeline } from "./PathTracerPipeline";
import { Scene } from "iris-gl/dist/Scene";
import { MeshRender } from "iris-gl/dist/MeshRender";

export class PathTracer implements IProgram {
    private grender: GraphicsRender;
    private pipeline: PathTracerPipeline;
    private m_scene: Scene;
    private m_sceneMgr: SceneManager;
    private m_csgcontainer: CSGContainer;
    private static tracer:PathTracer;
    onSetupRender(grender: GraphicsRender) {
        PathTracer.tracer = this;
        this.grender = grender;
        this.m_csgcontainer = new CSGContainer();
        let pipeline = new PathTracerPipeline(this.m_csgcontainer);
        grender.setPipeline(pipeline);
        this.pipeline = pipeline;
    }

    onLoadRes(){
        return null;
    }

    onInit() {
        this.m_sceneMgr = new SceneManager();
    }

    @DebugEntry('test')
    public static test(){
        PathTracer.tracer.pipeline.toggleRenderMode();
    }

    onSetupScene() {
        let scene = new Scene();
        let camera = Camera.persepctive(null, 60, 1.0, 0.1, 100.0);
        camera.gameobject.addComponent(new CameraFreeFly());
        camera.transform.parent = scene.transform;
        camera.transform.setPosition(glmath.vec3(4,0,5));

        this.m_scene = scene;
        let matColor = new Material(this.grender.shaderLib.shaderUnlitColor);
        let container = this.m_csgcontainer;
        {
            let planeTop = new GameObject('planeTop');
            planeTop.transform.parent = scene.transform;
            let planeTopCSG = CSGObj.createPlane(planeTop, glmath.vec3(0, 5, 0), vec3.down);
            container.addObj(planeTopCSG);
            planeTop.render.material = matColor.clone();
            planeTopCSG.setColor(vec4.one);
        }
        {
            let planeBottom = new GameObject('planeBottom');
            planeBottom.transform.parent = scene.transform;
            let planeBottomCSG = CSGObj.createPlane(planeBottom, glmath.vec3(0, -5, 0), vec3.up);
            container.addObj(planeBottomCSG);
            planeBottom.render.material = matColor.clone();
            planeBottomCSG.setColor(vec4.one);
        }
        {
            let planeLeft = new GameObject('planeLeft');
            planeLeft.transform.parent = scene.transform;
            let planeLeftCSG = CSGObj.createPlane(planeLeft, glmath.vec3(5, 0, 0), vec3.right);
            container.addObj(planeLeftCSG);
            planeLeft.render.material = matColor.clone();
            planeLeftCSG.setColor(glmath.vec4(0,0,1,1));
        }
        {
            let planeRight = new GameObject('planeRight');
            planeRight.transform.parent = scene.transform;
            let planeRightCSG = CSGObj.createPlane(planeRight, glmath.vec3(-5, 0, 0), vec3.left);
            container.addObj(planeRightCSG);
            planeRight.render.material = matColor.clone();
            planeRightCSG.setColor(glmath.vec4(1,0,0,1));
        }
        {
            let planeForward = new GameObject('planeForward');
            planeForward.transform.parent = scene.transform;
            let planeForwardCSG = CSGObj.createPlane(planeForward, glmath.vec3(0, 0, -10), vec3.forward);
            container.addObj(planeForwardCSG);
            planeForward.render.material = matColor.clone();
            planeForwardCSG.setColor(vec4.one);
        }

        {
            let planeBack = new GameObject('planeBack');
            planeBack.transform.parent = scene.transform;
            let planeBackCSG = CSGObj.createPlane(planeBack, glmath.vec3(0, 0, 10), vec3.back);
            container.addObj(planeBackCSG);
            planeBack.render.material = matColor.clone();
            planeBackCSG.setColor(vec4.one);
        }

        {
            //light source
            let sphLight = new GameObject('sphLight');
            sphLight.transform.parent = scene.transform;
            let csg = CSGObj.createSphere(sphLight, glmath.vec3(0, 9,-6), 5);
            container.addObj(csg);
            sphLight.render.material = matColor.clone();
            csg.setColor(glmath.vec4(1,1,1,1.0));
            csg.setMatParam(10.0,0,0,1);
        }


        {
            //Diffuse
            let sphDiffuse = new GameObject('sphDiffuse');
            sphDiffuse.transform.parent = scene.transform;
            let csg = CSGObj.createSphere(sphDiffuse, glmath.vec3(0, 0, -7), 1.0);
            container.addObj(csg);
            sphDiffuse.render.material = matColor.clone();
            csg.setColor(glmath.vec4(1,1,1,1.0));
        }

        {
            //Reflative
            let sphReflective = new GameObject('sphReflective');
            sphReflective.transform.parent = scene.transform;
            let csg = CSGObj.createSphere(sphReflective, glmath.vec3(-3, -3, -7), 1.5);
            container.addObj(csg);
            sphReflective.render.material = matColor.clone();
            csg.setColor(glmath.vec4(1,1,1,1.0));
            csg.setMatParam(0,1.0,0,1);
        }

        {
            //Refractive
            let sphRefractive = new GameObject('Refractive');
            sphRefractive.transform.parent = scene.transform;
            let csg = CSGObj.createSphere(sphRefractive, glmath.vec3(3, -2, -6), 2);
            container.addObj(csg);
            sphRefractive.render.material = matColor.clone();
            csg.setColor(glmath.vec4(1,1,1,1.0));
            csg.setMatParam(0,0,1.0,5.0);
        }

        container.setDirty();
    }
    onFrame(ts: number) {
        const scenemgr = this.m_sceneMgr;
        scenemgr.onFrame(this.m_scene);
        this.grender.render(this.m_scene,ts);
    }
    onRelease() {

    }
}


export class CSGBufferData extends ShaderData {
    public static BUFFER_NAME: string = 'CSG_DATA';
    // 0 vec4 pos[,radius]
    // 16 vec4 normal
    // 32 vec4 color
    // 48 uint type
    // 64 vec4 matparam
    // 80
    public constructor() {
        const len = 80;
        super(len * 10 + 4 + 4);
    }

    public setData(csg:CSGObj,index:number){
        let offset  = index *80;
        let gobj = csg.gobj;
        let trs = gobj.transform;

        let buffer = this.buffer;

        //position
        buffer.setVec3(offset,trs.position);
        if(csg.type == CSGType.Sphere){
            //radius for sphere
            buffer.setFloat(offset+12,csg.sphereRadius);
        }
        else{
            //normal for plane
            buffer.setVec3(offset+16,trs.forward);
        }
        //color
        buffer.setVec4(offset + 32,csg.color);
        //type
        buffer.setUint32(offset + 48,csg.type);
        //mat
        buffer.setVec4(offset +64,csg.matParam);
    }

    public setIter(iter:number){
        let iterp = iter/(1.0 + iter);
        this.buffer.setFloat(800,iterp);
    }
    
    public setGeomCount(count:number){
        this.buffer.setUint32(804,count);
    }
}

export enum CSGType {
    Sphere = 0,
    Plane = 1,
}

export class CSGContainer {
    public csgobjs: CSGObj[] = [];
    private m_isdirty: boolean = true;
    private m_data: CSGBufferData;
    public get data(): CSGBufferData {
        return this.m_data;
    }

    public constructor() {
        this.m_data = new CSGBufferData();
    }

    public addObj(csgobj: CSGObj) {
        this.csgobjs.push(csgobj);
        this.csgobjs.sort((a,b)=>a.type - b.type);
    }

    public setDirty() {
        this.m_isdirty = true;
    }

    public updateUniformData(buffer: WebGLBuffer, gl: WebGL2RenderingContext) {
        const data = this.m_data;
        if (this.m_isdirty){

            let csgobjs = this.csgobjs;
            for(let i=0,len = csgobjs.length;i<len;i++){
                data.setData(csgobjs[i],i);
            }
            this.m_isdirty = false;
            data.setGeomCount(csgobjs.length);
        }
        data.submitBuffer(gl,buffer);
    }
}

export class CSGObj {
    public type: CSGType = CSGType.Sphere;
    public gobj: GameObject;

    public color: vec4 = Utility.randomColor();
    public matParam:vec4 = glmath.vec4(0,0,0,1);

    public sphereRadius: number = 1.0;
    private constructor() {
    }

    public setColor(col:vec4){
        this.color = col;
        this.gobj.render.material.setColor(ShaderFX.UNIFORM_MAIN_COLOR,col);
    }

    public setMatParam(emmitance:number =0.0,reflective:number = 0.0,refractive:number = 0.0,IOR:number= 1.0){
        let matp = this.matParam;
        matp.x = emmitance;
        matp.y = reflective;
        matp.z = refractive;
        matp.w = IOR;
    }

    public static createSphere(gameobject: GameObject, pos: vec3, radius: number = 1.0): CSGObj {
        let csgobj = new CSGObj();
        csgobj.type = CSGType.Sphere;
        csgobj.gobj = gameobject;
        csgobj.sphereRadius = radius;
        gameobject.transform.localPosition = pos;
        gameobject.transform.localScale = vec3.one.mulNum(radius);
        gameobject.render = new MeshRender(Mesh.Sphere);
        return csgobj;
    }

    public static createPlane(gameobject: GameObject, pos: vec3, nor: vec3): CSGObj {
        let csgobj = new CSGObj();
        csgobj.gobj = gameobject;
        csgobj.type = CSGType.Plane;
        gameobject.transform.setPosition(pos);
        gameobject.transform.forward = nor;
        gameobject.transform.setScale(glmath.vec3(50, 50, 50));
        gameobject.render = new MeshRender(Mesh.Quad);
        return csgobj;
    }
}
