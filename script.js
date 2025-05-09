
var board;
var score = 0;
var rows =4;
var colums = 4;

setgame();

function newgame(){
  let boardElement = document.getElementById("board");
  boardElement.innerHTML = "";
  score = 0;
  document.getElementById("score").innerText = score;
  
  setgame();

}

function setgame(){
  board =[
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ]
  // board =[
  //   [2,2,2,2],
  //   [2,2,2,2],
  //   [4,4,8,8],
  //   [4,4,8,8]
  // ]

  for(let r =0 ; r < rows; r++){
    for(let c = 0; c <colums ; c++){
      //<div id="0-0"></div>
      let tile = document.createElement("div");
      tile.id = r.toString() +"-"+c.toString();
      let num = board[r][c];
      updateTile(tile, num);
      document.getElementById("board").append(tile);
    }
  }
  setTwo();
  setTwo();
}

function hasEmptyTile(){
  for(let r = 0; r<rows; r++){
    for(let c = 0; c < colums ; c++){
      if(board[r][c] == 0){
        return true;
      }
    }
  }
}

function setTwo(){

if(!hasEmptyTile()){
  return;
}

  let found = false;
  while(!found){
    // random r, c
   let r = Math.floor(Math.random()* rows);
   let c = Math.floor(Math.random()* colums);

   if(board[r][c] == 0){
    board[r][c]= 2;
    let tile = document.getElementById(r.toString()+"-"+c.toString());
    tile.innerText = "2";
    tile.classList.add("x2");
    found = true;
   }
  }
}

function updateTile(tile, num){
  tile.innerText = "";
  tile.classList.value = ""; //claer the classlist
  tile.classList.add("tile");
  if(num > 0){
    tile.innerText = num;
    if(num < 2048){
      tile.classList.add("x"+num.toString());
    }else{
      tile.classList.add("x4096");
    }
  }
}

document.addEventListener("keyup", (event)=>{
  if(event.code == "ArrowLeft"){
    slideLeft();
    setTwo();
  }
  else if(event.code == "ArrowRight"){
    slideRight();
    setTwo();
  }
  else if(event.code == "ArrowUp"){
    slideUp();
    setTwo();
  }
  else if (event.code == "ArrowDown"){
    slideDown();
    setTwo();
  }
  document.getElementById("score").innerText = score;
});

function filterZero(row){
  return row.filter(num => num !=0);  // create a new array without zeros
}

function slide(row){
  //[0,2,2,2]
  row = filterZero(row); //remove the zeros

  for(let i =0 ; i< row.length-1; i++){
    if(row[i]==row[i+1]){
      row[i] *= 2;
      row[i+1] = 0;
      score +=row[i];
    }
  }
  
  row = filterZero(row);

  while(row.length < colums){
    row.push(0);
  }

  return row;
}

function slideLeft(){
  for(let r = 0; r< rows ; r++){
    let row = board[r];
    row = slide(row);
    board[r] = row;

    for(let c = 0; c < colums; c++){
      let tile = document.getElementById(r.toString()+"-"+c.toString());
      let num =  board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideRight(){
  for(let r = 0; r< rows ; r++){
    let row = board[r];
    row.reverse();
    row = slide(row);
    row.reverse();
    board[r] = row;

    for(let c = 0; c < colums; c++){
      let tile = document.getElementById(r.toString()+"-"+c.toString());
      let num =  board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideUp(){
  for(let c = 0; c < colums; c++){
    let row  = [board[0][c],board[1][c],board[2][c],board[3][c]];
    row = slide(row);
    // board[0][c] = row[0];
    // board[1][c] = row[1];
    // board[2][c] = row[2];
    // board[3][c] = row[3];

    for(let r = 0; r < rows; r++){
      board[r][c] =row[r];
      let tile = document.getElementById(r.toString()+"-"+c.toString());
      let num =  board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown(){
  for(let c = 0; c < colums; c++){
    let row  = [board[0][c],board[1][c],board[2][c],board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();
    // board[0][c] = row[0];
    // board[1][c] = row[1];
    // board[2][c] = row[2];
    // board[3][c] = row[3];
    

    for(let r = 0; r < rows; r++){
      board [r][c]= row[r];
      let tile = document.getElementById(r.toString()+"-"+c.toString());
      let num =  board[r][c];
      updateTile(tile, num);
    }
  }
}


function isGameOver(){
  if (hasEmptyTile()) return false;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < colums; c++) {
      let current = board[r][c];

      // Check right neighbor
      if (c < colums - 1 && board[r][c + 1] == current) {
        return false;
      }

      // Check bottom neighbor
      if (r < rows - 1 && board[r + 1][c] == current) {
        return false;
      }
    }
  }

  return true; // No empty tiles and no possible moves
}



document.addEventListener("keyup", (event)=>{
  let moved = false;

  if(event.code == "ArrowLeft"){
    slideLeft();
    moved = true;
  }
  else if(event.code == "ArrowRight"){
    slideRight();
    moved = true;
  }
  else if(event.code == "ArrowUp"){
    slideUp();
    moved = true;
  }
  else if (event.code == "ArrowDown"){
    slideDown();
    moved = true;
  }

  if (moved) {
    setTwo();
    document.getElementById("score").innerText = score;

    if (isGameOver()) {
      setTimeout(() => {
        alert("Game Over! You lost.");
      }, 100); // slight delay so last tile appears before alert
    }
  }
});
