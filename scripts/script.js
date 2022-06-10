const editButton = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
// универсальные для всех попапов
const popupEditCloseButton = document.querySelector(".popup__close-btn");
const popupForm = document.querySelector(".popup__form-edit");
// все инпуты
const inputName = document.querySelector("#profile-name");
const inputDescription = document.querySelector("#profile-description");
const inputTitle = document.querySelector("#add-title");
const inputImg = document.querySelector("#add-image");
// поле информации об аккаунте
const profileDescription = document.querySelector(".profile__description");
const cardAddButton = document.querySelector(".profile__add-btn");
// карточка
const cardElement = document.querySelector('.elements');
const likeButton = document.querySelectorAll(".element__like-btn");
const cardDeleteButton = document.querySelectorAll(".element__delete-btn");
// попап добавления картинок
const popupAdd = document.querySelector(".popup_add");
const formAdd = document.querySelector(".popup__form-place");
const cardAddPopupCloseButton = popupAdd.querySelector(".popup__close-btn");
// шаблон карточки
const template = document.querySelector(".card-template").content;
// попап с редактированием информации
const popupInfo = document.querySelector(".popup_info");
// попапы и их контейнеры
const popupProfileContainer = document.querySelector(".popup__edit-container");
const popupAddContainer = document.querySelector(".popup__add-container");
const popupFormProfile = popupProfileContainer.querySelector(".popup__form");
const popupFormAdd = popupAddContainer.querySelector(".popup__form");


// открыть попап 
function openPopup (item) {
  item.classList.add("popup_open");
  document.addEventListener("keydown", closePopupEsc);
}

// закрыть попап
function closePopup(item) {
  item.classList.remove("popup_open");
  document.removeEventListener("keydown", closePopupEsc);
}

const popupList = document.querySelectorAll(".popup");

// закрыть попап Esc
function closePopupEsc(evt) {
  const key = evt.keyCode;
  if (key === 27) {
    const openedPopup = document.querySelector('.popup_open');
    closePopup(openedPopup);
    }
  }



// заполнить поля попапа
function keepAddPopup() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

editButton.addEventListener("click", function(evt) {
  openPopup(popupInfo);
  keepAddPopup();
 })

popupEditCloseButton.addEventListener("click", function(evt) {
  closePopup(popupInfo);
})

// сохранить изменения

function fullfillPopup(ev) {
  ev.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupInfo);
}

popupForm.addEventListener("submit", fullfillPopup);

// общая функция лайка

function toggleLike(evt) {
  evt.target.closest('.element__like-btn').classList.toggle("element__like-btn_active");
}

//лайк для изначальных карточек 

likeButton.forEach(item => {
  item.addEventListener("click", toggleLike)
})

// общая функция ремува

function removeCard(evt) {
  evt.target.closest('.element').style.display = "none";
}

//ремув для изначальных карточек 

cardDeleteButton.forEach(item => {
  item.addEventListener("click", removeCard)
})

// создание модального окна для изображений

const popupModal = document.querySelector(".popup_modal"); 
const image = document.querySelectorAll(".element__image");
const modalImage = document.querySelector(".popup__image");
const elementText = document.querySelectorAll(".element__title");
const modalTitle = document.querySelector(".popup__caption");
const modalPopupCloseButton = popupModal.querySelector(".popup__close-btn");

// функция для существующих карточек

modalPopupCloseButton.addEventListener("click", function(evt) {
  closePopup(popupModal);
})

//

function closePopupOverlay(evt) {
  if(evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

popupModal.addEventListener('mousedown', closePopupOverlay);
popupAdd.addEventListener('mousedown', closePopupOverlay);
popupInfo.addEventListener('mousedown', closePopupOverlay);




//
image.forEach(item => {
  item.addEventListener("click", function(event){
  openPopup(popupModal);
  modalImage.src = item.src;
  modalTitle.textContent = item.alt;
});
})

//универсальная функция добавления карточек

initialCards.forEach((item) => { 
  const card = addElement(item);
  renderCard(card);
});

function addElement(item) {
  const cardTemplate = template.querySelector(".card-element").cloneNode(true);
  const cardTitle = cardTemplate.querySelector(".element__title");
  const cardImg = cardTemplate.querySelector(".element__image");
  const cardRemove = cardTemplate.querySelector(".element__delete-btn");
  const cardLike = cardTemplate.querySelector(".element__like-btn");
  const name = item.name;
  const link = item.link;
  cardImg.addEventListener('click', function(evt) {
    openPopup(popupModal);
    modalImage.src = cardImg.src;
    modalImage.alt = cardTitle.textContent;
    modalTitle.textContent =  modalImage.alt;
  });

  cardLike.addEventListener('click', toggleLike);
  cardRemove.addEventListener('click', removeCard);
  cardImg.src = link;
  cardImg.alt = name;
  cardTitle.textContent = name;
  return cardTemplate;
}

function renderCard(card) {
  cardElement.prepend(card);
}

function createForm(evt) {
  evt.preventDefault();
  const cardNew = addElement({name: inputTitle.value, link: inputImg.value});
  renderCard(cardNew);
  closePopup(popupAdd);
  formAdd.reset();
}

formAdd.addEventListener("submit", createForm);

// открытие и закрытие попапа для добавления карточек

cardAddButton.addEventListener("click", function(evt) {
  openPopup(popupAdd);
 })

 cardAddPopupCloseButton.addEventListener("click", function(evt) {
  closePopup(popupAdd);
})