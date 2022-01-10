import { api } from "src/boot/axios";
import { Notify } from "quasar";

export async function calculatewalletbalace({ commit }) {
  try {
    commit("LOADING", true);
    let expensedata = await api.get("/expensemoney").then((response) => {
      return response;
    });
    let moneydata = await api.get("/addmoney").then((response) => {
      return response;
    });
    if (expensedata && moneydata) {
      let getmoney = null;
      let getexpense = null;
      moneydata.data.forEach((element) => {
        getmoney = getmoney + element.amount;
      });
      expensedata.data.forEach((element) => {
        getexpense = getexpense + element.amount;
      });
      commit("UPDATE_WALLET", getmoney - getexpense);

      return;
    }
  } catch (error) {
    console.log("Error is :", error);
    Notify.create({
      message: "something wrong :  " + error,
      color: "red",
    });
    return false;
  } finally {
    commit("LOADING", false);
  }
}
