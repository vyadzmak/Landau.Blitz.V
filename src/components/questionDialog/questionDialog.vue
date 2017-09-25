<template>
      <v-card>
        <v-card-title v-bind:class="[data.titleClass ? data.titleClass : 'blue lighten-2']">
          <div v-bind:class="[data.headlineClass ? data.headlineClass : 'headline']">{{data.title ? data.title : "Modal header"}}</div>
          <v-spacer></v-spacer>
          <v-btn icon v-if="data.isClosable" @click="cancel"><v-icon>clear</v-icon></v-btn>
        </v-card-title>
        <v-card-text>{{data.message}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn success light @click="submit">Да</v-btn>
          <v-btn error light @click="cancel">Нет</v-btn>
        </v-card-actions>
      </v-card>
</template>

<script src="./questionDialogJs.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./questionDialog.css"></style>
