const URL = "https://digi27.azurewebsites.net/api/healthies";
var email;
var PIDc = [];
var check_parameter = [];
var bien = [];
var bar = ["ID", "Device", "Location"];
async function check() {
  email = sessionStorage.getItem("email");
  await axios.get(URL + "/SearchByEmail/tr6r20@gmail,com").then((response) => {
    var healthies = response.data;

    for (var human of healthies) {
      sessionStorage.setItem("UID", human.UID);
      sessionStorage.setItem("Nation", human.Nation);
      sessionStorage.setItem("Language", human.Language);
      sessionStorage.setItem("Hour_nose", human.Hour_nose);
      sessionStorage.setItem("UID_Main_Account", human.UID_Main_Account);
      sessionStorage.setItem(
        "Is_Beneficiary_Account",
        human.Is_Beneficiary_Account
      );
      sessionStorage.setItem("Status", human.Status);
      sessionStorage.setItem("Purchase_Date", human.Purchase_Date);
      sessionStorage.setItem("Date", human.Date);
    }
  });
  GetParameter();
  // setTimeout(() => {
  //     GetParameter();
  //   }, 1);
}
async function GetParameter() {
  await axios
    .get(URL + "/SearchByUIDOwner/" + sessionStorage.getItem("UID"))
    .then((response) => {
      var healthies = response.data;
      var i = 0;
      for (var human of healthies) {
        PIDc[i] = human.PID;
        i++;
      }
    });

  // setTimeout(async () => {
  for (var j = PIDc.length - 1; j >= 0; ) {
    check_parameter.length = 0;
    bien.length = 0;
    j = j - 1;
    await axios
      .get(URL + "/SearchByPIDProduct/" + PIDc[j + 1])
      .then(async (response) => {
        var healthies = response.data;
        for (var human of healthies) {
          if (human.Is_read_file === "Y") {
            if (PIDc[j + 1] === human.PID) {
              break;
            }
          } else if (human.Is_read_file === "N") {
            //    //đọc trực tiếp

            if (PIDc[j + 1] === human.PID) {
              check_parameter.push(human.PID);
              check_parameter.push(human.PName);
              check_parameter.push("HCM");
              // alert(PIDc[j+1] + human.PID + "N");
              if (human.Acceleration === "Y") {
                check_parameter.push("Acceleration");
              }
              if (human.Speed === "Y") {
                check_parameter.push("Speed");
              }
              if (human.Temperature === "Y") {
                check_parameter.push("Temperature");
              }
              if (human.Humidity === "Y") {
                check_parameter.push("Humidity");
              }
              if (human.Pressure === "Y") {
                check_parameter.push("Pressure");
              }
              if (human.Speed_Of_Winds === "Y") {
                check_parameter.push("Speed_Of_Winds");
              }
              if (human.Wind_Direction === "Y") {
                check_parameter.push("Wind_Direction");
              }

              await axios
                .get(URL + "/SearchByPIDParameterDR/" + PIDc[j + 1])
                .then((response) => {
                  var healthies = response.data;
                  for (var human1 of healthies) {
                    if (PIDc[j + 1] === human1.PID) {
                      var date = new Date();
                      let slip_Current_Time = human1.Current_Time.split(" ");
                      // let slip_Current_Time_date = slip_Current_Time[0].split("/");
                      // let slip_Current_Time_time = slip_Current_Time[1].split(":");
                      check_parameter.push(slip_Current_Time[0]);
                      check_parameter.push(
                        slip_Current_Time[1] + " " + slip_Current_Time[2]
                      );
                      // if(slip_Current_Time_date[0] === "6"
                      //     && slip_Current_Time_date[1] === "12"
                      //     && slip_Current_Time_date[2] === "2015" )
                      // {

                      for (var i = 0; i < check_parameter.length; i++) {
                        if (check_parameter[i] === "Acceleration") {
                          bien.push(human1.Acceleration);
                        }
                        if (check_parameter[i] === "Speed") {
                          bien.push(human1.Speed);
                        }
                        if (check_parameter[i] === "Temperature") {
                          bien.push(human1.Temperature);
                        }
                        if (check_parameter[i] === "Humidity") {
                          bien.push(human1.Humidity);
                        }
                        if (check_parameter[i] === "Pressure") {
                          bien.push(human1.Pressure);
                        }
                        if (check_parameter[i] === "Speed_Of_Winds") {
                          bien.push(human1.Speed_Of_Winds);
                        }
                        if (check_parameter[i] === "Wind_Direction") {
                          bien.push(human1.Wind_Direction);
                        }
                      }
                      check_parameter.length = 0;
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
      });
  }
}
function MakeTable() {
  var container = document.getElementById("cuong");
  var countRow = 1;
  var countColumn = 7;
  var tagTable = document.createElement("table");
  tagTable.style.border = 1;
  tagTable.style.width = 100;
  tagTable.style.height = 20;

  tagTable.style.textAlign = "center";

  for (var i = 0; i < countRow; i++) {
    var tagRow = document.createElement("tr");
    tagRow.style.height = "20px";
    tagTable.appendChild(tagRow);

    for (var j = 0; j < countColumn; j++) {
      var tagColumn = document.createElement("td");
      tagColumn.style.width = "250px";
      var textNode = document.createTextNode(j);
      tagColumn.appendChild(textNode);
      tagRow.appendChild(tagColumn);
    }
  }

  container.appendChild(tagTable);
}
function ResetArr() {}
//  setInterval(GetParameter, 10000);
