async function getJSON(source) {
  let res = await fetch(source);
  return await res.json();
}

async function populateFestivalContainer(source) {
  let list = await getJSON(source);

  console.log()

  for(let {name, imageUrl, pageUrl} of list){
    let box = document.createElement("div");

    box.classList.add("festivalPreview");
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

//console.log("Hello")