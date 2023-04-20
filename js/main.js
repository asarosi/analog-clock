const secondHand = document.querySelector('.second-hand');
const minutesHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const currentQuarter = document.getElementById('currentQuarter');
const currentHalf = document.getElementById('currentHalf');
const plusButton = document.getElementById('plusButton');
const minusButton = document.getElementById('minusButton');
const currentTime = document.getElementById('currentTime');

function updateClockData() {
  const plus = localStorage.getItem('plus') || 0;
  const minus = localStorage.getItem('minus') || 0;
  const total = Number(plus) - Number(minus);

  const now = new Date();
  now.setMinutes(now.getMinutes() + total);

  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const minutes = now.getMinutes();
  const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
  minutesHand.style.transform = `rotate(${minutesDegrees}deg)`;

  const hour = now.getHours();
  const hourDegrees = ((hour / 12) * 360) + ((minutes / 60) * 30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;

  currentTime.innerHTML = `${hour} : ${minutes} : ${seconds}`;
  updateCurrentQuarter(minutes);
  updateCurrentHalf(minutes);
}

function updateCurrentQuarter(minutes) {
  let value = '4th quarter';

  if (minutes < 15) {
    value = '1st quarter';
  } else if (minutes < 30) {
    value = '2nd quarter';
  } else if (minutes < 45) {
    value = '3rd quarter';
  }

  currentQuarter.innerHTML = value;
}

function updateCurrentHalf(minutes) {
  currentHalf.innerHTML = minutes < 30 ? '1st half' : '2nd half';
}

function generateHourNumbers() {
  const ul = document.querySelector('.hours');

  for (let i = 0; i < 12; i++) {
    let li = document.createElement('li');
    let span = document.createElement('span');
    span.innerHTML = Number(i) + 1;
    li.appendChild(span);
    ul.appendChild(li);
  }
}

plusButton.addEventListener('click', function () {
  updateMinutes('plus', 5);
});

minusButton.addEventListener('click', function () {
  updateMinutes('minus', 10);
});

function updateMinutes(flagToChange, value) {
  const currentValue = localStorage.getItem(flagToChange) || 0;
  const updatedValue = Number(currentValue) + value;
  localStorage.setItem(flagToChange, updatedValue);
  updateClockData();
}

generateHourNumbers();
updateClockData();
setInterval(updateClockData, 1000);
