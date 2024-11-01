import i18n from "i18next";
import { initReactI18next } from "react-i18next";
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        import: "Import",
        export: "Export(JSON)",
        selected: "Selected: ",
        basicFlow: "Basic",
        dbFlow: "Database",
        mostUsedType: "Most used",
        numericType: "Numeric",
        dateAndTimeType: "Date & time",
        stringType: "String",
        arraysType: "Arrays",
        otherType: "Other",
        language: "Language",
      },
    },
    ru: {
      translation: {
        import: "Импорт",
        export: "Экспорт(JSON)",
        selected: "Выбрано: ",
        basicFlow: "Простые",
        dbFlow: "Базы данных",
        mostUsedType: "Частые",
        numericType: "Числовые",
        dateAndTimeType: "Дата и время",
        stringType: "Строковые",
        arraysType: "Массивы",
        otherType: "Другое",
        language: "Язык",
      },
    },
  },

  fallbackLng: "ru",
});
export default i18n;
