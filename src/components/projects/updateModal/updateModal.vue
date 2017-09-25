<template>
        <v-card>
        <v-card-title v-bind:class="[data.titleClass ? data.titleClass : 'blue lighten-2']">
          <div v-bind:class="[data.headlineClass ? data.headlineClass : 'headline']">{{data.title ? data.title : "Modal header"}}</div>
          <v-spacer></v-spacer>
          <v-btn icon v-if="data.isClosable" @click="cancel"><v-icon>clear</v-icon></v-btn>
        </v-card-title>
        <v-form v-model="valid" ref="form" class="v-card-form">
        <v-text-field
      label="Наименование проекта"
      v-model="updateItem.Name"
      :rules="sNameRules"
      required
    ></v-text-field>
    <v-select
      label="Клиент"
      :value="updateItem.ProjectSetting.SelectedClient"
      @change ="clientSelected($event)"
      item-text="Name"
      item-value="Id"
      return-object
      :items="updateItem.ProjectSetting.Clients"
      :rules="[(v) => !!v || 'Выберите клиента']"
      required
    ></v-select>
    <v-layout row>
          <v-flex sm4>
            <v-subheader>Предыдущие проекты</v-subheader>
          </v-flex>
          <v-flex sm8>
            <span v-if="updateItem.ParentExists">По данному клиенту найдены предыдущие периоды {{updateItem.ParentProject.ProjectSetting.StartMonth}}.{{updateItem.ParentProject.ProjectSetting.StartYear}}-{{updateItem.ParentProject.ProjectSetting.EndMonth}}.{{updateItem.ParentProject.ProjectSetting.EndYear}} (повторное обращение)</span>
            <span v-if="!updateItem.ParentExists">По данному клиенту не найдено ни одного периода (первое обращение)</span>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex sm4>
            <v-subheader>Начало периода</v-subheader>
          </v-flex>
          <v-flex sm3>
            <v-select label="Месяц"
      v-model="updateItem.ProjectSetting.StartMonth"
      :items="updateItem.ProjectSetting.StartDates.Months"
      :rules="[(v) => !!v || 'Выберите месяц']"
      required
    ></v-select>
          </v-flex>
          <v-flex sm3>
            <v-select label="Год"
      v-model="updateItem.ProjectSetting.StartYear"
      :items="updateItem.ProjectSetting.StartDates.Years"
      :rules="[(v) => !!v || 'Выберите год']"
      required
    ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex sm4>
            <v-subheader>Конец периода</v-subheader>
          </v-flex>
          <v-flex sm3>
            <v-select label="Месяц"
      v-model="updateItem.ProjectSetting.EndMonth"
      :items="updateItem.ProjectSetting.EndDates.Months"
      :rules="[(v) => !!v || 'Выберите месяц']"
      required
    ></v-select>
          </v-flex>
          <v-flex sm3>
            <v-select label="Год"
      v-model="updateItem.ProjectSetting.EndYear"
      :items="updateItem.ProjectSetting.EndDates.Years"
      :rules="[(v) => !!v || 'Выберите год']"
      required
    ></v-select>
          </v-flex>
        </v-layout>
    <v-text-field
      label="Процентная ставка"
      v-model="updateItem.PercentBid"
      type="number"
      min="0"
      max="100"
      step="0.01"
      :rules="[(v) => !!v || 'Значение должно быть заполнено']"
      suffix="%"
      required
    ></v-text-field>
    <v-text-field
      label="Альтернативная процентная ставка"
      v-model="updateItem.AlternateBid"
      type="number"
      min="0"
      step="0.01"
      :rules="[(v) => !!v || 'Значение должно быть заполнено']"
      suffix="%"
      required
    ></v-text-field>
    <v-text-field
      label="Курс $"
      v-model="updateItem.DollarRate"
      type="number"
      min="0"
      step="0.01"
      :rules="[(v) => !!v || 'Значение должно быть заполнено']"
      required
    ></v-text-field>
    <v-menu
          lazy
          :close-on-content-click="true"
          v-model="menu"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-left="40"
          max-width="290px"
        >
          <v-text-field
            slot="activator"
            label="Дата баланса"
            v-model="updateItem.BalanceDate"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="updateItem.BalanceDate" 
        :first-day-of-week="1" locale="ru-Ru" scrollable >
          </v-date-picker>
        </v-menu>
        <v-subheader>Выберите вид(ы) деятельности</v-subheader>
        <v-layout row wrap>
        <v-flex xs12 md6>
        <v-card class="elevation-0">
          <v-card-text>
            <v-checkbox label="Услуги" v-model="updateItem.ActivityService" light></v-checkbox>
            <v-checkbox label="Торговля" v-model="updateItem.ActivityTrade" light></v-checkbox>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-card class="elevation-0">
          <v-card-text>
            <v-checkbox label="С/Х" v-model="updateItem.ActivityAgriculture" light></v-checkbox>
            <v-checkbox label="Производство" v-model="updateItem.ActivityProduction" light></v-checkbox>
          </v-card-text>
        </v-card>
      </v-flex>
      </v-layout>
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
