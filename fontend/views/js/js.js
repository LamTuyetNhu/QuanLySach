// const wrapper = document.querySelector(".wrapper1");
// const btnPopup = document.querySelector(".btnLogin");
// const iconClose = document.querySelector(".icon-close");
// const jsWrapper = document.querySelector(".js-wrapper");
// const modal = document.querySelector(".js-modal1");

// btnPopup.addEventListener("click", () => {
//   wrapper.classList.add("active-popup");
//   modal.style.zIndex = 1;
// });

// iconClose.addEventListener("click", () => {
//   wrapper.classList.remove("active-popup");
// });

// modal.addEventListener("click", () => {
//   wrapper.classList.remove("active-popup");
//   modal.style.zIndex = 0;
// });

// jsWrapper.addEventListener("click", (event) => {
//   event.stopPropagation();
// });


/* Buy Book */
var buyBtns = document.querySelectorAll(".buy-btn");
var openBtn = document.querySelector(".modal");
var modalContainer = document.querySelector(".modal-container");
var closeBtn = document.querySelector(".modal-close");

      for (var buyBtn of buyBtns) {
        buyBtn.onclick = function () {
          openBtn.classList.add("open");
        };
      }

      closeBtn.onclick = function () {
        openBtn.classList.remove("open");
      };

      openBtn.onclick = function () {
        openBtn.classList.remove("open");
      };

      modalContainer.onclick = function (event) {
        event.stopPropagation();
      };