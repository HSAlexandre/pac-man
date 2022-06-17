document.addEventListener('DOMContentLoaded', () => {

const scoreDisplay = document.getElementById('score')
const width = 28 //28 x 28 = 784 squares
let score = 0
const grid = document.querySelector('.grid')
let pacdotseaten = 0

//layout of grid and what is in the squares
const layout =[
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

//Legend
//0 - pacdot
//1 - wall
//2 - ghost-lair
//3 - power-pellet
//4 - empty

const squares = []

//function to create the map design
function createBoard(){
    for (let i = 0; i<layout.length; i++){
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)

        //Add layout colors to the board
        if(layout[i] === 0){
            squares[i].classList.add('pacdot')
        }else if(layout[i] === 1){
            squares[i].classList.add('wall')
        } else if(layout[i] === 2){
                squares[i].classList.add('ghost-lair')
        }else if(layout[i] === 3){
            squares[i].classList.add('power-pellet')
        }
    }
}

    createBoard()

    //starting position of pac-man
    let pacmanCurrentIndex = 490

    squares[pacmanCurrentIndex].classList.add('pac-man')

    //function to move packman with keycodes
    function movePacman(e){
        squares[pacmanCurrentIndex].classList.remove('pac-man')

        switch(e.key){
            case 'ArrowLeft':
                //checking if pac-man can go this way
                if(pacmanCurrentIndex % width !== 0 &&
                    !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair')
                    ){
                    pacmanCurrentIndex -=1

                    //check if pac-man is in the right exit, so move it to the left entrance
                    if(pacmanCurrentIndex -1 === 363){
                        pacmanCurrentIndex = 391
                    }

                    squares[pacmanCurrentIndex].classList.add('pac-man')
                    document.querySelector('.pac-man').style.transform = "rotateY(180deg)"; //rotate pac-man image
                }else squares[pacmanCurrentIndex].classList.add('pac-man') //if not, keep same rotation
                break

            case 'ArrowUp':
                //checking if pac-man can go this way
                if(pacmanCurrentIndex - width >= 0 &&
                    !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')
                    ){
                    pacmanCurrentIndex -=width
                    squares[pacmanCurrentIndex].classList.add('pac-man')
                    document.querySelector('.pac-man').style.transform = "rotate(-90deg)"; //rotate pac-man image
                }else squares[pacmanCurrentIndex].classList.add('pac-man') //if not, keep same rotation
                break

            case 'ArrowRight':
                //checking if pac-man can go this way
                if(pacmanCurrentIndex % width < width -1 &&
                    !squares[pacmanCurrentIndex +1].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair')
                    ){
                     pacmanCurrentIndex +=1

                     //check if pacman is in the left exit, so move it to the right entrance
                     if(pacmanCurrentIndex +1 === 392){
                        pacmanCurrentIndex = 364
                    }
                     squares[pacmanCurrentIndex].classList.add('pac-man')
                     document.querySelector('.pac-man').style.transform = "rotate(0deg)"; //rotate pac-man image
                }else squares[pacmanCurrentIndex].classList.add('pac-man') //if not, keep same rotation
                break

            case 'ArrowDown':
                //checking if pac-man can go this way
                if(pacmanCurrentIndex + width < width * width &&
                    !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')
                    ){
                    pacmanCurrentIndex +=width
                    squares[pacmanCurrentIndex].classList.add('pac-man')
                    document.querySelector('.pac-man').style.transform = "rotate(90deg)"; //rotate pac-man image
                }else squares[pacmanCurrentIndex].classList.add('pac-man') //if not, keep same rotation
                break
        }

        pacDotEaten()
        powerPelletEaten()
        checkForGameOver()
        checkForWin()
    }


    document.addEventListener('keyup', movePacman)

    //function for Pac-Man to eat a Pac-Dot
    function pacDotEaten(){

        if (squares[pacmanCurrentIndex].classList.contains('pacdot')){
            score++
            pacdotseaten++ //counter for winning logic
            scoreDisplay.innerHTML = score

            squares[pacmanCurrentIndex].classList.remove('pacdot')
        }
    }

    // when pac-man eats a power pellet
    function powerPelletEaten(){
        if(squares[pacmanCurrentIndex].classList.contains('power-pellet')){
            score += 10
            pacdotseaten +=10 //counter for winning logic
            ghosts.forEach(ghost => ghost.isScared = true)
            setTimeout(unScareGhosts, 10000) //time ghosts keep scared
            squares[pacmanCurrentIndex].classList.remove('power-pellet')
        }
    }

    //set ghosts to normal state
    function unScareGhosts(){
        ghosts.forEach(ghost => ghost.isScared = false)
    }

    //ghost class
    class Ghost{
        constructor(className, startIndex, speed){
            this.className = className
            this.startIndex = startIndex
            this.speed = speed
            this.currentIndex = startIndex
            this.isScared = false
            this.timerId = NaN
        }
    }

    ghosts =[
         new Ghost('blinky', 348, 250),
         new Ghost('pinky', 376, 400),
         new Ghost('inky', 351, 300),
         new Ghost('clyde', 379, 500)
    ]

    //draw ghosts
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add('ghost')
    });


    //move ghosts
    ghosts.forEach(ghost => moveGhost(ghost))


    //function to move ghosts
    function moveGhost(ghost){
        const directions = [-1, +1, width, -width ]
        let direction = directions[Math.floor(Math.random() * directions.length)]

        ghost.timerId = setInterval(function(){
            //check if there's wall or ghost in next move
            if(!squares[ghost.currentIndex + direction].classList.contains('wall') && !squares[ghost.currentIndex + direction].classList.contains('ghost')){
                //ghost can go here
                //remove previous location
                squares[ghost.currentIndex].classList.remove(ghost.className)
                squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
                //move ghost index
                ghost.currentIndex += direction
                //move to the new location
                squares[ghost.currentIndex].classList.add(ghost.className,'ghost')

            } else direction = directions[Math.floor(Math.random() * directions.length)] //move somewhere else


            //check if ghost is currently scared
            if(ghost.isScared){
                squares[ghost.currentIndex].classList.add('scared-ghost')
            }

            //if pac-man eats the scared ghost
            if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')){
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
                score += 100
                ghost.currentIndex = ghost.startIndex
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            }

            checkForGameOver()
        }, ghost.speed)
    }

    //check game over function
    function checkForGameOver(){
        if(squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')){
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keyup', movePacman)
        //     setTimeout(function(){alert('Gamer Over!')
        // }, 500)
        scoreDisplay.innerHTML = 'GAME OVER'
        }
    }


    //check for win
    function checkForWin(){
        if(pacdotseaten === 274){
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keyup', movePacman)
            scoreDisplay.innerHTML = 'YOU WON!'
        }
    }
})
