const noBtn = document.getElementById("noBtn");

const yesBtn = document.getElementById("yesBtn");

const continueBtn = document.getElementById("continueBtn");

const nextBtn = document.getElementById("nextBtn");

const finishBtn = document.getElementById("finishBtn");

const finalMessage = document.getElementById("finalMessage");

const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const screen3 = document.getElementById("screen3");
const screen4 = document.getElementById("screen4");
const screen5 = document.getElementById("screen5");

const cards = document.querySelectorAll(".card");

let selectedPlace = "";
function moveButton() {

    const container = document.querySelector(".container");

    const maxX = container.clientWidth - noBtn.offsetWidth - 40;

    const maxY = container.clientHeight - noBtn.offsetHeight - 40;

    const x = Math.random() * maxX;

    const y = Math.random() * maxY;

    noBtn.style.left = `${x}px`;

    noBtn.style.top = `${y}px`;

}

// PC
noBtn.addEventListener("mouseover", moveButton);

// CELULAR
noBtn.addEventListener("touchstart", (e) => {

    e.preventDefault();

    moveButton();

});




// PANTALLA 1 -> 2
yesBtn.addEventListener("click", () => {

    screen1.classList.add("hidden");

    screen2.classList.remove("hidden");

});

// PANTALLA 2 -> 3
continueBtn.addEventListener("click", () => {

    screen2.classList.add("hidden");

    screen3.classList.remove("hidden");

});

// Mostrar/ocultar input de hora personalizada
document.getElementById("hour").addEventListener("change", () => {
    const hour = document.getElementById("hour").value;
    const customTime = document.getElementById("customTime");

    if (hour === "Otra hora") {
        customTime.style.display = "block";
        customTime.value = "";
    } else {
        customTime.style.display = "none";
    }
});

// PANTALLA 3 -> 4
nextBtn.addEventListener("click", () => {

    const date = document.getElementById("date").value;

    let hour = document.getElementById("hour").value;
    const customTime = document.getElementById("customTime").value;

    if (date === "" || hour === "") {

        alert("Completa la fecha y la hora 😭");

        return;

    }

    if (hour === "Otra hora") {
        if (customTime === "") {
            alert("Ingresa la hora personalizada 😭");
            return;
        }
        hour = customTime;
    }

    screen3.classList.add("hidden");

    screen4.classList.remove("hidden");

});

// SELECCIONAR LUGAR
cards.forEach(card => {

    card.addEventListener("click", () => {

        cards.forEach(c => {

            c.classList.remove("selected");

        });

        card.classList.add("selected");

        selectedPlace = card.dataset.place;

    });

});

// FINAL
finishBtn.addEventListener("click", async () => {

    const date = document.getElementById("date").value;

    let hour = document.getElementById("hour").value;

    const customTime = document.getElementById("customTime").value;

    if (selectedPlace === "") {

        alert("Escoge un lugar 😭");

        return;

    }

    if (hour === "Otra hora") {
        hour = customTime;
    }

    const formData = new FormData();
    formData.append("Fecha", date);
    formData.append("Hora", hour);
    formData.append("Lugar", selectedPlace);
    formData.append("_subject", "Nueva cita desde la página");
    formData.append("_captcha", "false");

    try {
        const response = await fetch("https://formspree.io/f/xdajwybj", {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("No se pudo enviar el formulario");
        }
    } catch (error) {
        console.error("Error al enviar Formspree:", error);
        alert("No se pudo enviar la invitación. Intenta otra vez más tarde.");
        return;
    }

    screen4.classList.add("hidden");

    screen5.classList.remove("hidden");

    finalMessage.innerHTML = `
        Entonces quedamos el <b>${date}</b>
        <br>
        a las <b>${hour}</b>
        <br><br>
        para ir por <b>${selectedPlace}</b> 💖
        <br><br>
        Nos vemos!
    `;

    console.log("Fecha:", date);
    console.log("Hora:", hour);
    console.log("Lugar:", selectedPlace);

});