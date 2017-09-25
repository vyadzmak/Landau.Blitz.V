<template>
        <v-card>
        <v-card-title v-bind:class="[data.titleClass ? data.titleClass : 'blue lighten-2']">
          <div v-bind:class="[data.headlineClass ? data.headlineClass : 'headline']">{{data.title ? data.title : "Modal header"}}</div>
          <v-spacer></v-spacer>
          <v-btn icon v-if="data.isClosable" @click="cancel"><v-icon>clear</v-icon></v-btn>
        </v-card-title>
        <v-form v-model="valid" ref="form" class="v-card-form">
        <v-text-field
      label="Имя параметра"
      v-model="data.item.SettingName"
      :rules="sNameRules"
      required
    ></v-text-field>
    <v-text-field
      label="Значение параметра"
      v-model="data.item.SettingValue"
      :rules="sValueRules"
      required
    ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="clear">Очистить</v-btn>
          <v-btn :class="{ green: valid, red: !valid }" success light @click="submit">Сохранить</v-btn>
          <v-btn error light @click="cancel">Отмена</v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
</template>

<script src="./updateModalJs.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./updateModal.css"></style>
