var canvas = document.querySelector("#myCanvas");
var ctx = canvas.getContext("2d");
const colorArray = ["#267BD1", "#F56147", "#DA1B1B", "#1BDA27"];
var colorContainer = document.querySelector(".color_container");
var clrBtn = document.querySelector(".clear");
var downloadBtn = document.querySelector(".download");
var currentColor = colorArray[0];
  

clrBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

downloadBtn.addEventListener("click", () => {
    var link = document.createElement("a");
    link.download = new Date().toDateString() + ".png";
    link.href = canvas.toDataURL();
    link.click();
  });


//creating the colorplates awhen click change color
colorArray.forEach((color) => {
    const colorPlate = document.createElement("div");//create a div ele
    colorPlate.className = "color"; //set a classname
    colorPlate.style.backgroundColor = color; //set a style
    colorPlate.onclick = () => { //wheneer the click cc is c
      currentColor = color;
    };
    colorContainer.insertAdjacentElement("beforeend", colorPlate);
  });
  

const draw = (event) => { ////it drwa a line when call
    const rect = canvas.getBoundingClientRect(); //it gives rectangle
    ctx.lineWidth = 3;
    ctx.lineCap = "round"; // rounded paint brush
    ctx.lineTo(event.pageX - rect.left, event.pageY - rect.top);
    ctx.strokeStyle = currentColor;
    ctx.stroke();
    ctx.moveTo(event.pageX - rect.left, event.pageY - rect.top); // this will move the position of pen
  };
  var isMouseDown = false;
  canvas.onmousedown = (event) => { // click on the canvas
    isMouseDown = true;
    console.log(event);
    draw(event);
  };
  
  canvas.onmousemove = (event) => {
    if (isMouseDown) draw(event); //if mouse down draw
  };
  
  canvas.onmouseup = (event) => {
    ctx.beginPath();//create a new beginpath that means create a line
    isMouseDown = false;
  };