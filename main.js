"use strict";

const HIDE_VALUE = "-500px";
const HIDE_VALUE_IN_NUMBER = -500;
const currentHeightBody = document.body.offsetHeight;
const maxHeightScroll = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
  document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
let closeClicked = false;

// Function for adjust the top of the content based on notification panel position
const adjustContainer = (height) => {
  const containerObj = document.getElementById("main-content");
  containerObj.style.marginTop = height + "px";
}

document.addEventListener("DOMContentLoaded", (e) => {
  // Action for controlling newsletter appearance (appear after 10 mins since being closed)
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

  // Action for sliding up notification panel
  const btnNotifPanel = document.getElementById('got-it-button');
  btnNotifPanel.addEventListener("click", () => {
    const notificationPanelObj = document.getElementById("notification-panel");
    notificationPanelObj.style.top = HIDE_VALUE;
    adjustContainer(0);
  });

  // Action for sliding down newsletter
  const closeBtnNewsletter = document.getElementById('close-newsletter-btn');
  closeBtnNewsletter.addEventListener("click", () => {
    const newsletterObj = document.getElementById("newsletter");
    newsletterObj.style.bottom = HIDE_VALUE;

    localStorage.setItem("closed-timestamp", Date.now());
  })
});

// Scroll event for triggering newsletter appearance
document.addEventListener("scroll", (e) => {
  const oneThirdHeight = maxHeightScroll / 3;
  // Determine whether current scroll has reached one-third of the page
  const isOneThird = document.documentElement.scrollTop >= oneThirdHeight;
  // Determine whether current height of client screen exceeded one-third of the page
  // (means value of scrolling, or scroll top, potentially does not reach one-third of the page)
  // Prevent newsletter does not appear after scrolling on the client screen that has a big height (> 768px)
  const isClientHeightExceedOneThird = document.documentElement.clientHeight >= oneThirdHeight; 
  if((isOneThird || isClientHeightExceedOneThird) && !closeClicked){
    closeClicked = true;

    const newsletterObj = document.getElementById("newsletter");
    newsletterObj.style.bottom = 0;
  }
})

// Adjustment between notificaiton panel and content if resizing occurs
window.addEventListener("resize", (e) => {
  const notificationPanelObj = document.getElementById("notification-panel");
  if(notificationPanelObj.style.top == HIDE_VALUE) adjustContainer(0);
  else adjustContainer(notificationPanelObj.offsetHeight);
});

