// https://www.youtube.com/watch?v=dKA5ZVALOhs

float DistLine(vec3 ro, vec3 rd, vec3 p){
    return length(cross(p - ro, rd)) / length(rd);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord){
    vec2 uv = fragCoord.xy / iResolution.xy;
    uv -= 0.5;
    uv.x *= iResolution.x / iResolution.y;

    vec3 col = vec3(0.0, 0.0, 0.0);

    vec3 ro = vec3(0.0, 0.0, -2.0);
    vec3 rd = vec3(uv.x, uv.y, 0.0) - ro;

    vec3 p = vec3(sin(iTime), 0.0, cos(iTime)*2.0 + 2.0);
    float d = DistLine(ro, rd, p);
    d = smoothstep(0.1, 0.09, d);

    fragColor = vec4(vec3(d), 1.0);
}