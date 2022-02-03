const dataValidation = (name, date) => {

    const checkData = () => {
        if(name.trim() === "") {
            return { result:false, property: "name" }
        }
        if (date.toString().trim() === ""){
            return { result:false, property: "date" }
        }
        return { result : true };
    }
    return checkData();
}

export default dataValidation
