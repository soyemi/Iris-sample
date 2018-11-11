import { CubeSample } from './basic/CubeSample';
import { PathTracer } from "./path-tracer/PathTracer";
import { GLTFSample } from './gltf/GLTFSample';


export const SAMPLES_ENTRY = {
    "gltf-assets":GLTFSample,
    "cube":CubeSample,
    "path-tracer":PathTracer
}
