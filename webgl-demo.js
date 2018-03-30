var numofoctagons = 10;
var numofobstracles = 2;
var typesofobstracles = 4;
var myArray = []
var myArray1 = []
var framecnt = 0;
var levelnum = 1;
var gameplay = 0;
var statusKeys = {};
var onlyblackandwhite = 0;
var cameraAngleDegHoriz = 0;
var cameraAngleDegVert = 0;
var vertex_Normal = [
	// Right
	1.0,  0.0,  0.0,
	1.0,  0.0,  0.0,
	1.0,  0.0,  0.0,
	1.0,  0.0,  0.0,

	// Left
	-1.0,  0.0,  0.0,
	-1.0,  0.0,  0.0,
	-1.0,  0.0,  0.0,
	-1.0,  0.0,  0.0,
	// Top
	0.0,  1.0,  0.0,
	0.0,  1.0,  0.0,
	0.0,  1.0,  0.0,
	0.0,  1.0,  0.0,

	// Bottom
	0.0, -1.0,  0.0,
	0.0, -1.0,  0.0,
	0.0, -1.0,  0.0,
	0.0, -1.0,  0.0,
	// Front
	0.0,  0.0,  1.0,
	0.0,  0.0,  1.0,
	0.0,  0.0,  1.0,
	0.0,  0.0,  1.0,

	// Back
	0.0,  0.0, -1.0,
	0.0,  0.0, -1.0,
	0.0,  0.0, -1.0,
	0.0,  0.0, -1.0,
	];

/* https://webglfundamentals.org/webgl/lessons/webgl-3d-textures.html */
var texture_name = 'assets/diff2.jpg';
var red_color = [0.01,  0.01, 0.19,  0.01, 0.01,  0.19,  0.19,  0.19];
var white_color = [0.61,  0.41, 0.79,  0.41, 0.61,  0.59,  0.79,  0.59];
var black_color = [0.41,  0.61, 0.59,  0.61, 0.41,  0.79,  0.59,  0.79];
var differ_colors = [
	[   0.81,  0.01, 0.99,  0.01, 0.81,  0.19,  0.99,  0.19 ], //yellpw
	[   0.81,  0.81, 0.99,  0.81, 0.81,  0.99,  0.99,  0.99 ], // green
	[   0.81,  0.61, 0.99,  0.61, 0.81,  0.79,  0.99,  0.79 ], // orange
	[   0.61,  0.61, 0.79,  0.61, 0.61,  0.79,  0.79,  0.79 ], // skyblue
	[   0.41,  0.41, 0.59,  0.41, 0.41,  0.59,  0.59,  0.59 ], // sea-green
	[   0.21,  0.61, 0.39,  0.61, 0.21,  0.79,  0.39,  0.79 ], // drakblue
	[   0.01,  0.41, 0.19,  0.41, 0.01,  0.59,  0.19,  0.59 ], // skin
	[   0.01,  0.81, 0.19,  0.81, 0.01,  0.99,  0.19,  0.99 ]]; // pink


function main() {
	const canvas = document.querySelector('#glcanvas');
	const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
	//const numofoctagons = 11;
	// If we don't have a GL context, give up now

	if (!gl) {
		alert('Unable to initialize WebGL. Your browser or machine may not support it.');
		return;
	};

	const shaderProgram = webglUtils.createProgramFromScripts(gl, ["3d-vertex-shader", "3d-fragment-shader"]);

	// Collect all the info needed to use the shader program.
	// Look up which attributes our shader program is using
	// for aVertexPosition, aVevrtexColor and also
	// look up uniform locations.

	const programInfo = {
		program: shaderProgram,
		attribLocations: {
			vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
			textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
			vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
		},
		uniformLocations: {
			projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
			modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
			normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
			texture0: gl.getUniformLocation(shaderProgram, 'texture0'),
			//texture1: gl.getUniformLocation(shaderProgram, 'texture1'),
		},
	};

	// Here's where we call the routine that builds all the objects we'll be drawing.
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
		add_obstracles(obstracles);
		//obstracles.push(create_2halfoctagon());
		obstracles[i].position[2] = -10*i+2;
		obstracles[i].rotation_Z = i*Math.PI/numofobstracles;
		buffer_obstracles.push(initBuffers(gl, obstracles[i]));
	}    

	/*for(var i=0;i<numoftextures;i++){
	  texture = loadTexture(gl, texture_name[i]);
	  textures.push(texture);
	  } */

	texture = loadTexture(gl, texture_name);

	var then = 0;
	function shakey_screen(now) {
		// requestAnimationFrame(render);
		//framecnt++;
		now *= 0.001;  // convert to seconds
		const deltaTime = now - then;
		then = now;
		const projectionMatrix = clearScene(gl);
		for (var i = 0; i < numofoctagons; i++){
			shapes[i].position[0] = 0.01 * Math.sin(2 * Math.PI * framecnt / 4);
			drawScene(gl, programInfo, buffer_shapes[i], deltaTime, projectionMatrix ,shapes[i],texture);
		}
		for (var i = 0; i < numofobstracles; i++){
			obstracles[i].position[0] = 0.01 * Math.sin(2 * Math.PI * framecnt / 4);
			drawScene(gl, programInfo, buffer_obstracles[i], deltaTime, projectionMatrix ,obstracles[i],texture);
		}
		requestAnimationFrame(shakey_screen);
	}
	// Draw the scene repeatedly
	function render(now) {
		if(gameplay)
			framecnt++;
		if(framecnt > 1000){
			levelnum++;
			updateLevel();
		}
		updateScore();
		now *= 0.001;  // convert to seconds
		const deltaTime = now - then;
		then = now;
		const projectionMatrix = clearScene(gl);
		refresh_tunnel(gl, shapes, buffer_shapes);
		refresh_obstracles(gl, obstracles, buffer_obstracles);

		if(gameplay)
			handleKeys(shapes);

		for(var i=0;i<numofoctagons;i++){
			shapes[i].position[2] += shapes[i].speed * deltaTime;
			drawScene(gl, programInfo, buffer_shapes[i], deltaTime, projectionMatrix ,shapes[i],texture);
		}
		if(gameplay)
			for(var i=0;i<numofobstracles;i++){
				obstracles[i].position[2] += gameplay * obstracles[i].speed * deltaTime;
				obstracles[i].rotation_Z += obstracles[i].rotation * deltaTime;
				drawScene(gl, programInfo, buffer_obstracles[i], deltaTime, projectionMatrix ,obstracles[i],texture);
			}
		if(!detect_collision(shapes, obstracles)){
			console.log('nocollsion')
				requestAnimationFrame(render);
		}
		else{
			console.log('detect_collision');
			//framecnt = 0;
			gameOver();
			shakey_screen(gl, shapes, buffer_shapes, obstracles, buffer_obstracles);
		}
	}
	requestAnimationFrame(render);
}

function detect_collision(shapes, obstracles){
	for (var i = 0; i < numofobstracles; i++){
		console.log(obstracles[i].rotation_Z)
			if(obstracles[i].position[2] > -0.5){
				var theta = obstracles[i].rotation_Z - Math.floor(obstracles[i].rotation_Z / Math.PI) * Math.PI;
				//console.log(theta)
				//var alpha = shapes[0].rotation_Z - Math.floor(shapes[0].rotation_Z / Math.PI) * Math.PI;
				if(-Math.PI / 8 <= theta && theta <= Math.PI / 8){
					return true;
				}
			}
	}
	return false;
}

// initBuffers
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
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


	const textureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
	const textureCoordinates = shape.textureCoordinates;

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
			gl.STATIC_DRAW);


	const normalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

	const vertexNormals = shape.vertexNormals;

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
			gl.STATIC_DRAW);

	return {
		position: positionBuffer,
		normal: normalBuffer,
		textureCoord: textureCoordBuffer,
		indices: indexBuffer,
	};
}
//  var fieldOfViewRadians = degToRad(60);

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
	const zNear = 1;
	const zFar = 1000.0;
	const projectionMatrix = mat4.create();

	// note: glmatrix.js always has the first argument
	// as the destination to receive the result.
	mat4.perspective(projectionMatrix,
			fieldOfView,
			aspect,
			zNear,
			zFar);

	var numFs = 5;
	var radius = 1;
	var fPosition = [0, 0, 0];

	// Use matrix math to compute a position on a circle where
	// the camera is
	//var cameraMatrix = m4.yRotation(degToRad());
	const cameraMatrix = mat4.create();
	mat4.rotate(cameraMatrix,  // destination matrix
			cameraMatrix,  // matrix to rotate
			degToRad(cameraAngleDegHoriz),     // amount to rotate in radians
			[0, 1, 0]);
	mat4.rotate(cameraMatrix,  // destination matrix
			cameraMatrix,  // matrix to rotate
			degToRad(cameraAngleDegVert),     // amount to rotate in radians
			[1, 0, 0]);
	mat4.translate(cameraMatrix, cameraMatrix, [0, 0, radius * 1.5]);

	// Get the camera's postion from the matrix we computed
	var cameraPosition = [
		cameraMatrix[12],
		cameraMatrix[13],
		cameraMatrix[14],
	];

		var up = [0, 1, 0];

		// Compute the camera's matrix using look at.
		var cameraMatrix1 = lookAt(cameraPosition, fPosition, up);

		// Make a view matrix from the camera matrix.
		mat4.invert(cameraMatrix1, cameraMatrix1);
		// Compute a view projection matrix
		mat4.multiply(projectionMatrix, projectionMatrix,cameraMatrix1);
		return projectionMatrix;
}

function refresh_tunnel(gl, shapes, buffer_shapes)
{
	if(shapes[0].position[2] > 1){
		remove_octagons();
		shapes.push(create_octagon());
		numofoctagons++;
		shapes[numofoctagons - 1].position[2] = shapes[numofoctagons - 2].position[2] - 2;
		shapes[numofoctagons - 1].rotation_Z = shapes[numofoctagons - 2].rotation_Z;
		buffer_shapes.push(initBuffers(gl, shapes[numofoctagons - 1]));
	}
}

main();
