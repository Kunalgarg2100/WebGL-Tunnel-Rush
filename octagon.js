function create_octagon(){
	var n = 8;
	var r = 1;
	var k = 0;
	var angle = 0;
	var depth = 1;
	var positions = [];
	for(var i=0;i<n;i++)
	{
		positions[k++] = r * Math.sin(angle);
		positions[k++] = r * Math.cos(angle);
		positions[k++] = -depth;

		positions[k++] = r * Math.sin(angle);
		positions[k++] = r * Math.cos(angle);
		positions[k++] = +depth;

		angle += (2*Math.PI)/n;

		positions[k++] = r * Math.sin(angle);
		positions[k++] = r * Math.cos(angle);
		positions[k++] = -depth;

		positions[k++] = r * Math.sin(angle);
		positions[k++] = r * Math.cos(angle);
		positions[k++] = +depth;
	}

	var indices = [];
	var k = 0;
	for(var i = 0;i<n;i++)
	{
		for(var j=0;j<3;j++){
			indices[k++] = 4*i+j;
		};
		for(var j=0;j<3;j++){
			indices[k++] = 4*i+j+1;
		};
	};

	for(var j=0;j<3;j++){
		indices[k++] = j;
	};
	indices[k++] = 0;
	indices[k++] = 1;
	indices[k++] = 3;

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

	var textureCoordinates = [];
	var white_black = [];
	var black_white = [];

	for(var i = 0;i<n;i++){    
		if(i%2==0){
			white_black.push(white_color);
			black_white.push(black_color)
		}
		else {
			white_black.push(black_color);
			black_white.push(white_color);
		}
	};

	white_black = white_black.reduce((acc, val) => acc.concat(val), []);
	black_white = black_white.reduce((acc, val) => acc.concat(val), []);

	textureCoordinates.push(white_black);
	textureCoordinates.push(black_white);

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
		'rotation'  : 0.05,
		'position' : [0, 0, 0],
	}
};

function remove_octagons(){
	shapes.shift();
	buffer_shapes.shift();
	numofoctagons--;
};

function refresh_tunnel(gl, shapes, buffer_shapes)
{
	if(shapes[0].position[2] > 1){
		remove_octagons();
		shapes.push(create_octagon());
		numofoctagons++;
		shapes[numofoctagons - 1].position[2] = shapes[numofoctagons - 2].position[2] - 2;
		shapes[numofoctagons - 1].rotation_Z = shapes[numofoctagons - 2].rotation_Z;
		buffer_shapes.push(initBuffers(gl, shapes[numofoctagons - 1]));
	};
};
