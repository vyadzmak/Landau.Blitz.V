<template>
        <v-card>
        <v-card-title v-bind:class="[data.titleClass ? data.titleClass : 'blue lighten-2']">
          <div v-bind:class="[data.headlineClass ? data.headlineClass : 'headline']">{{data.title ? data.title : "Modal header"}}</div>
          <v-spacer></v-spacer>
          <v-btn icon v-if="data.isClosable" @click="cancel"><v-icon>clear</v-icon></v-btn>
        </v-card-title>
        <v-form v-model="valid" ref="form" class="v-card-form">
        <v-text-field
      label="Имя"
      v-model="updateUser.FirstName"
      :rules="fNameRules"
      required
    ></v-text-field>
    <v-text-field
      label="Фамилия"
      v-model="updateUser.LastName"
      :rules="lNameRules"
      required
    ></v-text-field>
    <v-text-field
      label="Телефон"
      v-model="updateUser.PhoneNumber"
      :rules="phoneRules"
      required
    ></v-text-field>
    <v-text-field
      label="Email"
      v-model="updateUser.Email"
      :rules="emailRules"
      required
    ></v-text-field>
    <v-text-field
      label="Пароль"
      v-model="updateUser.Login.UserPassword"
      :rules="passwordRules"
      :append-icon="'refresh'"
      :append-icon-cb="generatePassword"
      required
    ></v-text-field>

    <v-select
      label="Состояние логина"
      v-model="updateUser.Login.CurrentLoginState"
      item-text="Description"
      item-value="Id"
      return-object
      :items="updateUser.Login.LoginStates"
      :rules="[(v) => !!v || 'Выберите состояние логина']"
      required
    ></v-select>
    <v-select
      label="Роль пользователя"
      v-model="updateUser.Login.CurrentRole"
      item-text="Description"
      item-value="Id"
      return-object
      :items="updateUser.Login.Roles"
      :rules="[(v) => !!v || 'Выберите роль']"
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
