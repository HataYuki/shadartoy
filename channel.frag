void mainImage(out vec4 fragColor, in vec2 fragCoord){
    vec2 pos = fragCoord.xy / iResolution.xy;

    vec3[4] col4 = vec3[](
        vec3(1.0, 0.0, 0.0),
        vec3(0.0, 1.0, 0.0),
        vec3(0.0, 0.0, 1.0),
        vec3(1.0, 1.0, 0.0)
    );

    float n = 4.0;
    pos *= n;
    int channel = int(2.0 * fragCoord.x / iResolution.x);
    

    if(channel == 0){
        pos = floor(pos) + step(0.5, fract(pos));
    } else {
        float thr = 0.25 * sin(iTime);
        pos = floor(pos) + smoothstep(thr + 0.25, 0.75 - thr, fract(pos));
    }

    pos /= n;
    vec3 col = mix(mix(col4[0], col4[1], pos.x), mix(col4[2], col4[3], pos.x), pos.y);


    fragColor = vec4(col, 1.0);
}