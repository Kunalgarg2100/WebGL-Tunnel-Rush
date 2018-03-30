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

	if(statusKeys[66]){ // 'B' key
		console.log('only black and white')
			onlyblackandwhite = 1 - onlyblackandwhite;
	}
};