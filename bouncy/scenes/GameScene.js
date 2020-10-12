import Phaser from '../lib/phaser.js'

export default class GameScene extends Phaser.Scene
{
    constructor()
    {
        super('game-scene')
        this.ball
        this.platformList
        this.score = 0
    }

    /**
     * The function loads assets as Phaser begins to run the scene. The images are
     * loaded as key value pairs, we reference the assets by their keys of course
     */
    preload()
    {
        this.load.image('ball', 'assets/images/ball.png');
        this.load.image('platform', 'assets/images/platform.png');
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
            this.physics.world.bounds.width / 2 - 290, // x position 
            this.physics.world.bounds.height /2-100, // y position
            'ball' // key of image for the sprite
        ).setScale(0.5)

        this.platformList = this.physics.add.group()
        let x = this.physics.world.bounds.width / 2 - 290
        for(let i=0; i<6; i++)
        {
            let random = Phaser.Math.Between(100, 200)
            let platform = this.platformList.create(x, Phaser.Math.Between(350, 450), 'platform')
            x += random
            platform.setImmovable()
        }

        
        // Ensure that the player and ball can't leave the screen
        this.ball.setCollideWorldBounds(true);

        // Set gravity individually for this ball
        this.ball.body.gravity.y = 1000

        /**
         * The bounce ensures that the ball retains its velocity after colliding with
         * an object.
        */
        this.ball.setBounce(0, 1)

        /**
         * Setup collision, enable top, left, and right collosion, only disable collision with the bottom of the game world,
         * so the ball falls to the bottom, which means that the game is over
         */
        this.physics.world.setBoundsCollision(true, true, true, false);
        this.input.on('pointerdown', this.mouseClick, this);
        this.input.on('pointerup', this.mousenotClick, this);
        this.physics.add.collider(this.ball, this.platformList, this.hitplatform, null, this)
        this.scoreText = this.add.text(16, 16, 'Score: 0', { color: '#fff', fontSize: 24 })
    }

    update()
    {
        
        this.platformList.getChildren().forEach(function(platform){
            if(platform.getBounds().right < 0){
                let y = Phaser.Math.Between(350, 450)
                platform.x = 950
                platform.y = y
                this.score += 1
                platform.setVelocityY(0)
                this.scoreText.text = `Score: ${this.score}`
            }  
        }, this)
        if(this.ball.body.y > this.physics.world.bounds.height){
            this.scene.restart()
            this.score = 0
        }
    }
    mouseClick()
    {
        this.platformList.setVelocityX(-300)
    }
    mousenotClick()
    {
        this.platformList.setVelocityX(0)
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
