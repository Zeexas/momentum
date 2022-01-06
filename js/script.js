const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const greetingContainer = document.querySelector('.greeting-container');
const theName = document.querySelector('.name');
const body = document.body;
let randomNum = 1;
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');

const city = document.querySelector('.city');
const weather = document.querySelector('.weather');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const weatherLang = {
  en: ['Wind speed', 'Humidity'],
  ru: ['Скорость ветра', 'Влажность']
}
const cityLang = {
  en: 'Minsk',
  ru: 'Минск'
}

const quoteContainer = document.querySelector('.quote-container');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

const settings = document.querySelector('.settings');
const settingsContent = document.querySelector('.settings-content');
let lang = 'en';
const langTitle = document.querySelector('.lang-title');
const langBtn = document.querySelector('.lang-btn');
const settingsLang = {
  langTitle: {
    en: 'Language',
    ru: 'Сменить язык'
  }
}


let isPlay = false;
let playNum = 0;
const audio = document.querySelector('audio');
const progressBar = document.getElementById('progress-bar');
// const audio = new Audio();
const play = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');

const dateOptions = {weekday: 'long', day: 'numeric', month: 'long'}
// const currentDate = new Date();

const greetingTranslation = {
  en: ['Good night', 'Good morning', 'Good afternoon', 'Good evening'],
  ru: ['Спокойной ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер']
}


// Date-Time section

function showTime() {
  time.textContent = new Date().toLocaleTimeString('ru-Ru', {hour12: false});
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}
showTime();

function showDate() {
  date.textContent = new Date().toLocaleDateString(lang, dateOptions);
}


// Greeting section

function showGreeting() {
  if (localStorage.getItem('name') || theName.value) {
    greeting.textContent = `${greetingTranslation[lang][Math.floor(new Date().getHours() / 6)]},`; // add comma if there is a name
  } else {
    greeting.textContent = `${greetingTranslation[lang][Math.floor(new Date().getHours() / 6)]}`;
  }
}

function getTimeOfDay() {
  let dayTimes = ['night', 'morning', 'afternoon', 'evening'];
  return dayTimes[Math.floor(new Date().getHours() / 6)];
}


function setLocalStorage() {
  localStorage.setItem('name', theName.value);
  localStorage.setItem('city', city.value);
  localStorage.setItem('lang', lang);
  localStorage.setItem('see-player', seePlayer.checked);
  localStorage.setItem('see-weather', seeWeather.checked);
  localStorage.setItem('see-time', seeTime.checked);
  localStorage.setItem('see-date', seeDate.checked);
  localStorage.setItem('see-greeting', seeGreeting.checked);
  localStorage.setItem('see-quote', seeQuote.checked);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    theName.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
  if (localStorage.getItem('lang')) {
    langBtn.textContent = localStorage.getItem('lang');
    lang = localStorage.getItem('lang');
  }
  if (localStorage.getItem('see-player')) {
    seePlayer.checked = JSON.parse(localStorage.getItem('see-player'));
    if (!seePlayer.checked) {audioPlayer.classList.add('hide');};
  }
  if (localStorage.getItem('see-weather')) {
    seeWeather.checked = JSON.parse(localStorage.getItem('see-weather'));
    if (!seeWeather.checked) {weather.classList.add('hide');};
  }
  if (localStorage.getItem('see-time')) {
    seeTime.checked = JSON.parse(localStorage.getItem('see-time'));
    if (!seeTime.checked) {time.classList.add('hide');};
  }
  if (localStorage.getItem('see-date')) {
    seeDate.checked = JSON.parse(localStorage.getItem('see-date'));
    if (!seeDate.checked) {date.classList.add('hide');};
  }
  if (localStorage.getItem('see-greeting')) {
    seeGreeting.checked = JSON.parse(localStorage.getItem('see-greeting'));
    if (!seeGreeting.checked) {greetingContainer.classList.add('hide');};
  }
  if (localStorage.getItem('see-quote')) {
    seeQuote.checked = JSON.parse(localStorage.getItem('see-quote'));
    if (!seeQuote.checked) {
      quoteContainer.classList.add('hide');
      changeQuote.classList.add('hide');
    };
  }
  langTitle.textContent = settingsLang.langTitle[lang];
  checkLanguage();
  getWeather();  // check it later
}
window.addEventListener('load', getLocalStorage);


//  BG image Slider

function setBg(timeOfDay, bgNum) {
  bgNum = randomNum.toString().padStart(2, 0);
  timeOfDay = getTimeOfDay();
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/Zeexas/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.webp`;
  img.onload = () => {
    body.style.backgroundImage = `url('${img.src}')`;
  }
}
setBg();

async function getLinkToImage() {
  const url = 'https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=tQDc6fJKfdLT3c7BgHmvQxoSGdan0hwxQFyszQn7et0';
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image();
  img.src = url;
  body.style.backgroundImage = `url(${data.urls.regular})`
  console.log(data.description);
}
getLinkToImage();


function getRandomNum() {
  randomNum = Math.ceil(Math.random() * 20);
}
getRandomNum();



function getSlideNext() {
  if (randomNum === 20) {
    randomNum = 1;
  } else {
    randomNum++;
  }
  setBg();  //  if no API image then set this iimage collection
  getLinkToImage();
}

function getSlidePrev() {
  if (randomNum === 1) {
    randomNum = 20;
  } else {
    randomNum--;
  }
  setBg();  //  if no API image then set this iimage collection
  getLinkToImage();
}

slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);


//  Weather section

city.value = localStorage.getItem('city') || cityLang[lang]; // if no city then Minsk

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=8fcac42860e73b6697e7dcee7eb3c8ff&units=metric`
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.className = 'weather-icon owf'; //  remove changed classes
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description; 
  wind.textContent = `${weatherLang[lang][0]}: ${Math.round(data.wind.speed)} m/s`;
  humidity.textContent = `${weatherLang[lang][1]}: ${Math.round(data.main.humidity)}%`;
  
  setTimeout(getWeather, 3600000); // get weather data every hour
}
getWeather();

city.addEventListener('change', getWeather);

// function enterCity() {
//   if (!city.value);
//   getWeather();
// }


//  Quote Section

async function getQuotes() {
  const quotes = 'js/data.json';
  const res = await fetch(quotes);
  const data = await res.json();
  let randomQuote = Math.floor(Math.random() * data.length);
  quote.textContent = `"${data[randomQuote].text}"`;
  author.textContent = data[randomQuote].author;
}
getQuotes();
changeQuote.addEventListener('click', getQuotes);




//                                    Audio Player

import playList from "./playList.js";
const audioPlayer = document.querySelector('.player');
const currentTime = document.querySelector('.current-time');
const songDuration = document.querySelector('.song-duration');
const songTitle = document.querySelector('.song-title');
const volume = document.querySelector('.volume');
const volumeBar = document.querySelector('.volume-bar');
let isOnSound = true;
let volumeLevel = audio.volume;
audio.volume = volumeBar.value / 100; // set initial audio volume
audio.src = playList[0].src;
songTitle.textContent = playList[0].title;

function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  if (!isPlay) {
    audio.play();
    isPlay = true;
    toggleBtn();
  } else {
    audio.pause();
    isPlay = false;
    toggleBtn();
  }
  setActiveItem();
}

function switchAudio() {
  if (!isPlay) {
    audio.pause();
  } else {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
  }
  setActiveItem();
}

function toggleBtn() {
  play.classList.toggle('pause');
}

play.addEventListener('click', playAudio);
audio.addEventListener('ended', playNext);  // loop playlist

function playNext() {
  if (playNum === playList.length - 1) {
    playNum = 0;
    switchAudio();
  } else {
    playNum++;
    switchAudio();
  }
}

function playPrev() {
  if (playNum === 0) {
    playNum = playList.length - 1;
    switchAudio();
  } else {
    playNum--;
    switchAudio();
  }
}

function setActiveItem() {
  const playItemCollection = document.querySelectorAll('.play-item');
  playItemCollection.forEach(el => {
    el.classList.remove('item-active');
  });
  playItemCollection[playNum].classList.add('item-active');
  songTitle.textContent = playList[playNum].title;
}

playNextBtn.addEventListener('click', playNext);
playPrevBtn.addEventListener('click', playPrev);

const play_list = document.querySelector('.play-list');

playList.forEach(el => {
  let li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = el.title;
  play_list.append(li);
  setActiveItem();
});

//                                   Custom Audio Player
function formatTime(duration) {
  let minute = Math.trunc(duration / 60);
  let second = Math.trunc(duration - minute * 60);
  second = second.toString().padStart(2, 0);
  return `${minute}:${second}`;
}

function updateProgressBar() {
  progressBar.max = audio.duration;
  progressBar.value = audio.currentTime;
  currentTime.textContent = formatTime(audio.currentTime);
  if (songDuration.textContent === 'NaN:NaN') {
    songDuration.textContent = '0:00';
  } else {
    songDuration.textContent = formatTime(audio.duration);
  }
}

volumeBar.addEventListener('input', setVolume);
function setVolume() {
  audio.volume = volumeBar.value / 100;
}

setInterval(updateProgressBar, 500);

function changeProgressBar() {
  audio.currentTime = progressBar.value;
}
progressBar.addEventListener('change', changeProgressBar);

volume.addEventListener('click', toggleVolume);
// volumeLevel = audio.volume;
function toggleVolume() {
  volume.classList.toggle('sound-on');
  volume.classList.toggle('mute');
  if (isOnSound) {
    volumeLevel = audio.volume; //  remember volume level before mute
    isOnSound = false;
    volumeBar.value = 0;
    setVolume();
  } else {
    isOnSound = true;
    volumeBar.value = volumeLevel * 100;
    setVolume();
  }
  
}


//                                  Settings

settings.addEventListener('click', toggleSettings);

function toggleSettings() {
  settingsContent.classList.toggle('show');
}


//  Language switch

langBtn.addEventListener('click', switchLang);

// langBtn.textContent = localStorage.getItem('lang') || lang; // if no language in store then English
langBtn.textContent = lang; // if no language in store then English
langTitle.textContent = settingsLang.langTitle[lang];

function switchLang() {
  let toggleEng = document.querySelectorAll('.eng');
  let toggleRus = document.querySelectorAll('.rus');
  if (lang === 'en') {
    toggleEng.forEach(el => el.style.display = 'none');
    toggleRus.forEach(el => el.style.display = 'block');
    langBtn.textContent = 'ru';
    lang = 'ru';
  } else {
    toggleEng.forEach(el => el.style.display = 'block');
    toggleRus.forEach(el => el.style.display = 'none');
    langBtn.textContent = 'en';
    lang = 'en';
  }
  setLocalStorage();
  showGreeting();
  getWeather();
  showDate();
  langTitle.textContent = settingsLang.langTitle[lang]; // if no language in store then English
}

function checkLanguage() {
  let toggleEng = document.querySelectorAll('.eng');
  let toggleRus = document.querySelectorAll('.rus');
  if (lang === 'en') {
    toggleEng.forEach(el => el.style.display = 'block');
    toggleRus.forEach(el => el.style.display = 'none');
  } else {
    toggleEng.forEach(el => el.style.display = 'none');
    toggleRus.forEach(el => el.style.display = 'block');
  }
}

//  Show Block settings

const seePlayer = document.getElementById('see-player');
const seeWeather = document.getElementById('see-weather');
const seeTime = document.getElementById('see-time');
const seeDate = document.getElementById('see-date');
const seeGreeting = document.getElementById('see-greeting');
const seeQuote = document.getElementById('see-quote');

seePlayer.addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    audioPlayer.classList.remove('hide');
  } else {
    audioPlayer.classList.add('hide');
  }
})

seeWeather.addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    weather.classList.remove('hide');
  } else {
    weather.classList.add('hide');
  }
})

seeTime.addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    time.classList.remove('hide');
  } else {
    time.classList.add('hide');
  }
})

seeDate.addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    date.classList.remove('hide');
  } else {
    date.classList.add('hide');
  }
})

seeGreeting.addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    greetingContainer.classList.remove('hide');
  } else {
    greetingContainer.classList.add('hide');
  }
})

seeQuote.addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    quoteContainer.classList.remove('hide');
    changeQuote.classList.remove('hide');
  } else {
    quoteContainer.classList.add('hide');
    changeQuote.classList.add('hide');
  }
})






