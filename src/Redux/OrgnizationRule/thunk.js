import * as API from "./api";
import * as action from "./action";
//login
export const getOrganizationRule = () => async (dispatch) => {
  try {
    const { data } = await API.getOrganizationRule();
    dispatch(action.getOrganizationRuleSuccessAction(data));
    return true;
  } catch (error) {
    dispatch(action.getOrganizationRuleFailAction(error));
    return false;
  }
};
