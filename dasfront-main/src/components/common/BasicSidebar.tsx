import '@coreui/coreui/dist/css/coreui.min.css';
import { cilBarChart, cilBuilding, cilCart, cilDollar, cilFastfood, cilPeople } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CNavGroup, CNavItem, CNavTitle, CSidebar, CSidebarNav } from "@coreui/react";
import React from 'react';
import { Link } from 'react-router-dom';


const BasicSidebar: React.FC = () => {

    return (
        <div>
            <CSidebar className="border-end d-flex flex-column" style={{ width: '260px', height: '100vh', backgroundColor: '#f0f2f5' }}>
                <CSidebarNav>
                    <CNavTitle style={{ color: '#4D648D', fontSize: '1.2rem', margin: '20px 0', textAlign: 'center' }}>
                        Dashboard
                    </CNavTitle>
                    <CNavItem style={{ margin: '10px 0' }}>
                        <Link to="/" className="nav-link" style={{ color: '#4D648D', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                            <CIcon customClassName="nav-icon" icon={cilBarChart} />
                            <span style={{ marginLeft: '10px' }}>Inicio</span>
                        </Link>
                    </CNavItem>

                    <CNavItem style={{ margin: '10px 0' }}>
                        <Link to="/empresas" className="nav-link" style={{ color: '#4D648D', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                            <CIcon customClassName="nav-icon" icon={cilBuilding} />
                            <span style={{ marginLeft: '10px' }}>Empresa</span>
                        </Link>
                    </CNavItem>
                    <CNavGroup
                        toggler={
                            <div style={{ color: '#4D648D', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                                <CIcon customClassName="nav-icon" icon={cilFastfood} />
                                <span style={{ marginLeft: '10px' }}>Productos</span>
                            </div>
                        }
                    >
                        <CNavItem style={{ margin: '10px 0' }}>
                            <Link to="/productos" className="nav-link" style={{ color: '#4D648D', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
                                <span style={{ marginLeft: '10px' }}>Lista de Productos</span>
                            </Link>
                        </CNavItem>
                        <CNavItem style={{ margin: '10px 0' }}>
                            <Link to="/categorias" className="nav-link" style={{ color: '#4D648D', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
                                <span style={{ marginLeft: '10px' }}>Categorías</span>
                            </Link>
                        </CNavItem>
                    </CNavGroup>

                    <CNavItem style={{ margin: '10px 0' }}>
                        <Link to="/promociones" className="nav-link" style={{ color: '#4D648D', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                            <CIcon customClassName="nav-icon" icon={cilDollar} />
                            <span style={{ marginLeft: '10px' }}>Promociones</span>
                        </Link>
                    </CNavItem>

                    <CNavGroup
                        toggler={
                            <div style={{ color: '#4D648D', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                                <CIcon customClassName="nav-icon" icon={cilPeople} />
                                <span style={{ marginLeft: '10px' }}>Empleados</span>
                            </div>
                        }
                    >
                        <CNavItem style={{ margin: '10px 0' }}>
                            <Link to="/empleados" className="nav-link" style={{ color: '#4D648D', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
                                <span style={{ marginLeft: '10px' }}>Lista de Empleados</span>
                            </Link>
                        </CNavItem>
                        <CNavItem style={{ margin: '10px 0' }}>
                            <Link to="/roles" className="nav-link" style={{ color: '#4D648D', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
                                <span style={{ marginLeft: '10px' }}>Roles</span>
                            </Link>
                        </CNavItem>
                    </CNavGroup>
                    <CNavItem style={{ margin: '10px 0' }}>
                        <Link to="/insumos" className="nav-link" style={{ color: '#4D648D', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                            <CIcon customClassName="nav-icon" icon={cilCart} />
                            <span style={{ marginLeft: '10px' }}>Insumos</span>
                        </Link>
                    </CNavItem>
                </CSidebarNav>
            </CSidebar>
        </div>
    );
}

export default BasicSidebar;
