import { CubeSample } from './basic/CubeSample';
import { PathTracer } from "./path-tracer/PathTracer";
import { SkyboxSample } from './skybox/SkyboxSample';
import { LightingSample } from './lighting/LightingSample';
// import { ShadowmapSample } from './shadowmap/ShadowmapSample';
// import { RenderPipelineSample } from './renderpipeline/RenderPipelineSample';
// import { GLTFSample } from './gltf/GLTFSample';


export const SAMPLES_ENTRY = {
    "skybox":SkyboxSample,
    // "gltf-assets":GLTFSample,
    "cube":CubeSample,
    "path-tracer":PathTracer,
    "lighting": LightingSample,
    // "shadowmap":ShadowmapSample,
    // "render-pipeline": RenderPipelineSample,
}
