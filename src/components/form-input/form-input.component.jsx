import './form-input.styles.scss'

const FormInput = ({label, ...otherProps}) =>{
    return(
        <div className="group">
            <input className="form-input" {...otherProps}/> {/*using the spread operator to fill upp all the properties we might need to use in the input element*/}
            {label && <label className={`${otherProps.value.length? 'shrink' : ''} form-input-label`}>{label}</label>} {/* if label exist then render the label element - it is taking advantage of the condition evaluation order */}            
        </div>
    )
}

export default FormInput;