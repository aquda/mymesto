
const editButton = document.querySelector(".profile__edit-btn");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-btn");
const saveButton = document.querySelector(".popup__save-button");
const popupForm = document.querySelector(".popup__form");
const likeButton = document.querySelectorAll(".element__like-btn");

editButton.addEventListener("click", function(event){
    event.preventDefault();
    popup.classList.remove("popup_hidden");
});

closeButton.addEventListener("click", function(event){
  event.preventDefault();
  popup.classList.add("popup_hidden");
});

let profileName = document.querySelector(".profile__name");
let inputName = popup.querySelector(".popup__input-name");
let profileDescription = document.querySelector(".profile__description");
let inputDescription = popup.querySelector(".popup__input-description");


popupForm.addEventListener("submit", function(event){
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  popup.classList.add("popup_hidden");
});


likeButton.forEach(likeButton => {
  likeButton.addEventListener("click", function(event){
  event.preventDefault();
  likeButton.classList.toggle("element__like-btn_active");
});
})