const URL = "https://digi27.azurewebsites.net/api/healthies";

var searchByEmail;
var validate,checkEmail;
function btnForgotPassword()
{
    searchByEmail();    
    checkValidate();
    setTimeout(() => {
    
        if(validate)
        {
            document.getElementById("txtForgotPasswordNote").innerHTML = "";
            alert("thành cong ");
        }
    }
          , 1500);
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
    replace_email = document.getElementById("txtForgotPasswordEmail").value.replace(/\./g,',');
    var check = false;
    axios.get(URL + "/SearchByEmail/"+replace_email).then((response) =>{
        var healthies = response.data;
        for(var human of healthies )
        {
            if(human.Email != "")
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
      }, 1500);
}