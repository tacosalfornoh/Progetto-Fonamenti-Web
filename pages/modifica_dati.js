import component3 from "../components/component3.js";
import component2 from "../components/component2.js";
import functions from "../functions.js";
import store from "../store.js";

export default {
  name: "ModificaDati",
  components: { component3, component2 },

  data() {
    return {
      newNome: "",
      newCognome: "",
      newEmail: "",
      newTelefono: "",
      dati: JSON.parse(localStorage.getItem("dati")) || [],
      globalIndex: null,
      datatable: null,
    };
  },
  setup() {
    const { ref, onMounted, watchEffect } = Vue;
    const title = "Modifica Dati";
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
      console.log("sortByColumn.value");
      console.log(sortByColumn.value);
      console.log("store.sortedColumn");
      console.log(store.sortedColumn);
      console.log("sortedOrder");
      console.log(store.sortedOrder);
      console.log("serverdata");
      console.log(serverdata.value);
      console.log("tabledata");
      console.log(tabledata.value);
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
    aggiungi() {
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
      var modified = {
        nome: editNome.value,
        cognome: editCognome.value,
        email: editEmail.value,
        telefono: editTelefono.value,
      };
      this.dati.splice(this.globalIndex, 1, modified);
      this.tabledata.splice(this.globalIndex, 1, modified);

      this.aggiornaLocalStorage();
    },
    elimina(index) {
      this.dati.splice(index, 1);
      this.tabledata.splice(index, 1);
      this.aggiornaLocalStorage();
    },
    aggiornaLocalStorage() {
      localStorage.setItem("dati", JSON.stringify(this.dati));
    },
  },
  template: `
  <div id="notification" hidden>Fatto!</div> 
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
          <input id="editNome" placeholder="Modifica Nome" required />
          <h3>Cognome:</h3>
          <input id="editCognome" placeholder="Modifica Cognome" required />
          <h3>Email:</h3>
          <input id="editEmail" placeholder="Modifica Email" type="email" required />
          <h3>Telefono:</h3>
          <input id="editTelefono" placeholder="Modifica Telefono" pattern="[0-9]{10}" required />
          </article>
          </form>   
      </section>
        <section id="addData" aria-expanded="false">
          <form @submit.prevent="aggiungi">
            <section>
                <i class="fe-x" id="add"></i>
                <button type="submit">
                  <i class="fe-save"></i>
                </button>                
            </section>
            <article>
            <h3>Nome:</h3>
            <input v-model="newNome" placeholder="Inserisci nome" required />
            <h3>Cognome:</h3>
            <input v-model="newCognome" placeholder="Inserisci cognome" required />
            <h3>Email:</h3>
            <input v-model="newEmail" placeholder="Inserisci email" required />
            <h3>Telefono:</h3>
            <input v-model="newTelefono" placeholder="Inserisci telefono" required />
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
