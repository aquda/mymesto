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
const popupList = document.querySelectorAll(".popup");
const buttonAddSubmit = popupFormAdd.querySelector('.popup__save-button');
const ESCAPE_KEYCODE = 27;


/** добавление функции открытия попапа */
function openPopup (popup) {
  popup.classList.add("popup_open");
  document.addEventListener("keydown", closePopupEsc);
}

/** добавление функции закрытия попапа */
function closePopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", closePopupEsc);
}

/** добавление функции закрытия попапа с Esc */
function closePopupEsc(evt) {
  const key = evt.keyCode;
  if (key === ESCAPE_KEYCODE) {
    const openedPopup = document.querySelector('.popup_open');
    closePopup(openedPopup);
    }
}

/** автоматическое заполнение полей попапа */
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

/** применение изменений */

function fullfillPopup(ev) {
  ev.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupInfo);
}

popupForm.addEventListener("submit", fullfillPopup);

/** добавление общей функции лайка */

function toggleLike(evt) {
  evt.target.classList.toggle("element__like-btn_active");
}

/** добавление общей функции ремува */

function removeCard(evt) {
  evt.target.closest('.element').remove();
}

/** создание модального окна для изображений */

const popupFullView = document.querySelector(".popup_modal"); 
const imageElement = document.querySelectorAll(".element__image");
const modalImage = document.querySelector(".popup__image");
const elementText = document.querySelectorAll(".element__title");
const modalTitle = document.querySelector(".popup__caption");
const modalPopupCloseButton = popupFullView.querySelector(".popup__close-btn");

modalPopupCloseButton.addEventListener("click", function(evt) {
  closePopup(popupFullView);
})

function closePopupOverlay(evt) {
  if(evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

popupFullView.addEventListener('mousedown', closePopupOverlay);
popupAdd.addEventListener('mousedown', closePopupOverlay);
popupInfo.addEventListener('mousedown', closePopupOverlay);

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
    openPopup(popupFullView);
    modalImage.src = cardImg.src;
    modalImage.alt = cardTitle.textContent;
    modalTitle.textContent =  modalImage.alt;
  });

  cardImg.src = link;
  cardImg.alt = name;
  cardTitle.textContent = name;
  cardLike.addEventListener('click', toggleLike);
  cardRemove.addEventListener('click', removeCard);
  return cardTemplate;
}

function renderCard(card) {
  cardElement.prepend(card);
}

function createForm(evt) {
  evt.preventDefault();
  const cardNew = addElement({name: inputTitle.value, link: inputImg.value});
  renderCard(cardNew);
  formAdd.reset();
  disableButton(buttonAddSubmit, config);
  closePopup(popupAdd);
}

formAdd.addEventListener("submit", createForm);

// открытие и закрытие попапа для добавления карточек

cardAddButton.addEventListener("click", function(evt) {
  openPopup(popupAdd);
 })

 cardAddPopupCloseButton.addEventListener("click", function(evt) {
  closePopup(popupAdd);
})