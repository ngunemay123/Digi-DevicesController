const URL = "https://digi27.azurewebsites.net/api/healthies";
var validate;

function resetpassword()
{
    validatereset();
    if(validate)
    {
        alert(localStorage.getItem('forgotemail'));
    }

}
function validatereset()
{
    var validate_pasword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if(document.getElementById("txtResetPassword").value == "")
    {
        document.getElementById("txtNote").innerHTML = "*Please enter your password";
        validate =  false;
    }
    else if(!validate_pasword.test(document.getElementById("txtResetPassword").value))
    {
        document.getElementById("txtNote").innerHTML = "*Please enter the correct password format";
        validate =  false;
    }
    else if(document.getElementById("txtResetConfirmPassword").value == "")
    {
        document.getElementById("txtNote").innerHTML = "*Please enter confirm password";
        validate =  false;
    }
    
    else if(document.getElementById("txtResetConfirmPassword").value != document.getElementById("txtResetConfirm").value)
    {
        document.getElementById("txtNote").innerHTML = "*The confirm password is not valid";
        validate =  false;
    }
}