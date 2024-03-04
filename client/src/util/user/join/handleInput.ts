import { ChangeEvent } from "react";
import { userInterface } from "../../../interface/user/userInterface";

export const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setFormValues: (value: userInterface) => void, formValues: userInterface, setCheckPass: (value: boolean) => void) => {
    const { name, value} = e.target;
    setFormValues({
        ...formValues,
        [e.target.name]: e.target.value
    });
    if(name === 'youPassC') {
        setCheckPass(formValues.youPass === value)
    }
}
export default handleInputChange