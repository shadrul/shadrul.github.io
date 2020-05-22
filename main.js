function init(){
	canvas = document.getElementById("game-canvas");
	W = canvas.width = window.innerWidth -100;
	H = canvas.height = window.innerHeight -30;
	pen = canvas.getContext('2d');
	cs = 10;
	
	game_over = false;
	score =0;
	score2 =0;
	sh = 0;
	food_image = new Image();
	food_image.src = "Assets/apple.png";
	special_food = new Image();
	special_food.src = "Assets/banana.jpeg";
	speed = 200;
	food = getFood();

	

	snake = {
		init_len: 2,
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
			document.getElementById("score").innerHTML = score;
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;
			for(let i = 1;i<snake2.cells.length;i++){
				if((headX == snake2.cells[i].x && headY == snake2.cells[i].y) ){
					game_over = true;
				}
			}
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
	snake2= {
		init_len: 2,
		color: "white",
		cells: [],
		direction: "right",

		createSnake: function(){
			for(let i = this.init_len; i>0;i--){
				this.cells.push({x:i, y:11});
			}
		},

		drawSnake: function(){
			for(let i=0;i<this.cells.length;i++){
				if(i==0){
					pen.fillStyle = 'red';

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
			document.getElementById("score2").innerHTML = score2;
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;
			for(let i = 1;i<snake.cells.length;i++){
				if((headX == snake.cells[i].x && headY == snake.cells[i].y) ){
					game_over = true;
				}
			}

			if(headX == food.x && headY == food.y){
				score2++;
				
				if(score2 == 5 || score2 ==10){
					
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
				if((X == this.cells[i].x && Y == this.cells[i].y) ){
					game_over = true;
				}
			}
						

		}


	};


	snake.createSnake();
	snake2.createSnake();

	function keyPressed(e){
		console.log(e.key);
		if(e.key == 'ArrowRight' && snake.direction !='left'){
			snake.direction = "right";
		}
		if(e.key == 'ArrowLeft' && snake.direction !='right'){
			snake.direction ="left";
		}
		if(e.key == 'ArrowDown' && snake.direction !='up'){
			snake.direction ="down";
		}
		if(e.key == 'ArrowUp' && snake.direction !='down'){
			snake.direction = "up"
		}
		if(e.key == 'd' && snake2.direction !='left'){
			snake2.direction = "right";
		}
		if(e.key == 'a' && snake2.direction !='right'){
			snake2.direction ="left";
		}
		if(e.key == 's' && snake2.direction !='up'){
			snake2.direction ="down";
		}
		if(e.key == 'w' && snake2.direction !='down'){
			snake2.direction = "up"
		}
	}
	document.addEventListener("keydown",keyPressed);

}

function draw(){
	pen.clearRect(0,0,W,H);
	snake.drawSnake();
	snake2.drawSnake();
	pen.drawImage(food.image,food.x*cs,food.y*cs,cs,cs);

}

function update(){
	snake.updateSnake();
	snake2.updateSnake();

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
		if(score>score2){
			var res = confirm("Game Over!! Player 1 wins!! Want to restart?");
		}
		else if(score<score2){
			var res = confirm("Game Over!! Player 2 wins!! Want to restart?");
		}
		else{
			var res = confirm("Game Over!! Match Draw!! Want to restart?");
		}
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
