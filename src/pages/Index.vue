<template>
  <q-page class="q-py-lg"> <ExpenseList /> </q-page>
</template>

<script>
import ExpenseList from "./ExpenseList.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
  components: {
    ExpenseList,
  },
});
</script>
