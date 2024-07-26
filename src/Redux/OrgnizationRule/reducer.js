import { organizationRuleConstants } from "./constants";
const initialState = {
 
};
const organizationRuleReducer = (state = initialState, action) => {
  switch (action.type) {
    case organizationRuleConstants.GET_ORGANIZATION_RULE_SUCCESS:
      return {
        ...state,
       
      };
    case organizationRuleConstants.GET_ORGANIZATION_RULE_FAIL:
      return {
        ...state,
       
      };
    
    default:
      return state;
  }
};
export default organizationRuleReducer;
