import Block from './block';

export default class StaticBlock extends Block {
    constructor(scene, x, y) {
        super(scene, x, y, 'staticBlock');
        this.setImmovable(true);
        this.body.moves = false;
    }
}
