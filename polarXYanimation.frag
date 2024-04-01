const float PI = 3.14159265359;

const vec3[3] baseColor = vec3[](
        vec3(1.0, 0.0, 0.0),
        vec3(0.0, 1.0, 0.0),
        vec3(0.0, 0.0, 1.0)
    );

float atan2(float y, float x){
   return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);
}

vec2 xy2pol(vec2 xy){
    return vec2( atan2(xy.y, xy.x),length(xy));
}

vec2 pol2xy(vec2 pol){
    return pol.y * vec2(cos(pol.x),sin(pol.x));
}

vec3 gradation3color(float g){
    int ind = int(g);
    return mix(baseColor[ind], baseColor[(ind+1)], fract(g));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord){
    vec2 pos = 1.0 - fragCoord/iResolution.xy;


    // polar
    vec2 polpos = xy2pol(pos * 2.0 - 1.0);


    vec3 col = gradation3color(mix(polpos.s / PI + 1.0, pos.x * 2.0, abs(sin(iTime* 0.5))));


    fragColor = vec4(col, 1.0);
}