const tickets = JSON.parse(localStorage.getItem("tickets")) || [];

export function createTicket() {
    const btnCreate = document.getElementById("createBtn");
    if (!btnCreate) {
        console.error("No se encontró el botón #createTkt");
        return;
    }

    // Aquí SOLO escuchamos el click del botón
    btnCreate.addEventListener("click", (e) => {
        e.preventDefault();

        // Obtengo los valores *en el momento del click*
        const title = document.getElementById("title").value.trim();
        const description = document.getElementById("description").value.trim();
        const priority = document.getElementById("prioridad").value.trim();
        const assignment = document.getElementById("asignacion").value.trim();

        // Valido aquí si están vacíos *solo después de click*
        if (!title || !description || !priority || !assignment) {
            console.log("Por favor, completa todos los campos.");
            return;
        }

        // Si están completos, creo el ticket
        const nuevoTkt = {
            title,
            description,
            priority,
            assignment,
            date: new Date().toLocaleDateString(),
            hora: new Date().toLocaleTimeString(),
            estado: "abierto",
        };

        tickets.push(nuevoTkt);
        console.log("Tickets acumulados:", tickets);
        localStorage.setItem("tickets", JSON.stringify(tickets));
        console.log(tickets)
        // Opcional: limpiar formulario después de agregar
        // document.querySelector("form").reset();
    });
}
