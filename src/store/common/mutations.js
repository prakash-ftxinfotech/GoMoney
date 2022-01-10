export function GET_MONEY(state, response) {
  let d = null;
  response.forEach((item) => {
    // console.log(item.amount);
    d = d + item.amount;
  });
  state.walletbalance = d;
}
export function DEDUCT_EXPENSE(state, response) {
  state.walletbalance = state.walletbalance - response;
}
export function UPDATE_WALLET(state, response) {
  state.walletbalance = response;
}
export function LOADING(state, loading) {
  state.loading = loading;
}
