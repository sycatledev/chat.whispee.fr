import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "../../lang/en.json";
import frTranslation from "../../lang/fr.json";
import esTranslation from "../../lang/es.json";

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: enTranslation,
		},
		fr: {
			translation: frTranslation,
		},
		es: {
			translation: esTranslation,
		},
	},
	lng: "fr", // Langue par défaut
	fallbackLng: "en", // Langue de secours en cas de traduction manquante
	interpolation: {
		escapeValue: false, // Pour éviter l'échappement automatique des valeurs
	},
});
