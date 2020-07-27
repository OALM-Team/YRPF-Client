import { store } from "../app/store";

const langs = {
    "fr": require("../../langs/fr.json"),
    "en": require("../../langs/en.json"),
    "de": require("../../langs/de.json")
}

export const t = (key, params) => {
    if(langs[store.getState().i18n.currentLang][key] != null) {
        let value = langs[store.getState().i18n.currentLang][key];
        for(let i in params) {
            value = value.replace("{" + i + "}", params[i]);
        }
        return value;
    }
    return key;
}

export const syncWithLua = () => {
    window.CallEvent("I18N:Reset");
    for(let k in langs[store.getState().i18n.currentLang]) {
        let value = langs[store.getState().i18n.currentLang][k];
        window.CallEvent("I18N:AddKeyValue", k, value);
    }
}

export const addKeyValue = (lang, key, value) => {
    langs[lang][key] = value;
}