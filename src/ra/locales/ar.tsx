import { TranslationMessages } from "ra-core";
import { englishMessages } from "./en";
import merge from "lodash/merge";

export const arabicMessages: TranslationMessages = merge({}, englishMessages, {
  ra: {
    action: {
      delete: "حذف",
      show: "عرض",
      list: "قائمة",
      create: "إنشاء",
      edit: "تعديل",
      cancel: "إلغاء",
      save: "حفظ",
    },
    auth: {
      login: "تسجيل دخول",
      sign_in_error: "حدث خطأ فى تسجيل الدخول ، برجاء إعادة المحاولة",
      sign_up: "تسجيل",
      username: "اسم المستخدم",
      first_name: "الاسم الأول",
      last_name: "الاسم الأخير",
      email: "البريد الإلكترونى",
      password: "كلمة المرور",
      logout: "تسجيل خروج",
      error: "خطأ",
    },
    message: {
      delete_message: "هل أنت متأكد أنك تريد حذف هذا العنصر؟",
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
    },
    status: {
      status: "الحالة",
      pending: "مُعلَق",
      in_progress: "جارى",
      done: "تم",
    },
    type: {
      type: "النوع",
      work: "عمل",
      personal: "شخصى",
    },
  },
});
