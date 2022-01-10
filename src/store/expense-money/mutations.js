export function EXPENSE_MONEY(state, response) {
  state.expensemoneylist = response;
}
export function EXPENSE_MONEY_CATEGORY(state, response) {
  state.expensemoneycategory = response;
}
export function GET_BALANCE(state, response) {
  state.expensemoneylist = response;
}
export function AVEGRAGE_EXPENSE_LIST(state, response) {
  state.expensegroupby = response;
  // console.log(state.expensegroupby);
  // Need to calculate average expense list here
}
