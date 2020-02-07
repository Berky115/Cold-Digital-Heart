import React from 'react';
import _ from 'lodash';

function Invader(speed, radius, positionX, positionY, noteColor) {
	this.speed = speed;
	this.radius = radius;
	this.positionX = positionX;
	this.positionY = positionY;
	this.noteColor = noteColor;
	this.detectedState = false;
}

class GameComponent extends React.Component {
	myRef = React.createRef();
	state = {
		//numberOfInvaders, minInvaderSize, maxInvaderSize, minSpeed, maxSpeed, BGMusic
		gameSettings: {
			numberOfInvaders: 10,
			minInvaderSize: 10,
			maxInvaderSize: 15,
			minSpeed: 1,
			maxSpeed: 4,
		},
		WIDTH: window.screen.availWidth,
		HEIGHT: 100,
		colors: ['#7293A0', '#373F51', '#FFFFFA'],
		enemies: [],
	};

	randomNumber(min, max) {
		return Math.floor(Math.random() * max + min);
	}

	drawCircle(ctx, x, y, r) {
		ctx.beginPath();
		ctx.arc(x, y, r, 0, Math.PI * 2, true);
		ctx.fill();
	}

	drawInvader(ctx, invader) {
		ctx.fillStyle = invader.noteColor;
		this.drawCircle(ctx, invader.positionX, invader.positionY, invader.radius);
		ctx.fillStyle = 'white';
		this.drawCircle(ctx, invader.positionX - invader.radius / 2, invader.positionY, invader.radius / 4);
		this.drawCircle(ctx, invader.positionX + invader.radius / 2, invader.positionY, invader.radius / 4);
	}

	clear(ctx) {
		ctx.clearRect(0, 0, this.state.WIDTH, this.state.HEIGHT);
	}

	initGame() {
		//https://stackoverflow.com/questions/29537299/react-how-do-i-update-state-item1-on-setstate-with-jsfiddle
		let newState = _.cloneDeep(this.state);
		for (let i = 0; i < newState.gameSettings.numberOfInvaders; i++) {
			// 1. Make a shallow copy of the items
			let newEnemies = [...newState.enemies];
			// 2. Make a shallow copy of the item you want to mutate
			let enemy = { ...newEnemies[i] };
			// 3. Replace the property you're intested in
			// speed, radius, positionX, positionY, noteColor
			enemy = new Invader(
				this.randomNumber(this.state.gameSettings.minSpeed, this.state.gameSettings.maxSpeed),
				this.randomNumber(this.state.gameSettings.minInvaderSize, this.state.gameSettings.maxInvaderSize),
				this.randomNumber(this.state.WIDTH, this.state.WIDTH + 20),
				this.randomNumber(this.state.gameSettings.maxInvaderSize, this.state.HEIGHT - 35),
				this.state.colors[this.randomNumber(0, this.state.colors.length)]
			);
			// 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
			newEnemies[i] = enemy;
			newState.enemies = newEnemies;
			// 5. Set the state to our new copy
			this.setState(newState);
		}
	}

	draw(ctx) {
		if (ctx) {
			this.clear(ctx);
			for (let i = 0; i < this.state.enemies.length; i++) {
				this.drawInvader(ctx, this.state.enemies[i]);
				if (this.state.enemies[i].positionX > -50) {
					let newEnemies = this.state.enemies;
					newEnemies[i].positionX -= this.state.enemies[i].speed;
					this.setState({
						enemies: newEnemies,
					});
				} else {
					let newEnemies = this.state.enemies;
					newEnemies[i] = this.resetEnemy(this.state.enemies[i]);
					this.setState({
						enemies: newEnemies,
					});
				}
			}
		}
	}

	resetEnemy(invader) {
		invader.positionX = this.randomNumber(this.state.WIDTH, this.state.WIDTH + 20);
		invader.positionY = this.randomNumber(this.state.gameSettings.maxInvaderSize, this.state.HEIGHT - 35);
		invader.speed = this.randomNumber(this.state.gameSettings.minSpeed, this.state.gameSettings.maxSpeed);
		invader.radius = this.randomNumber(
			this.state.gameSettings.minInvaderSize,
			this.state.gameSettings.maxInvaderSize
		);
		invader.noteColor = this.state.colors[this.randomNumber(0, this.state.colors.length)];
		return invader;
	}

	componentDidMount() {
		const ctx = this.refs.canvas.getContext('2d');
		setInterval(this.draw.bind(this, ctx), 16.67); //approx 60 fps
		window.onload = this.initGame();
	}

	render() {
		return (
			<div>
				<canvas ref="canvas" id="canvas" width={this.state.WIDTH} height={this.state.HEIGHT}></canvas>
			</div>
		);
	}
}

export default GameComponent;
