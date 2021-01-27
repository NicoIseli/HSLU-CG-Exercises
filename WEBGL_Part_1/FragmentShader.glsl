precision mediump float;
uniform vec4 uColor;
varying vec4 vColor ;

void main() {
   // gl_FragColor = vec4(0,1,1,0);
   // gl_FragColor = uColor;
    gl_FragColor = vColor;
}