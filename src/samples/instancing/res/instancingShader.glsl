#version es 300
precision mediump float;
#include SHADERFX_BASIS

inout vec4 vColor;

#pragma vs vertex
#ifdef SHADER_VS

in vec4 aPosition;
in vec4 aGeom; //instancing
in vec4 aColor;//instancing

void vertex(){
    vec4 pos = MATRIX_M * aPosition;
    pos.xyz += aGeom.xyz;
    gl_Position = MATRIX_VP * pos;
    vColor = aColor;
}
#endif

#pragma ps fragment
#ifdef SHADER_PS

out vec4 fragColor;
void fragment(){
    fragColor = vColor;
}

#endif
