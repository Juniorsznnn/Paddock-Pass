const form = document.getElementById("form ");
if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const data = new FormData(form);

        const newLap = {
            driver: data.get("driver"),
            time: parseFloat(data.get("time")),
            compound: data.get("compound")
        };
        form.reset();

    });
}