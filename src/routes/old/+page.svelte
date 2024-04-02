<script>
	import { Scene } from 'phaser';
	import Button from '../components/Button.svelte';

	let gems;
	let game;
	let scene;
  let button;

	class Example extends Phaser.Scene {
		preload() {
			this.load.setBaseURL('https://labs.phaser.io');

			this.load.image('sky', 'assets/skies/space3.png');
			this.load.image('logo', 'assets/sprites/phaser3-logo.png');
			this.load.image('red', 'assets/particles/red.png');
		}

		create() {
			this.add.image(400, 300, 'sky');

			const particles = this.add.particles(0, 0, 'red', {
				speed: 100,
				scale: { start: 1, end: 0 },
				blendMode: 'ADD'
			});

			const logo = this.physics.add.image(400, 100, 'logo');

			logo.setVelocity(100, 200);
			logo.setBounce(1, 1);
			logo.setCollideWorldBounds(true);

			particles.startFollow(logo);

			// https://blog.ourcade.co/posts/2020/dom-element-button-phaser-3-typescript-rxjs-jsx/
			gems = this.physics.add.group({
				classType: Phaser.Physics.Arcade.Image
			});
			this.physics.add.collider(gems, gems);

			button = this.add.dom(400, 200);
			// this.handleButtonClick = this.handleButtonClick.bind(this);
      scene = this;
		}

		handleButtonClick() {
			// const button = document.querySelector('button');
			const gem = gems.get(button.x, button.y - 50, 'logo');
			console.log(gem);
			gem.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
			gem.setBounce(1, 1);
			gem.setCollideWorldBounds();
		}
	}

	const config = {
		type: Phaser.AUTO,
		width: 800,
		height: 600,
		scene: Example,
		physics: {
			default: 'arcade',
			arcade: {
				gravity: { y: 1200, x: 0 }
			}
		},
		parent: 'canvas-wrapper',
		dom: {
			createContainer: true
		}
	};

	$effect(() => {
		game = new Phaser.Game(config);
	});
</script>

<h1 class="flex items-center justify-center text-4xl">Welcome to Svelte Phaser Template</h1>

<div class="relative flex items-center justify-center rounded-xl p-2" id="canvas-wrapper">
	<Button
  bind:this={button}
		callback={() => {
			// console.log(game);
			scene.handleButtonClick();
		}} />
</div>
