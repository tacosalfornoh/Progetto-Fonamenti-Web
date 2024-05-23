import functions from "../assets/js/newjs/functions.js";
import store from "../assets/js/newjs/data.js";

export default {
  name: "ModificaDati",

  data() {
    return {
      newNome: "",
      newCognome: "",
      newEmail: "",
      newTelefono: "",
      dati: JSON.parse(localStorage.getItem("dati")) || [],
      globalIndex: null,
      datatable: null,
      notiMessage: null,
    };
  },
  setup() {
    const { ref, onMounted, watchEffect } = Vue;
    const title = "ModificaDati";
    //get data from server
    const serverdata = ref(null);
    const tabledata = ref(null);
    onMounted(() => {
      serverdata.value = JSON.parse(localStorage.getItem("dati")) || [];
    });

    //search
    watchEffect(() => {
      if (serverdata.value) {
        if (store.searchString) {
          tabledata.value = serverdata.value.filter(function (finder) {
            return JSON.stringify(finder).includes(store.searchString);
          });
        } else {
          tabledata.value = serverdata.value;
        }
      }
    });

    //table sort
    let sortByColumn = ref(null);
    watchEffect(() => {
      if (serverdata.value) {
        if (!sortByColumn.value && store.sortedColumn) {
          serverdata.value.sort(
            functions.sort(store.sortedColumn, store.sortedOrder)
          );
        }
        if (sortByColumn.value == store.sortedColumn) {
          if (store.sortedOrder == "asc") {
            store.sortedOrder = "desc";
          } else {
            store.sortedOrder = "asc";
          }
          serverdata.value.sort(
            functions.sort(sortByColumn.value, store.sortedOrder)
          );
          store.sortedColumn = sortByColumn.value;
        } else {
          serverdata.value.sort(functions.sort(sortByColumn.value, "asc"));
          store.sortedOrder = "asc";
          store.sortedColumn = sortByColumn.value;
        }
        sortByColumn.value = null;
      }
    });

    return { tabledata, store, sortByColumn, title };
  },
  methods: {
    notiSend(type, message) {
      const notification = document.getElementById("notification");
      const progress = document.getElementById("progress");
      this.notiMessage = message;
      notification.classList.add(type);
      progress.classList.add("progress");
      setTimeout(function () {
        notification.classList.remove(type);
        progress.classList.remove("progress");
      }, 2000);
    },
    aggiungi: function () {
      if (
        !this.newNome ||
        !this.newCognome ||
        !this.newEmail ||
        !this.newTelefono
      ) {
        this.notiSend("danger", "Compila tutti i campi!");
      } else {
        this.notiSend("success", "Dato aggiunto!");
        var newEntry = {
          nome: this.newNome,
          cognome: this.newCognome,
          email: this.newEmail,
          telefono: this.newTelefono,
        };

        this.dati.push(newEntry);
        this.tabledata.push(newEntry);

        this.newNome = "";
        this.newCognome = "";
        this.newEmail = "";
        this.newTelefono = "";
        this.aggiornaLocalStorage();
      }
    },
    ricorda(index) {
      var editNome = document.getElementById("editNome");
      var editCognome = document.getElementById("editCognome");
      var editEmail = document.getElementById("editEmail");
      var editTelefono = document.getElementById("editTelefono");

      editNome.value = this.dati[index].nome;
      editNome.ariaPlaceholder = this.dati[index].nome;
      editCognome.value = this.dati[index].cognome;
      editCognome.ariaPlaceholder = this.dati[index].cognome;
      editEmail.value = this.dati[index].email;
      editEmail.ariaPlaceholder = this.dati[index].email;
      editTelefono.value = this.dati[index].telefono;
      editTelefono.ariaPlaceholder = this.dati[index].telefono;
      this.globalIndex = index;
    },
    modifica(index) {
      var editNome = document.getElementById("editNome");
      var editCognome = document.getElementById("editCognome");
      var editEmail = document.getElementById("editEmail");
      var editTelefono = document.getElementById("editTelefono");
      if (
        !editNome.value ||
        !editCognome.value ||
        !editEmail.value || !editEmail.checkValidity() ||
        !editTelefono.value || !editTelefono.checkValidity()
      ) {
        this.notiSend("danger", "Compila tutti i campi!");
      } else {
        this.notiSend("success", "Dato modificato!");
        var modified = {
          nome: editNome.value,
          cognome: editCognome.value,
          email: editEmail.value,
          telefono: editTelefono.value,
        };
        this.dati.splice(this.globalIndex, 1, modified);
        this.tabledata.splice(this.globalIndex, 1, modified);
        this.aggiornaLocalStorage();
      }
    },
    elimina(index) {
      this.notiSend("success", "Dato eliminato!");
      this.dati.splice(index, 1);
      this.tabledata.splice(index, 1);
      this.aggiornaLocalStorage();
    },
    aggiornaLocalStorage() {
      localStorage.setItem("dati", JSON.stringify(this.dati));
    },
  },
  template: `
  <div id="notification">{{ notiMessage }}
    <div id="progress"></div>
  </div> 
  <section id="dataTable">
  <section id="editData" aria-expanded="false">
        <form @submit.prevent="modifica">
          <section>
              <i class="fe-x"></i>
              <button @click="modifica(index)" type="submit">
                <i class="fe-save"></i>
              </button>                
          </section>
          <article>
          <h3>Nome:</h3>
          <input id="editNome" placeholder="Modifica Nome" />
          <h3>Cognome:</h3>
          <input id="editCognome" placeholder="Modifica Cognome" />
          <h3>Email:</h3>
          <input id="editEmail" placeholder="Modifica Email" type="email" />
          <h3>Telefono:</h3>
          <input id="editTelefono" placeholder="Modifica Telefono" pattern="[0-9]{10}" />
          </article>
          </form>   
      </section>
        <section id="addData" aria-expanded="false">
          <form id="addForm" @submit.prevent="aggiungi">
            <section>
                <i class="fe-x" id="add"></i>
                <button type="submit">
                  <i class="fe-save"></i>
                </button>                
            </section>
            <article>
            <h3>Nome:</h3>
            <input v-model="newNome" id="insertName" placeholder="Inserisci nome"/>
            <h3>Cognome:</h3>
            <input v-model="newCognome" id="insertSurname" placeholder="Inserisci cognome" />
            <h3>Email:</h3>
            <input v-model="newEmail" id="insertEmail" placeholder="Inserisci email" type="email" />
            <h3>Telefono:</h3>
            <input v-model="newTelefono" id="insertTelephone" placeholder="Inserisci telefono" pattern="[0-9]{10}" />
            </article>
            </form>  
        </section>
        <section id="table-title">
    <h1> {{ title }} </h1>
    <small v-if="tabledata && store.searchString"><b>{{ tabledata.length }}</b> corrispondenza/e.</small>
    </section>
    <input v-model="store.searchString" placeholder="Cerca...">
    <table>
    <thead>
      <tr>
        <th><a href="javascript:void(0);" v-on:click="sortByColumn = 'nome'">Nome</a></th>
        <th><a href="javascript:void(0);" v-on:click="sortByColumn = 'cognome'">Cognome</a></th>
        <th><a href="javascript:void(0);" v-on:click="sortByColumn = 'email'">Email</a></th>
        <th><a href="javascript:void(0);" v-on:click="sortByColumn = 'telefono'">Telefono</th>
        <th>Azioni</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(dato, index) in tabledata" :key="index">
        <td>{{ dato.nome }}</td>
        <td>{{ dato.cognome }}</td>
        <td>{{ dato.email }}</td>
        <td>{{ dato.telefono }}</td>
        <td class="actions">
          <button @click="ricorda(index)">
            <i class="fe-edit"></i>
          </button>
          <button @click="elimina(index)">
            <i class="fe-trash-2"></i>
          </button>
        </td>  
      </tr>
    </tbody>
    </table>
    <button class="add-table">
      <i class="fe-plus" id="add"></i>
    </button>
 </section>
    `,
};
