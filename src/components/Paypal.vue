<template>
  <v-row>
    <v-col cols="12" lg="6" md="6" xs="12">
      <v-card class="elevation-12">
        <v-card-text class="mt-12">
          <h4 class="text-center  teal">購買清單如下:</h4>
          <ul style="text-align:left">
            <li v-for="(item, index) in cartList" :key="index">
              項目:{{index+1}} : 餐點 => {{item.title}} , 數量 => {{item.qty}}, 價格 => ${{item.price}}
            </li>
          </ul>
          <span class="red">總金額 : {{total}} 元 </span>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text class="mt-12">
          <h4 class="text-canter teal">請輸入送件地址</h4>

        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" lg="6" md="6" xs="12">
      <v-card class="elevation-12">
        <v-card-text class="mt-12">
          <h1 class="text-center teal">Payment Information</h1>

          <v-form>
            <v-text-field
              label="Amount"
              name="amount"
              type="text"
              v-model="total"
              color="teal accent-3"
              prepend-icon="fas fa-dollar-sign"
              disabled
            />
            <v-divider></v-divider>
            <v-text-field
              label="Credit Card Number"
              name="creditcard"
              v-validate="'required|credit_card'"
              v-model="creditcard"
              color="teal accent-3"
              prepend-icon="fab fa-cc-visa"
              type="text"
            />
            <div
              v-if="errors.has('creditcard')"
              class="alert alert-danger"
              role="alert"
            >
              {{ errors.first("creditcard") }}
            </div>
            <v-row>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  label="Expire Date(MM/YY)"
                  name="expiredate"
                  v-validate="'required|date_format:MM/yyyy'"
                  v-model="expiredate"
                  color="teal accent-3"
                  prepend-icon="far fa-calendar-alt"
                  type="text"
                />
                <div
                  v-if="errors.has('expiredate')"
                  class="alert alert-danger"
                  role="alert"
                >
                  {{ errors.first("expiredate") }}
                </div>
              </v-col>

              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  label="CVV"
                  name="cvv"
                  v-validate="'required|min:3|max:3'"
                  v-model="cvv"
                  color="teal accent-3"
                  prepend-icon="fab fa-cc-amex"
                  type="text"
                />
                <div
                  v-if="errors.has('cvv')"
                  class="alert alert-danger"
                  role="alert"
                >
                  {{ errors.first("cvv") }}
                </div>
              </v-col>
            </v-row>
            <div class="text-center">
              <v-btn
                rounded
                color="teal accent-3"
                dark
                @click.prevent="payWithCreditCard"
              >
                Pay with Credit Card</v-btn
              >
            </div>
            <div class="form-group">
              <div v-if="message" class="alert alert-danger" role="alert">
                {{ message }}
              </div>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      amount: 10,
      creditcard: "",
      expiredate: "",
      cvv: "",
      message: "",
      hostedFieldInstance: false,
    };
  },
  computed: {
    ...mapGetters({
      total: "getCartPriceTotal",
      cartList: "getCartList",
    }),
  },
  methods: {
    payWithCreditCard() {
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          return;
        }
      });
      if (this.hostedFieldInstance) {
        this.hostedFieldInstance
          .tokenize()
          .then((payload) => {
            console.log(payload);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
  },
  mounted() {},
};
</script>
<style>
h1 ,h4{
  border-radius:10px;
}
</style>
