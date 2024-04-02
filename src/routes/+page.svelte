<script lang="ts">
	import Button from '../components/Button.svelte';
	import PhaserGame from '../game/PhaserGame.svelte';

	import type { MainMenu } from '../game/scenes/MainMenu.svelte';
	import { getSpritePosition } from '../game/state/stateSpritePosition.svelte';
	import Phaser from 'phaser';

	// The sprite can only be moved in the MainMenu Scene
	let canMoveSprite: boolean | undefined = $state();

	//  References to the PhaserGame component (game and scene are exposed)
	let phaserRef: MainMenu | undefined = $state();

	const spritePosition = getSpritePosition();

	function setRef(ref: Phaser.Scene) {
		console.log('ref', ref);
		console.log('phaserRef', phaserRef);
		phaserRef = ref.scene as unknown as MainMenu;
	}

	const changeScene = () => {
		const scene = phaserRef!.scene as unknown as MainMenu;

		if (scene) {
			//  Call the changeScene method defined in the `MainMenu`, `Game` and `GameOver` Scenes
			scene.changeScene();
		}
	};

	const moveSprite = () => {
		const scene = phaserRef!.scene as unknown as MainMenu;

		if (scene) {
			//  Call the `moveLogo` method in the `MainMenu` Scene and capture the sprite position

			scene.moveLogo(({ x, y }: { x: number; y: number }) => {
				spritePosition.set({ x, y });
			});
		}
	};

	const addSprite = () => {
		const scene = phaserRef!.scene as unknown as MainMenu;

		if (scene) {
			//  Add a new sprite to the current scene at a random position
			const x = Phaser.Math.Between(64, scene.scale.width - 64);
			const y = Phaser.Math.Between(64, scene.scale.height - 64);

			//  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
			const star = scene.add.sprite(x, y, 'star');

			//  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
			//  You could, of course, do this from within the Phaser Scene code, but this is just an example
			//  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
			scene.add.tween({
				targets: star,
				duration: 500 + Math.random() * 1000,
				alpha: 0,
				yoyo: true,
				repeat: -1
			});
		}
	};

	//  This event is emitted from the PhaserGame component:
	const passCurrentScene = (scene: Phaser.Scene) => {
		canMoveSprite = scene.scene.key !== 'MainMenu';
	};
</script>

<PhaserGame {setRef} {passCurrentScene} />
<div class="p-2">
	<div>
		<Button onclick={changeScene}>Change Scene</Button>
	</div>
	<div>
		<Button disabled={canMoveSprite} onclick={moveSprite}>Toggle Movement</Button>
	</div>
	<div class="absolute bottom-0">
		Sprite Position:
		<pre>{JSON.stringify(spritePosition)}</pre>
	</div>
	<div>
		<Button onclick={addSprite}>Add New Sprite</Button>
	</div>
</div>
