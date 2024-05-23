export default {
    data() {
        return {
            notificationMessage: null,

            notificationID: document.getElementById("notification"),
            progressID: document.getElementById("progress"),
            
            // ? changeTheme
            currentTheme: document.getAttribute("data-theme"),

            // ! ModificaDati
            newNome: "",
            newCognome: "",
            newEmail: "",
            newTelefono: "",
            globalIndex: null,
            datatable: null,
            dati: JSON.parse(localStorage.getItem("dati")) || [],
        };
    }
}