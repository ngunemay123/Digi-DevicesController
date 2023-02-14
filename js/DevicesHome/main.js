const URL = "https://digi27.azurewebsites.net/api/healthies";
var email;
var PID = [];
function check()
{
    alert("cuong");
    email = sessionStorage.getItem('email');
    axios.get(URL + "/SearchByEmail/"+email).then((response) =>{
        var healthies = response.data;

        for(var human of healthies )
        {
            sessionStorage.setItem('UID', human.UID);
            sessionStorage.setItem('Nation', human.Nation);
            sessionStorage.setItem('Language', human.Language);
            sessionStorage.setItem('Hour_nose', human.Hour_nose);
            sessionStorage.setItem('UID_Main_Account', human.UID_Main_Account);
            sessionStorage.setItem('Is_Beneficiary_Account', human.Is_Beneficiary_Account);
            sessionStorage.setItem('Status', human.Status);
            sessionStorage.setItem('Purchase_Date', human.Purchase_Date);
            sessionStorage.setItem('Date', human.Date);
        }
    });

    setTimeout(() => {
        axios.get(URL + "/SearchByUIDOwner/"+sessionStorage.getItem('UID')).then((response) =>{
            var healthies = response.data;
            var i =0;
            for(var human of healthies )
            {
                PID[i] =  human.PID;           
            }
        });

        setTimeout(() => {
            for(var j = 0;j > PID.length;j++)
            {
                axios.get(URL + "/SearchByPIDProduct/"+PID[i]).then((response) =>{
                    var healthies = response.data;
                    var p = 0;
                    for(var human of healthies )
                    {
                                   
                    }
                });
            }
          }, 1000);

      }, 800);

}