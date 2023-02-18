import DefaultSettings from "./DefaultSettings";

// Handlers
import RestaurantsSettingsHandler from "./handlers/RestaurantsSettingsHandler";

class Settings {

    constructor(api) {
        this.api = api;
        this.handlers = [
            new RestaurantsSettingsHandler(this.api)
        ]
        this.load();
        this.handleSettings();
    }


    load() {
        let values = localStorage.getItem('settings.values');
        if (values)
            this.values = JSON.parse(values);
        else
            this.values = this.create().save().values;
        return this;
    }

    async handleSettings() {
        this.settings = DefaultSettings;
        if (this.handlers) {
            for (let i = 0; i < this.handlers.length; i++) {
                const handler = this.handlers[i];
                this.settings = await handler.handle(this.settings);
            }
        }
        return this.settings;
    }

    save() {
        if (this.values)
            localStorage.setItem('settings.values', JSON.stringify(this.values));
        return this;
    }


    create() {
        let data = {}
        Object.keys(this.settings).forEach((settingKey) => {
            let settingData = {}

            const values = this.settings[settingKey].values;
            Object.keys(values).forEach((valueKey) => {
                const value = values[valueKey];
                if (value) {
                    switch (value.type?.toLowerCase()) {

                        case "map":
                        case "form":
                            if (value.value)
                                Object.keys(value.value).forEach((mapKey) => {
                                    const mapValue = value.value[mapKey];
                                    if (mapValue) {
                                        if (!settingData[valueKey])
                                            settingData[valueKey] = {}

                                        settingData[valueKey][mapKey] = this.parseValue(mapValue)
                                    }
                                })
                            break;

                        default:
                            settingData[valueKey] = value.value
                            break;
                    }
                }
            })

            data[settingKey] = settingData;
        })
        this.values = data;

        return this;
    }


    parseValue(value) {
        if (value && typeof value === 'object') {

            if (value.value !== null)
                return this.parseValue(value.value)

            let parsedValue = {};
            Object.keys(value).forEach((mapKey) => {
                const mapValue = value[mapKey];
                if (mapValue)
                    parsedValue[mapKey] = this.parseValue(mapValue)

            })
            return parsedValue;
        }
        return value;
    }

    applyPlaceholders(string, placeholders, prefix = "") {
        if (string && placeholders) {
            const object = JSON.parse(JSON.stringify(placeholders));
            Object.keys(object).forEach((key) => {
                const value = object[key];
                if (typeof value !== 'object')
                    string = string.replaceAll(`{${prefix}${key}}`, value)
                else
                    string = this.applyPlaceholders(string, value, `${key}.`)
            })
        }
        return string;
    }

}


export default Settings;