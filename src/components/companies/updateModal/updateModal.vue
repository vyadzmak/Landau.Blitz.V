<template>
        <v-card>
        <v-card-title v-bind:class="[data.titleClass ? data.titleClass : 'blue lighten-2']">
          <div v-bind:class="[data.headlineClass ? data.headlineClass : 'headline']">{{data.title ? data.title : "Modal header"}}</div>
          <v-spacer></v-spacer>
          <v-btn icon v-if="data.isClosable" @click="cancel"><v-icon>clear</v-icon></v-btn>
        </v-card-title>
        <v-form v-model="valid" ref="form" class="v-card-form">
        <v-text-field
      label="Наименование клиента"
      v-model="data.item.Name"
      :rules="nameRules"
      required
    ></v-text-field>
    <v-text-field
      label="Регистрационный номер"
      v-model="data.item.RegistrationNumber"
      :rules="regRules"
      required
    ></v-text-field>
    <v-text-field
      label="Адрес"
      v-model="data.item.Address"
      :rules="addressRules"
      required
    ></v-text-field>
    <v-select
      label="Тип организации"
      v-model="data.item.CurrentClientType"
      item-text="Description"
      item-value="Id"
      return-object
      :items="clientTypeItems"
      :rules="[(v) => !!v || 'Выберите тип организации']"
      required
    ></v-select>
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
