let mouseDown = false;
let mouseStart = 0;
let startScroll = 0;

let isInside = false;

festivalContainer.addEventListener("mousedown", (e) => {
  mouseStart = e.clientX;
  mouseDown = true;
  startScroll = festivalContainer.scrollLeft;
});

festivalContainer.addEventListener("mousemove", (e) => {
  if(mouseDown){
    let diff = e.clientX - mouseStart;
    festivalContainer.scrollLeft = startScroll - diff;
  }
});

festivalContainer.addEventListener("mouseup", (e) => {
  mouseDown = false;
});

festivalContainer.addEventListener("mouseleave", (e) => {
  mouseDown = false;
  isInside = false;
});

festivalContainer.addEventListener('mouseenter', (e) => {
  isInside = true;
});

festivalContainer.addEventListener('wheel', function(e) {
  e.preventDefault();
  if(e.deltaY > 0){
    festivalContainer.scrollLeft += 50;
  }else if(e.deltaY < 0){
    festivalContainer.scrollLeft -= 50;
  }
});
