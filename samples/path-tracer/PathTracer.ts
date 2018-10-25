import { IProgram, SampleProgram } from "../SampleProgram";
import { GraphicsRender } from "iris-gl";

@SampleProgram('Path Tracer')
export class PathTracer implements IProgram{
    onInit() {
    }    
    onSetupRender(grender: GraphicsRender) {
    }
    onSetupScene() {
    }
    onFrame(ts: number) {
    }
    onRelease() {
    }
    
}