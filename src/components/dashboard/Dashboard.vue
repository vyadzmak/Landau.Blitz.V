<template>
  <div>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          @click="$router.push({path: item.path})"
          v-bind:style="{'background-color':$route.path === item.path?'#edfbfa':''}"
          v-if="item.visible"
        >
          <v-list-tile-action>
            <v-icon light v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title">
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed  dark class="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" dark></v-toolbar-side-icon>
      <v-toolbar-title v-html="title"  @click="logOut()">
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        dark
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    <v-speed-dial
      v-model="fabSettings.fab"
      :top="fabSettings.top"
      :bottom="fabSettings.bottom"
      :right="fabSettings.right"
      :left="fabSettings.left"
      :direction="fabSettings.direction"
      :hover="fabSettings.hover"
      :transition="fabSettings.transition"
    >
      <v-btn
        slot="activator"
        class="blue lighten-2"
        dark
        fab
        hover
        v-model="fabSettings.fab"
      >
        <v-icon>settings</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        class="green"
        @click.stop="miniVariant = !miniVariant"
        >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        class="indigo"
        @click.stop="clipped = !clipped"
        >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        class="red"
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
    </v-speed-dial>
    </v-toolbar>
    <main>
    <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed">
      <span>&copy; 2017</span>
    </v-footer>
  </div>
</template>

<script src="./dashboardJs.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./dashboard.css"></style>
