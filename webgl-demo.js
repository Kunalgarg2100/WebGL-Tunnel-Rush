var numofoctagons = 10;
var numofobstracles = 2;

var typesofobstracles = 1
var gameplay = 1;
var statusKeys = {};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function create_octagon(){
    var n = 8;
    var r = 1;
    var k = 0;
    var angle = 0;
    var depth = 1;
    var positions = [];
    for(var i=0;i<n;i++)
    {
        positions[k++] = r * Math.cos(angle);
        positions[k++] = r * Math.sin(angle);
        positions[k++] = -depth;
        
        positions[k++] = r * Math.cos(angle);
        positions[k++] = r * Math.sin(angle);
        positions[k++] = +depth;

        angle += (2*Math.PI)/n;
        
        positions[k++] = r * Math.cos(angle);
        positions[k++] = r * Math.sin(angle);
        positions[k++] = -depth;
        
        positions[k++] = r * Math.cos(angle);
        positions[k++] = r * Math.sin(angle);
        positions[k++] = +depth;
        //console.log(k);
    }

    var indices = [];
    var k = 0;
    for(var i = 0;i<n;i++)
    {
        indices[k++] = (4*i)%(4*n);
        indices[k++] = (4*i+1)%(4*n);
        indices[k++] = (4*i+2)%(4*n);
        
        indices[k++] = (4*i+1)%(4*n);
        indices[k++] = (4*i+2)%(4*n);
        indices[k++] = (4*i+3)%(4*n);
        //console.log(k);
    }

    var faceColors = [
    [[0.0, 0.0, 1.0, 1.0],    // blue
        [1.0, 0.0, 0.0, 1.0],    // red
        [0.0, 1.0, 0.0, 1.0],    // green
        [1.0, 0.7, 0.2, 1.0],    // orange
        [0.5, 0.1, 0.5, 1.0],    // dark purple
        [1.0, 1.0, 0.0, 1.0],    // yellow
        [1.0, 0.0, 1.0, 1.0],    // purple
        [0.2, 1.0, 1.0, 1.0]],
    [[1.0,  1.0,  1.0,  1.0],    // Right face: white
      [0.0,  0.0,  0.0,  1.0],    // Top Right face: black
      [1.0,  1.0,  1.0,  1.0],    // Top face: white
      [0.0,  0.0,  0.0,  1.0],    // Top Left Right face: black
      [1.0,  1.0,  1.0,  1.0],    // Left face: white
      [0.0,  0.0,  0.0,  1.0],    // Bottom Left face: black
      [1.0,  1.0,  1.0,  1.0],    // Bottom face: white
      [0.0,  0.0,  0.0,  1.0]],
    [[0.0,  0.0,  0.0,  1.0],    // Right face: white
      [1.0,  1.0,  1.0,  1.0],    // Top Right face: black
      [0.0,  0.0,  0.0,  1.0],    // Top face: white
      [1.0,  1.0,  1.0,  1.0],    // Top Left Right face: black
      [0.0,  0.0,  0.0,  1.0],    // Left face: white
      [1.0,  1.0,  1.0,  1.0],    // Bottom Left face: black
      [0.0,  0.0,  0.0,  1.0],    // Bottom face: white
      [1.0,  1.0,  1.0,  1.0]]]
        // turqoise]
    var category = getRandomInt(3);
    return {
    'faceColors' : faceColors[category],
    'indices' : indices,
    'numComponentsColor' : 4,
    'numComponentsPosition' : 3,
    'vertexCount' : 48,
    'positions' : positions,
    'rotation_X' : 0,
    'rotation_Y' : 0,
    'rotation_Z' : 0,
    'speed'     : 7,
    'rotation'  : 0.05,
    'position' : [0, 0, 0],
    'category' : category,
    }
}

function create_cuboid(){
    var n = 6;
    var positions = [];
    var len = 72;
    for(var i = 0; i < len; i++) {
        positions.push(1);
    }
    var length = Math.tan(Math.PI/8)/3;
    var height = 1.0;
    var width = Math.tan(Math.PI/8)/50;

        /*Right Face*/
    x = 0;
    for(var i=0;i<4;i++)
        positions[3*i+x] = length;
    positions[1+x] = positions[4+x] = height;
    positions[7+x] = positions[10+x] = -height;
    positions[2+x] = positions[11+x] = width;
    positions[5+x] = positions[8+x] = -width;

    /*Left Face*/
    x = 12;
    for(var i=0;i<4;i++)
        positions[3*i+x] = -length;
    positions[1+x] = positions[4+x] = height;
    positions[7+x] = positions[10+x] = -height;
    positions[2+x] = positions[11+x] = width;
    positions[5+x] = positions[8+x] = -width;

    /* Top  Face*/
    var x = 24;
    for(var i=0;i<4;i++)
        positions[3*i+1+x] = height;
    positions[0+x]= positions[9+x] = -length;
    positions[3+x]= positions[6+x] = length;
    positions[2+x] = positions[5+x] = width;
    positions[8+x] = positions[11+x] = -width;

    /* Bottom Face*/
    x = 36;
    for(var i=0;i<4;i++)
        positions[3*i+1+x] = -height;
    positions[0+x]= positions[9+x] = -length;
    positions[3+x]= positions[6+x] = length;
    positions[2+x] = positions[5+x] = width;
    positions[8+x] = positions[11+x] = -width;


    /*Front Face*/
    x = 48;
    for(var i=0;i<4;i++)
        positions[3*i+2+x] = width;
    positions[0+x] = positions[9+x] = -length;
    positions[3+x] = positions[6+x] = length;
    positions[1+x] = positions[4+x] = height;
    positions[7+x] = positions[10+x] = -height;

    /*Back Face*/
    x = 60;
    for(var i=0;i<4;i++)
        positions[3*i+2+x] = -width;
    positions[0+x] = positions[9+x] = -length;
    positions[3+x] = positions[6+x] = length;
    positions[1+x] = positions[4+x] = height;
    positions[7+x] = positions[10+x] = -height;

    var indices = [];
    var k = 0;
    for(var i = 0;i< n;i++)
    {
        indices[k++] = (4*i)%(4*n);
        indices[k++] = (4*i+1)%(4*n);
        indices[k++] = (4*i+2)%(4*n);
        indices[k++] = (4*i)%(4*n);
        indices[k++] = (4*i+2)%(4*n);
        indices[k++] = (4*i+3)%(4*n);
    }

    var faceColors = [
      [1.0,  0.0,  0.0,  1.0],    // Right face: red
      [1.0,  0.0,  0.0,  1.0],    // Left face: red
      [1.0,  0.0,  0.0,  1.0],    // Top face: red
      [1.0,  0.0,  0.0,  1.0],    // Bottom face: red
      [1.0,  0.0,  0.0,  1.0],    // Front face: red
      [1.0,  0.0,  0.0,  1.0],    // Back face: red
    ]

    return {
    'faceColors' : faceColors,
    'indices' : indices,
    'numComponentsColor' : 4,
    'numComponentsPosition' : 3,
    'vertexCount' : 36,
    'positions' : positions,
    'rotation_X' : 0,
    'rotation_Y' : 0,
    'rotation_Z' : 0,
    'speed'     : 7,
    'rotation'  : Math.PI * Math.random(),
    'position' : [0, 0, -20],
    }
}

function create_halfoctagon(){
    var len = 1;
    hgt = Math.cos(Math.PI/8)
    var width = Math.tan(Math.PI/8)/50;
    var faceColors = [
      [1.0,  0.0,  0.0,  1.0],    // Front face: red
      [1.0,  0.0,  0.0,  1.0],    // Back face: red
      [1.0,  0.0,  0.0,  1.0],    // Top face: red
      [1.0,  0.0,  0.0,  1.0],    // Front face: red
      [1.0,  0.0,  0.0,  1.0],    // Back face: red
      [1.0,  0.0,  0.0,  1.0],    // Top face: red
    ]

    return {
    'faceColors' : faceColors,
    'indices' : [
      0,  1,  2,      0,  2,  3,   
      0, 3, 4,    0, 4, 5,  // front
      6,  7,  8,      6,  8,  9,    
      6, 9, 10,   6, 10, 11,  ///back
      12, 13, 14,   12, 14, 15,   
      12, 15, 16,  12, 16, 17],    // top
    
    'numComponentsColor' : 4,
    'numComponentsPosition' : 3,
    'vertexCount' : 24,
    'positions' : [
      // front face
      0,0,width,
      len, 0, width,
      hgt,-hgt,width,
      len, -1,width,
      -hgt,-hgt,width,
      -len, 0, width,

      // back face
      0,0,-width,
      len, 0, -width,
      hgt,-hgt,-width,
      len, -1,-width,
      -hgt,-hgt,-width,
      -len, 0, -width,

      // Top faces
      0,0,width,
      len, 0, width,
      len, 0, -width,
      0,0,-width,
      -len, 0, -width,
      -len, 0, width,
      
    ],
    'rotation_X' : 0,
    'rotation_Y' : 0,
    'rotation_Z' : 0,
    'speed'     : 7,
    'rotation'  : Math.PI * Math.random(),
    'position' : [0, 0, -20],
    }
}

function create_2halfoctagon(){
    var len = 1;
    var hgt = Math.cos(Math.PI/8)
    var width = Math.tan(Math.PI/8)/50;
    var centre_height = 0.3;

    var faceColors = [
      [1.0,  0.0,  0.0,  1.0],    // Front face: red 
      [1.0,  0.0,  0.0,  1.0],    // Back face: red
      [1.0,  0.0,  0.0,  1.0],    // Top face: red
      [1.0,  0.0,  0.0,  1.0],    // Top face: red
      [1.0,  0.0,  0.0,  1.0],    // Top face: red
      [1.0,  0.0,  0.0,  1.0],    // Top face: red

      [1.0,  0.0,  0.0,  1.0],    // Front face: red 
      [1.0,  0.0,  0.0,  1.0],    // Back face: red
      [1.0,  0.0,  0.0,  1.0],    // Top face: red
      [1.0,  0.0,  0.0,  1.0],    // Top face: red
      [1.0,  0.0,  0.0,  1.0],    // Top face: red
      [1.0,  0.0,  0.0,  1.0],    // Top face: red

    ]

    return {
    'faceColors' : faceColors,
    'indices' : [
      0,  1,  2,      0,  2,  3,  
      0, 3, 4,    0, 4, 5,  // front
      6,  7,  8,      6,  8,  9,    
      6, 9, 10,   6, 10, 11 ,  ///back
      12,  13,  14,    12,  14,  15, 
      12, 15, 16,  12, 16, 17,
      18,  19,  20,    18,  20,  21,   
      18, 21,22,    18, 22, 23,  // front
      24,  25,  26,    24,  26,  27, 
      24, 27, 28,   24, 28, 29 ,  ///back
      30,  31,  32,    30,  32,  33,
      30, 33, 34,  30, 34, 35],    // top
    
    'numComponentsColor' : 4,
    'numComponentsPosition' : 3,
    'vertexCount' : 48,
    'positions' : [
      // front face
      0,-centre_height,width,
      len, -centre_height, width,
      hgt,-hgt,width,
      len, -1,width,
      -hgt,-hgt,width,
      -len, -centre_height, width,

      // back face
      0,-centre_height,-width,
      len, -centre_height, -width,
      hgt,-hgt,-width,
      len, -1,-width,
      -hgt,-hgt,-width,
      -len, -centre_height, -width,

       0, -centre_height,width,
      len, -centre_height, width,
      len, -centre_height, -width,
      0,-centre_height,-width,
      -len, -centre_height, -width,
      -len, -centre_height, width,

        0,centre_height,width,
      len, centre_height, width,
      hgt,hgt,width,
      len, 1,width,
      -hgt,hgt,width,
      -len, centre_height, width,

      // back face
      0,centre_height,-width,
      len, centre_height, -width,
      hgt,hgt,-width,
      len, 1,-width,
      -hgt,hgt,-width,
      -len, centre_height, -width,

       0, centre_height,width,
      len, centre_height, width,
      len, centre_height, -width,
      0,centre_height,-width,
      -len, centre_height, -width,
      -len, centre_height, width,
      
    ],
    'rotation_X' : 0,
    'rotation_Y' : 0,
    'rotation_Z' : 0,
    'speed'     : 7,
    'rotation'  : Math.PI * Math.random(),
    'position' : [0, 0, -20],
    }
}

function create_2triangles(){
    var len = 1;
    var centre_height = 0.3;

    hgt = Math.cos(Math.PI/16)
    var width = Math.tan(Math.PI/8)/50;
    var faceColors = [
      [1.0,  0.0,  0.0,  1.0],    // Front face: red
      [1.0,  0.0,  0.0,  1.0],    // Back face: red
      [1.0,  0.0,  0.0,  1.0],    // Top face: red
      [1.0,  0.0,  0.0,  1.0],    // Front face: red

      [1.0,  0.0,  0.0,  1.0],    // Back face: red
      [1.0,  0.0,  0.0,  1.0],    // Top face: red
      [1.0,  0.0,  0.0,  1.0],    // Top face: red
      [1.0,  0.0,  0.0,  1.0],    // Top face: red

    ]

    return {
    'faceColors' : faceColors,
    'indices' : [
      0,  1,  2,      
      3,  4,  5,      
      6,  7,  8,
      9, 10, 11,  ///back
      12, 13, 14,   
      15, 16, 17,  
      18, 19, 20,
      21, 22, 23],    // top
    
    'numComponentsColor' : 4,
    'numComponentsPosition' : 3,
    'vertexCount' : 24,
    'positions' : [
      // front face
      0,centre_height,0,
      hgt,len,-width,
      -hgt,len,-width,

      0,centre_height,0,
      hgt,len,width,
      -hgt,len,width,

      0,centre_height,0,
      hgt,len,width,
      hgt,len,-width,

        0,centre_height,0,
      -hgt,len,width,
      -hgt,len,-width,

        0,-centre_height,0,
      hgt,-len,-width,
      -hgt,-len,-width,

      0,-centre_height,0,
      hgt,-len,width,
      -hgt,-len,width,

      0,-centre_height,0,
      hgt,-len,width,
      hgt,-len,-width,

        0,-centre_height,0,
      -hgt,-len,width,
      -hgt,-len,-width,
      
    ],
    'rotation_X' : 0,
    'rotation_Y' : 0,
    'rotation_Z' : 0,
    'speed'     : 7,
    'rotation'  : Math.PI * Math.random(),
    'position' : [0, 0, -25],
    }
}


/*The keydown event occurs when a keyboard key is pressed down.*/
$(document).keydown(function(event){
    var charCode = event.keyCode;
    var charStr = String.fromCharCode(charCode);
    statusKeys[charCode] = true; 
});

/* The keyup event occurs when a keyboard key is released. */
$(document).keyup(function(event){

    var charCode = event.keyCode;
     if(charCode == 80){
        // P Key
        gameplay = 1 - gameplay;
    }
    var charStr = String.fromCharCode(charCode);
    statusKeys[charCode] = false;
});

function main() {
    const canvas = document.querySelector('#glcanvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    //const numofoctagons = 11;
    // If we don't have a GL context, give up now

    if (!gl) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.');
        return;
    }

    // Vertex shader program

    const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

    // Fragment shader program

    const fsSource = `
    varying lowp vec4 vColor;

    void main(void) {
      gl_FragColor = vColor;
    }
  `;

    // Initialize a shader program; this is where all the lighting
    // for the vertices and so forth is established.
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    // Collect all the info needed to use the shader program.
    // Look up which attributes our shader program is using
    // for aVertexPosition, aVevrtexColor and also
    // look up uniform locations.
    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
    };

    // Here's where we call the routine that builds all the
    // objects we'll be drawing.
    shapes = [];
    buffer_shapes = [];
    for(var i=0;i<numofoctagons;i++){
        shapes.push(create_octagon());
        shapes[i].position[2] = -2*i;
        buffer_shapes.push(initBuffers(gl, shapes[i]));
    }

    obstracles = [];
    buffer_obstracles = [];
    for(var i=0;i<numofobstracles;i++){
        obstracles.push(create_cuboid());
        obstracles[i].position[2] = -10*i;
        obstracles[i].rotation_Z = i*Math.PI/numofobstracles;
        buffer_obstracles.push(initBuffers(gl, obstracles[i]));
    }    

    var then = 0;

    // Draw the scene repeatedly
    function render(now) {
        now *= 0.001;  // convert to seconds
        const deltaTime = now - then;
        then = now;
        const projectionMatrix = clearScene(gl);
        refresh_tunnel(gl, shapes, buffer_shapes);
        refresh_obstracles(gl, obstracles, buffer_obstracles);

        if(gameplay)
        handleKeys(shapes);

        for(var i=0;i<numofoctagons;i++){
            shapes[i].position[2] += gameplay * shapes[i].speed * deltaTime;
            drawScene(gl, programInfo, buffer_shapes[i], deltaTime, projectionMatrix ,shapes[i]);
        }
        for(var i=0;i<numofobstracles;i++){
            obstracles[i].position[2] += gameplay * obstracles[i].speed * deltaTime;
            obstracles[i].rotation_Z += obstracles[i].rotation * deltaTime;
            drawScene(gl, programInfo, buffer_obstracles[i], deltaTime, projectionMatrix ,obstracles[i]);
        }

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//
function initBuffers(gl, shape) {

    // Create a buffer for the cube's vertex positions.

    const positionBuffer = gl.createBuffer();

    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = shape.positions;

    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Now set up the colors for the faces. We'll use solid colors
    // for each face.

    const faceColors = shape.faceColors;

    // Convert the array of colors into a table for all the vertices.

    var colors = [];

    for (var j = 0; j < faceColors.length; ++j) {
        const c = faceColors[j];

        // Repeat each color four times for the four vertices of the face
       for (var i = 0; i < shape.numComponentsColor; ++i) {
        colors = colors.concat(c);
        }
    }

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    // Build the element array buffer; this specifies the indices
    // into the vertex arrays for each face's vertices.

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    // This array defines each face as two triangles, using the
    // indices into the vertex array to specify each triangle's
    // position.

    
    const indices = shape.indices;

    // Now send the element array to GL

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices), gl.STATIC_DRAW);

    return {
        position: positionBuffer,
        color: colorBuffer,
        indices: indexBuffer,
    };
}


function handleKeys(shapes){


    if(statusKeys[37]){
            // Left Key
            console.log('left key');
            for(var i = 0; i < numofoctagons; i++){
                shapes[i].rotation_Z += shapes[i].rotation;
            }
    }
    if(statusKeys[39]){
            // Right Key
            console.log('right key');
            for(var i = 0; i < numofoctagons; i++){
                shapes[i].rotation_Z -= shapes[i].rotation;
            }
    }
}

function clearScene(gl){
    gl.clearColor(0.5, 0.5, 0.5, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

    // Clear the canvas before we start drawing on it.

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.

    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix,
                     fieldOfView,
                     aspect,
                     zNear,
                     zFar);
    return projectionMatrix;
}

//
// Draw the scene.
//
function drawScene(gl, programInfo, buffers, deltaTime, projectionMatrix, shape) {
    
    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    const modelViewMatrix = mat4.create();

    // Now move the drawing position a bit to where we want to
    // start drawing the square.

    mat4.translate(modelViewMatrix,     // destination matrix
        modelViewMatrix,     // matrix to translate
        shape.position);  // amount to translate
    mat4.rotate(modelViewMatrix,  // destination matrix
                modelViewMatrix,  // matrix to rotate
                shape.rotation_X,     // amount to rotate in radians
                [1, 0, 0]);       // axis to rotate around (x)
    
    mat4.rotate(modelViewMatrix,  // destination matrix
        modelViewMatrix,  // matrix to rotate
        shape.rotation_Y,     // amount to rotate in radians
        [0, 1, 0]);       // axis to rotate around (y)
    
    mat4.rotate(modelViewMatrix,  // destination matrix
        modelViewMatrix,  // matrix to rotate
        shape.rotation_Z,     // amount to rotate in radians
        [0, 0, 1]);       // axis to rotate around (Z)
    

    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute
    
    {
        const numComponents = shape.numComponentsPosition;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexPosition,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(
            programInfo.attribLocations.vertexPosition);
    }

    // Tell WebGL how to pull out the colors from the color buffer
    // into the vertexColor attribute.
    {
        const numComponents = shape.numComponentsColor;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexColor,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(
            programInfo.attribLocations.vertexColor);
    }

    // Tell WebGL which indices to use to index the vertices
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

    // Tell WebGL to use our program when drawing

    gl.useProgram(programInfo.program);

    // Set the shader uniforms

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix);
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);

    {
        const vertexCount = shape.vertexCount;
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }

    // Update the rotation for the next draw
}

function refresh_tunnel(gl, shapes, buffer_shapes)
{
    if(shapes.length && shapes[0].position[2] > 1){
        shapes.shift();
        buffer_shapes.shift();
        numofoctagons--;
        shapes.push(create_octagon());
        numofoctagons++;
        shapes[numofoctagons - 1].position[2] = shapes[numofoctagons - 2].position[2] - 2;
        shapes[numofoctagons - 1].rotation_X = shapes[numofoctagons - 2].rotation_X;
        shapes[numofoctagons - 1].rotation_Y = shapes[numofoctagons - 2].rotation_Y;
        shapes[numofoctagons - 1].rotation_Z = shapes[numofoctagons - 2].rotation_Z;
        buffer_shapes.push(initBuffers(gl, shapes[numofoctagons - 1]));
    }
}

function refresh_obstracles(gl, obstracles, buffer_obstracles){
    if(obstracles.length &&  obstracles[0].position[2] > 1){
        obstracles.shift();
        buffer_obstracles.shift();
        numofobstracles--;
        obstracles.push(create_cuboid());
        numofobstracles++;
        obstracles[numofobstracles - 1].rotation_Z = Math.random()*Math.PI;
        buffer_obstracles.push(initBuffers(gl, obstracles[numofobstracles - 1]));
    }
    else if(obstracles.length == 0){
        obstracles.push(create_cuboid());
        numofobstracles++;
        obstracles[numofobstracles - 1].rotationZ = Math.random()*Math.PI;
        buffer_obstracles.push(initBuffers(gl, obstracles[numofobstracles - 1]));
    }
}

//
// Initialize a shader program, so WebGL knows how to draw our data

function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Send the source to the shader object

    gl.shaderSource(shader, source);

    // Compile the shader program

    gl.compileShader(shader);

    // See if it compiled successfully

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}


main();
