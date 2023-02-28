const URL = "https://digi27.azurewebsites.net/api/healthies";


 var ChiaKhoa = sessionStorage .setItem("key");
function getDetails(ChiaKhoa) {
    axios.get(URL + "/SearchByPIDParameterHistory/" + ChiaKhoa).then((response) => {
        var Human = response.data;
        renderHumanDetails(Human);
    });
}

function renderHumanDetails(Human) {
    document.getElementById("txtID").value = Human.PID;
    document.getElementById("txtName").value = Human.Name;
    document.getElementById("txtHeight").value = Human.Height;
    document.getElementById("txtWeight").value = Human.Weight;
    document.getElementById("txtBMI").value = Human.BMI;
}