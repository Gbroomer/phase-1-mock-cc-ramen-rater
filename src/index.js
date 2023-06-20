// write your code here
document.addEventListener("DOMContentLoaded", () => {
    const ramDivBar = document.getElementById("ramen-menu");
    const ramDivLrg = document.getElementById("ramen-detail")
    const ramImgLrg = ramDivLrg.querySelector("img")
    const ramNameLrg = document.getElementsByClassName("name")[0]
    const ramRestLrg = document.getElementsByClassName("restaurant")[0]
    const ramRateSpan = document.getElementById("rating-display")
    const ramCommieDis = document.getElementById("comment-display")
    const newRamForm = document.getElementById("new-ramen")
    let currentRamen
    newRamForm.addEventListener("submit", (e)=> {
        e.preventDefault()
        const newRamName = document.getElementById("new-name")
        const newRamRest = document.getElementById("new-restaurant")
        const newRamImg = document.getElementById("new-image")
        const newRamRating = document.getElementById("new-rating")
        const newRamCom = document.getElementById("new-comment")
        const newRamen = {
            name: newRamName.value,
            restaurant: newRamRest.value,
            image: newRamImg.value,
            rating: newRamRating.value,
            comment: newRamCom.value
        }
        ramenGen(newRamen)
    })
    fetch("http://localhost:3000/ramens")
      .then(res => res.json())
      .then(data => {
        
        data.forEach((ramen) => {
            ramenGen(ramen)
        })
        
    })
    function ramenGen(ramen) {
      currentRamen = ramen
      const ramImg = ramen.image;
      const createImg = document.createElement("img");
      createImg.src = ramImg;
      createImg.addEventListener("click", () => {
        const ramName = ramen.name
        const ramRest = ramen.restaurant
        const ramRate = ramen.rating
        const ramCommie = ramen.comment
        ramImgLrg.src = ramImg
        ramImgLrg.alt = ramName
        ramNameLrg.textContent = ramName
        ramRestLrg.textContent = ramRest
        ramRateSpan.textContent = ramRate
        ramCommieDis.textContent = ramCommie
      })
      ramDivBar.append(createImg);
    }
})
