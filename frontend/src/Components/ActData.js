//Este archivo contendrá el actualizador de datos una vez se autentique con Google por primera vez en el sistema
import React, {Component} from 'react';


class ActData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redes: [{redes: ""}]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addClick(){
        this.setState(prevState => ({
            redes: [...prevState.redes, { redes: ""}]
        }))
    }

    createUI(){
        return this.state.redes.map((el, i) => (
            <div key={i} className="form-group">
                <label htmlFor="InputRedes">Red Social #{i+1}</label>
                <input type='text' className="form-control" id="InputRedes" placeholder="Inserte URL de su perfil en red social" value={el.redes ||''} onChange={this.handleChange.bind(this, i)} />
                <input type='button' className="form-control" value='Eliminar' onClick={this.removeClick.bind(this, i)}/>
                <br/>
            </div>
        ))
    }

    handleChange(i, e) {
        const { name, value } = e.target;
        let redes = [...this.state.redes];
        redes[i] = {...redes[i], [name]: value};
        this.setState({ redes });
    }

    removeClick(i){
        let redes = [...this.state.redes];
        redes.splice(i, 1);
        this.setState({ redes });
    }

    handleSubmit(event) {
        alert('Una red social fue añadida ' + JSON.stringify(this.state.redes));
        event.preventDefault();
    }

    render() {
        return (
            <div className="Plantilla-body">
                <h1>Actualización de datos</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="InputCodigo">Código U.F.P.S.</label>
                        <input type="text" className="form-control" id="InputCodigo"
                               placeholder="Digite su código de estudiante U.F.P.S"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputEmail1">Email Personal</label>
                        <input type="email" className="form-control" id="InputEmail"
                               aria-describedby="emailHelp" placeholder="Digite su email personal"/>
                            <small id="emailHelp" className="form-text text-muted">Nunca compartiremos esta información con nadie más</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputDireccion">Dirección</label>
                        <input type="text" className="form-control" id="InputDireccion"
                               placeholder="Digite su dirección de residencia"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputTelefono">Teléfono</label>
                        <input type="text" className="form-control" id="InputTelefono"
                               placeholder="Digite su número telefónico"/>
                    </div>
                    <div className="form-group" >
                        {this.createUI()}
                        <input type="button" className="form-control" id="buttonRedes"
                               value="Agregar red social" onClick={this.addClick.bind(this)}/>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="CheckLider"/>
                            <label className="form-check-label" htmlFor="exampleCheck1">Seleccione si desea ser Líder</label>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary">Actualizar</button>
                </form>
            </div>

        );
    }
}

export default ActData;