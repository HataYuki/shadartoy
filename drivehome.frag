#define S(a, b, t) smoothstep(a, b, t)

struct ray{
    vec3 o,d;
};

ray getRay(vec2 uv, vec3 camPos, vec3 lookat, float zoom){
    ray a;
    a.o = camPos;

    vec3 f = normalize(lookat - camPos);
    vec3 r = cross(vec3(0.0, 1.0, 0.0), f);
    vec3 u = cross(f, r);
    vec3 c = a.o + f * zoom;
    vec3 i = c + uv.x * r + uv.y * u;

    a.d = normalize(i - a.o);

    return a;
}

vec3 closestPoint(ray r, vec3 p){
    return r.o + max(0.0, dot(p - r.o, r.d)) * r.d;
}

float distRay(ray r, vec3 p){
    return length(p - closestPoint(r, p));
}

float bokeh(ray r, vec3 p, float size, float blur){
    float d = distRay(r, p);
    size *= length(p);
    float c = S(size, size * (1.0 - blur), d);
    c *= mix(0.7, 1.0, S(size * 0.8, size, d));

    return c;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord){
    vec2 uv = (fragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;

    vec3 camPos = vec3(0.0, 0.2, 0.0);
    vec3 lookat = vec3(0.0, 0.2, 1.0);

    ray r = getRay(uv, camPos, lookat, 2.0);
    float side = step(r.d.x, 0.0);
    r.d.x = abs(r.d.x);

    float t = iTime * 0.1;
    float s = 1.0 / 10.0;
    float m = 0.0;
    
    for (float i = 0.0; i < 1.0; i += s){
        float ti = fract(t + i + side * s * 0.5);
        vec3 p = vec3(2.0, 2.0,  100.0 - ti*100.0);
        m += bokeh(r, p, 0.03, 0.1) * ti * ti * ti;
    }

    vec3 col = vec3(1.0, 0.7, 0.3) * m;
    fragColor = vec4(col, 1.0);
}