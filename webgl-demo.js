var numofoctagons = 10;
var numofobstracles = 2;
var typesofobstracles = 4;
var numoftextures = 2;
var textures = []
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
var texture_name = ['assets/diff2.jpg'];
var color_red = [0.01,  0.01, 0.19,  0.01, 0.01,  0.19,  0.19,  0.19];
var differ_colors = [
	[   0.81,  0.01, 0.99,  0.01, 0.81,  0.19,  0.99,  0.19 ], //yellpw
	[   0.81,  0.81, 0.99,  0.81, 0.81,  0.99,  0.99,  0.99 ], // green
	[   0.81,  0.61, 0.99,  0.61, 0.81,  0.79,  0.99,  0.79 ], // orange
	[   0.61,  0.61, 0.79,  0.61, 0.61,  0.79,  0.79,  0.79 ], // skyblue
	[   0.41,  0.41, 0.59,  0.41, 0.41,  0.59,  0.59,  0.59 ], // sea-green
	[   0.21,  0.61, 0.39,  0.61, 0.21,  0.79,  0.39,  0.79 ], // drakblue
	[   0.01,  0.41, 0.19,  0.41, 0.01,  0.59,  0.19,  0.59 ], // skin
	[   0.01,  0.81, 0.19,  0.81, 0.01,  0.99,  0.19,  0.99 ]]; // pink

function add_obstracles(obstracles){
	var category;
	if(levelnum == 1)
		category = getRandomInt(typesofobstracles-1);
	else
		category = getRandomInt(typesofobstracles);

	switch(category){
		case 0: {
			obstracles.push(create_cuboid());
			break;
		}
		case 1: {
			obstracles.push(create_2triangles());
			break;
		}
		case 2: {
			obstracles.push(create_halfoctagon());
			break;
		}
		case 3: {
			obstracles.push(create_2halfoctagon());
			break;
		}
		default:
			break;
	}
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
	}

	var norm1 = Math.cos(Math.PI/8);
	var norm2 = Math.cos(3*Math.PI/8);

	var vertexNormals = [
		// top right 1
		norm1,norm1,0,
		norm1,norm1,0,
		norm1,norm1,0,
		norm1,norm1,0,

		// top right 2
		-norm2,-norm2,0,
		-norm2,-norm2,0,
		-norm2,-norm2,0,
		-norm2,-norm2,0,

		// top left 2
		norm2,-norm2,0,
		norm2,-norm2,0,
		norm2,-norm2,0,
		norm2,-norm2,0,

		// top left 1
		norm1,norm1,0,
		norm1,norm1,0,
		norm1,norm1,0,
		norm1,norm1,0,

		//bottom left 2
		-norm1,-norm1,0,
		-norm1,-norm1,0,
		-norm1,-norm1,0,
		-norm1,-norm1,0,

		// top right 2
		norm2,norm2,0,
		norm2,norm2,0,
		norm2,norm2,0,
		norm2,norm2,0,

		// top left 2
		norm2,norm2,0,
		norm2,norm2,0,
		norm2,norm2,0,
		norm2,norm2,0,

		// top left 1
		norm1,-norm1,0,
		norm1,-norm1,0,
		norm1,-norm1,0,
		norm1,-norm1,0,];
	var textureCoordinates = [
		[0.61,  0.41, 0.79,  0.41, 0.61,  0.59,  0.79,  0.59, // white
		0.41,  0.61, 0.59,  0.61, 0.41,  0.79,  0.59,  0.79, // black
		0.61,  0.41, 0.79,  0.41, 0.61,  0.59,  0.79,  0.59, // white
		0.41,  0.61, 0.59,  0.61, 0.41,  0.79,  0.59,  0.79, // black
		0.61,  0.41, 0.79,  0.41, 0.61,  0.59,  0.79,  0.59, // white
		0.41,  0.61, 0.59,  0.61, 0.41,  0.79,  0.59,  0.79, // black
		0.61,  0.41, 0.79,  0.41, 0.61,  0.59,  0.79,  0.59, // white
		0.41,  0.61, 0.59,  0.61, 0.41,  0.79,  0.59,  0.79],  // black

		[0.41,  0.61, 0.59,  0.61, 0.41,  0.79,  0.59,  0.79, // black
		0.61,  0.41, 0.79,  0.41, 0.61,  0.59,  0.79,  0.59, // white
		0.41,  0.61, 0.59,  0.61, 0.41,  0.79,  0.59,  0.79 , // black
		0.61,  0.41, 0.79,  0.41, 0.61,  0.59,  0.79,  0.59 , // white
		0.41,  0.61, 0.59,  0.61, 0.41,  0.79,  0.59,  0.79 , // black
		0.61,  0.41, 0.79,  0.41, 0.61,  0.59,  0.79,  0.59 , // white
		0.41,  0.61, 0.59,  0.61, 0.41,  0.79,  0.59,  0.79 , // black
		0.61,  0.41, 0.79,  0.41, 0.61,  0.59,  0.79,  0.59]]; // white

	for(var i = 0;i<n;i++){    
		myArray = shuffle(differ_colors);
		myArray = myArray.reduce((acc, val) => acc.concat(val), []);
		textureCoordinates.push(myArray);
	}

	if(!onlyblackandwhite)
		var category = getRandomInt(10);
	else
		var category = getRandomInt(2);
	return {
		'textureCoordinates' : textureCoordinates[category],
		'indices' : indices,
		'vertexCount' : 48,
		'vertexNormals' : vertexNormals,
		'positions' : positions,
		'rotation_Z' : 0,
		'speed'     : 7,
		'rotation'  : 0.05,
		'position' : [0, 0, 0],
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

	var vertexNormals = vertex_Normal;
	var textureCoordinates = []
		for(var i = 0;i<n;i++){    
			textureCoordinates.push(color_red);
		}

	textureCoordinates = textureCoordinates.reduce((acc, val) => acc.concat(val), []);

	return {
		'indices' : indices,
		'textureCoordinates' : textureCoordinates,
		'vertexNormals' : vertexNormals,
		'vertexCount' : 36,
		'positions' : positions,
		'rotation_Z' : 0,
		'speed'     : 7,
		'rotation'  : Math.PI * Math.random(),
		'position' : [0, 0, -20],
	}
}

function create_halfoctagon(){
	var len = 1;
	hgt = Math.cos(Math.PI/8);
	var width = Math.tan(Math.PI/8)/50;

	var textureCoordinates = []
		for(var i = 0;i<6;i++){    
			textureCoordinates.push(color_red);
		}
	textureCoordinates = textureCoordinates.reduce((acc, val) => acc.concat(val), []);

	var vertexNormals = vertex_Normal;

	return {
		'textureCoordinates' : textureCoordinates,
		'indices' : [
			0,  1,  2,      0,  2,  3,   
			0, 3, 4,    0, 4, 5,  // front
			6,  7,  8,      6,  8,  9,    
			6, 9, 10,   6, 10, 11,  ///back
			12, 13, 14,   12, 14, 15,   
			12, 15, 16,  12, 16, 17],    // top

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
			'vertexNormals' : vertexNormals,
			'rotation_Z' : 0,
			'speed'     : 7,
			'rotation'  : Math.PI * Math.random(),
			'position' : [0, 0, -20],
	}
}

function create_2halfoctagon(){
	var len = 1;
	var hgt = Math.cos(Math.PI/8);
	var width = Math.tan(Math.PI/8)/50;
	var centre_height = 0.3;

	var textureCoordinates = []
		for(var i = 0;i<12;i++){    
			textureCoordinates.push(color_red);
		}
	textureCoordinates = textureCoordinates.reduce((acc, val) => acc.concat(val), []);


	var vertexNormals = []
		for(var i = 0;i<2;i++){    
			vertexNormals.push(vertex_Normal);
		}
	vertexNormals = vertexNormals.reduce((acc, val) => acc.concat(val), []);

	return {
		'textureCoordinates' : textureCoordinates,
		'vertexNormals' : vertexNormals,
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
			'rotation_Z' : 0,
			'speed'     : 7,
			'rotation'  : Math.PI * Math.random(),
			'position' : [0, 0, -20],
	}
}

function create_2triangles(){
	var len = 1;
	var centre_height = 0.3;
	hgt = Math.cos(Math.PI/16);
	var width = Math.tan(Math.PI/8)/50;

	var textureCoordinates = []
		for(var i = 0;i<8;i++){    
			textureCoordinates.push(color_red);
		}

	textureCoordinates = textureCoordinates.reduce((acc, val) => acc.concat(val), []);
	var vertexNormals = [
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
		];

	return {
		'textureCoordinates' : textureCoordinates,
		'vertexNormals' : vertexNormals,
		'indices' : [
			0,  1,  2,      
			3,  4,  5,      
			6,  7,  8,
			9, 10, 11,  ///back
			12, 13, 14,   
			15, 16, 17,  
			18, 19, 20,
			21, 22, 23],    // top

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
			'rotation_Z' : 0,
			'speed'     : 7,
			'rotation'  : Math.PI * Math.random(),
			'position' : [0, 0, -25],
	};
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
			texture1: gl.getUniformLocation(shaderProgram, 'texture1'),
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

	for(var i=0;i<numoftextures;i++){
		texture = loadTexture(gl, texture_name[i]);
		textures.push(texture);
	} 

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
	if(statusKeys[90]){ // Z key
		console.log('cameraAngleDeg Plus')
			updateCameraAngleHorizPlus();
	}
	if(statusKeys[88]){ // X key
		console.log('cameraAngleDeg Minus')
			updateCameraAngleHorizMinus();
	}
	if(statusKeys[78]){ // 'N' key
		console.log('cameraAngleDeg Plus')
			updateCameraAngleVertPlus();
	}
	if(statusKeys[77]){ // 'M' key
		console.log('cameraAngleDeg Minus')
			updateCameraAngleVertMinus();
	}

	if(statusKeys[66]){
		console.log('only black and white')
			onlyblackandwhite = 1 - onlyblackandwhite;
	}
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

//
// Draw the scene.
//
function drawScene(gl, programInfo, buffers, deltaTime, projectionMatrix, shape,texture) {
	webglUtils.resizeCanvasToDisplaySize(gl.canvas);

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
			shape.rotation_Z,     // amount to rotate in radians
			[0, 0, 1]);       // axis to rotate around (Z)

	const normalMatrix = mat4.create();
	mat4.invert(normalMatrix, modelViewMatrix);
	mat4.transpose(normalMatrix, normalMatrix);



	// Tell WebGL how to pull out the positions from the position
	// buffer into the vertexPosition attribute

	{
		const numComponents = 3;
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

	// Tell WebGL how to pull out the texture coordinates from
	// the texture coordinate buffer into the textureCoord attribute.
	{
		const numComponents = 2;
		const type = gl.FLOAT;
		const normalize = false;
		const stride = 0;
		const offset = 0;
		gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
		gl.vertexAttribPointer(
				programInfo.attribLocations.textureCoord,
				numComponents,
				type,
				normalize,
				stride,
				offset);
		gl.enableVertexAttribArray(
				programInfo.attribLocations.textureCoord);
	}
	// Tell WebGL how to pull out the normals from
	// the normal buffer into the vertexNormal attribute.
	{
		const numComponents = 3;
		const type = gl.FLOAT;
		const normalize = false;
		const stride = 0;
		const offset = 0;
		gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
		gl.vertexAttribPointer(
				programInfo.attribLocations.vertexNormal,
				numComponents,
				type,
				normalize,
				stride,
				offset);
		gl.enableVertexAttribArray(
				programInfo.attribLocations.vertexNormal);
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
	gl.uniformMatrix4fv(
			programInfo.uniformLocations.normalMatrix,
			false,
			normalMatrix);

	// Specify the texture to map onto the faces.
	// Tell WebGL we want to affect texture unit 0

	// Set each texture unit to use a particular texture.
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, textures[0]);

	// Tell the shader we bound the texture to texture unit 0
	gl.uniform1i(programInfo.uniformLocations.texture0, 0);

	gl.drawElements(gl.TRIANGLES, shape.vertexCount, gl.UNSIGNED_SHORT ,0);

};

function refresh_tunnel(gl, shapes, buffer_shapes)
{
	if(shapes[0].position[2] > 1){
		shapes.push(create_octagon());
		numofoctagons++;
		shapes[numofoctagons - 1].position[2] = shapes[numofoctagons - 2].position[2] - 2;
		shapes[numofoctagons - 1].rotation_Z = shapes[numofoctagons - 2].rotation_Z;
		buffer_shapes.push(initBuffers(gl, shapes[numofoctagons - 1]));
	}
}

function remove_obstracles(){
	obstracles.shift(); 
	buffer_obstracles.shift();
	numofobstracles--;
};

function remove_octagons(){
	shapes.shift();
	buffer_shapes.shift();
	numofoctagons--;
}

function refresh_obstracles(gl, obstracles, buffer_obstracles){
	if(obstracles[0].position[2] > 1){
		remove_obstracles();  
		add_obstracles(obstracles)
			numofobstracles++;
		obstracles[numofobstracles - 1].rotation_Z = Math.random()*Math.PI;
		buffer_obstracles.push(initBuffers(gl, obstracles[numofobstracles - 1]));
	}    
}

main();
