let count = 0;
let counterDisplay = document.getElementById("counter");
let increase = document.getElementById("increaseBtn");
let decrease = document.getElementById("decreaseBtn");
let reset = document.getElementById("resetBtn");

increase.addEventListener("click", ()=>{
    count++;
    counterDisplay.innerHTML = count;
} )

decrease.addEventListener("click", ()=>{
    if(count > 0){
        count--;
    }
    else{
        count = 0;
    }
    counterDisplay.innerHTML = count;
} )

reset.addEventListener("click", ()=>{
    count = 0;
    counterDisplay.innerHTML = count;
} )

