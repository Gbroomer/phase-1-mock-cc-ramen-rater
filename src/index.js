let currentRamen
let allRamen = []
const ramenMenu = document.getElementById("ramen-menu")
initialize()
function initialize() {
  fetch("http://localhost:3000/ramens")
  .then(res=>res.json())
  .then(data =>{
    allRamen = data
    data.forEach(ramen => generateNavBar(ramen))
    generateRamenDetail(data[0])
    addNewRamen()
    updateRamen()
    deleteRamen()
  })
}
function generateNavBar(ramen) {
  const ramenImg = document.createElement("img")
  ramenImg.src = ramen.image
  ramenImg.alt = `Picture of: ${ramen.name}`
  ramenImg.addEventListener("click", () => {
    generateRamenDetail(ramen)
  })
  ramenMenu.append(ramenImg)
}
function generateRamenDetail(ramen) {
  currentRamen = ramen
  const ramenImg = document.getElementsByClassName("detail-image")[0]
  ramenImg.src = ramen.image
  ramenImg.alt = `Picture of ${ramen.name}`
  const ramenName = document.getElementsByClassName("name")[0]
  ramenName.textContent = ramen.name
  const ramenRest = document.getElementsByClassName("restaurant")[0]
  ramenRest.textContent = ramen.restaurant
  const ramenRating = document.getElementById("rating-display")
  ramenRating.textContent = ramen.rating
  const ramenComment = document.getElementById("comment-display")
  ramenComment.textContent = ramen.comment
}
function addNewRamen() {
  const newRamenForm = document.getElementById("new-ramen")
  newRamenForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const newName = document.getElementById("new-name").value
    const newRest = document.getElementById("new-restaurant").value
    const newImg = document.getElementById("new-image").value
    const newRating = document.getElementById("new-rating").value
    const newComment = document.getElementById("new-comment").value
    console.log(newRating)
    const newRamen = {
      name: newName,
      restaurant: newRest,
      image: newImg,
      rating: newRating,
      comment: newComment
    }
    generateRamenDetail(newRamen)
    fetch("http://localhost:3000/ramens", {
      method: "POST",
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRamen)
    })
    generateNavBar(newRamen)
  })
}
function updateRamen() {
  const updateForm = document.getElementById("edit-ramen")
  updateForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const updateRating = document.getElementById("edit-rating").value
    const updateComment = document.getElementById("edit-comment").value
    currentRamen.rating = updateRating
    currentRamen.comment = updateComment
    const ramenId = currentRamen.id
    console.log(currentRamen.id)
    const updatedRamen = {
      rating: updateRating,
      comment: updateComment
    }
    fetch(`http://localhost:3000/ramens/${ramenId}`, {
      method: "PATCH",
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedRamen)
    })
      generateRamenDetail(currentRamen)
  })
}
function deleteRamen() {
  const deleteBtn = document.getElementById("delete-button")
  deleteBtn.addEventListener("click", () => {
    // for(let i = 0; i < allRamen.length; i++){ 
    //   if(allRamen[i].id === currentRamen)
    //     allRamen.splice(i, 1)
    // }
    fetch(`http://localhost:3000/ramens/${currentRamen.id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
    .then(res=>res.json())
    .then(data => {
      ramenMenu.innerHTML = ''
      initialize()
    })
  })
}

















// write your code here
// document.addEventListener("DOMContentLoaded", () => {
//     const ramDivBar = document.getElementById("ramen-menu");
//     const ramDivLrg = document.getElementById("ramen-detail")
//     const ramImgLrg = ramDivLrg.querySelector("img")
//     const ramNameLrg = document.getElementsByClassName("name")[0]
//     const ramRestLrg = document.getElementsByClassName("restaurant")[0]
//     const ramRateSpan = document.getElementById("rating-display")
//     const ramCommieDis = document.getElementById("comment-display")
//     const newRamForm = document.getElementById("new-ramen")
//     let currentRamen
//     newRamForm.addEventListener("submit", (e)=> {
//         e.preventDefault()
//         const newRamName = document.getElementById("new-name")
//         const newRamRest = document.getElementById("new-restaurant")
//         const newRamImg = document.getElementById("new-image")
//         const newRamRating = document.getElementById("new-rating")
//         const newRamCom = document.getElementById("new-comment")
//         const newRamen = {
//             name: newRamName.value,
//             restaurant: newRamRest.value,
//             image: newRamImg.value,
//             rating: newRamRating.value,
//             comment: newRamCom.value
//         }
//         ramenGen(newRamen)
//     })
//     fetch("http://localhost:3000/ramens")
//       .then(res => res.json())
//       .then(data => {
        
//         data.forEach((ramen) => {
//             ramenGen(ramen)
//         })
        
//     })
//     function ramenGen(ramen) {
//       currentRamen = ramen
//       const ramImg = ramen.image;
//       const createImg = document.createElement("img");
//       createImg.src = ramImg;
//       createImg.addEventListener("click", () => {
//         const ramName = ramen.name
//         const ramRest = ramen.restaurant
//         const ramRate = ramen.rating
//         const ramCommie = ramen.comment
//         ramImgLrg.src = ramImg
//         ramImgLrg.alt = ramName
//         ramNameLrg.textContent = ramName
//         ramRestLrg.textContent = ramRest
//         ramRateSpan.textContent = ramRate
//         ramCommieDis.textContent = ramCommie
//       })
//       ramDivBar.append(createImg);
//     }
// })
