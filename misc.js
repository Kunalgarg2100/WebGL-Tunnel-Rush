function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function shuffle(arr) {
    var ctr = arr.length;
    var temp, index;
	
	// While there are elements in the array
    while (ctr > 0) {
	
		// Pick a random index
        index = Math.floor(Math.random() * ctr);
	
		// Decrease ctr by 1
        ctr--;
	
		// And swap the last element with it
        temp = arr[ctr];
        arr[ctr] = arr[index];
        arr[index] = temp;
    }
    
    return arr;
}

function radToDeg(r) {
	return r * 180 / Math.PI;
}

function degToRad(d) {
	return d * Math.PI / 180;
}