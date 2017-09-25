<template>
    <div>
        <v-card>
      <v-card-title>
      <v-btn @click.stop="showUpdateModal({})" success dark>Добавить проект</v-btn>
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
      v-bind:items="projects"
      v-bind:search="search"
    >
    <template slot="items" scope="props">
    <tr  @click="goToProject(props.item.Id)">
      <td>{{ props.item.Id }}</td>
      <td>{{ props.item.Name }}</td>
      <td>{{ props.item.Content.ClientData.OrganizationName }}</td>
      <td>{{ props.item.CreatorName }}</td>
      <td>{{ props.item.CreationDate }}</td>
      <td class="px-1"><v-btn @click.stop="showUpdateModal(props.item)" icon class="indigo--text"><v-icon>fa-pencil-square-o</v-icon></v-btn></td>
      <td class="px-1"><v-btn @click.stop="showDeleteModal(props.item.Id)" icon class="pink--text"><v-icon>fa-trash</v-icon></v-btn></td>
    </tr>
    </template>
  </v-data-table>
  </v-card>
    </div>
</template>

<script src="./projectsJs.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./projects.css"></style>
