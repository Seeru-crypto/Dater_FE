const dataValidation = (name, date) => {

    const checkData = () => {
        if(name.trim() === "" || date.toString().trim() === "") {
            return false
        }
        return true;
    }
    return checkData();
}

export default dataValidation
