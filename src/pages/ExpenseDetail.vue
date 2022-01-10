<template>
  <div class="bg-grey-2 q-pa-md flex items-center">
    <q-btn
      unelevated
      class="q-mr-md"
      icon="arrow_back"
      dense
      @click="this.$router.go(-1)"
    />
    <div class="text-h6 q-ma-none">{{ this.category }}</div>
  </div>
  <div class="q-py-lg">Expense Detail page</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "expensedetail",
  setup() {
    return {};
  },
  props: {
    category: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped></style>
