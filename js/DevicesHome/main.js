const URL = "https://digi27.azurewebsites.net/api/healthies";
var email;
var PIDc = [];
var check_parameter = [" "," "," "," "," "," "," "];
var bien = [" "," "," "," "," "," "," "];
var cot2 = [];
var count;
var bar = ["ID","Device","Location","Date","Time","Parameter","Details"];
async function check()
{		                        
    email = sessionStorage.getItem('email');
    await axios.get(URL + "/SearchByEmail/"+email).then((response) =>{
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
    GetParameter();
    // setTimeout(() => {
    //     GetParameter();
    //   }, 1);

}
async function GetParameter()
{
    await axios.get(URL + "/SearchByUIDOwner/"+sessionStorage.getItem('UID')).then((response) =>{
        var healthies = response.data;
        var i =0;
        count = 0;
        for(var human of healthies )
        {
            PIDc[i] =  human.PID;
            i++;
        }
    });
    // setTimeout(async () => {
        for(var j = (PIDc.length - 1);j >= 0 ;)
        {
            check_parameter.length = 0;
            bien.length = 0;
            cot2.length = 0;
            check_parameter = [" "," "," "," "," "," "," "];
            bien = [" "," "," "," "," "," "," "];
            j  = j -1 ;
            await axios.get(URL + "/SearchByPIDProduct/"+PIDc[j+1]).then(async (response) =>{
                var healthies = response.data;   
                for(var human of healthies )
                {
                    if(human.Is_read_file === "Y")
                    {
                        if(PIDc[j+1] === human.PID )
                        {
                            
                            break;
                        }
                    }
                    else if(human.Is_read_file === "N")
                    {
                    //    //đọc trực tiếp       
                            if(PIDc[j+1] === human.PID)
                            {
                                
                                // alert(PIDc[j+1] + human.PID + "N");
                                if(human.Acceleration === "Y")
                                {
                                    check_parameter.unshift("Acceleration");
                                }
                                if(human.Speed === "Y")
                                {
                                    check_parameter.unshift("Speed");
                                }
                                if(human.Temperature === "Y")
                                {
                                    check_parameter.unshift("Temperature");
                                }
                                if(human.Humidity === "Y")
                                {
                                    check_parameter.unshift("Humidity");
                                }
                                if(human.Pressure === "Y")
                                {
                                    check_parameter.unshift("Pressure");
                                }
                                if(human.Speed_Of_Winds === "Y")
                                {
                                    check_parameter.unshift("Speed_Of_Winds");
                                }
                                if(human.Wind_Direction === "Y")
                                {
                                    check_parameter.unshift("Wind_Direction");
                                }
                                
                                await axios.get(URL + "/SearchByPIDParameterDR/"+PIDc[j+1]).then((response) =>{
                                var healthies = response.data;
                                for(var human1 of healthies )
                                {
                                    
                                    if(PIDc[j+1] === human1.PID)
                                    {
                                        var date = new Date();
                                        let slip_Current_Time = human1.Current_Time.split(" ");
                                        // let slip_Current_Time_date = slip_Current_Time[0].split("/");
                                        // let slip_Current_Time_time = slip_Current_Time[1].split(":");
                                        
                                        cot2.push(human.PID);
                                        cot2.push(human.PName);
                                        cot2.push("HCM");
                                        cot2.push(slip_Current_Time[0]);
                                        cot2.push(slip_Current_Time[1]+" "+slip_Current_Time[2]);
                                        
                                        // if(slip_Current_Time_date[0] === "6" 
                                        //     && slip_Current_Time_date[1] === "12"
                                        //     && slip_Current_Time_date[2] === "2015" ) 
                                        // {
                                            for(var i = 0;i < check_parameter.length;i++)
                                            {
                                                if(check_parameter[i] === "Wind_Direction")
                                                {
                                                    bien.unshift(human1.Wind_Direction);
                                                }
                                                else if(check_parameter[i] === "Speed_Of_Winds")
                                                {
                                                    bien.unshift(human1.Speed_Of_Winds);
                                                }
                                                else if(check_parameter[i] === "Pressure")
                                                {
                                                    bien.unshift(human1.Pressure);
                                                }
                                                else if(check_parameter[i] === "Humidity")
                                                {
                                                    bien.unshift(human1.Humidity + "°F");
                                                }
                                                else if(check_parameter[i] === "Temperature")
                                                {
                                                    bien.unshift(human1.Temperature + "°C");
                                                }
                                                else if(check_parameter[i] === "Speed")
                                                {
                                                    bien.unshift(human1.Speed+"m/s");
                                                }
                                                else if(check_parameter[i] === "Acceleration")
                                                {
                                                    bien.unshift(human1.Acceleration);
                                                }  
                                            }
                                            cot2.push(bien[0]);
                                            cot2.push("nut");
                                            break;
                                        // }
                                    }
                                }
                            });
                        }
                    }
                    //code here
                    MakeTable();
                }
            })
        }
}
function MakeTable()
{
    bar.push(check_parameter[0]);
    bar.push("Detail");
    
    var container = document.getElementById("cuong");
    var countRow = 4;
    var countColumn = 7;
    var tagTable = document.createElement("table");
    tagTable.style.border = 1;
    // tagTable.style.width = "200px";
    // tagTable.style.height = "3px" ;
   
    tagTable.style.textAlign = "center";

    for (var i = 0; i < countRow; i++) {
        var tagRow = document.createElement("tr");
        tagRow.style.width = "fix-content";
        tagRow.style.fontSize = "16px";
        tagTable.appendChild(tagRow);
        
        for(var j = 0; j < countColumn; j++) {
          var tagColumn = document.createElement("td");
          tagColumn.style.width = "fix-content";
            tagColumn.style.height = "3px";
            tagColumn.style.fontSize = "16px";
          if(i === 0 && count < 7 )
          {
            count ++;
            var textNode = document.createTextNode(bar[j]);
            tagColumn.style.color = 'white';
            tagColumn.style.backgroundColor = 'black';
            tagColumn.appendChild(textNode);
            tagRow.appendChild(tagColumn);
          }
          else if(i === 1)
          {
            var textNode = document.createTextNode(cot2[j]);
            tagColumn.style.color = 'black';
            tagColumn.style.backgroundColor = 'lightgray';
            tagColumn.appendChild(textNode);
            tagRow.appendChild(tagColumn);
          }
          else if(i === 2)
          {
            var textNode = document.createTextNode(check_parameter[j]);
            tagColumn.style.color = 'black';
            tagColumn.style.backgroundColor = 'white';
            
                tagColumn.appendChild(textNode);
                tagRow.appendChild(tagColumn);
            
            
          }
          else if(i === 3)
          {
            var textNode = document.createTextNode(bien[j]);
            tagColumn.style.color = 'black';
            tagColumn.style.backgroundColor = 'white';
            if(bien[j] === "")
            {
                break;
            }
            tagColumn.appendChild(textNode);
            tagRow.appendChild(tagColumn);
          }
        }
    }
    container.appendChild(tagTable);
}
function ResetArr()
{
    
}
//  setInterval(GetParameter, 10000);