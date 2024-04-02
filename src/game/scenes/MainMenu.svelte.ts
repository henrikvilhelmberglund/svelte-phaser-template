import { EventBus } from '../EventBus';
import { type GameObjects, Scene } from 'phaser';
import { getSpritePosition } from '../state/stateSpritePosition.svelte';

export class MainMenu extends Scene {
	background!: GameObjects.Image;
	logo!: GameObjects.Image;
	title!: GameObjects.Text;
	logoTween!: Phaser.Tweens.Tween | null;

	constructor() {
		super('MainMenu');
	}

	create() {
		this.add.image(512, 384, 'background');
		const spritePosition = getSpritePosition();
		console.log('spritePosition', spritePosition.spritePosition);

		this.logo = this.add
			.image(spritePosition.spritePosition.x, spritePosition.spritePosition.y, 'logo')
			.setDepth(100);

		this.add
			.text(512, 460, 'Main Menu', {
				fontFamily: 'Arial Black',
				fontSize: 38,
				color: '#ffffff',
				stroke: '#000000',
				strokeThickness: 8,
				align: 'center'
			})
			.setDepth(100)
			.setOrigin(0.5);

		EventBus.emit('current-scene-ready', this);
	}

	changeScene() {
		if (this.logoTween) {
			this.logoTween.stop();
			this.logoTween = null;
		}

		this.scene.start('Game');
	}

	moveLogo(callback: Function) {
		console.log(`${this.logo.x}-${this.logo.y}`);
		if (this.logoTween) {
			if (this.logoTween.isPlaying()) {
				this.logoTween.pause();
			} else {
				this.logoTween.play();
			}
		} else {
			this.logoTween = this.tweens.add({
				targets: this.logo,
				x: { value: this.logo.x > 512 ? 512 : 750, duration: 3000, ease: 'Back.easeInOut' },
				y: { value: this.logo.y < 100 ? 330 : 80, duration: 1500, ease: 'Sine.easeOut' },
				yoyo: true,
				repeat: -1,
				onUpdate: () => {
					callback(
						// spritePosition.set({ x: Math.floor(this.logo.x), y: Math.floor(this.logo.y) })
						{
							x: Math.floor(this.logo.x),
							y: Math.floor(this.logo.y)
						}
						// x: Math.floor(getSpritePosition().spritePosition.x),
						// y: Math.floor(getSpritePosition().spritePosition.y)
					);
				}
			});
		}
	}
}
