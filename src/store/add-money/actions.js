import { api } from "src/boot/axios";
import { Notify } from "quasar";

export async function addmoney({ commit, state }, body) {
  try {
    let data = await api
      .post("/addmoney", {
        amount: body.addmoneyamt,
        category: body.addmoneycategory,
        user: state.user,
        datetime: new Date(),
      })
      .then((response) => {
        Notify.create({
          message: "Amount Added Successfully !",
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
export async function getmoneylist() {
  try {
    let data = await api.get("/addmoney").then((response) => {
      return response;
    });
    if (data) {
      return data;
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
