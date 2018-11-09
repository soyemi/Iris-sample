precision mediump float;
#include SHADERFX_BASIS

inout vec2 vUV;
inout vec3 vvdir;

#pragma vs vertex

in vec4 aPosition;
void vertex(){
    vec4 pos = aPosition;
    vUV = pos.xy +0.5;
    pos.xy *=2.0;
    vec4 clippos = vec4(pos.xy *2.0,1.0,1.0);
    vec4 cwpos = ClipToWorld(clippos);

    vvdir = (cwpos.xyz / cwpos.w) - CAMERA_POS.xyz;
    
    gl_Position = pos;
}

#pragma ps fragment

out vec4 fragColor;

void fragment(){
    vec3 dir = normalize(vvdir);
    fragColor = vec4(dir,1.0);
}