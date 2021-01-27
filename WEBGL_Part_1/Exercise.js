// Register function to call after document has loaded
window.onload = startup;

// The gl object is saved globally
var gl;

// Local parameters for the program in a single object
var ctx = {
    shaderProgram: -1,
    aVertexPositionId: -1,
    uVertexColor: -1,
    aVertexColorId: -1
};

// Parameters for drawing a specific object together
var rectangleObject = {
    buffer: -1,
    colorBuffer: -1
};

/**
 * Startup function to be called when the body is loaded
 */
function startup() {
    "use strict";
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    initGL();
    draw();
}

/**
 * InitGL should contain the functionality that needs to be executed only once
 */
function initGL() {
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders(gl, 'VertexShader.glsl', 'FragmentShader.glsl');
    setUpAttributesAndUniforms();
    setUpBuffers();

    // set the clear color here
    gl.clearColor(1,0,0,1); //-> damit wird alles übermalen (erst wenn clear)
}

/**
 * Setup all the attribute and uniform variables
 */
function setUpAttributesAndUniforms(){
    "use strict";
    // finds the index of the variable in the program || überschreibt ctx.aVertexPositionId
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.uVertexColor = gl.getUniformLocation(ctx.shaderProgram, "uColor");
    ctx.aVertexColorId = gl.getAttribLocation(ctx.shaderProgram, "aVertexColor");
}

/**
 * Setup the buffers to use. If more objects are needed this should be split in a file per object.
 */
function setUpBuffers(){
    "use strict";

    rectangleObject.buffer = gl.createBuffer();

    var vertices = [
        -0.8, 0.8,
        -0.4, 0.8,
        0.4, 0.0,
        0.4, 0.8,
        0.8, 0.8,
        0.8, -0.8,
        0.4, -0.8,
        -0.4, 0.0,
        -0.4,-0.8,
        -0.8, -0.8
    ]

    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    rectangleObject.colorBuffer = gl.createBuffer();
    var colors = [
        1, 0, 0,
        1, 0, 1,
        0, 0, 1,
        0, 1, 1,
        0, 1, 0,
        1, 1, 0,
        1, 0, 0,
        1, 0, 1,
        0, 0, 1,
        0, 1, 1,
    ]

    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);


}

/**
 * Draw the scene.
 */
function draw() {
    "use strict";
    console.log("Drawing");
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // add drawing routines here

    gl.uniform4f (ctx.uColorId , 0.0 , 1 , 0 , 1.0);

    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.buffer);
    gl.vertexAttribPointer(ctx.aVertexPositionId, 2, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(ctx.aVertexPositionId);

    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.colorBuffer);
    gl.vertexAttribPointer(ctx.aVertexColorId, 3, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(ctx.aVertexColorId);

    gl.drawArrays(gl.LINE_LOOP, 0, 10);
    console.log("done");
}