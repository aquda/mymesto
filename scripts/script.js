
const editButton = document.querySelector(".profile__edit-btn");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-btn");
const popupForm = document.querySelector(".popup__form");
let profileName = document.querySelector(".profile__name");
let inputName = document.querySelector("#input-name");
let profileDescription = document.querySelector(".profile__description");
let inputDescription = document.querySelector("#input-dscr");

function openPopup() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  popup.classList.add("popup_open");
}

editButton.addEventListener("click", openPopup);

function closePopup() {
  popup.classList.remove("popup_open");
}

closeButton.addEventListener("click", closePopup);

function popupFullfill(ev) {
  ev.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup();
}

popupForm.addEventListener("submit", popupFullfill);

/**
const likeButton = document.querySelectorAll(".element__like-btn");

likeButton.forEach(likeButton => {
  likeButton.addEventListener("click", function(event){
  event.preventDefault();
  likeButton.classList.toggle("element__like-btn_active");
});
})
 */