const pixelTag = document.querySelector("div.pixels");
const progressTag = document.querySelector("div.progress");
const sections = document.querySelectorAll("section");
const clientTag = document.querySelector("div.client");
const pageTag = document.querySelector("div.page");
const headerTag = document.querySelector("header");

document.addEventListener("scroll", () => {
	const pixels = window.scrollY;
	const maxPixels =
		document.body.getBoundingClientRect().height - window.innerHeight;

	pixelTag.textContent = pixels;
	progressTag.style.width = (pixels / maxPixels) * 100 + "%";

	const topViewport = window.scrollY;
	const midViewport = topViewport + window.innerHeight / 2;

	sections.forEach((section) => {
		if (section.offsetTop - 100 <= pixels) {
			clientTag.textContent = section.getAttribute("data-client");
			pageTag.textContent = section.getAttribute("data-page");

			if (section.getAttribute("data-dark") === "true") {
				headerTag.classList.add("white");
				progressTag.classList.add("white");
			} else {
				headerTag.classList.remove("white");
				progressTag.classList.remove("white");
			}
		}

		const topSection = section.offsetTop;
		const midSection = topSection + section.offsetHeight / 2;

		const distanceToSection = midViewport - midSection;

		const parallaxTags = section.querySelectorAll("[data-parallax]");
		parallaxTags.forEach((tag) => {
			const speed = parseFloat(tag.getAttribute("data-parallax"));
			tag.style.transform = `translate(0, ${distanceToSection * speed}px)`;
		});
	});
});
