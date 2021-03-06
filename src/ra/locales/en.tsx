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
        create: "Create a new Task",
        edit: "Edit a Task",
        cancel: "Cancel",
        save: "Save",
        remember: "Remember me",
        forget_password: "Forget your password ?",
        back: "Back to Tasks",
        enter_title: "Enter the task title",
        enter_description: "Enter the task description",
      },
      auth: {
        login: "Login",
        sign_in_error: "Error in Login, please try again!",
        sign_up: "Sign Up",
        username: "Username",
        username_or_email: "User Name or Email",
        first_name: "First Name",
        last_name: "Last Name",
        email: "Email",
        password: "Password",
        logout: "Logout",
        error: "There's an error occurred",
      },
      message: {
        error_message: "Check your server",
        delete_message: "Are you sure you want to delete this item ?",
        register_message: "Don't have an account yet?",
        login_message: "Already have an account?",
      },
      header: {
        login_header: "Login to your Account",
        register_header: "",
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
        title: "Title",

        description: "Description",
        status: "Status",
        type: "Type",
      },
      status: {
        pending: "Pending",
        in_progress: "In Progress",
        done: "Done",
      },
      type: {
        work: "Work",
        personal: "Personal",
      },
    },
  }
);
