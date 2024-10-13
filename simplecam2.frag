// https://www.youtube.com/watch?v=PBxuVlp7nuM&t=11s

float DistLine(vec3 ro, vec3 rd, vec3 p){
    return length(cross(p - ro, rd)) / length(rd);
}

float DrawPoint(vec3 ro, vec3 rd, vec3 p){
    float d = DistLine(ro, rd, p);
    d = smoothstep(0.06, 0.05, d);
    return d;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord){
    vec2 uv = fragCoord.xy / iResolution.xy;
    uv -= 0.5;
    uv.x *= iResolution.x / iResolution.y;

    vec3 col = vec3(0.0, 0.0, 0.0);

    vec3 ro = vec3(3.0 * sin(iTime) + 0.5, 3.0, -3.0 * cos(iTime) + 0.5);

    vec3 lookat = vec3(0.5);
    float zoom = 1.0;
    vec3 f = normalize(lookat - ro);
    vec3 r = cross(vec3(0.0, 1.0, 0.0), f);
    vec3 u = cross(f,r);
    vec3 c = ro + f * zoom;
    vec3 i = c + uv.x * r + uv.y * u;

    vec3 rd = i - ro;
    float d = 0.0; 
      
    d += DrawPoint(ro, rd, vec3(0.0, 0.0, 0.0));
    d += DrawPoint(ro, rd, vec3(0.0, 0.0, 1.0));
    d += DrawPoint(ro, rd, vec3(0.0, 1.0, 0.0));
    d += DrawPoint(ro, rd, vec3(0.0, 1.0, 1.0));
    d += DrawPoint(ro, rd, vec3(1.0, 0.0, 0.0));
    d += DrawPoint(ro, rd, vec3(1.0, 0.0, 1.0));
    d += DrawPoint(ro, rd, vec3(1.0, 1.0, 0.0));
    d += DrawPoint(ro, rd, vec3(1.0, 1.0, 1.0));

    fragColor = vec4(vec3(d), 1.0);
}