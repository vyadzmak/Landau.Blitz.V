<template>
    <div>
        <v-card>
      <v-card-title>
      <v-btn @click.stop="showUpdateModal({})" success dark>Добавить пользователя</v-btn>
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
      v-bind:items="users"
      v-bind:search="search"
    >
    <template slot="items" scope="props">
    <tr>
      <td>{{ props.item.Id }}</td>
      <td>{{ props.item.LastName }}</td>
      <td>{{ props.item.FirstName }}</td>
      <td>{{ props.item.Email }}</td>
      <td>{{ props.item.PhoneNumber }}</td>
      <td>{{ props.item.Login.RegistrationDate }}</td>
      <td>{{ props.item.Login.LastLoginDate }}</td>
      <td class="px-1"><v-btn @click.stop="showUpdateModal(props.item)" icon class="indigo--text"><v-icon>fa-pencil-square-o</v-icon></v-btn></td>
      <td class="px-1"><v-btn @click.stop="showDeleteModal(props.item.Id)" icon class="pink--text"><v-icon>fa-trash</v-icon></v-btn></td>
    </tr>
    </template>
  </v-data-table>
  </v-card>
    </div>
</template>

<script src="./usersJs.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./users.css"></style>
