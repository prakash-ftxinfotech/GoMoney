<template>
  <div class="row q-col-gutter-md full-width">
    <div class="col-md-4" v-for="expenselist in expenses" :key="expenselist">
      <!-- {{ expenselist }} -->
      <ExpenseCard v-bind:expense="expenselist" />
    </div>
  </div>
</template>

<script>
import ExpenseCard from "components/ExpenseCard.vue";
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
export default defineComponent({
  name: "ExpenseList",
  setup() {
    return {
      getExpenseAverage: ref([]),
    };
  },

  computed: {
    ...mapGetters("expensemoney", ["getexpensegroupby"]),
    ...mapGetters("common", ["walletbalance"]),
    expenses() {
      let result = [];
      let color;
      for (const key of Object.keys(this.getexpensegroupby)) {
        let sum = this.getexpensegroupby[key].reduce((a, b) => {
          return a + b.amount;
        }, 0);

        // console.log(color);
        let percentageAmt;
        // console.log("sum");
        if (sum) {
          percentageAmt = ((sum / this.walletbalance) * 100).toFixed(4);
        }

        if (this.getexpensegroupby[key].length) {
          color = this.getRandomColor();
          // console.log(color);
          result.push(
            Object.assign(
              {},
              this.getexpensegroupby[key][0],
              { sum },
              { percentageAmt },
              { color }
            )
          );
        } else result.push([]);
      }
      return result;
    },
  },

  components: {
    ExpenseCard,
  },
  async created() {
    let response = await this.$store.dispatch("expensemoney/getexpenselist");
    if (response && response.data) {
      let groupByData = this.groupByKey(response.data, "category");
      this.$store.commit("expensemoney/AVEGRAGE_EXPENSE_LIST", groupByData);
    }
  },
  methods: {
    getRandomColor() {
      let letters = "1234567890abcdef";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    groupByKey(array, key) {
      return array.reduce((hash, obj) => {
        if (obj[key] === undefined) return hash;
        return Object.assign(hash, {
          [obj[key]]: (hash[obj[key]] || []).concat(obj),
        });
      }, {});
    },
  },
});
</script>
