<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" lg="4" md="4" sm="12">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="公司代號"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="4" md="4" sm="12">
        <v-text-field
          v-model="search1"
          append-icon="mdi-magnify"
          label="公司名稱"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="7" md="7" sm="12">
        <v-row>
          <v-col cols="12" lg="12" md="12" sm="12">
            <v-simple-table>
              <template>
                <thead>
                  <tr>
                    <th class="text-left">證券代號</th>
                    <th class="text-left">證券名稱</th>
                    <th class="text-left">開盤價</th>
                    <th class="text-left">最高價</th>
                    <th class="text-left">最低價</th>
                    <th class="text-left">收盤價</th>
                    <th class="text-left">成交筆數</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in filterDay" :key="index">
                    <td class="text-left">{{ item["證券代號"] }}</td>
                    <td class="text-left">{{ item["證券名稱"] }}</td>
                    <td class="text-left">{{ item["開盤價"] }}</td>
                    <td class="text-left">{{ item["最高價"] }}</td>
                    <td class="text-left">{{ item["最低價"] }}</td>
                    <td class="text-left">{{ item["收盤價"] }}</td>
                    <td class="text-left">{{ item["成交筆數"] }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
          <v-col cols="12" lg="12" md="12" sm="12">
            <v-simple-table>
              <template>
                <thead>
                  <tr>
                    <th
                      class="text-left"
                      v-for="(header, index) in parse_header"
                      :key="index"
                    >
                      {{ header }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in filterSearch" :key="index">
                    <td
                      class="text-left"
                      v-for="key in parse_header"
                      :key="key"
                    >
                      {{ item[key] }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="5" md="5" sm="12">
        <v-simple-table>
          <template>
            <thead>
              <tr>
                <th class="text-left">公司代號</th>
                <th class="text-left">公司名稱</th>
                <th class="text-left">EPS(元)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in filterEps" :key="index">
                <td class="text-left">{{ item["公司代號"] }}</td>
                <td class="text-left">{{ item["公司名稱"] }}</td>
                <td class="text-left">{{ item["基本每股盈餘(元)"] }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import getstock from "../service/getstock.service";
// @ is an alias to /src
export default {
  name: "Home",
  data() {
    return {
      parse_header: [
        "證券代號",
        "證券名稱",
        "殖利率(%)",
        "股利年度",
        "本益比",
        "股價淨值比",
        "財報年/季",
      ],
      parse_csv: [],
      search: "",
      search1: "",
      parse_header_day: [
        "證券代號",
        "證券名稱",
        "成交股數",
        "成交金額",
        "開盤價",
        "最高價",
        "最低價",
        "收盤價",
        "漲跌價差",
        "成交筆數",
      ],
      parse_csv_day: [],
      parse_header_eps: [
        "出表日期",
        "年度",
        "季別",
        "公司代號",
        "公司名稱",
        "產業別",
        "基本每股盈餘(元)",
        "普通股每股面額",
        "營業收入",
        "營業利益",
        "營業外收入及支出",
        "稅後淨利",
      ],
      parse_csv_eps: [],
    };
  },
  computed: {
    filterSearch() {
      var key = this.search;
      var key1 = this.search1;
      var header = this.parse_header;
      return this.parse_csv.filter(function (item) {
        return (
          item[header[0]]
            .toString()
            .toLowerCase()
            .indexOf(key.toString().toLowerCase()) != -1 &&
          item[header[1]]
            .toString()
            .toLowerCase()
            .indexOf(key1.toString().toLowerCase()) != -1
        );
      });
    },
    filterDay() {
      var key = this.search;
      var key1 = this.search1;
      var header = this.parse_header_day;
      return this.parse_csv_day.filter(function (item) {
        return (
          item[header[0]]
            .toString()
            .toLowerCase()
            .indexOf(key.toString().toLowerCase()) != -1 &&
          item[header[1]]
            .toString()
            .toLowerCase()
            .indexOf(key1.toString().toLowerCase()) != -1
        );
      });
    },
    filterEps() {
      var key = this.search;
      var key1 = this.search1;
      var header = this.parse_header_eps;
      return this.parse_csv_eps.filter(function (item) {
        return (
          item[header[3]]
            .toString()
            .toLowerCase()
            .indexOf(key.toString().toLowerCase()) != -1 &&
          item[header[4]]
            .toString()
            .toLowerCase()
            .indexOf(key1.toString().toLowerCase()) != -1
        );
      });
    },
  },
  methods: {
    async getdata() {
      return await getstock.getData().then((response) => {
        var header = this.parse_header;
        this.parse_csv = this.csvJson(response.data, header);
      });
    },
    async getday() {
      return await getstock.getDay().then((response) => {
        var header = this.parse_header_day;
        this.parse_csv_day = this.csvJson(response.data, header);
      });
    },
    async geteps() {
      return await getstock.getEps().then((response) => {
        var header = this.parse_header_eps;
        this.parse_csv_eps = this.csvJson(response.data, header);
      });
    },
    csvJson(csv, headers) {
      var lines = csv.split("\r\n");
      var result = [];

      lines.map(function (line, indexLine) {
        if (indexLine < 1) return;

        var obj = {};
        var currentline = line.split(",");

        headers.map(function (header, indexHeader) {
          obj[header] = currentline[indexHeader];
        });

        result.push(obj);
      });

      result.pop();

      return result;
    },
  },
  created() {
    this.getdata();
    this.getday();
    this.geteps();
  },
};
</script>
