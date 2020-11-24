<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="8" sm="8">
      <v-card class="elevation-12">
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-row>
              <v-col class="12" md="8">
                <v-card-text class="mt-12">
                  <h1 class="text-center dispaly-2 teal--text text--accent-3">
                    Sign in to Diprells
                  </h1>
                  <h4 class="text-center mlt-4 teal--text text--accent-3">
                    Ensure your Username for Login
                  </h4>
                  <v-form>
                    <v-text-field
                      label="Username"
                      name="username"
                      v-validate="'required'"
                      v-model="user.username"
                      prepend-icon="fas fa-user"
                      type="text"
                      color="teal accent-3"
                    />
                    <div
                      v-if="errors.has('username')"
                      class="alert alert-danger"
                      role="alert"
                    >
                      {{ errors.first("username") }}
                    </div>
                    <v-text-field
                      label="Password"
                      name="password"
                      v-validate="'required|min:8'"
                      v-model="user.password"
                      prepend-icon="fas fa-unlock-alt"
                      type="password"
                      color="teal accent-3"
                    />
                    <div
                      v-if="errors.has('password')"
                      class="alert alert-danger"
                      role="alert"
                    >
                      {{ errors.first("password") }}
                    </div>
                    <div class="text-center mt-3">
                      <v-btn
                        rounded
                        color="teal accent-3"
                        dark
                        @click.prevent="handleLogin"
                        :disabled="loading"
                        ><span
                          v-show="loading"
                          class="spinner-border spinner-border-sm"
                        ></span>
                        <span>Login</span></v-btn
                      >
                    </div>
                    <br />
                    <div class="form-group">
                      <div
                        v-if="message"
                        class="alert alert-danger"
                        role="alert"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </v-form>
                  <h6 class="text-center mt-3">Forget your password?</h6>
                </v-card-text>
              </v-col>
              <v-col cols="12" md="4" class="teal accent-3">
                <v-card-text class="white--text mt-12">
                  <h2 class="text-center display-2">Hello Friend !</h2>
                  <h6 class="text-center">
                    Enter your Username and Password to start journary with us
                  </h6>
                </v-card-text>
                <v-btn rounded outlined="" dark @click="step++">Register</v-btn>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item :value="2">
            <v-row>
              <v-col cols="12" md="4" class="teal accent-3">
                <v-card-text class="white--text mt-12">
                  <h1 class="text-center display-1">Welcome Back</h1>
                  <h6 class="text-center">
                    To keep connected with us please login with your personnel
                    info
                  </h6>
                </v-card-text>
                <v-btn rounded outlined="" dark @click="step--">Login</v-btn>
              </v-col>
              <v-col cols="12" md="8">
                <v-card-text class="mt-12">
                  <h1 class="text-center display-2 teal--text text--accent-3">
                    Create Account
                  </h1>
                  <h4 class="text-center mlt-4 teal--text text--accent-3">
                    Ensure your Username for Register
                  </h4>
                  <v-form>
                    <v-text-field
                      label="Username"
                      name="username"
                      v-validate="'required'"
                      v-model="user.username"
                      prepend-icon="fas fa-user"
                      type="text"
                      color="teal accent-3"
                    />
                    <div
                      v-if="errors.has('username')"
                      class="alert alert-danger"
                      role="alert"
                    >
                      {{ errors.first("username") }}
                    </div>
                    <v-text-field
                      label="Email"
                      name="email"
                      v-validate="'required|email'"
                      v-model="user.email"
                      prepend-icon="mdi-email"
                      type="text"
                      color="teal accent-3"
                    />
                    <div
                      v-if="errors.has('email')"
                      class="alert alert-danger"
                      role="alert"
                    >
                      {{ errors.first("email") }}
                    </div>
                    <v-text-field
                      label="Password"
                      name="password"
                      v-validate="'required|min:8'"
                      v-model="user.password"
                      prepend-icon="fas fa-unlock-alt"
                      type="password"
                      color="teal accent-3"
                    />
                    <div
                      v-if="errors.has('password')"
                      class="alert alert-danger"
                      role="alert"
                    >
                      {{ errors.first("password") }}
                    </div>
                    <v-text-field
                      label="Fullname"
                      name="fullname"
                      v-validate="'required'"
                      v-model="user.fullname"
                      prepend-icon="fas fa-hand-paper"
                      type="text"
                      color="teal accent-3"
                    />
                    <div
                      v-if="errors.has('fullname')"
                      class="alert alert-danger"
                      role="alert"
                    >
                      {{ errors.first("fullname") }}
                    </div>
                    <div class="text-center mt-3">
                      <v-btn
                        rounded
                        color="teal accent-3"
                        dark
                        @click.prevent="handleRegister"
                      >
                        Register</v-btn>
                    </div>
                    <br />
                    <!--Snackbar-->
                    <v-snackbar v-model="snackbar" :timeout="timeout">
                      {{ msg }}
                      <template v-slot:action="{ attrs }">
                        <v-btn
                          color="blue"
                          text
                          v-bind="attrs"
                          @click="snackbar = false"
                        >
                          Close</v-btn
                        >
                      </template>
                    </v-snackbar>
                    <div class="form-group">
                      <div
                        v-if="message"
                        class="alert alert-danger"
                        role="alert"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </v-form>
                </v-card-text>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import User from "../models/User";
export default {
  data: () => ({
    step: 1,
    user: new User(""),
    loading: false,
    message: "",
    snackbar:false,
    msg:"",
    timeout:2000,
  }),
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.loading = false;
          return;
        }
        if (this.user.username && this.user.password) {
          this.$store.dispatch("auth/login", this.user).then(
            () => {
              this.$router.push("/");
            },
            (error) => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    },
    handleRegister() {
      this.loading = true;
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        this.$store.dispatch("auth/register", this.user).then(
          () => {
            this.snackbar =true;
            this.msg = ":: Register Successfully";
            this.message = "";
            location.reload();
            
          },
          (error) => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      });
    },
  },
};
</script>