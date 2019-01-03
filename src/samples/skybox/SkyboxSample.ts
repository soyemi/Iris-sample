import { IProgram } from '../SampleProgram';
import * as iris from 'iris-gl';
import { ConfigObj, ConfigPanel } from 'src/ConfigPanel';
import { SampleResPack } from '../SampleResPack';

const res_img360 = require('./res/day360.jpg');
const res_imgbk = require('./res/peaks_bk.jpg');
const res_imgdn = require('./res/peaks_dn.jpg');
const res_imgft = require('./res/peaks_ft.jpg');
const res_imglf = require('./res/peaks_lf.jpg');
const res_imgrt = require('./res/peaks_rt.jpg');
const res_imgup = require('./res/peaks_up.jpg');


export class SkyboxSampleCfgObj extends ConfigObj{
    public cursample:SkyboxSample;

    @ConfigPanel.FieldSelect("SkyboxType",["Procedural","360","Cubemap"])
    public skyboxType:string = "Procedural";

    public onConfigChange(key:string,newval:any){
        const cursample =this.cursample;
        if(key === 'SkyboxType' && newval !== this.skyboxType){
            this.skyboxType = newval;
            if(cursample != null) cursample.setSkyboxType(newval);
        }
    }
}

export class SKyboxSampleResPack extends SampleResPack{

    public img360:HTMLImageElement;
    public imgCubemap:HTMLImageElement[];

    protected async doLoad(): Promise<boolean> {
        this.img360 = await iris.Utility.loadImage(res_img360);
        const imgcubemap = [];
        imgcubemap.push(await iris.Utility.loadImage(res_imgft));
        imgcubemap.push(await iris.Utility.loadImage(res_imgbk));
        imgcubemap.push(await iris.Utility.loadImage(res_imgup));
        imgcubemap.push(await iris.Utility.loadImage(res_imgdn));
        imgcubemap.push(await iris.Utility.loadImage(res_imgrt));
        imgcubemap.push(await iris.Utility.loadImage(res_imglf));
        this.imgCubemap = imgcubemap;
        return true;
    }


}

export class SkyboxSample implements IProgram{

    private grender:iris.GraphicsRender;
    private m_scene: iris.Scene;
    private m_scenemgr:iris.SceneManager;
    private m_configObject:SkyboxSampleCfgObj;
    
    private m_skyboxProcedural:iris.Skybox;
    private m_skybox360:iris.Skybox;
    private m_skyboxCubemap:iris.Skybox;

    private m_tex360:iris.Texture2D;
    private m_texcubemap:iris.TextureCubeMap;

    private m_camera:iris.Camera;

    private static s_respack:SKyboxSampleResPack = new SKyboxSampleResPack();


    public onLoadRes(){
        return SkyboxSample.s_respack;
    }

    public onSetupRender(grender:iris.GraphicsRender){
        this.m_scenemgr = new iris.SceneManager();
        let cfgobj = new SkyboxSampleCfgObj();
        cfgobj.cursample = this;
        this.m_configObject = cfgobj;

        this.grender = grender;
        grender.setPipeline(new iris.StackedPipeline({
            passes: [iris.PassSkybox],
            clearinfo:{
                color:new iris.vec4([0.5,0.5,0.5,1.0]),
                clearMask: iris.GL.COLOR_BUFFER_BIT | iris.GL.DEPTH_BUFFER_BIT
            },
        }));

        const glctx = grender.glctx;
        glctx.clearColor(0.5,0.5,0.5,1.0);
    }

    public getCfgObject():ConfigObj{
        return this.m_configObject;
    }

    public setSkyboxType(type:string){
        const camera = this.m_camera;
        switch(type){
            case "Procedural":
            camera.skybox = this.m_skyboxProcedural;
            break;
            case "360":
            camera.skybox = this.m_skybox360;
            break;
            case "Cubemap":
            camera.skybox= this.m_skyboxCubemap;
            break;
        }

    }

    public onSetupScene(){
        let scene = new iris.Scene();
        this.m_scene=  scene;

        const res = SkyboxSample.s_respack;

        this.m_skyboxProcedural = iris.Skybox.createFromProcedural();
        let teximg360 = iris.Texture2D.createTexture2DImage(res.img360,iris.TextureDescUtility.DefaultRGB,this.grender.glctx);
        this.m_tex360 = teximg360;
        this.m_skybox360 = iris.Skybox.createFromTex360(teximg360);
        let texcubemap = iris.TextureCubeMap.loadCubeMapImage(res.imgCubemap,this.grender.glctx);
        this.m_skyboxCubemap = iris.Skybox.createFromCubeMap(texcubemap);
        this.m_texcubemap = texcubemap;

        let camera = iris.Camera.persepctive(null,60,1.0,0.05,100.0);
        camera.gameobject.addComponent(new iris.CameraFreeFly());
        camera.transform.parent = scene.transform;
        camera.skybox = this.m_skyboxProcedural;
        camera.clearType = iris.ClearType.Skybox;
        this.m_camera = camera;
    }

    public onFrame(ts:number){
        const grender = this.grender;

        this.m_scenemgr.onFrame(this.m_scene);

        grender.render(this.m_scene,ts);
        grender.renderToCanvas();
    }

    public onRelease(){
        const grender= this.grender;
        this.m_camera= null;
        this.m_tex360.release(grender.glctx);
        this.m_texcubemap.release(grender.glctx);
        this.m_tex360 = null;
        this.m_texcubemap = null;

        this.m_skybox360 = null;
        this.m_skyboxCubemap =null;
        this.m_skyboxProcedural = null;

        grender.release();
    }
    
}
