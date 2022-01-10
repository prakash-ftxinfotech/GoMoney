import { api } from "src/boot/axios";
import { Notify } from "quasar";

export async function getexpenselist({ commit }) {
  try {
    let data = await api.get("/expensemoney").then((response) => {
      return response;
    });
    // to update expense avg in home page
    // commit("AVEGRAGE_EXPENSE_LIST", data.data);
    return data;
  } catch (error) {
    console.log("Error is :", error);
    Notify.create({
      message: "something wrong :  " + error,
      color: "red",
    });
    return false;
  }
}
export async function getexpensecategory({ commit }) {
  try {
    let data = await api.get("/expensemoneycategory").then((response) => {
      return response;
    });
    if (data) {
      commit("EXPENSE_MONEY_CATEGORY", data.data);
    }
  } catch (error) {
    console.log("Error is :", error);
    Notify.create({
      message: "something wrong :  " + error,
      color: "red",
    });
    return false;
  }
}
export async function expensemoney({ commit, state }, body) {
  try {
    let data = await api
      .post("/expensemoney", {
        amount: body.addexpenseamt,
        category: body.addexpensecategory,
        user: state.user,
        datetime: new Date(),
      })
      .then((response) => {
        Notify.create({
          message: "Expense Added Successfully !",
          color: "green",
        });
        return response;
      });
    if (data) return data;
  } catch (error) {
    console.log("Error is :", error);
    Notify.create({
      message: "something wrong :  " + error,
      color: "red",
    });
    return false;
  }
}
