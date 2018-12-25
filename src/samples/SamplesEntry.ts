import { CubeSample } from './basic/CubeSample';
import { PathTracer } from "./path-tracer/PathTracer";
import { GLTFSample } from './gltf/GLTFSample';
import { SkyboxSample } from './skybox/SkyboxSample';
import { ShadowmapSample } from './shadowmap/ShadowmapSample';

export const SAMPLES_ENTRY = {
    "skybox":SkyboxSample,
    "gltf-assets":GLTFSample,
    "cube":CubeSample,
    "path-tracer":PathTracer,
    "shadowmap":ShadowmapSample,
}
