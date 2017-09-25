<template>
    <div>
        <v-tabs dark>
    <v-tabs-bar class="cyan">
      <v-tabs-slider class="yellow"></v-tabs-slider>
      <v-tabs-item :href="'#tab-1'">Проверка на соответствие Программ</v-tabs-item>
      <v-tabs-item :href="'#tab-2'">Данные о клиенте</v-tabs-item>
      <v-tabs-item :href="'#tab-3'">Данные о запрашиваемом финансов</v-tabs-item>
    </v-tabs-bar>
    <v-tabs-items>
      <v-tabs-content
        :id="'tab-1'"
      >
        <v-card flat>
          <v-card-text>TAB-1
              <v-layout row>
          <v-flex xs8>
            <v-text-field
              label="Название проекта"
              v-model="project.Name"
            ></v-text-field>
          </v-flex>
          <v-flex xs-4></v-flex>
        </v-layout>
          </v-card-text>
        </v-card>
      </v-tabs-content>
      <v-tabs-content
        :id="'tab-2'"
      >
        <v-card flat>
          <v-card-text>TAB-2
          </v-card-text>
        </v-card>
      </v-tabs-content>
      <v-tabs-content
        :id="'tab-3'"
      >
        <v-card flat>
          <v-card-text>TAB-3
          </v-card-text>
        </v-card>
      </v-tabs-content>
    </v-tabs-items>
  </v-tabs>
    </div>
</template>

<script src="./projectJs.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./project.css"></style>
