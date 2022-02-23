import config from "../config.json"

export const eventDataValidation = (name, date, description) => {

        if(name.trim() === "" || name.trim().length > config.NAME_MAX_LEN ) {
            return { result:false, property: "name" }
        }
        if (date.toString().trim() === "" || date.toString().trim() === "Invalid Date"  ){
            return { result:false, property: "date" }
        }
        if(description.trim().length > config.DESC_MAX_LEN ) {
            return { result:false, property: "description" }
        }
        return { result : true };
}

export const adminDataValidation = (userMailAddress) => {

    if (userMailAddress.length > config.MAX_EMAIL_LENGTH) {
        return { result:false, property: "userMailAddressLength" }
    }
    if (!document.getElementById("adminEmailInput").validity.valid) {
        return { result:false, property: "userMailAddressInvalid" };
    }
    return { result : true };

}