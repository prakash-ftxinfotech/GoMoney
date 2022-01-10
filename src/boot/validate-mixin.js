import * as methods from "vuelidate/lib/validators";

export default ({ Vue }) => {
  Vue.prototype.validateRequired = (val, message = "Field is Required") => {
    return methods.required(val) || message;
  };
};
