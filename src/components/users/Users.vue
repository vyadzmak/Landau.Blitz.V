<template>
    <div>
        <v-card>
      <v-card-title>
      {{ msg }}
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
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
    <tr  @click="goToUserInfo(props.item.id)">
      <td class="text-xs-right">{{ props.item.id }}</td>
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.username }}</td>
      <td class="text-xs-right">{{ props.item.email }}</td>
      <td class="text-xs-right">{{ props.item.phone }}</td>
      <td class="text-xs-right">{{ props.item.website }}</td>
      <td class="text-xs-right">{{ props.item.company.name }}</td>
    </tr>
    </template>
  </v-data-table>
  </v-card>
    </div>
</template>

<script src="./usersJs.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./users.css"></style>
