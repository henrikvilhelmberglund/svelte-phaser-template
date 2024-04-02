// $state() is outside of function to make it a global state
let spritePosition = $state({ x: 512, y: 300 });

export function getSpritePosition() {
	function set({ x, y }: { x: number; y: number }) {
		spritePosition = { x, y };
	}

	return {
		get spritePosition() {
			return spritePosition;
		},
		initial() {
			return { x: 512, y: 300 };
		},
		set
	};
}
