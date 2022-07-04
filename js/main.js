//<_ibg>======================================================================================

function _ibg() {

	let ibg = document.querySelectorAll("._ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}

_ibg();

//</_ibg>=====================================================================================

// <Бурегр Меню>==============================================================================

// Бургер
const iconMenu = document.querySelector('.icon-menu'); // Получаем в константу класс кнопки "Бургер"
const menuBody = document.querySelector('.menu-header'); // Получаем в константу класс всего Меню
if (iconMenu) { // Если таковая имеется:
	iconMenu.addEventListener("click", function (e) { // По клику на "Бургер"
		document.body.classList.toggle('_lock'); // Добавляем для body класс "lock"
		iconMenu.classList.toggle('_active'); // Добавляем для Бургера класс "active"
		menuBody.classList.toggle('_active'); // Добавляем для Меню класс "avtive"
	});
}

// // Прокрутка по клику

/* Использование:
Ссылке, при клике на которую хотим перемещаться указываем
атрибут [data-goto], в качестве значения используем
класс объекта, на который хотим перемещаться:

data-goto=".about"

*/

const menuLinks = document.querySelectorAll('.menu-header__link[data-goto]'); // Получаем все объекты с классом "menu-header__link", имеющие атрибут "data-goto"
if (menuLinks.length > 0) { // Если таковые имеются:
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener('click', onMenuLinkClick); // При клике на любой из этих объектов выполнить функцию "onMenuLinkClick"
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target; // Получаем объект на который был совершен клик
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) { // Проверяем заполнен ли дата атрибут "data-goto" && Проверяем, существует ли объект, на который ссылается этот артибут
			const gotoBlock = document.querySelector(menuLink.dataset.goto); // Получаем объект, на который ссылается атрибут "data-goto"
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset; // Высчитываем положение этого объекта

			if (iconMenu.classList.contains('_active')) { // Если Бургер содержит класс "active"
				document.body.classList.remove('_lock'); // Удаляем класс "active"
				iconMenu.classList.remove('_active'); // Удаляем класс "active"
				menuBody.classList.remove('_active'); // Удаляем класс "active"
			}

			window.scrollTo({ // Скролл к - "top", как? - "smooth (плавно)"
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault(); // Выключает перезагрузки странцы при клике на ссылку
		}
	}
}

// </Бурегр Меню>=============================================================================

//<custom video controls>====================================================================
const video = document.querySelector('.first .first__video');
const playBtn = document.querySelector('.first .controls__play');
const progress = document.querySelector('.first .controls__progress input');
const time = document.querySelector('.first .controls__timer');


// Метаданные
function videoMetaData() {
	let minutesLeft = Math.floor((video.duration - Math.floor(video.currentTime)) / 60);
	if (minutesLeft < 10) {
		minutesLeft = '0' + String(minutesLeft);
	}

	// Seconds
	let secondsLeft = Math.floor((video.duration - Math.floor(video.currentTime)) % 60);
	if (secondsLeft < 10) {
		secondsLeft = '0' + String(secondsLeft);
	}

	time.innerHTML = `00:00-${minutesLeft}:${secondsLeft}`;
}

// Play / Pause
function playVideo() {
	if (video.paused) {
		video.play();
		playBtn.classList.add('_pause')
	} else {
		video.pause();
		playBtn.classList.remove('_pause')
	}
}
// Timer
function updateProgress() {
	progress.value = (video.currentTime / video.duration) * 100;
	progress.classList.add('_thumb');

	if (time.classList.contains('_hover')) {
		// Сколько прошлом
		// Minutes
		let minutes = Math.floor(video.currentTime / 60);
		if (minutes < 10) {
			minutes = '0' + String(minutes);
		}

		// Seconds
		let seconds = Math.floor(video.currentTime % 60);
		if (seconds < 10) {
			seconds = '0' + String(seconds);
		}

		// Сколько осталось
		// Minutes
		let minutesLeft = Math.floor((video.duration - Math.floor(video.currentTime)) / 60);
		if (minutesLeft < 10) {
			minutesLeft = '0' + String(minutesLeft);
		}

		// Seconds
		let secondsLeft = Math.floor((video.duration - Math.floor(video.currentTime)) % 60);
		if (secondsLeft < 10) {
			secondsLeft = '0' + String(secondsLeft);
		}

		// Вывод
		time.innerHTML = `${minutes}:${seconds}-${minutesLeft}:${secondsLeft}`;
	} else {
		// Сколько прошлом
		// Minutes
		let minutes = Math.floor(video.currentTime / 60);
		if (minutes < 10) {
			minutes = '0' + String(minutes);
		}

		// Seconds
		let seconds = Math.floor(video.currentTime % 60);
		if (seconds < 10) {
			seconds = '0' + String(seconds);
		}

		// Общее время видео
		// Minutes
		let minutesLeft = Math.floor(video.duration / 60);
		if (minutesLeft < 10) {
			minutesLeft = '0' + String(minutesLeft);
		}

		// Seconds
		let secondsLeft = Math.floor((video.duration % 60));
		if (secondsLeft < 10) {
			secondsLeft = '0' + String(secondsLeft);
		}

		// Вывод
		time.innerHTML = `${minutes}:${seconds}-${minutesLeft}:${secondsLeft}`;
	}

	const min = progress.min;
	const max = progress.max;
	const val = progress.value;

	progress.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}
// Progress Bar
function setProgress() {
	video.currentTime = (progress.value * video.duration) / 100;
}
// hoverOver
function hoverOver() {
	time.classList.add('_hover');
}
// hoverOut
function hoverOut() {
	time.classList.remove('_hover');
}

video.addEventListener('loadedmetadata', videoMetaData);
playBtn.addEventListener('click', playVideo);
video.addEventListener('timeupdate', updateProgress);
progress.addEventListener('input', setProgress);
time.addEventListener('mouseover', hoverOver);
time.addEventListener('mouseout', hoverOut);
//</custom video controls>===================================================================

//<custom audio controls>====================================================================
const audio = document.querySelector('.traks .traks__audio');
const audioPlayBtn = document.querySelector('.traks .controls__play');
const audioProgress = document.querySelector('.traks .controls__progress input');
const audioTime = document.querySelector('.traks .controls__timer');
const audioLinks = document.querySelectorAll('.traks .traks__trak');

let songIndex = 0;

audio.src = `audio/${audioLinks[0].innerText}.weba`;


audioLinks.forEach(element => {
	element.addEventListener('click', function () {
		if (!this.classList.contains('_active')) {
			audio.src = `audio/${this.innerText}.weba`;
			audioLinks.forEach(element => {
				element.classList.remove('_active');
			});
			this.classList.add('_active');
			playAudio();
		}
	});
});


// Метаданные
function audioMetaData() {
	let minutesLeft = Math.floor((audio.duration - Math.floor(audio.currentTime)) / 60);
	if (minutesLeft < 10) {
		minutesLeft = '0' + String(minutesLeft);
	}

	// Seconds
	let secondsLeft = Math.floor((audio.duration - Math.floor(audio.currentTime)) % 60);
	if (secondsLeft < 10) {
		secondsLeft = '0' + String(secondsLeft);
	}

	audioTime.innerHTML = `00:00-${minutesLeft}:${secondsLeft}`;
}

// Play / Pause
function playAudio() {
	if (audio.paused) {
		audio.play();
		audioPlayBtn.classList.add('_pause')
	} else {
		audio.pause();
		audioPlayBtn.classList.remove('_pause')
	}
}

function timerAudio() {
	audioProgress.value = (audio.currentTime / audio.duration) * 100;
	audioProgress.classList.add('_thumb');

	if (audioTime.classList.contains('_hover')) {
		// Сколько прошлом
		// Minutes
		let minutes = Math.floor(audio.currentTime / 60);
		if (minutes < 10) {
			minutes = '0' + String(minutes);
		}

		// Seconds
		let seconds = Math.floor(audio.currentTime % 60);
		if (seconds < 10) {
			seconds = '0' + String(seconds);
		}

		// Сколько осталось
		// Minutes
		let minutesLeft = Math.floor((audio.duration - Math.floor(audio.currentTime)) / 60);
		if (minutesLeft < 10) {
			minutesLeft = '0' + String(minutesLeft);
		}

		// Seconds
		let secondsLeft = Math.floor((audio.duration - Math.floor(audio.currentTime)) % 60);
		if (secondsLeft < 10) {
			secondsLeft = '0' + String(secondsLeft);
		}

		// Вывод
		audioTime.innerHTML = `${minutes}:${seconds}-${minutesLeft}:${secondsLeft}`;
	} else {
		// Сколько прошлом
		// Minutes
		let minutes = Math.floor(audio.currentTime / 60);
		if (minutes < 10) {
			minutes = '0' + String(minutes);
		}

		// Seconds
		let seconds = Math.floor(audio.currentTime % 60);
		if (seconds < 10) {
			seconds = '0' + String(seconds);
		}

		// Общее время видео
		// Minutes
		let minutesLeft = Math.floor(audio.duration / 60);
		if (minutesLeft < 10) {
			minutesLeft = '0' + String(minutesLeft);
		}

		// Seconds
		let secondsLeft = Math.floor((audio.duration % 60));
		if (secondsLeft < 10) {
			secondsLeft = '0' + String(secondsLeft);
		}

		// Вывод
		audioTime.innerHTML = `${minutes}:${seconds}-${minutesLeft}:${secondsLeft}`;
	}

	const min = audioProgress.min;
	const max = audioProgress.max;
	const val = audioProgress.value;

	audioProgress.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}
// Progress Bar
function audioSetProgress() {
	audio.currentTime = (audioProgress.value * audio.duration) / 100;
}
// hoverOver
function audioHoverOver() {
	audioTime.classList.add('_hover');
}
// hoverOut
function audioHoverOut() {
	audioTime.classList.remove('_hover');
}

audio.addEventListener('loadedmetadata', audioMetaData);
audioPlayBtn.addEventListener('click', playAudio);
window.onload = function () {
	audio.addEventListener('timeupdate', timerAudio);
}
audioProgress.addEventListener('input', audioSetProgress);
audioTime.addEventListener('mouseover', audioHoverOver);
audioTime.addEventListener('mouseout', audioHoverOut);


//</custom audio controls>===================================================================

//<slider>===================================================================================

// tips-slider
if (document.querySelector('.slider__body')) {
	new Swiper('.slider__body', {
		observer: true,
		observeParenst: true,
		slidesPerView: 3,
		slideToClickedSlide: false,
		spaceBetween: 30,
		watchOverflow: true,
		speed: 800,
		loop: true,
		// Dots
		pagination: false,
		navigation: {
			nextEl: '.slider__arrow_next',
			prevEl: '.slider__arrow_prev',
		},

		// Адаптив Breakpoints ---------------------------
		breakpoints: {
			0: {
				slidesPerView: 1.1,
				spaceBetween: 15,
			},
			480: {
				slidesPerView: 'auto',
				navigation: false,
			},
			767.98: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			991.98: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
		},
	});
}

//</slider>==================================================================================
