<template>
  <div class="recommend">
    <v-row>
      <v-col cols="12" md="3" sm="3">
        <v-card flat tile>
          <v-img :src="recommend.Image" height="400px" />
        </v-card>
      </v-col>
      <v-col cols="12" md="9" sm="9">
        <div class="recommend-info">
          <h2>{{ recommend.Title }}</h2>
          <hr />
          <h3>
            Just some random text, lorem ipsum text praesent tincidunt ipsum
            lipsum. Just some random text, Once again, some random text to lorem
            lorem lorem lorem ipsum text praesent tincidunt ipsum lipsum.
          </h3>
          <hr />
          <h4 class="teal--text text--accent-3">${{ recommend.Price }}</h4>
          <v-btn color="accent" @click="addCart(recommend.Id)">
            <v-icon small>fas fa-cart-plus</v-icon>
            加購
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <div class="panel panel-default">
      <div class="panel-heading panel-price">
        總計： <span>${{ total }}</span> 元
      </div>
    </div>
    <v-divider></v-divider>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">項目</th>
            <th class="text-left">餐點</th>
            <th class="text-left">數量</th>
            <th class="text-left">價錢</th>
            <th class="text-left">取消預訂</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cartList" :key="index">
            <td class="text-left">{{ index + 1 }}</td>
            <td class="text-left">{{ item.Title }}</td>
            <td class="text-left"><v-icon @click="reduceOne(item.Id)" small>fas fa-minus</v-icon> {{item.qty}} <v-icon @click="addCart(item.Id)" small>fas fa-plus-circle</v-icon></td>
            <td class="text-left">{{ item.Price }}</td>
            <td class="text-left">
              <v-icon @click="cancelCart(item.Title)" small
                >far fa-trash-alt</v-icon
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-row>
      <v-col cols="12" md="6" sm="6">
        <v-btn width="100%" color="primary" to="/product">回餐點列表</v-btn>
      </v-col>
      <v-col cols="12" md="6" sm="6">
        <v-btn
          width="100%"
          color="success"
          to="/product/paypal"
          :disabled=" btndisable()"
          >結帳去</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      istrue: false,
    };
  },
  computed: {
    ...mapGetters({
      recommend: "getpopularProducts",
      cartList: "getCartList",
      total: "getCartPriceTotal",
    }),
   
  },
  methods: {
    ...mapActions(["addCart", "cancelCart", "reduceOne","setProduct"]),
      btndisable() {
      if (this.total === 0) {
        return this.istrue = true;
      } else {
        return this.istrue = false;
      }
    },
  },
  created(){
    this.setProduct()
  }
 
};
</script>
<style scoped>
.panel-default {
  text-align: left;
}
.panel-price {
  font-size: 2em;
}
.panel-price span {
  color: #d9534f;
}
.recommend {
  padding: 40px 80px;
}
.recommend-info {
  padding: 20px;
  text-align: left;
}
.recommend-info h3 {
  font-weight: lighter;
}
</style>