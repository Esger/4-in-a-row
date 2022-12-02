// JavaScript Document
// You may specify partial version numbers, such as "1" or "1.3",
//  with the same result. Doing so will automatically load the 
//  latest version matching that partial revision pattern 
//  (i.e. both 1 and 1.3 would load 1.3.1 today).
google.load("jquery", "1.3");
 
google.setOnLoadCallback(function () {
// Place init code here instead of $(document).ready()
	var canvas = document.getElementById('theboard'); // The canvas where your doodle is drawn
	var ctx = canvas.getContext('2d');
	var player = 'red';
	var p_radius = Math.floor(canvas.width / 14);
	var offset = Math.floor((canvas.width - 14 * p_radius) / 2);
	var gamewon = false;
	var bordVelden = [];
					  
	// Erase the canvas
	function clearspace() {
		ctx.fillStyle = "rgb(255, 255, 255)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = "rgb(128, 128, 0)";
		ctx.lineWidth = 2;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
	}
	
	// Draw the board grid
	function drawgrid() {
		var ctx = canvas.getContext('2d');
		var x, y;
		//draw a circle
		ctx.strokeStyle = "rgb(128, 128, 0)";
		for (y = 0; y < 6; y++) {
			for (x = 0; x < 7; x++) {
				ctx.beginPath();
				ctx.arc(p_radius * x * 2 + p_radius + offset, p_radius * y * 2 + p_radius + offset, p_radius - offset, 0, Math.PI * 2, true); 
				ctx.closePath();
				ctx.stroke();
			}
		}
	}
	
	// Drop a piece
	function droppiece(mouseXpos, color) {
		var col = Math.floor(mouseXpos / p_radius / 2);
		var row = 5;
		if (color === "red") {
			ctx.fillStyle = "rgb(255, 0, 0)";
		} else {
			ctx.fillStyle = "rgb(0, 0, 255)";
		}
		ctx.beginPath();
		ctx.arc(p_radius * col * 2 + p_radius + offset, p_radius * row * 2 + p_radius + offset, p_radius - (2 * offset), 0, Math.PI * 2, true); 
		ctx.closePath();
		ctx.fill();
	}
	
	// Switch player color
	function switchplayer(color) {
		if (color === 'red') {
			return 'blue';
		} else {
			return 'red';
		}
	}
			
	 	 		
	// Register click;
	$('#theboard').mouseup(function (event) {
		var mouseX = Math.floor((event.offsetX ? (event.offsetX):event.pageX - this.offsetLeft));
		// var mouseY = Math.floor((event.offsetY ? (event.offsetY):event.pageY - this.offsetTop));
		if (gamewon === false) {
			droppiece(mouseX, player);
			player = switchplayer(player);
		}
	});
 			
	// Clear the canvas
	$('#clearbutton').click(function () {
		clearspace();
	});
		
	// Toggle text on or off
	$('#texttoggler').click(function () {
		$('#story').toggle('slow');
	});
		
	// clearspace();
	drawgrid();
});