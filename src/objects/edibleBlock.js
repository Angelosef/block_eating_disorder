import Block from './block';

export default class EdibleBlock extends Block {
    static MAX_TIMES_EATEN = 1;

    constructor(scene, x, y) {
        super(scene, x, y, 'edibleBlock');
        this.body.setDrag(800, 0);

        this.timesEaten = 0;
    }

    eaten() {
        this.timesEaten++;
        this.disableBody(true, true);
    }

}
