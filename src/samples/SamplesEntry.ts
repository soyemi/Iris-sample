import { CubeSample } from './basic/CubeSample';
import { PathTracer } from "./path-tracer/PathTracer";
import { GLTFSample } from './gltf/GLTFSample';


export const SAMPLES_ENTRY = {
    "cube":CubeSample,
    "gltf-rendering":GLTFSample,
    "path-tracer":PathTracer
}
