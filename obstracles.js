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
};

function remove_obstracles(){
	obstracles.shift(); 
	buffer_obstracles.shift();
	numofobstracles--;
};

function refresh_obstracles(gl, obstracles, buffer_obstracles){
	if(obstracles[0].position[2] > 1){
		remove_obstracles();  
		add_obstracles(obstracles)
		numofobstracles++;
		obstracles[numofobstracles - 1].rotation_Z = Math.random()*Math.PI;
		buffer_obstracles.push(initBuffers(gl, obstracles[numofobstracles - 1]));
	}    
};

function create_cuboid(){
	const n = 6;
  	const length = Math.tan(Math.PI/8)/3;
	const height = 1.0;
	const width = Math.tan(Math.PI/8)/50;
	const positions = [
		//Right face
		length,  height,  width,
		length,  height, -width,
		length, -height, -width,
		length, -height,  width,

		//Left face
		-length,  height,  width,
		-length,  height, -width,
		-length, -height, -width,
		-length, -height,  width,

		//Top face
		-length, height,  width,
		length, height,  width,
		length, height, -width,
		-length, height, -width,

		//Bottom face
		-length, -height,  width,
		length, -height,  width,
		length, -height, -width,
		-length, -height, -width,

		//Front face
		-length,  height, width,
		length,  height, width,
		length, -height, width,
		-length, -height, width,

		//Back face
		-length,  height, -width,
		length,  height, -width,
		length, -height, -width,
		-length, -height, -width,

		];

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

	var textureCoordinates = []
		for(var i = 0;i<n;i++){    
			textureCoordinates.push(red_color);
		}

	textureCoordinates = textureCoordinates.reduce((acc, val) => acc.concat(val), []);

  const vertexNormals = vertex_Normal;

	return {
		'position' : [0, 0, -20],
		'positions' : positions,
		'indices' : indices,
		'vertexCount' : 36,
		'textureCoordinates' : textureCoordinates,
		'vertexNormals' : vertexNormals,
		'rotation_Z' : 0,
		'speed'     : 7,
		'rotation'  : Math.PI * Math.random(),
	}
}

function create_halfoctagon(){
	const len = 1;
	const hgt = Math.cos(Math.PI/8);
	const width = Math.tan(Math.PI/8)/50;
	const positions = [
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

		];
	const indices = [
		0, 1, 2,        0, 2, 3,   
		0, 3, 4,        0, 4, 5,  // front
		6, 7, 8,        6, 8, 9,    
		6, 9, 10,       6, 10, 11,  ///back
		12, 13, 14,     12, 14, 15,   
		12, 15, 16,     12, 16, 17];    // top

	var textureCoordinates = []
		for(var i = 0;i<6;i++){    
			textureCoordinates.push(red_color);
		}
	textureCoordinates = textureCoordinates.reduce((acc, val) => acc.concat(val), []);

	const vertexNormals = vertex_Normal;

	return {
		'position' : [0, 0, -20],
		'positions' : positions,
		'indices' : indices, 
		'vertexCount' : 24,
		'textureCoordinates' : textureCoordinates,
		'vertexNormals' : vertexNormals,
		'rotation_Z' : 0,
		'speed'     : 7,
		'rotation'  : Math.PI * Math.random(),
	}
}

function create_2halfoctagon(){
	const len = 1;
	const hgt = Math.cos(Math.PI/8);
	const width = Math.tan(Math.PI/8)/50;
	const centre_height = 0.3;

	const positions = [
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
		];

	const indices = [
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
		30, 33, 34,  30, 34, 35];    // top

	var textureCoordinates = []
		for(var i = 0;i<12;i++){    
			textureCoordinates.push(red_color);
		}
	textureCoordinates = textureCoordinates.reduce((acc, val) => acc.concat(val), []);

	var vertexNormals = []
		for(var i = 0;i<2;i++){    
			vertexNormals.push(vertex_Normal);
		}
	vertexNormals = vertexNormals.reduce((acc, val) => acc.concat(val), []);

	return {
		'position' : [0, 0, -20],
		'positions' : positions,
		'indices' : indices,
		'vertexCount' : 48,
		'textureCoordinates' : textureCoordinates,
		'vertexNormals' : vertexNormals,
		'rotation_Z' : 0,
		'speed'     : 7,
		'rotation'  : Math.PI * Math.random(),
	}
}

function create_2triangles(){
	const len = 1;
	const centre_height = 0.3;
	const hgt = Math.cos(Math.PI/16);
	const width = Math.tan(Math.PI/8)/50;

	const positions = [
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

		];
	const indices = [
		0,  1,  2,      
		3,  4,  5,      
		6,  7,  8,
		9, 10, 11,  ///back
		12, 13, 14,   
		15, 16, 17,  
		18, 19, 20,
		21, 22, 23];    // top

	var vertexNormals = [];
	vertexNormals.push(vertex_Normal);
	vertexNormals.push(vertex_Normal[0]);
	vertexNormals.push(vertex_Normal[1]);
	vertexNormals = vertexNormals.reduce((acc, val) => acc.concat(val), []);

	var textureCoordinates = []
		for(var i = 0;i<8;i++){    
			textureCoordinates.push(red_color);
		}

	textureCoordinates = textureCoordinates.reduce((acc, val) => acc.concat(val), []);

	return {
		'position' : [0, 0, -25],
		'positions' : positions,
		'indices' : indices,
		'vertexCount' : 24,
		'textureCoordinates' : textureCoordinates,
		'vertexNormals' : vertexNormals,
		'rotation_Z' : 0,
		'speed'     : 7,
		'rotation'  : Math.PI * Math.random(),
	};
}