import React, {Component} from "react";


class Menu extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        console.log(this.props)
        if(this.props.rol.admin){
            return(
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">
                        <li className="nav-item has-treeview menu-open">

                        </li>
                        <li className="nav-item">
                            <a href="./admin"  className="nav-link">
                                <i className="nav-icon fas fa-th"></i>
                                <p>
                                    Busqueda de proyectos
                                </p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="./buscar_personas" className="nav-link">
                                <i className="nav-icon fas fa-th"></i>
                                <p>
                                    Busqueda de personas
                                </p>
                            </a>
                        </li>
                    </ul>
                </nav>
            );
        }else if(this.props.rol.leader){
            return(
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">
                        <li className="nav-item has-treeview menu-open">

                        </li>
                        <li className="nav-item">
                            <a href="./lider"  className="nav-link">
                                <i className="nav-icon fas fa-edit"></i>
                                <p>
                                    Proyecto
                                </p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="./verIntegrantes"  className="nav-link">
                                <i className="nav-icon fas fa-edit"></i>
                                <p>
                                    Ver Integrantes
                                </p>
                            </a>
                        </li>
                    </ul>
                </nav>
            );
        }else{
            return (<nav></nav>);
        }

    }
}
export default Menu;
