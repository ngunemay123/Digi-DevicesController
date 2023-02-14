var captcha;
function generate() {

	// Clear old input
	document.getElementById("CaptchaEnter").value = "";
	document.getElementById("CaptchaEnter").style.marginLeft = "20px";

	// Access the element to store
	// the generated captcha
	captcha = document.getElementById("CaptchaEnter");
	var uniquechar = "";

	const randomchar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	// Generate captcha for length of
	// 5 with random character
	for (let i = 1; i < 5; i++) {
		uniquechar += randomchar.charAt(
			Math.random() * randomchar.length)
	}

	// Store generated input
	captcha.innerHTML = uniquechar;
}

