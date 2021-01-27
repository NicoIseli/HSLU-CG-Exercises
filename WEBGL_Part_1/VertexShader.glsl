attribute vec2 aVertexPosition;
attribute vec3 aVertexColor;
varying vec4 vColor;

void main () {
    gl_Position = vec4(aVertexPosition, 0, 1);
    vColor = vec4(aVertexColor, 1);
}