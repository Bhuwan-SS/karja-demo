import { organizationRuleConstants } from "./constants";
// actions
export const getOrganizationRuleSuccessAction = (data) => ({
  type: organizationRuleConstants.GET_ORGANIZATION_RULE_SUCCESS,
  payload: data,
});
export const getOrganizationRuleFailAction = () => ({
  type: organizationRuleConstants.GET_ORGANIZATION_RULE_FAIL,
});
