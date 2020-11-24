<template>
        <v-container fluid grid-list-md>
          <h2>Food Shop</h2>
          <v-layout row wrap>
            <v-flex
              xs12
              md6
              lg4
              v-for="(item, index) in filterFood"
              :key="index"
            >
              <v-card flat tile height="550px">
                <v-img :src="item.Image" height="400px" />
                <v-card-text>
                  <div class="display-5 font-weight-light orange--text mb-2">
                    {{ item.Title }}
                  </div>
                  <div class="dispaly-6 teal--text text--accent-3">
                    $ {{ item.Price }}
                  </div>
                  <v-btn
                    :disabled="!item.inventory"
                    @click="addCart(item.Id)"
                    :class="{
                      red: item.inventory == 1,
                      green: item.inventory >= 2,
                      'dark-grey': !item.inventory,
                    }"
                  >
                    <span v-if="item.inventory == 1"
                      >最後 {{ item.inventory }} 客</span
                    >
                    <span v-if="item.inventory >= 2"
                      >限量 {{ item.inventory }} 客</span
                    >
                    <span v-if="!item.inventory">賣完</span>
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <div class="text-center">
            <v-pagination v-model="page" :length="pages" circle></v-pagination>
          </div>
        </v-container>
      
    
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      page: 1,
      totalPages: 3,
      pagination: { rowsPerPage: 6 },
    };
  },
  computed: {
    ...mapGetters({
      foodList: "getProducts",
    }),
    pages() {
      return this.pagination.rowsPerPage
        ? Math.ceil(this.foodList.length / this.pagination.rowsPerPage)
        : 0;
    },
    inCart() {
      return this.$store.getters.getCartList;
    },
    filterFood() {
      return this.foodList.slice(
        (this.page - 1) * this.pagination.rowsPerPage,
        this.page * this.pagination.rowsPerPage
      );
    },
  },
  methods: {
    ...mapActions(["addCart","setProduct"]),
  },
  created(){
    this.setProduct()
  }
};
</script>