<template>
  <div class="login">
    <main>
    <v-container fluid>       
      <v-layout column class="pa-5">
    <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
      <v-toolbar class="indigo" dark>
        <v-toolbar-title>{{ msg }}</v-toolbar-title>
      </v-toolbar>
      <v-container fluid grid-list-md class="grey lighten-4">
        <v-layout row wrap>
          <v-flex>
            <v-card class="elevation-18">
              <v-form v-model="valid">
              <v-card-text primary-title>
                <v-text-field
      label="Name"
      v-model="loginData.Name"
      :rules="nameRules"
      :counter="10"
      required
    ></v-text-field>
    </v-card-text>
    <v-card-text primary-title>
    <v-text-field
      label="E-mail"
      v-model="loginData.Email"
      :rules="emailRules"
      required
    >
    </v-text-field>
              </v-card-text>
              <v-card-actions class="white">
                <v-checkbox label="Remember Me"
                        v-model="rememberMe"
                        color="indigo"
                        hide-details></v-checkbox>
                <v-btn type="submit" error dark large @click="loginUser">Submit</v-btn>
              </v-card-actions>
  </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>   
      </v-container>
    </main>
    <v-footer :fixed="fixed">
      <span>&copy; 2017</span>
    </v-footer>
  </div>
</template>

<script src="./loginJs.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./login.css"></style>
