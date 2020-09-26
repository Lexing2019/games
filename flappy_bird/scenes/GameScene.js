import Phaser from '../lib/phaser.js'

export default class GameScene extends Phaser.Scene
{
    constructor()
    {
        super('game-scene')

        // Defining there variables here to let them can be accessed in all of the functions in this class
        this.bird
        this.pipeList
        this.pipeList2
        this.score = 0
    }

    /**
     * The function loads assets as Phaser begins to run the scene. The images are
     * loaded as key value pairs, we reference the assets by their keys of course
     */
    preload()
    {
        this.load.image('bird', 'assets/images/flappy_bird.png');
        this.load.image('pipe', 'assets/images/pipe.png');
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
        this.bird = this.physics.add.sprite(
            100, // x position 
            this.physics.world.bounds.height /2, // y position
            'bird' // key of image for the sprite
        ).setScale(0.1)

        this.pipeList = this.physics.add.group()
        this.pipeList2 = this.physics.add.group()
        let x = 600
        for(let i=0; i<6; i++)
        {
            let y2 = Phaser.Math.Between(600, 660)
            let y = Phaser.Math.Between(-100, 40)
            let random = Phaser.Math.Between(200, 250)
            let pipe = this.pipeList.create(x, y, 'pipe')
            let pipe2 = this.pipeList2.create(x, y2, 'pipe')
            x += random
        }
        this.pipeList.setVelocityX(-100)
        this.pipeList2.setVelocityX(-100)


        
        // Ensure that the player and ball can't leave the screen
        this.bird.setCollideWorldBounds(true);

        // Set gravity individually for this ball
        this.bird.body.gravity.y = 700

        /**
         * The bounce ensures that the ball retains its velocity after colliding with
         * an object.
        */
        this.bird.setBounce(1, 1)

        /**
         * Setup collision, enable top, left, and right collosion, only disable collision with the bottom of the game world,
         * so the ball falls to the bottom, which means that the game is over
         */
        this.physics.world.setBoundsCollision(true, true, true, false);
        this.input.on('pointerdown', this.mouseClick, this);
        this.physics.add.collider(this.bird, this.pipeList, this.gameOver, null, this)
        this.physics.add.collider(this.bird, this.pipeList2, this.gameOver, null, this)
        this.scoreText = this.add.text(16, 16, 'Score: 0', { color: '#fff', fontSize: 24 })
    }

    update()
    {
        
        this.pipeList.getChildren().forEach(function(pipe){
            if(pipe.getBounds().right < 0){
                this.x = Phaser.Math.Between(600, 700)
                pipe.x = this.x
                this.score += 1
                this.scoreText.text = `Score: ${this.score}`
            }  
        }, this)

        this.pipeList2.getChildren().forEach(function(pipe2){
            if(pipe2.getBounds().right < 0){
                pipe2.x = this.x
                this.score += 1
                this.scoreText.text = `Score: ${this.score}`
            }  
        }, this)


        if (this.bird.getBounds().bottom > 500){
            this.score = 0 
            this.scene.restart()
        }
    }
    mouseClick()
    {
        this.bird.setVelocityY(-300)
    }
    hitGround(){
        this.bird.setVelocityY(-300)
    }
    gameOver(){
        this.score = 0 
        this.scene.restart()
    }
}
