import { useState } from "react";
import { createUserDocumentFromAuth, signInWithGooglePopup, singInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils.";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () =>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;


    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }

    const singInWithGoogle = async () => {
        await signInWithGooglePopup();    
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();

        try {
            await singInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (error) {
            switch(error.code){
                case "auth/wrong-password":
                    alert('incorrect password or email');
                    break;
                case "auth/user-not-found":
                    alert("No user associated with this email")
                    break;
                default: console.log(error.code);
            }
        }
    }

    const handleChange = (event) =>{
        const {name, value} = event.target;

        setFormFields({...formFields,[name]: value });
    }

    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>               
                <FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email}/>
                <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password}/>
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType='google' onClick = {singInWithGoogle}>Google sing in</Button> {/*By default buttons are type "submit" wjhen inside froms - you need to specified another type*/}
                </div>                
            </form>
        </div>
    );
};

export default SignInForm;