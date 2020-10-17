import Phaser from '../lib/phaser.js'

export default class GameScene extends Phaser.Scene
{
    constructor()
    {
        super('game-scene')
        this.ball
        this.leftspikeList
        this.rightspikeList
        this.score = 0
    }

    /**
     * The function loads assets as Phaser begins to run the scene. The images are
     * loaded as key value pairs, we reference the assets by their keys of course
     */
    preload()
    {
        this.load.image('ball', 'assets/images/ball.png');
        this.load.image('leftspike', 'assets/images/leftspike.png');
        this.load.image('wall', 'assets/images/wall.png');
        this.load.image('rightspike', 'assets/images/rightspike.png');
    }

    /**
     * We create our game world in this function. The initial state of our game is
     * defined here. We also set up our physics rules here
     */
    create()
    {

        /**
         * Coordinates start at 0,0 from the top left
         * As we move rightward, the x value increases
         * As we move downward, the y value increases.
         */
        // Let's add the ball
        this.ball = this.physics.add.sprite(
            this.physics.world.bounds.width / 2, // x position 
            this.physics.world.bounds.height /2-100, // y position
            'ball' // key of image for the sprite
        ).setScale(0.5)

        this.rightspikeList = this.physics.add.group()
        let x = 50
        for(let i=0; i<4; i++)
        {
            let rightspike = this.rightspikeList.create(450, x, 'rightspike')
            rightspike.setImmovable()
            x = x + Phaser.Math.Between(150, 200)
        }

        this.leftspikeList = this.physics.add.group()
        x = 50
        for(let i=0; i<4; i++)
        {
            let leftspike = this.leftspikeList.create(25, x, 'leftspike')
            leftspike.setImmovable()
            x = x + Phaser.Math.Between(150, 200)
        }

        
        // Ensure that the player and ball can't leave the screen
        this.ball.setCollideWorldBounds(true);

        // Set gravity individually for this ball
        this.ball.body.gravity.y = 1000

        /**
         * The bounce ensures that the ball retains its velocity after colliding with
         * an object.
        */
        this.ball.setBounce(1, 1)

        /**
         * Setup collision, enable top, left, and right collosion, only disable collision with the bottom of the game world,
         * so the ball falls to the bottom, which means that the game is over
         */
        this.physics.world.setBoundsCollision(true, true, false, false);
        this.input.on('pointerdown', this.mouseClick, this);
        this.physics.add.collider(this.ball, this.rightspikeList, this.gameOver, null, this)
        this.scoreText = this.add.text(16, 16, 'Score: 0', { color: '#fff', fontSize: 24 })
        this.ball.setVelocityX(-300)
        this.physics.add.collider(this.ball, this.leftspikeList, this.gameOver, null, this)
    }

    update()
    {
        
        if(this.ball.body.y < 0){
            this.scene.restart()
            this.score = 0
        }
        else if(this.ball.body.y > this.physics.world.bounds.height){
            this.scene.restart()
            this.score = 0
        }
    }
    mouseClick()
    {
        this.ball.setVelocityY(-300)
    }
    gameOver(){
        this.score = 0 
        this.scene.restart()
    }
    hitplatform(ball, platform){
        let thing = Phaser.Math.Between(0, 100)
        if (thing > 50){
            platform.setVelocityY(300)
        }
    }
}
