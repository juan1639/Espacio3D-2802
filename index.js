
class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('star', './star3.png');
        this.load.image('star2', './star2.png');
    }

    create ()
    {
        const fijas = this.add.group();

        for (let i = 0; i < 1200; i ++) {

            fijas.create(
                Phaser.Math.Between(0, 800),
                Phaser.Math.Between(0, 600),
                'star2'
            );
        }

        fijas.children.iterate((star, index) => {

            if (index < 700) {
                star.setScale(0.4);
            } else {
                star.setScale(Phaser.Math.FloatBetween(0.4, 0.9));
            }
        });

        const data = [
            [100, 4000, 1],
            [200, 3000, 1.8],
            [300, 2000, 2.4]
        ];

        data.forEach(tipo => {

            const vel = tipo[0];
            const dura = tipo[1];
            const size = tipo[2];

            tipo.push(this.add.particles(400, 300, 'star', {
                speed: {min: vel, max: vel + 100},
                lifespan: {min: dura, max: dura + 400},
                scale: { start: 0, end: size},
                // gravityY: 200
                blendMode: 'ADD'
            }));
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [Example],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

var game =  new Phaser.Game(config);
