<template>
    <div>
        <v-card>
      <v-card-title>
      <v-btn @click.stop="showDeleteModal({})" error dark>Очистить лог</v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Поиск"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
        <v-data-table
      v-bind:headers="headers"
      v-bind:items="logs"
      v-bind:search="search"
    >
    <template slot="items" scope="props">
    <tr>
      <td>{{ props.item.Id }}</td>
      <td>{{ props.item.Date }}</td>
      <td>{{ props.item.Message }}</td>
    </tr>
    </template>
  </v-data-table>
  </v-card>
    </div>
</template>

<script src="./logJs.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./log.css"></style>
