#ifdef SHADER_PS

struct CSG{
    vec4 pos;
    vec4 normal;
    vec4 color;
    uint type;
    vec4 matparam;
};



layout(std140) uniform CSG_DATA{
    CSG csg[10];
    float iterp;
};

struct RAY{
    vec3 dir;
    vec3 ori;
};

float rand(vec2 co)
{
	float a = 12.9898, b = 78.233, c = 43758.5453;
	float dt = dot(co.xy, vec2(a, b));
	dt = mod(dt,3.14);
	return fract(sin(dt) *c);
}


float getrandom(vec3 iray,vec3 noise, float seed)
{
	return fract(sin(dot(iray + seed, noise))* 43758.5453 + seed);
}

vec3 hemiSphereSampling(vec3 iray,float seed, vec3 normal)
{
	float u = getrandom(iray,vec3(12.9898, 78.233, 151.7182), seed);
	float v = getrandom(iray,vec3(63.7264, 10.873, 623.6736), seed);
	float up = sqrt(u);
	float over = sqrt(1.0 - up*up);
	float around = v*3.1415926 *2.0;

	vec3 directionNotNormal;
	if (abs(normal.x) < 0.577350269189)
		directionNotNormal = vec3(1, 0, 0);
	else if (abs(normal.y) < 0.577350269189)
		directionNotNormal = vec3(0, 1, 0);
	else
		directionNotNormal = vec3(0, 0, 1);

	vec3 perpendicularDir1 = normalize(cross(normal, directionNotNormal));
	vec3 perpendicularDir2 = normalize(cross(normal, perpendicularDir1));

	return (up *normal) + cos(around) *over * perpendicularDir1 + sin(around) *over * perpendicularDir2;
}

float intersectSphere(RAY r,in CSG geom,out vec3 normal,out vec3 hitpos){
    vec4 pos = geom.pos;
    vec3 center = pos.xyz;
    float radius = pos.w;

    vec3 rc = center - r.ori;
    r.dir = normalize(r.dir);

    float rdotv = dot(rc,r.dir);
    float delta = rdotv *rdotv - (dot(rc,rc) - radius * radius);
    if (delta < .0) return -1.0;

    float t;
    float sqrtdelta = sqrt(delta);
    float t1 = rdotv + sqrtdelta;
    float t2  = rdotv - sqrtdelta;

    t = min(t1,t2);
    hitpos = r.ori + r.dir * t;
    normal = normalize(hitpos - center);
    return t;
}

float intersectPlane(RAY r,in CSG geom,out vec3 normal,out vec3 hitpos){
    vec3 point = geom.pos.xyz;
    vec3 pnormal = geom.normal.xyz;

    float rdotn = dot(pnormal,r.dir);
    if( abs(rdotn) < 0.0001) return -1.0;

    vec3 rc = point - r.ori;
    float t= dot(rc,pnormal) / rdotn;

    normal = pnormal;
    hitpos = r.ori + r.dir * t;
    return t;
}

#endif
