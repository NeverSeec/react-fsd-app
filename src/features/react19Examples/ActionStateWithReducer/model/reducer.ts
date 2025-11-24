import type { FormState, FormAction } from "../lib/types.ts";

export const initialFormState: FormState = {
  values: {
    name: "",
    email: "",
    message: "",
  },
  errors: {},
  status: "idle",
  isDirty: false,
};

export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value,
        },
        isDirty: true,
      };

    case "SET_STATUS":
      return {
        ...state,
        status: action.status,
      };

    case "RESET_FORM":
      return initialFormState;

    default:
      return state;
  }
}
