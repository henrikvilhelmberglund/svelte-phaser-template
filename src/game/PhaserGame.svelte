<script lang="ts">
	// import { onMounted, onUnmounted, ref } from 'vue';
	import { EventBus } from './EventBus';
	import StartGame from './main';

	// Save the current scene instance
	let game: Phaser.Game | undefined | null = $state();

	type MyProps = {
		setRef: Function;
		passCurrentScene: Function;
	};

	let { setRef, passCurrentScene }: MyProps = $props();

	$effect(() => {
		game = StartGame('game-container');

		EventBus.on('current-scene-ready', (scene_instance: Phaser.Scene) => {
			console.log('event current scene ready');
			passCurrentScene(scene_instance);

			setRef(scene_instance);
		});

		return () => {
			if (game) {
				game.destroy(true);
				game = null;
			}
		};
	});
</script>

<div id="game-container"></div>
