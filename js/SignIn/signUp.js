const URL = "https://digi27.azurewebsites.net/api/healthies";

var replace_email;
var count;
var count_otp = 0;
var Otp;
var validate,checkEmail;
var Hour;
var OTP;
const serviceID = "service_llvpnwi";
const templateID = "template_njqzjob";

function clickEvent(first,last){
    if(first.value.length){
      document.getElementById(last).focus();
    }
    
    if(document.getElementById("ist").value != "" 
    && document.getElementById("sec").value != ""
    && document.getElementById("third").value != ""
    && document.getElementById("fourth").value != ""
    && document.getElementById("fifth").value != ""
    && document.getElementById("sixth").value != "")
    {
        btnOTPSubmit();
    }
  }
function btnOTPSubmit()
{
    var date = new Date();
    var month =date.getFullYear()+ "-" +(date.getMonth()+1) +"-" +(date.getDate());
    var time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    var UID = generateUUID();
    Hour_nose();
    Otp = document.getElementById("ist").value
    +document.getElementById("sec").value
    +document.getElementById("third").value
    +document.getElementById("fourth").value
    +document.getElementById("fifth").value
    +document.getElementById("sixth").value;
    if (Otp === real_email)
    {
        var newHuman = {
            UID: UID,
            Email: replace_email,
            Nation: document.getElementById("optNation").value,
            Language:document.getElementById("optLanguage").value,
            Hour_nose: Hour,
            Pass: document.getElementById("txtPassword").value,
            UID_Main_Account: null,
            Is_Beneficiary_Account: "n",
            Status: "chua kich hoat",
            Purchase_Date: null,
            Date:  month +" "+time,
            Users: [],
            User1: null
        }
          addNew(newHuman);
    }
    else
    {
        alert("sai otp");
    }
}
function sendEmail()
{
    RandomOTP();
    var params = {
        name : "DigiTechnology",
        email: document.getElementById("txtEmail").value,
        message : real_email,
    }
    emailjs.send(serviceID,templateID,params).then((res) =>{
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
	real_email = uniquechar;
}
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxyxxx-4xxx-yxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}   
function printmsg()
{
    
    searchByEmail();    
    checkValidate();
    setTimeout(() => {
    
    if(validate)
    { 
        sendEmail();
        document.getElementById("cuong").style.display = "none";
        document.getElementById("cuong1").style.display = "block";
    }
}
      , 1500);
};
function Hour_nose()
{
    if(document.getElementById("optNation").value === "Vietnam")
    {
        Hour = "7";
    }
    else if(document.getElementById("optNation").value === "Singapore")
    {
        Hour = "8";
    }else if(document.getElementById("optNation").value === "Korea")
    {
        Hour = "9";
    }else if(document.getElementById("optNation").value === "Hong Kong")
    {
        Hour = "8";
    }
    else if(document.getElementById("optNation").value === "Thailand")
    {
        Hour = "7";
    }
}
function checkValidate() {
    var emailID = document.getElementById("txtEmail").value;
        atpos = emailID.indexOf("@");
         dotpos = emailID.lastIndexOf(".");
        var validate_pasword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
         const usr_input = document.getElementById("captcha-form").value;
    setTimeout(() => {

        if(document.getElementById("txtEmail").value == "")
    {
        document.getElementById("txtNote").innerHTML = "*Please enter your email";
        validate =  false;
    }
    else if (atpos < 1 || ( dotpos - atpos < 2 )) {
        document.getElementById("txtNote").innerHTML = "*Please enter the correct email format";
        validate =  false;
     }
     else if(checkEmail)
     {  
        document.getElementById("txtNote").innerHTML = "*The email is already in use";
        validate =  false;
     }
    else if(document.getElementById("txtPassword").value == "")
    {
        document.getElementById("txtNote").innerHTML = "*Please enter your password";
        validate =  false;
    }
    else if(!validate_pasword.test(document.getElementById("txtPassword").value))
    {
        document.getElementById("txtNote").innerHTML = "*Please enter the correct password format";
        validate =  false;
    }
    else if(document.getElementById("txtConfirmPassword").value == "")
    {
        document.getElementById("txtNote").innerHTML = "*Please enter confirm password";
        validate =  false;
    }
    
    else if(document.getElementById("txtPassword").value != document.getElementById("txtConfirmPassword").value)
    {
        document.getElementById("txtNote").innerHTML = "*The confirm password is not valid";
        validate =  false;
    }
    else if(usr_input != captcha.innerHTML)
    {
        validate =  false;
        document.getElementById("txtNote").innerHTML = "*The captcha is not valid";
        generate();
        document.getElementById("captcha-form").value = '';
    }
    else
    {
        validate = true;
    }
      }, 1500);
    
}
function addNew(newHuman) {
    axios.post(URL , newHuman).then((response) =>{
        var result = response.data;
        if(result){
            window.location.href = "../index.html ";
        }else
        {
            alert('Error! An error occurred. Please try again later');
        }   
    });
}
function clearTextboxes()
{
    document.getElementById("txtEmail").value = '';
    document.getElementById("txtPassword").value = '';
    document.getElementById("txtConfirmPassword").value = '';
    document.getElementById("captcha-form").value = '';
    document.getElementById("txtNote").innerHTML = "";
}
function searchByEmail() {
    replace_email = document.getElementById("txtEmail").value.replace(/\./g,',');
    count = 0;
    axios.get(URL + "/SearchByEmail/"+replace_email).then((response) =>{
        var healthies = response.data;
        for(var human of healthies )
        {
            if(human.Email === replace_email)
            {
                count = count + 1;
            }
        }
    });
    setTimeout(() => {
        if (count >= 1)
    {
        checkEmail = true;
    }
    else checkEmail =  false;
      }, 1500);
}
