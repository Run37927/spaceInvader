const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth
canvas.height = innerHeight

class Player {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }

        this.rotation = 0
        
        const image = new Image()
        image.src = './img/spaceship.png'
        image.onload = () => {
            const scale = 0.15
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale

            this.position = {
                x: canvas.width / 2 - this.width/2,
                y: canvas.height - this.height - 20
            }
        }

    }

    draw() {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.save()
        c.translate(
            player.position.x + player.width/2, 
            player.position.y + player.height/2
            )
        c.rotate(this.rotation)
        c.translate(
            -player.position.x - player.width/2, 
            -player.position.y - player.height/2
            )

        c.drawImage(
            this.image,
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
        )
        c.restore()
        
    };

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
        }
    }
};

class Projectile {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity

        this.radius = 3
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'red'
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Invader {
    constructor({position}) {
        this.velocity = {
            x: 0,
            y: 0
        }
        
        const image = new Image()
        image.src = './img/invader.png'
        image.onload = () => {
            const scale = 1
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale

            this.position = {
                x: position.x,
                y: position.y
            }
        }

    }

    draw() {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)

        c.drawImage(
            this.image,
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
        ) 
    };

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
    }
};

class Gird {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.invaders = []
        for (let x=0; x< 10; x++) {
            for (let y=0; y< 10; y++)
            this.invaders.push(new Invader({
                position: {
                    x: x*30,
                    y: y*30
                }
            }))
        }
    }

    update(){

    }
}
const player = new Player()
const projectfiles = []
const grids = [new Gird()]
const keys = {
    arrowLeft: {
        pressed: false
    },
    arrowRight: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update();

    projectfiles.forEach((projectile, index) => {
        if (projectile.position.y + projectile.radius <=0) {
            setTimeout(() => {
                projectfiles.splice(index, 1)
            }, 0);
        } else {
            projectile.update()
        }
    })

    grids.forEach(grid => {
        grid.update();
        grid.invaders.forEach(invader => {
            invader.update()
        })
    })

    if (keys.arrowLeft.pressed && player.position.x >=0) {
        player.velocity.x = -7;
        player.rotation = -0.15;
    } else if (keys.arrowRight.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 7;
        player.rotation = 0.15;
    } else {
        player.velocity.x = 0;
        player.rotation = 0;
    }
}
animate()

window.addEventListener('keydown', ({key}) => {
    switch (key) {
        case 'ArrowLeft':
            // console.log("left")
            keys.arrowLeft.pressed = true
            break;
        case 'ArrowRight':
            // console.log("right")
            keys.arrowRight.pressed = true
            break;
        case ' ':
            // console.log("space bar")
            projectfiles.push(
                new Projectile({
                position: {
                    x: player.position.x + player.width/2,
                    y: player.position.y
                },
                velocity: {
                    x: 0,
                    y: -10
                }
            }))
            break;
    }
})


window.addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'ArrowLeft':
            // console.log("left")
            keys.arrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            // console.log("right")
            keys.arrowRight.pressed = false;
            break;
        case ' ':
            // console.log("space bar")
            break;
    }
})