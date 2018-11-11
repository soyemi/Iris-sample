precision mediump float;
#include SHADERFX_BASIS
#include VARIANT_PATH_TRACER

inout vec2 vUV;
inout vec4 vwpos;



#pragma vs vertex
#ifdef SHADER_VS
in vec4 aPosition;
void vertex(){
    vec4 pos = aPosition;
    vUV = pos.xy +0.5;
    pos.xy *=2.0;
    vec4 clippos = vec4(pos.xy,1.0,1.0);
    vwpos = inverse(MATRIX_P * MATRIX_V) * clippos;
    
    gl_Position = pos;
}
#endif

#pragma ps fragment
#ifdef SHADER_PS
struct INTERSECT{
    vec3 point;
    vec3 normal;
    vec3 color;
};

out vec4 fragColor;
uniform sampler2D uSampler;
void fragment(){
    vec3 wpos = vwpos.xyz / vwpos.w;
    vec3 dir = normalize(wpos - CAMERA_POS.xyz);

    RAY r;
    r.dir = dir;
    r.ori = CAMERA_POS.xyz;
    INTERSECT intersect;
    vec3 col = vec3(0);
    uint id = 0U;
    const uint MAX_COUNT = 4U;
    float random = rand(wpos.xy);

    for(uint i=0U;i< MAX_COUNT;i++){

        if(intersectWorld(r,intersect,id)){
            col = intersect.color;

            r.dir =  reflect(r.dir,intersect.normal);
            //r.dir =  normalize(hemiSphereSampling(dir,random +TIME.z + float(i),intersect.normal));
            r.ori = intersect.point + r.dir *0.001;
        }
    }
    vec3 accuCol = texture(uSampler,vUV).xyz;
    fragColor = vec4(col,1.0); // vec4(mix(col/float(MAX_COUNT),accuCol,iterp),1.0);
}

bool intersectWorld(RAY r,out INTERSECT intersect,out uint id){
    vec3 normal;
    vec3 hitpos;

    float t_max = 10000.;
    float t;

    uint maxg = clamp(gcount,0U,10U);

    for(uint i=0U;i<maxg;i++){
        CSG geom = csg[i];
        if(geom.type == 0U){
            t = intersectSphere(r,geom,normal,hitpos);
            if(t > .0 && t < t_max){
                t_max = t;
                intersect.point = hitpos;
                intersect.normal = normal;
                intersect.color = geom.color.xyz;
                id = i;
            }
        }
        else{
            t = intersectPlane(r,geom,normal,hitpos);
            if(t > .0 && t < t_max){
                t_max = t;
                intersect.point = hitpos;
                intersect.normal = normal;
                intersect.color = geom.color.xyz;
                id = i;
            }
        }
    }

   
    return t < 10000.;
}

#endif