const URL = "https://digi27.azurewebsites.net/api/healthies";
var replace_email1;
var searchByEmail;
var validate,checkEmail;
const serviceID = "service_llvpnwi";
const templateID = "template_njqzjob";

function sendEmail()
{
    var params = {
        name : "DigiTechnology",
        email: document.getElementById("txtForgotPasswordEmail").value,
        message : "https://digi-devices-controller.netlify.app/html/reset-password.html",
    }
    emailjs.send(serviceID,templateID,params).then((res) =>{
    }) 
    .catch((err) => console.log(err));
}
function btnForgotPassword()
{
    searchByEmail();    
    setTimeout(() => {
        checkValidate();
        if(validate)
        {
            
            document.getElementById("txtForgotPasswordNote").innerHTML = "";
            sendEmail();
            localStorage.setItem('forgotemail',replace_email1);
            setTimeout(() => {
                window.location="forgotPasswordMess.html";
            }
                  , 1000);
        }
    }
          , 800);
}
function checkValidate()
{
    var emailID = document.getElementById("txtForgotPasswordEmail").value;
        atpos = emailID.indexOf("@");
         dotpos = emailID.lastIndexOf(".");
    if(document.getElementById("txtForgotPasswordEmail").value == "")
    {
        document.getElementById("txtForgotPasswordNote").innerHTML = "*Please enter your email";
        validate =  false;
    }
    else if (atpos < 1 || ( dotpos - atpos < 2 )) {
        document.getElementById("txtForgotPasswordNote").innerHTML = "*Please enter the correct email format";
        validate =  false;
    }
    else if(checkEmail)
    {  
        document.getElementById("txtForgotPasswordNote").innerHTML = "*The email isn't exit";
        validate =  false;
    }
    else
    {
        validate =  true;
    }
}
function searchByEmail() {
    replace_email1 = document.getElementById("txtForgotPasswordEmail").value.replace(/\./g,',');
    var check = false;
    axios.get(URL + "/SearchByEmail/"+replace_email1).then((response) =>{
        var healthies = response.data;
        for(var human of healthies )
        {
            if(human.Email != replace_email1)
            {
                check = true;
            }
        }
    });
    setTimeout(() => {
        if (check)
    {
        checkEmail = true;
    }
    else checkEmail =  false;
      }, 1000);
}