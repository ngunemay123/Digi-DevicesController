
function page_Load()
{
    sendEmail();
}
function sendEmail()
{
    var test = RandomOTP();
    var params = {
        name : "DigiTechnology",
        email: document.getElementById("txtEmail").value,
        message : test,
    }
    emailjs.send(serviceID,templateID,params).then((res) =>{
        real_email = test;
    }) 
    .catch((err) => console.log(err));
}

function RandomOTP() {

	var uniquechar = "";
	const randomchar = "0123456789";
	for (let i = 1; i < 7; i++) {
		uniquechar += randomchar.charAt(
			Math.random() * randomchar.length)
	}
    
	return uniquechar;
}
