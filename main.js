"use strict";

const HIDE_VALUE = "-500px";
const HIDE_VALUE_IN_NUMBER = -500;
const currentHeightBody = document.body.offsetHeight;
const maxHeightScroll = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
  document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
let closeClicked = false;

const adjustContainer = (height) => {
  const containerObj = document.getElementById("main-content");
  containerObj.style.marginTop = height + "px";
}

document.addEventListener("DOMContentLoaded", (e) => {
  const closedDateTimestamp = localStorage.getItem("closed-timestamp");
  if(closedDateTimestamp != null){
    const timeStampToInt = parseInt(closedDateTimestamp);
    const closedDate = new Date(timeStampToInt);
    const afterTenMins = closedDate.setMinutes(closedDate.getMinutes() + 10);

    if(Date.now() < afterTenMins){
      closeClicked = true;
    }
  }

  const notificationPanelObj = document.getElementById("notification-panel");
  adjustContainer(notificationPanelObj.offsetHeight);

  const btnNotifPanel = document.getElementById('got-it-button');
  btnNotifPanel.addEventListener("click", () => {
    const notificationPanelObj = document.getElementById("notification-panel");
    notificationPanelObj.style.top = HIDE_VALUE;
    adjustContainer(0);
  });

  const closeBtnNewsletter = document.getElementById('close-newsletter-btn');
  closeBtnNewsletter.addEventListener("click", () => {
    const newsletterObj = document.getElementById("newsletter");
    newsletterObj.style.bottom = HIDE_VALUE;

    localStorage.setItem("closed-timestamp", Date.now());
  })
});

document.addEventListener("scroll", (e) => {
  const oneThirdHeight = maxHeightScroll / 3;
  const isOneThird = document.documentElement.scrollTop >= oneThirdHeight;
  const isClientHeightExceedOneThird = document.documentElement.clientHeight >= oneThirdHeight;
  if((isOneThird || isClientHeightExceedOneThird) && !closeClicked){
    closeClicked = true;

    const newsletterObj = document.getElementById("newsletter");
    newsletterObj.style.bottom = 0;
  }
})

window.addEventListener("resize", (e) => {
  const notificationPanelObj = document.getElementById("notification-panel");
  if(notificationPanelObj.style.top == HIDE_VALUE) adjustContainer(0);
  else adjustContainer(notificationPanelObj.offsetHeight);
});

