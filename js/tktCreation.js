export function createTicket() {
    console.log("VALENTINO");
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const priority = document.getElementById("Prioridad").value;

    if (title && description) {
        console.log(`Ticket created with title: ${title}, description: ${description}, priority: ${priority}`);
        // Here you would typically send the data to a server
    } else {
        console.error("Title and description are required to create a ticket.");
    }
}