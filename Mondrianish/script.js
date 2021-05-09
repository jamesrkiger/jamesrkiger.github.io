function generateRandomSeries() {
    let canvas_size = 100
    
    // getComputedStyle((document.getElementById("canvas")))
    // .width.replace(/\D/g,'')

    let array = []
    
    // define max and min sizes for rows and columns on canvas. These parameters need to total half the canvas diameter or else there may be strange results.  
    let max_value = 40
    let min_value = 10
    
    // begins to generate an array of random numbers totalling canvas height/width

    array.push(Math.floor(Math.random()*(max_value - min_value + 1) + min_value));
    array.push(Math.floor(Math.random()*(max_value - min_value + 1) + min_value));
    
    //Next section changes maximum values for third random number to make sure next two numbers stay within min and max parameters and total never exceeds canvas size

    let current_sum = (array[0]+array[1])
    
    // if the next two numbers could exceed remaining space under current parameters, adjust max_value 
    if (current_sum > (canvas_size - (max_value + min_value))) {
        max_value = (canvas_size - current_sum - min_value)
    }
    //if the next two numbers could fail to fill remaining space under current parameters, adjust min_value
    else if ((canvas_size - (current_sum + min_value)) > max_value) {
        min_value = (canvas_size - current_sum - max_value)
    }

    array.push(Math.floor(Math.random()*(max_value - min_value + 1) + min_value))

    //final number fills remaining space left by first three numbers
    array.push(canvas_size - (array[0] + array[1] + array[2]))
    
    // randomly sort array using Fisher-Yates shuffle (not sure if this is necessary, but it seems like the third value *might* end up being the largest most often, statistically. I don't know. But borrowing code is free, so.)
    let m = array.length, t, i;
    
    while (m > 0) {
        i = Math.floor(Math.random()* m--);
        
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    
    return array 
}

function randomizeCanvas() {

    let canvas = document.getElementById("canvas");

    let new_columns = generateRandomSeries().join("% ")+"%"
    let new_rows = generateRandomSeries().join("% ")+"%"
    
    canvas.style.gridTemplateColumns = new_columns
    canvas.style.gridTemplateRows = new_rows
}

//set actions for click events on page based on class name of target
let current_color = "white"
document.addEventListener("click", function(event) {
    if (event.target.className === "color_box") {
        current_color = window.getComputedStyle(event.target).getPropertyValue('background-color')
    }
    if (event.target.className === "box") {
        box = event.target
        box.style.backgroundColor = current_color
    }
    if (event.target.className === "random_canvas") {
        randomizeCanvas();
    }

    if (event.target.className === "reset_colors") {
        let boxes = document.getElementsByClassName("box")
        for (i = 0; i < boxes.length; i++) {
            boxes[i].style.backgroundColor = "white"
        }
    }

});

//randomize canvas on page load
document.addEventListener("load", randomizeCanvas());