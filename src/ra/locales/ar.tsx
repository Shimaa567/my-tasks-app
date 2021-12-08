import { TranslationMessages } from "ra-core";
import { englishMessages } from "./en";
import merge from "lodash/merge";

export const arabicMessages: TranslationMessages = merge({}, englishMessages, {
  ra: {
    action: {
      delete: "حذف",
      show: "عرض",
      list: "قائمة",
      create: "إنشاء مهمة جديدة",
      edit: "تعديل مهمة",
      cancel: "إلغاء",
      save: "حفظ",
      remember: "تذكرنى",
      forget_password: "هل نسيت كلمة المرور ؟",
      back: "الرجوع إلى القائمه الرئيسية",
      enter_title: "ادخل عنوان المهمة",
      enter_description: "ادخل وصف المهمة",
    },
    auth: {
      login: "تسجيل دخول",
      sign_in_error: "حدث خطأ فى تسجيل الدخول ، برجاء إعادة المحاولة",
      sign_up: "تسجيل",
      username: "اسم المستخدم",
      username_or_email: "اسم المستخدم او البريد الألكترونى",
      first_name: "الاسم الأول",
      last_name: "الاسم الأخير",
      email: "البريد الإلكترونى",
      password: "كلمة المرور",
      logout: "تسجيل خروج",
      error: "حدث خطأ",
    },
    message: {
      error_message: "تحقق من الخادم الخاص بك",
      delete_message: "هل أنت متأكد أنك تريد حذف هذا العنصر؟",
      register_message: "لا تملك حسابا حتى الآن ؟",
      login_message: "هل لديك حساب بالفعل ؟",
    },
    header: {
      login_header: "تسجيل الدخول إلى حسابك",
      register_header: "",
    },
    notification: {
      welcome_back: "أهلا بعودتك !",
      account_register: "تم التسجيل بنجاح !",
      successfully_created: "تم إنشاء العنصر",
      successfully_updated: "تم تحديث العنصر",
      successfully_deleted: "تمت إزالة العنصر",
    },
    navigation: {
      home: "الصفحة الرئيسية",
      list: "قائمة المهام",
      title: "العنوان",
      description: "الوصف",
      status: "الحالة",
      type: "النوع",
    },
    status: {
      pending: "مُعلَق",
      in_progress: "جارى",
      done: "تم",
    },
    type: {
      work: "عمل",
      personal: "شخصى",
    },
  },
});
