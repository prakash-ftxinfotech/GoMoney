<template>
  <router-link
    :to="{ name: 'expensedetail', params: { category: expense.category } }"
  >
    <q-card class="expense-card" flat>
      <span
        class="expense-card-background"
        :style="{ backgroundColor: expense.color }"
      ></span>
      <q-card-section horizontal>
        <q-card-section class="col">
          <div class="flex">
            <div class="expense-card-title">
              {{ expense.category }}
            </div>
          </div>
        </q-card-section>
        <q-card-section class="expense-card-amt">
          {{ expense.percentageAmt }}%</q-card-section
        >
      </q-card-section>
    </q-card>
  </router-link>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ExpenseCard",
  props: {
    expense: {
      type: Object,
      required: true,
    },
  },
});
</script>
<style lang="scss" scoped>
.expense-card {
  background-color: transparent;
  overflow: hidden;
  // color: #405dff;
  border-radius: 7px;
  &-title {
    font-size: 22px;
    font-weight: bold;
    color: $primary;
    // margin-top: 15px;
  }
  &-background {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.1;
  }
  &-amt {
    min-width: 130px;
    align-items: center;
    display: flex;
    justify-content: center;
    font-size: 20px;
    color: $primary;
  }
}
</style>
