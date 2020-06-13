window.addEventListener("DOMContentLoaded", () => {
	"use strict";

	//show page up button with scroll page

	const pageUpBtn = document.querySelector("#pageUp");

	function showElementWithScroll(el) {
		let x = document.documentElement.scrollTop;
		if (x > 500) {
			el.classList.add("show");
		} else {
			el.classList.remove("show");
		}
	}

	window.addEventListener("scroll", () => {
		showElementWithScroll(pageUpBtn);
	});

	// Timer

	const deadline = "2021-02-15";

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date());

		const seconds = Math.floor((t / 1000) % 60);
		const minutes = Math.floor((t / 1000 / 60) % 60);
		const hours = Math.floor((t / 1000 / 60 / 60) % 24);
		const days = Math.floor(t / 1000 / 60 / 60 / 24);

		return {
			total: t,
			days,
			hours,
			minutes,
			seconds,
		};
	}

	function showNumWithZero(num) {
		if (num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(endtime) {
		const days = document.querySelector("#days");
		const hours = document.querySelector("#hours");
		const minutes = document.querySelector("#minutes");
		const seconds = document.querySelector("#seconds");

		const timerId = setInterval(updateClock, 1000);

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.textContent = showNumWithZero(t.days);
			hours.textContent = showNumWithZero(t.hours);
			minutes.textContent = showNumWithZero(t.minutes);
			seconds.textContent = showNumWithZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timerId);
				days.textContent = "00";
				hours.textContent = "00";
				minutes.textContent = "00";
				seconds.textContent = "00";
			}
		}
	}

	setClock(deadline);

	// Modal

	const modal = document.querySelector(".modal");
	const closeBtn = document.querySelector("#close");
	const modalBtns = document.querySelectorAll("[data-modal]");
	const forms = document.querySelectorAll("form");

	console.log(forms);

	function openModal() {
		modal.style.display = "block";
		document.body.style.overflow = "hidden";
	}

	function closeModal() {
		modal.style.display = "none";
		document.body.style.overflow = "";
		forms.forEach((form) => {
			form.reset();
		});
	}

	modalBtns.forEach((btn) => {
		btn.addEventListener("click", openModal);
	});

	closeBtn.addEventListener("click", closeModal);

	modal.addEventListener("click", (e) => {
		if (e.target.classList.contains("modal")) {
			closeModal();
		}
	});

	//Tabs

	const tabWrap = document.querySelector(".tabs");
	const tabs = document.querySelectorAll(".tab");
	const tabContent = document.querySelectorAll(".tabContent");

	function hideTabContent() {
		tabContent.forEach((item) => {
			item.style.display = "none";
		});

		tabs.forEach((tab) => {
			tab.classList.remove("active");
		});
	}

	function showTabContent(a = 0) {
		tabContent[a].style.display = "flex";
		tabs[a].classList.add("active");
	}

	hideTabContent();
	showTabContent();

	// при ширине 575px - табы убираются, добавляется другой блок

	tabWrap.addEventListener("click", (e) => {
		if (e.target.classList.contains("tab")) {
			for (let i = 0; i < tabs.length; i++) {
				if (tabs[i] == e.target) {
					hideTabContent();
					showTabContent(i);
				}
			}
		}
	});

	// Slider

	const nextBtn = document.querySelector(".carousel__next");
	const prevBtn = document.querySelector(".carousel__prev");
	const sliderContent = document.querySelectorAll(".carousel__item");
	let sliderIndex = 1;

	function showSlides(n) {
		if (n > sliderContent.length) {
			sliderIndex = 1;
		}
		if (n < 1) {
			sliderIndex = sliderContent.length;
		}

		sliderContent.forEach((item) => (item.style.display = "none"));
		sliderContent[sliderIndex - 1].style.display = "block";
	}
	function plusSlide(n) {
		showSlides((sliderIndex += n));
	}

	showSlides(sliderIndex);
	nextBtn.addEventListener("click", () => {
		plusSlide(1);
	});
	prevBtn.addEventListener("click", (e) => {
		plusSlide(-1);
	});

	//hamburger menu 767px

	const hamburger = document.querySelector(".hamburger");
	const navMenu = document.querySelector(".nav__list");
	const navMenuItem = document.querySelectorAll(".nav__item");

	hamburger.addEventListener("click", () => {
		hamburger.classList.toggle("hamburger_active");
		navMenu.classList.toggle("nav__list_active");
	});

	navMenuItem.forEach((item) => {
		item.addEventListener("click", () => {
			hamburger.classList.toggle("hamburger_active");
			navMenu.classList.toggle("nav__list_active");
		});
	});
});
