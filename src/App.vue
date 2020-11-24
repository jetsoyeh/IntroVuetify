<template>
  <div id="app">
    <v-app id="inspire">
      <!--側邊導覽-->
      <!--側邊導覽-->
      <v-navigation-drawer v-model="drawer" app clipped>
        <v-list dense>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="./assets/36275.jpg"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Wei Po Ya</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>
          <v-list-item to="/">
            <v-list-item-action>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/about">
            <v-list-item-action>
              <v-icon>fas fa-globe</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Map</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/product">
            <v-list-item-action>
              <v-icon>fas fa-list</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Products</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
           <v-list-item to="/paypal">
            <v-list-item-action>
              <v-icon>far fa-clock</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>TimeZone</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <!--頁首toolbar-->
      <v-app-bar app clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Application</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon to="/product/shoppingcart">
          <v-icon small>fas fa-shopping-cart</v-icon>
          <span v-if="cartTotal" class="glyphicon glyphicon-shopping-cart" aria-hidden="true"> ({{ cartTotal }})</span>
        </v-btn>
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list v-if="!currentUser">
            <v-list-item to="/login">
              <v-list-item-action>
                <v-icon color="primary">mdi-account</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Sing In</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list v-if="currentUser">
            <v-list-item @click="logout()">
              <v-list-item-action>
                <v-icon color="primary">fas fa-sign-out-alt</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <!--主要內容-->
      <v-main>
        <v-container fluid>
          <router-view ></router-view>
        </v-container>
      </v-main>
      <!--頁尾-->
      <v-footer app>
        <span>&copy; {{ new Date().getFullYear() }} By Jetso </span>
      </v-footer>
    </v-app>
  </div>
</template>
<script>

export default {
  data: () => ({
    drawer: null,
    isShow: true,
  }),
  created() {
    this.$vuetify.theme.dark = true;
  },
  computed:{
    currentUser() {
      return this.$store.state.auth.status.loggedIn;
    },
    cartTotal(){
      return  this.$store.getters.getShoppingCartTotal;
    },
  },
  methods: {
    
    logout() {
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
