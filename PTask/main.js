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

function setLightBackground(url) {
  document.body.style.backgroundImage = `linear-gradient(to bottom right, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url('${url}')`;
}

function waitTime(time) {
  return new Promise((resolve) => {setTimeout(resolve, time)});
}

//console.log("Hello")
