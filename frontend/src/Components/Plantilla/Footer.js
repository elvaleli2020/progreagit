import React from 'react';
import '../../Styles/Plantilla.css';


function Footer() {

    return (
        <footer className="Plantilla-footer">
            <div className="col-sm-4 md-margin-bottom-40">
                <div>
                    <div><h2>Portales Institucionales</h2></div>
                    <ul className="list-unstyled latest-list">
                        <li>
                            <a href="https://divisist2.ufps.edu.co/">Divisist</a>
                        </li>
                        <li>
                            <a href="http://dptosist.ufps.edu.co/piagev1/servlet/piagev">Piagev</a>
                        </li>
                        <li>
                            <a href="https://ww2.ufps.edu.co/universidad/atencion_ciudadano">PDQRS</a>
                        </li>
                        <li>
                            <a href="http://ugad.ufps.edu.co:8084/datarsoft001/home.ufps">DatarSoft</a>
                        </li>
                        <li>
                            <a href="http://nomina.ufps.edu.co:9191/nominaufps">Sistema de Nómina</a>
                        </li>
                        <li>
                            <a href="http://www.ufps.edu.co/ufps/cread/Presentacion.php">DISERACA</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-sm-4  md-margin-bottom-40">
                <div><h2>Enlaces de Interés</h2></div>
                <ul className="list-unstyled latest-list">
                    <li><a href="https://ww2.ufps.edu.co/universidad/planeacion/655">Plan
                        Anticorrupción</a></li>
                    <li><a href="https://ww2.ufps.edu.co/universidad/seleccion">Proceso de
                        selección</a></li>
                    <li><a href="https://ww2.ufps.edu.co/universidad/contratacion/1122"
                    >Contratación</a></li>
                    <li><a href="https://ww2.ufps.edu.co/informacion/proceso_democratico_2019"
                    >Proceso democrático</a></li>
                    <li><a href="https://ww2.ufps.edu.co/vicerrectoria/vicerrectoria-administrativa/527"
                    >Derechos pecuniarios </a></li>
                    <li><a href="https://mail.google.com/a/ufps.edu.co/">Correo
                        Electrónico Institucional</a></li>
                    <li><a href="https://ww2.ufps.edu.co/universidad/consultorio-juridico/1156"
                    >Consultorio Jurídico </a></li>
                </ul>
            </div>
            <div className=" col-sm-4  map-img md-margin-bottom-40">
                <div><h2>Contactos</h2></div>
                <address className="md-margin-bottom-40">
                    Avenida Gran Colombia No. 12E-96 Barrio Colsag, <br/>
                    San José de Cúcuta - Colombia <br/>
                    Teléfono (057)(7) 5776655 <br/> <br/>
                </address>
            </div>

        </footer>
    )

}

export default Footer;