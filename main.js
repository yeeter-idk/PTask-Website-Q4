let previewingImage = false;

async function getJSON(source) {
  let res = await fetch(source);
  return await res.json();
}

async function populateFestivalContainer(source) {
  let list = await getJSON(source);

  for(let {name, imageUrl, pageUrl} of list){
    let box = document.createElement("div");

    box.classList.add("festivalPreview", "isFloatable");
    box.style.backgroundImage = `url(${imageUrl})`;
    
    box.addEventListener("click", () => {
      window.location.href = pageUrl;
    });

    let title = document.createElement("h2");

    title.innerHTML = name;

    box.append(title);

    festivalContainer.append(box);
  }
}

async function createSlideshowElement(elem, source) {
  let list = await getJSON(source);

  let keys = Object.keys(list);
  while(true){ 
    for(let key of keys){
      let fest = list[key];
      elem.style.backgroundImage = `url(${fest.imageUrl})`;

      await waitTime(5000);
    }
  }
}

async function populateSourcedImage(source) {
  let list = await getJSON(source);
  
  let images = {};
  
  let keys = Object.keys(list).sort();
  
  for(let key of keys){
    images[key] = await loadImage(key);
  }
  
  keys.sort((a, b) => {
    let imageA = images[a];
    let ratioA = imageA.height / imageA.width;
    let imageB = images[b];
    let ratioB = imageB.height / imageB.width;
    
    return ratioA - ratioB;
  });
  
  let count = 0;
  for(let key of keys){
    let image = images[key];
    image.alt = key;
    image.classList.add("imageSource");
    
    image.style.anchorName = `--a${count}`;
    
    let link = document.createElement("a");
    link.href = list[key];
    link.innerText = "Source";
    link.classList.add("imageSourceLink");
    link.style.backgroundColor = "black";
    link.style.color = "white";
    link.style.padding = "5px";
    
    link.style.left = `anchor(--a${count} left)`;
    link.style.bottom = `anchor(--a${count} bottom)`;
    
    let stopPreview = document.createElement("span");
    stopPreview.innerText = "[x]"
    stopPreview.style.right = `anchor(--a${count} right)`;
    stopPreview.style.top = `anchor(--a${count} top)`;
    stopPreview.style.backgroundColor = "black";
    stopPreview.style.color = "white";
    stopPreview.style.display = "none";
    stopPreview.style.position = "fixed";
    stopPreview.style.padding = "5px";
    
    image.addEventListener("click", () => {
      if(previewingImage) return;
    
      previewingImage = true;
      image.classList.add("imageSourceActive");
      link.classList.add("imageSourceLinkActive");
      stopPreview.style.display = "inline";
    });
    
    stopPreview.addEventListener("click", () => {
      previewingImage = false;
      image.classList.remove("imageSourceActive");
      link.classList.remove("imageSourceLinkActive");
      stopPreview.style.display = "none";
    });
    
    mainContent.append(image, link, stopPreview);
    
    count++;
  }
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.src = src;
  })
}

function setLightBackground(url) {
  document.body.style.backgroundImage = `linear-gradient(to bottom right, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url('${url}')`;
}

function waitTime(time) {
  return new Promise((resolve) => {setTimeout(resolve, time)});
}

//console.log("Hello")
