import config from "../config.json"

const dataValidation = (name, date, desc) => {

    const checkData = () => {
        if(name.trim() === "" || name.trim().length > config.nameMaxLength ) {
            return { result:false, property: "name" }
        }
        if (date.toString().trim() === ""){
            return { result:false, property: "date" }
        }
        if(desc.trim().length > config.descMaxLength ) {
            return { result:false, property: "desc" }
        }

        return { result : true };
    }
    return checkData();
}

export default dataValidation
