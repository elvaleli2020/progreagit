
//Función para los checkbox
export function handleInputCheckBox(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const id = target.id;
    this.setState({
        [id]: value
    });
}

// Función pala los imputs
export function handleInputChange(event) {
    const target = event.target;
    const id = target.id;
    const inputValue = target.value;
    this.setState({
        [id] : inputValue
    });
}
