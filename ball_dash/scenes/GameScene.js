import Phaser from '../lib/phaser.js'

export default class GameScene extends Phaser.Scene
{
    constructor()
    {
        super('game-scene')

        // Defining there variables here to let them can be accessed in all of the functions in this class
        this.ball
        this.ground
        this.obstacleList
        this.score = 0
    }

    /**
     * The function loads assets as Phaser begins to run the scene. The images are
     * loaded as key value pairs, we reference the assets by their keys of course
     */
    preload()
    {
        this.load.image('ball', 'assets/images/ball.png');
        this.load.image('ground', 'assets/images/ground.png');
        this.load.image('obstacle', 'assets/images/obstacle.png');
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
            this.physics.world.bounds.height /2, // y position
            'ball' // key of image for the sprite
        ).setScale(0.5)

        this.ground = this.physics.add.sprite(
            this.physics.world.bounds.width / 2, // x position 
            this.physics.world.bounds.height-100, // y position
            'ground' // key of image for the sprite
        )
        this.obstacleList = this.physics.add.group()
        let x = 600
        for(let i=0; i<6; i++)
        {
            let random = Phaser.Math.Between(20, 200)
            let obstacle = this.obstacleList.create(x, 335, 'obstacle')
            x += random
        }
        this.obstacleList.setVelocityX(-100)

        
        console.log("created")
        // Ensure that the player and ball can't leave the screen
        this.ball.setCollideWorldBounds(true);

        // Set gravity individually for this ball
        this.ball.body.gravity.y = 300

        /**
         * The bounce ensures that the ball retains its velocity after colliding with
         * an object.
        */
        this.ball.setBounce(1, 1)

        /**
         * Setup collision, enable top, left, and right collosion, only disable collision with the bottom of the game world,
         * so the ball falls to the bottom, which means that the game is over
         */
        this.physics.world.setBoundsCollision(true, true, true, true);
        this.input.on('pointerdown', this.mouseClick, this);
        this.ground.setImmovable(true)
        this.physics.add.collider(this.ball, this.ground, this.hitGround, null, this)
        this.physics.add.collider(this.ball, this.obstacleList, this.gameOver, null, this)
        this.scoreText = this.add.text(16, 16, 'Score: 0', { color: '#fff', fontSize: 24 })
    }

    update()
    {
        
        this.obstacleList.getChildren().forEach(function(obstacle){
            if(obstacle.getBounds().right < 0){
                let x = Phaser.Math.Between(600, 800)
                obstacle.x = x
                this.score += 1
                this.scoreText.text = `Score: ${this.score}`
            }  
        }, this)
    }
    mouseClick()
    {
        this.ball.setVelocityY(300)
    }
    hitGround(){
        this.ball.setVelocityY(-300)
    }
    gameOver(){
        this.score = 0 
        this.scene.restart()
    }
}
