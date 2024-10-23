const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game_info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;   // It will tell  what is the current state of game,  is it finished or is required to any chance...
// gameGrid is showing inner logic for  maintaing all logic for winning or turn or and so on 
// And boxes[inddex]  is showing UI (display)
const winnigPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
// Initially ticTac should be empty So...
//Lets create a function to initilize the initial stage like   ---> 
//                                                        1.    TicTack should be Empty,
//                                                        2.  'New Btn' should not be displayed 
//                                                        3.    show the by default  X-player chance

//  1.....
function initGame(){
     currentPlayer = 'X';
     gameGrid = [" ", " "," "," "," "," "," "," "," "]; // Firstly empty hai Box
     newGameBtn.classList.remove("active");
     // 7 ... As clicking on New-Game btn We have to update UI means Box empty kro
    boxes.forEach((box,index) =>{
         box.innerText=" ";
         boxes[index].style.pointerEvents =  "all";  // pointer bhi phir se lana hoga
        
         // If ther is any winner then We have to remove the background color
      boxes[index].classList.remove('win');
      document.querySelector('.congratulations').style.display = 'none';
      document.querySelector('.Looser').style.display = 'none';
    })
     gameInfo.innerText=`Current player - ${currentPlayer}`;
}

initGame();

// 5..
function checkGameOver(){
    let winner=" ";
   // 6.. We have to iterate every winningPos array 
    winnigPosition.forEach((position)=>{
            if ( (gameGrid[position[0]] !== " " || gameGrid[position[1]] !== " " || gameGrid[position[2]] !==" ") 
                  && ( gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]]) ) {  // winner mil chuka hai
                            if (gameGrid[position[0]] === "X") {
                                winner ="X";
                            }
                            else
                              winner ="O";
                // As found Winner , we have to disable the pointer
                   boxes.forEach((box,index)=>{
                       box.style.pointerEvents='none';
                   })
                // UI pr bhi update krna pdega
                    boxes[position[0]].classList.add('win');        
                    boxes[position[1]].classList.add('win');        
                    boxes[position[2]].classList.add('win');     
                    document.querySelector('.congratulations').style.display = 'block';   // for congrutilating winner
            }
            // Also Update on UI
            if (winner !== " ") {
                gameInfo.innerText= `Winning player !! ${winner}`;
                newGameBtn.classList.add("active");       
                return;
            }
        // If ther is no any winner Means Tied Condition
        let fillCount =0;
        gameGrid.forEach((box,index)=>{
            if (gameGrid[index] !== " ") {
                fillCount++;
            }
        });
        if (fillCount == 9) {
            gameInfo.innerText='Game Tied!!';
            newGameBtn.classList.add('active');
            document.querySelector('.Looser').style.display = 'block';
        }
        newGameBtn.classList.add('active');
})
//   newGameBtn.classList.add("active");
}
// 4..
function swapTurn(){
    if (currentPlayer === 'X') {
         currentPlayer='O';
    }
    else{
        currentPlayer='X';
    }

   // Ab ek kaam kro UI ko bhi update kr do Bole to game-info ko jo Top pe hai 
    gameInfo.innerText=`Current player - ${currentPlayer}`;
}
// 3..
   function handleClick( index ){
       // Check if box is empty then add X/O 
        if(gameGrid[index] === " "){
              boxes[index].innerText = currentPlayer;
              gameGrid[index] =currentPlayer;
              boxes[index].style.pointerEvents =  "none";
             
              // Swap kro turn ko player(X/O) ko
              swapTurn();
              // Check it .. Is it win / Tie
              checkGameOver();
        }
   }
// 2...  --> As clicking on any box (means boxes[index]) add eventListner on every box to handle_the_Click operation
boxes.forEach( (box , index) => {
       box.addEventListener("click" , () =>{
           handleClick(index);
       })
});

// 6...
newGameBtn.addEventListener("click" , initGame);   

 