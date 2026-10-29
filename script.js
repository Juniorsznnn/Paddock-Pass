let stintData = JSON.parse(localStorage.getItem("paddockData")) || []

const form = document.getElementById("form-log");
if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const data = new FormData(form);

        const newLap = {
            driver: data.get("driver"),
            time: parseFloat(data.get("time")),
            compound: data.get("compound")
        };

        stintData.push(newLap);
        localStorage.setItem("paddockData", JSON.stringify(stintData));
        form.reset();

    });
}




const historyTable =document.getElementById("history-table");
if (historyTable) {
    document.getElementById("total-laps").textContent = stintData.length;

    if(stintData.length > 0){
        let fastest = stintData[0].time;
        for(let i = 0; i < stintData.length; i++) {
            if (stintData[i].time < fastest) {
                fastest = stintData[i].time;
            }
        }
        document.getElementById("fastest-lap").textContent =fastest.toFixed(3) + "s";

    }



    for (let i = stintData.length -1; i >= 0; 1--){
        const lap = stintData[i];
        const tr = document.createElement("tr");
        tr.innerHTML =`
        <td>${lap.driver}</td>
        <td class = "${lap.compound}">${lap.compound}</td>
        <td> ${lap.time.toFixed(3)}</td>`;
historyTable.appendChild(tr);
    }
}





const searchInput = document.getElementById("driver-search");
const analyticsTable = document.getElementById("analytics-table");

if (searchInput && analyticsTable) {
    function renderAnalytics(filterText){
        analyticsTable.innerHTML = "";

        for(let i = stintData.length -1; i >= 0; i--) {
        const lap = stintData[i];
        if(filterText === "" || lap.driver.toLowerCase().includes(filterText.toLowerCase())) {
            const tr = document.createElement("tr");
            tr.innerHTML = 
            `<td>${lap.driver}</td>
            <td class="${lap.compound}">${lap.compound}</td>
            <td>${lap.tme.toFixed(3)}</td>`;
            analyticsTable.appendChild(tr);
        }
    }
}
renderAnalytics("");
searchInput.addEventListener("keyup",function(){
    renderAnalytics(searchInput.value);
})
}