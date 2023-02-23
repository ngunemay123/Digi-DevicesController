const URL = "https://digi27.azurewebsites.net/api/healthies";
var replace_email;
function btnSignIn_Click()
{
    
    searchByEmail();
}
function searchByEmail() {
    replace_email = document.getElementById("txtSignInEmail").value.replace(/\./g,',');
    axios.get(URL + "/SearchByEmail/"+replace_email).then((response) =>{
        var healthies = response.data;

        for(var human of healthies )
        {
            if(human.Email === replace_email)
            {
                if(human.Pass === document.getElementById("txtSignInPassword").value)
                {
                    localStorage.clear();
                    clear();
                    sessionStorage.setItem('email', replace_email);
                    window.location.href = "../html/devicesHome.html ";
                }
                else
                {
                    document.getElementById("txtSignInNote").innerHTML = "*Wrong email or password";
                }
            }
            else
            {
                document.getElementById("txtSignInNote").innerHTML = "*Wrong email or password";
            }
        }
    });
}
function clear()
{
    document.getElementById("txtSignInEmail").value = "";
    document.getElementById("txtSignInPassword").value = "";
}