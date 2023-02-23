const URL = "https://digi27.azurewebsites.net/api/healthies";
var email;
var PIDc = [];
var check_parameter = [];

function check()
{
    email = sessionStorage.getItem('email');
    axios.get(URL + "/SearchByEmail/tr6r20@gmail,com").then((response) =>{
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
        alert(sessionStorage.getItem('UID'));
    });

    setTimeout(() => {
        GetParameter();
      }, 2000);

}
function GetParameter()
{
    axios.get(URL + "/SearchByUIDOwner/"+sessionStorage.getItem('UID')).then((response) =>{
        var healthies = response.data;
        var i =0;
        for(var human of healthies )
        {
            PIDc[i] =  human.PID;
            i++;
        }
        
    });

    setTimeout(() => {
        alert(PIDc.length);
        for(var j = (PIDc.length - 1);j >= 0 ;j--)
        {
            alert("tru")
            alert(PIDc[j]);
            check_parameter.length = 0;
        
            var bien = []; 
            axios.get(URL + "/SearchByPIDProduct/"+PIDc[j]).then((response) =>{
                var healthies = response.data;

                for(var human of healthies )
                {
                    // if(human.Is_read_file === "y")
                    // {
                    //     //get file về đọc
                    // }
                    // if(human.Is_read_file === "n")
                    // {
                    //    //đọc trực tiếp 
                        if(human.Acceleration === "Y")
                        {
                            check_parameter.push("Acceleration");
                        }
                        if(human.Speed === "Y")
                        {
                            check_parameter.push("Speed");
                        }
                        if(human.Temperature === "Y")
                        {
                            check_parameter.push("Temperature");
                        }
                        if(human.Humidity === "Y")
                        {
                            check_parameter.push("Humidity");
                        }
                        if(human.Pressure === "Y")
                        {
                            check_parameter.push("Pressure");
                        }
                        if(human.Speed_Of_Winds === "Y")
                        {
                            check_parameter.push("Speed_Of_Winds");
                        }
                        if(human.Wind_Direction === "Y")
                        {
                            check_parameter.push("Wind_Direction");
                        }
                        alert(check_parameter);

                        setTimeout(() => {
                            alert("check");
                            alert(PIDc[j]);
                            axios.get(URL + "/SearchByPIDParameter/"+PIDc[j+1]).then((response) =>{
                                var healthies = response.data;
                                for(var human of healthies )
                                {
                                    for(var i = 0;i <= check_parameter.length;i++)
                                    {
                                        if(check_parameter[i] === "Acceleration")
                                        {
                                            bien.push(human.Acceleration);
                                        }
                                        if(check_parameter[i] === "Speed")
                                        {
                                            bien.push(human.Speed);
                                        }
                                        if(check_parameter[i] === "Temperature")
                                        {
                                            bien.push(human.Temperature);
                                        }
                                        if(check_parameter[i] === "Humidity")
                                        {
                                            bien.push(human.Humidity);
                                        }
                                        if(check_parameter[i] === "Pressure")
                                        {
                                            bien.push(human.Pressure);
                                        }
                                        if(check_parameter[i] === "Speed_Of_Winds")
                                        {
                                            bien.push(human.Speed_Of_Winds);
                                        }
                                        if(check_parameter[i] === "Wind_Direction")
                                        {
                                            bien.push(human.Wind_Direction);
                                        }
                                    }
                                }
                                alert(bien);
                            });
                          }, 1500);
                    // }
                }
            });
        }
      }, 1500);
}

//  setInterval(GetParameter, 10000);