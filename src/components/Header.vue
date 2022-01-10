<template>
  <div class="flex items-center justify-between gomoney-header">
    <q-btn
      flat
      class="bg-positive text-white"
      @click="addMoneyModal = true"
      label="Add Money"
    />
    <!-- add money modal start -->
    <q-dialog v-model="addMoneyModal" position="right" maximized>
      <q-card style="width: 500px">
        <q-card-section>
          <div class="text-h6">Add Your Balance</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="scroll" style="height: calc(100vh - 120px)">
          <q-form class="q-gutter-md" @submit="onSubmit">
            <q-input
              outlined
              v-model.number="addMoneyAmt"
              type="number"
              placeholder="Enter Your Amount"
              :rules="[
                (val) => val != null || 'Field is requred',
                (val) => val != '0' || 'value should be greate then 0',
                (val) => val != '' || 'Field is requred',
              ]"
            />
            <q-separator />
            <div>Choose Category</div>
            <div class="q-gutter-sm q-mt-none">
              <q-radio v-model="addMoneyCategory" val="saving" label="Saving" />
              <q-radio
                v-model="addMoneyCategory"
                val="deposite"
                label="Deposite"
              />
              <q-radio v-model="addMoneyCategory" val="salary" label="Salary" />
            </div>
            <div>
              <q-btn
                label="Submit"
                :loading="loading"
                type="submit"
                color="primary"
              />
            </div>
          </q-form>
        </q-card-section>
        <q-separator />
      </q-card>
    </q-dialog>
    <!-- add money modal end -->

    <!-- add expense modal start -->
    <q-dialog v-model="addExpenseModal" position="right" maximized>
      <q-card style="width: 500px">
        <q-card-section>
          <div class="text-h6">Add Your Expense</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="scroll" style="height: calc(100vh - 120px)">
          <q-form class="q-gutter-md" @submit="onSubmitexpense">
            <q-input
              outlined
              v-model.number="addExpenseAmt"
              type="number"
              placeholder="Enter Your Amount"
              :rules="[
                (val) => val != null || 'Field is requred',
                (val) => val != '0' || 'value should be greate then 0',
                (val) => val != '' || 'Field is requred',
              ]"
            />
            <q-separator />
            <div>Choose Category</div>
            <div class="q-gutter-sm q-mt-none">
              <template
                v-for="expensecategory in getexpensecategory"
                :key="expensecategory.id"
              >
                <q-radio
                  v-model="addExpenseCategory"
                  :val="expensecategory.category"
                  :label="expensecategory.category"
                />
              </template>
            </div>
            <div>
              <q-btn
                label="Submit"
                :loading="loading"
                type="submit"
                color="primary"
              />
            </div>
          </q-form>
        </q-card-section>
        <q-separator />
      </q-card>
    </q-dialog>
    <!-- add expense modal end -->

    <!-- show balance start -->
    <div class="gomoney-header-balance text-weight-bold">
      <div class="">
        <q-icon name="account_balance_wallet" color="primary" size="40px" />
        <span>
          <span class="vertical-middle"> Wallet Balance</span>
          <template
            v-if="!loader"
            transition-show="jump-down"
            transition-hide="jump-up"
          >
            <span
              :class="[
                walletbalance > 0 ? 'text-primary' : 'text-negative',
                'vertical-middle',
              ]"
              style="min-width: 150px; display: inline-block"
            >
              <q-icon name="currency_rupee" class="vertical-middle" />{{
                walletbalance
              }}</span
            >
          </template>
          <template v-if="loader" transition-show="fade" transition-hide="fade">
            <span style="min-width: 150px; display: inline-block">
              <q-spinner-facebook color="primary" size="1em"
            /></span>
          </template>
        </span>
        <span class="vertical-middle text-positive"> </span>
      </div>
    </div>
    <!-- show balance end -->

    <q-btn flat color="white" @click="addExpenseModal = true" class="bg-red"
      >Expense</q-btn
    >
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
export default defineComponent({
  name: "Header",
  setup() {
    return {
      addMoneyModal: ref(false),
      addExpenseModal: ref(false),
      addMoneyCategory: ref("saving"),
      addExpenseCategory: ref("Home"),
      addMoneyAmt: ref(null),
      addExpenseAmt: ref(null),
      loading: ref(false),
    };
  },

  computed: {
    // get expense category to show in add expense modal
    ...mapGetters("expensemoney", ["getexpensecategory"]),

    // get wallet balance and loader
    ...mapGetters("common", ["walletbalance", "loader"]),
  },
  created() {
    // get updated wallect balance on page load and reload
    this.$store.dispatch("common/calculatewalletbalace");

    // get expense category data on page load and set in state
    this.$store.dispatch("expensemoney/getexpensecategory");
  },
  methods: {
    // called on submit add money modal
    onSubmit() {
      this.loading = true;
      this.$store
        .dispatch("addmoney/addmoney", {
          addmoneycategory: this.addMoneyCategory,
          addmoneyamt: this.addMoneyAmt,
        })
        .then((response) => {
          if (response.data) {
            //  close add money modal on success
            this.addMoneyModal = false;
            // / updated wallect balance new data added
            this.$store.dispatch("common/calculatewalletbalace");
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // called on submit add expense modal
    onSubmitexpense() {
      if (!this.addExpenseCategory) return;
      this.loading = true;
      this.$store
        .dispatch("expensemoney/expensemoney", {
          addexpensecategory: this.addExpenseCategory,
          addexpenseamt: this.addExpenseAmt,
        })
        .then((response) => {
          if (response.data) {
            //  close add money modal on success
            this.addExpenseModal = false;
            // / updated wallect balance new data removed
            this.$store.dispatch("common/calculatewalletbalace");
            // this.$router.go(0);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
</script>

<style lang="scss" scoped>
.gomoney-header {
  min-height: 80px;
  color: $dark;
  > .q-btn {
    min-height: 80px;
  }
  &-balance {
    font-size: 26px;
    display: flex;
  }
}
</style>
