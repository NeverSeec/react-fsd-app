interface Value {
    name: string;
    email: string;
    message: string;
}

export interface FormState {
    values: Value;
    errors: Partial<Value>;
    status: "idle" | "submitting" | "success" | "error";
    isDirty: boolean;
}

export type FormAction =
    | { type: "SET_FIELD"; field: string; value: string }
    | { type: "SET_ERRORS"; errors: FormState["errors"] }
    | { type: "SET_STATUS"; status: FormState["status"] }
    | { type: "SET_DIRTY"; isDirty: boolean }
    | { type: "RESET_FORM" };
