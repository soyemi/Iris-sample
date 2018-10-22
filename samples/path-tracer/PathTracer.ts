import { IProgram, SampleProgram } from "../SampleProgram";
import { GraphicsRender } from "renderer";

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