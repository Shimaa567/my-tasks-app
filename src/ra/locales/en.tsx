import { TranslationMessages } from "ra-core";
import merge from "lodash/merge";

export const englishMessages: TranslationMessages = merge(
  {},
  {
    ra: {
      action: {
        delete: "Delete",
        show: "Show",
        list: "List",
        create: "Create",
        edit: "Edit",
        cancel: "Cancel",
        save: "Save",
      },
      auth: {
        login: "Login",
        sign_in_error: "Error in Login, please try again!",
        sign_up: "Sign Up",
        username: "Username",
        first_name: "First Name",
        last_name: "Last Name",
        email: "Email",
        password: "Password",
        logout: "Logout",
        error: "Error",
      },
      message: {
        delete_message: "Are you sure you want to delete this item ?",
      },
      notification: {
        welcome_back: "Welcome back!",
        account_register: "Account Registered!",
        successfully_created: "Successfully Created!",
        successfully_updated: "Successfully Updated!",
        successfully_deleted: "Successfully Deleted!",
      },
      navigation: {
        home: "Home",
        list: "List of tasks",
      },
      status: {
        status: "Status",
        pending: "Pending",
        in_progress: "In Progress",
        done: "Done",
      },
      type: {
        type: "Type",
        work: "Work",
        personal: "Personal",
      },
    },
  }
);
