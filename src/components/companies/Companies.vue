<template>
<div>
    <v-card>
      <v-card-title>
      <v-btn @click.stop="showUpdateModal({})" success dark>Добавить компанию</v-btn>
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
      v-bind:items="companies"
      v-bind:search="search"
    >
    <template slot="items" scope="props">
    <tr  @click="goToUsers(props.item.Id)">
      <td>{{ props.item.Id }}</td>
      <td>{{ props.item.Name }}</td>
      <td>{{ props.item.Address }}</td>
      <td>{{ props.item.RegistrationNumber }}</td>
      <td>{{ props.item.RegistrationDate }}</td>
      <td>{{ props.item.ClientTypeName }}</td>
      <td class="px-1"><v-btn @click.stop="showUpdateModal(props.item)" icon class="indigo--text"><v-icon>fa-pencil-square-o</v-icon></v-btn></td>
      <td class="px-1"><v-btn @click.stop="showDeleteModal(props.item.Id)" icon class="pink--text"><v-icon>fa-trash</v-icon></v-btn></td>
    </tr>
    </template>
  </v-data-table>
  </v-card>
</div>
</template>

<script src="./companiesJs.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./companies.css"></style>
