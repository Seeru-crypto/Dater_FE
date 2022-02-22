import config from "../config.json"

const dataValidation = (name, date, description) => {

    const checkData = () => {
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
    return checkData();
}

export default dataValidation
