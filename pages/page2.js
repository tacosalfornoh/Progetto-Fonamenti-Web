import functions from "../assets/js/functions.js";
import store from "../assets/js/store.js";

export default {
  name: "Tabella",
  setup() {
    const { watchEffect, onMounted, ref } = Vue;
    const title = "Tabella";
    //get data from server
    const serverdata = ref(null);
    const tabledata = ref(null);
    onMounted(async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      serverdata.value = await response.json();
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
      debugger;
      if (serverdata.value) {
        if (!sortByColumn.value && store.sortedColumn) {
          serverdata.value.sort(
            functions.methods.sort(store.sortedColumn, store.sortedOrder)
          );
        }
        if (sortByColumn.value == store.sortedColumn) {
          if (store.sortedOrder == "asc") {
            store.sortedOrder = "desc";
          } else {
            store.sortedOrder = "asc";
          }
          serverdata.value.sort(
            functions.methods.sort(sortByColumn.value, store.sortedOrder)
          );
          store.sortedColumn = sortByColumn.value;
        } else {
          serverdata.value.sort(functions.methods.sort(sortByColumn.value, "asc"));
          store.sortedOrder = "asc";
          store.sortedColumn = sortByColumn.value;
        }
        sortByColumn.value = null;
      }
    });

    return { tabledata, store, sortByColumn, title };
  },

  template: `
    <section id="jsonTable">
        <section id="table-title">
          <h1>{{ title }}</h1>
          <small v-if="tabledata && store.searchString"><b>{{ tabledata.length }}</b> corrispondenza/e.</small>
        </section>
        <input v-model="store.searchString" placeholder="Cerca...">
        <table>
        <thead>
            <tr>
                <th><a href="javascript:void(0);" v-on:click="sortByColumn = 'userId'">userId</a></th>
                <th><a href="javascript:void(0);" v-on:click="sortByColumn = 'id'">id</a></th>
                <th><a href="javascript:void(0);" v-on:click="sortByColumn = 'title'">title</a></th>
                <th><a href="javascript:void(0);" v-on:click="sortByColumn = 'completed'">completed</a></th>
            </tr>
            </thead>
            <tbody>        
            <tr v-for="item in tabledata">
                <td>{{ item.userId }}</td>
                <td>{{ item.id }}</td>
                <td>{{ item.title }}</td>
                <td><input type="checkbox" :checked="item.completed"></td>
            </tr>
            </tbody>
        </table>
    </section>
    `,
};
