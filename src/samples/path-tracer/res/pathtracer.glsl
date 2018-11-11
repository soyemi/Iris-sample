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


uniform float seed; //Random seed [0.0,1.0]

out vec4 fragColor;
uniform sampler2D uSampler;
void fragment(){
    vec3 wpos = vwpos.xyz / vwpos.w;
    vec3 dir = normalize(wpos - CAMERA_POS.xyz);

    RAY r;
    r.dir = dir;
    r.ori = CAMERA_POS.xyz;
    r.IOR = 1.0;
    vec3 col = vec3(0);
    const uint MAX_COUNT = 4U;

    trace(r,MAX_COUNT,col);

    vec3 accuCol = texture(uSampler,vUV).xyz;
    fragColor = vec4(mix(col/float(MAX_COUNT),accuCol,iterp),1.0);
}


bool intersectWorld(inout RAY r,out INTERSECT intersect,out uint id){
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
                id = i;
            }
        }
        else{
            t = intersectPlane(r,geom,normal,hitpos);
            if(t > .0 && t < t_max){
                t_max = t;
                intersect.point = hitpos;
                intersect.normal = normal;
                id = i;
            }
        }
    }
    return t < 10000.;
}

void trace(in RAY r,uint RAY_DEPTH, inout vec3 col){
    uint id = 0U;
    vec3 colormask = vec3(1.0);
    float random = seed;

    INTERSECT intersect;
    for(uint i=0U;i< RAY_DEPTH;i++){
        if(intersectWorld(r,intersect,id)){
            CSG g = csg[id];
            vec4 gmat = g.matparam;
            vec3 gcolor = g.color.xyz;
            if(gmat.x >0.0){
                //Light source
                col = colormask * gcolor * gmat.x;
                return;
            }
            else if(gmat.y<=0.0 && gmat.z <=0.0){
                //Diffuse
                colormask *= gcolor;
                col = colormask;
                r.dir =  normalize(hemiSphereSampling(r.dir,random,intersect.normal));
                r.ori = intersect.point + r.dir *0.001;
            }
            else{
                if(gmat.z >0.0){
                    //Refract

                    vec3 intersect_point = intersect.point;
                    vec3 intersect_normal = intersect.normal;

                    bool isInsideOut = dot(r.dir, intersect_normal) > 0.0;

                    colormask *= gcolor;
                    col = colormask;
                    r.dir =  normalize(hemiSphereSampling(r.dir,random,intersect_normal));
                    r.ori = intersect.point + r.dir *0.001;

                    vec3 random3 = vec3(random,rand(intersect_point.xz), rand(intersect_point.yz));
                    float oldIOR = r.IOR;
                    float newIOR = gmat.w;

                    float eta = oldIOR / newIOR;
                    vec3 reflectR = reflect(r.dir,intersect_normal);
                    vec3 refractR = refract(r.dir,intersect_normal,eta);

                    vec2 fresnel = calculateFresnel(intersect_normal,r.dir,oldIOR,newIOR);
                    float reflect_range = fresnel.x;

                    if(random < reflect_range){
                        //reflect
                        r.dir = reflectR;
                        r.ori = intersect.point + r.dir *0.001;
                    }
                    else{
                        //transmit
                        r.dir = refractR;
                        r.ori = intersect.point + r.dir *0.001;
                    }

                    r.IOR = newIOR;
                    colormask *= gcolor;
                    col = colormask;
                }
                else{
                    //Only Reflect
                    colormask *= gcolor;
                    col = colormask;
                    r.IOR = 1.0;
                    r.dir = reflect(r.dir,intersect.normal);
                    r.ori = intersect.point + r.dir * 0.001;
                }
            }

        }
    }
}


#endif