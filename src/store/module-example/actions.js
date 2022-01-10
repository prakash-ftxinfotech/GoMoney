export async function someaction({ commit }, body) {
  try {
    // let { data } = await ConfigurationAgent.validateBetaCode(code);
    // if (data) return data;
    console.log("hello:", body);
  } catch (error) {
    console.log(error);
    return false;
  }
}
