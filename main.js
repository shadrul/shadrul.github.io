function init(){
	canvas = document.getElementById("game-canvas");
	W = canvas.width = 1321;
	H = canvas.height = 925;
	pen = canvas.getContext('2d');
	cs = 66;
	
	game_over = false;
	score =0;
	sh = 0;
	food_image = new Image();
	food_image.src = "Assets/apple.png";
	special_food = new Image();
	special_food.src = "Assets/sikangi.jpeg";
	speed = 200;
	food = getFood();

	

	snake = {
		init_len: 5,
		color: "blue",
		cells: [],
		direction: "right",

		createSnake: function(){
			for(let i = this.init_len; i>0;i--){
				this.cells.push({x:i, y:1});
			}
		},

		drawSnake: function(){
			for(let i=0;i<this.cells.length;i++){
				if(i==0){
					pen.fillStyle = 'aqua';
				}
				else{
					pen.fillStyle = this.color;
				}

				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs,cs);
				pen.strokeStyle = 'red';
				pen.strokeRect(this.cells[i].x*cs,this.cells[i].y*cs,cs,cs)
			}

		},

		updateSnake: function(){
			document.getElementById("score").innerHTML = score +","+ speed;
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;
			if(headX == food.x && headY == food.y){
				score++;
				
				if(score == 5 || score ==10){
					
					food = getSpecialFood();
					updateSpeed();
				}
				else{
					food = getFood();
					
				}

				
			}
			else{
				this.cells.pop();
			}
			

			var X,Y;
			if(this.direction == 'right'){
				X = headX + 1;
				Y = headY;
			}
			else if(this.direction == 'left'){
				X = headX -1;
				Y = headY;
			}
			else if(this.direction == 'down'){
				X = headX;
				Y = headY + 1;
			}
			else if(this.direction == 'up'){
				X = headX;
				Y = headY -1;
			}
			this.cells.unshift({x:X,y:Y});

			lastx = Math.round((W-cs)/cs);
			lasty = Math.round((H-cs)/cs);
			if(headX < 0 || headY < 0 || headX > lastx || headY > lasty){
				game_over = true;
			}
			for(let i = 1;i<this.cells.length;i++){
				if(X == this.cells[i].x && Y == this.cells[i].y){
					game_over = true;
				}
			}
			

		}


	};

	snake.createSnake();

	function keyPressed(e){
		if(e.key == 'ArrowRight' && snake.direction !='left'){
			snake.direction = "right";
		}
		else if(e.key == 'ArrowLeft' && snake.direction !='right'){
			snake.direction ="left";
		}
		else if(e.key == 'ArrowDown' && snake.direction !='up'){
			snake.direction ="down";
		}
		else if(e.key == 'ArrowUp' && snake.direction !='down'){
			snake.direction = "up"
		}
	}
	document.addEventListener("keydown",keyPressed);

}

function draw(){
	pen.clearRect(0,0,W,H);
	snake.drawSnake();
	pen.drawImage(food.image,food.x*cs,food.y*cs,cs,cs);

}

function update(){
	snake.updateSnake();

}

function getFood(){
	foodX = Math.round(Math.random()*(W-cs-cs)/cs);
	foodY = Math.round(Math.random()*(H-cs-cs)/cs);
	food ={
		x:foodX,
		y:foodY,
		color:"red",
		image:food_image
	};
	return food;
}

function getSpecialFood(){

	foodX = Math.round(Math.random()*(W-cs-cs)/cs);
	foodY = Math.round(Math.random()*(H-cs-cs)/cs);

	food ={
		x:foodX,
		y:foodY,
		color:"red",
		image:special_food
	};
	return food;
}



function gameloop(){
	if(game_over == true){
		clearInterval(f);
		var res = confirm("Game Over!! Want to restart?");
		if(res){
			location.reload();
		}
	}
	draw();
	update();
	
		
}

function updateSpeed(){

		speed-=10;
		// clearInterval(f);
		var f = setInterval(gameloop,speed);
	
}

init();

var f = setInterval(gameloop,speed);
