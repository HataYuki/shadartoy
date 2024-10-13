

const float PI = 3.14159265359;

float atan2(in float y, in float x){
    return x == 0.0 ? sign(y) * PI / 2.0 : atan(y, x);
}

vec2 xy2pol(in vec2 xy){
    return vec2(atan2(xy.y, xy.x), length(xy));
}

vec2 pol2xy(in vec2 pol){
    return pol.y * vec2(cos(pol.x), sin(pol.x));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord){
    vec2 uv = fragCoord/iResolution.xy;
    uv = xy2pol(uv);

    fragColor = vec4(vec3(uv.x), 1.0);
}