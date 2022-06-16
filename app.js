document.addEventListener('DOMContentLoaded', () => {
const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
const width = 28 //28 x 28 = 784 squares
const squares = []

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
                if(pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex -1].classList.contains('wall') && !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair')) {
                    pacmanCurrentIndex -=1

                    //check if pac-man is in the right exit, so move it to the left entrance
                    if(pacmanCurrentIndex -1 === 363){
                        pacmanCurrentIndex = 391
                    }

                    squares[pacmanCurrentIndex].classList.add('pac-man')
                    document.querySelector('.pac-man').style.transform = "rotateY(180deg)";
                }else squares[pacmanCurrentIndex].classList.add('pac-man')


                break
            case 'ArrowUp':
                if(pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains('wall') && !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')) {
                    pacmanCurrentIndex -=width
                    squares[pacmanCurrentIndex].classList.add('pac-man')
                    document.querySelector('.pac-man').style.transform = "rotate(-90deg)";
                }else squares[pacmanCurrentIndex].classList.add('pac-man')

                break
            case 'ArrowRight':
                if(pacmanCurrentIndex % width < width -1 && !squares[pacmanCurrentIndex +1].classList.contains('wall') && !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair')){
                     pacmanCurrentIndex +=1

                     //check if pacman is in the left exit, so move it to the right entrance
                     if(pacmanCurrentIndex +1 === 392){
                        pacmanCurrentIndex = 364
                    }
                     squares[pacmanCurrentIndex].classList.add('pac-man')
                     document.querySelector('.pac-man').style.transform = "rotate(0deg)";
                }else squares[pacmanCurrentIndex].classList.add('pac-man')

                break
            case 'ArrowDown':
                if(pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains('wall') && !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')) {
                    pacmanCurrentIndex +=width
                    squares[pacmanCurrentIndex].classList.add('pac-man')
                    document.querySelector('.pac-man').style.transform = "rotate(90deg)";
                }else squares[pacmanCurrentIndex].classList.add('pac-man')

                break
        }

        //pacDotEaten()
        //powerPelletEaten()
        //checkForGameOver()
        //checkForWin()
    }

    document.addEventListener('keyup', movePacman)

})
