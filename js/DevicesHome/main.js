const URL = "https://digi27.azurewebsites.net/api/healthies";
var email;
var PIDc = [];
var parameter = [];
function check()
{
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
                PIDc[i] =  human.PID;
                i++;
            }
        });

        setTimeout(() => {
            for(var j = (PIDc.length - 1);j >= 0 ;j--)
            {
                var count = 0;
                var parameter = [];   
                
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
                            if(human.Acceleration != "")
                            {
                                parameter.push("Acceleration");
                            }
                            if(human.Speed != "")
                            {
                                parameter.push("Speed");
                            }
                            if(human.Temperature != "")
                            {
                                parameter.push("Temperature");
                            }
                            if(human.Humidity != "")
                            {
                                parameter.push("Humidity");
                            }
                            if(human.Pressure != "")
                            {
                                parameter.push("Pressure");
                            }
                            if(human.Speed_Of_Winds != "")
                            {
                                parameter.push("Speed_Of_Winds");
                            }
                            if(human.Wind_Direction != "")
                            {
                                parameter.push("Wind_Direction");
                            }
                            for(var i = 0;i <= parameter.length;i++)
                            {
                                if(parameter[i] === "Acceleration")
                                {
                                    alert(human.Acceleration);
                                }
                                if(parameter[i] === "Speed")
                                {
                                    alert(human.Speed);
                                }
                                if(parameter[i] === "Temperature")
                                {
                                    alert(human.Temperature);
                                }
                                if(parameter[i] === "Humidity")
                                {
                                    alert(human.Humidity);
                                }
                                if(parameter[i] === "Pressure")
                                {
                                    alert(human.Pressure);
                                }
                                if(parameter[i] === "Speed_Of_Winds")
                                {
                                    alert(human.Speed_Of_Winds);
                                }
                                if(parameter[i] === "Wind_Direction")
                                {
                                    alert(human.Wind_Direction);
                                }
                            }
                            
                            
                        // }
                    }
                });
            }
          }, 1000);

      }, 2000);

}