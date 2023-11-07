import {FormInputLabel, Group, Input,} from './form-input.styles'

const FormInput = ({label, ...otherProps}) =>{
    return(
        <Group>
            <Input {...otherProps}/> {/*using the spread operator to fill upp all the properties we might need to use in the input element*/}
            {label && <FormInputLabel className={`${otherProps.value.length? 'shrink' : ''} form-input-label`}>{label}</FormInputLabel>} {/* if label exist then render the label element - it is taking advantage of the condition evaluation order */}            
        </Group>
    )
}

export default FormInput;