import React from "react";
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from '../Home/Home'
import { HomeNonLinear } from "../NonLinear/HomeNonLinear";
import { HomeLinear } from "../Linear/HomeLinear";
import { Graph } from "../Home/Graph";
import { Biseccion } from "../NonLinear/Metodos/Biseccion";
import { PuntoFijo } from "../NonLinear/Metodos/PuntoFijo";
import { RegulaFalsi } from "../NonLinear/Metodos/RegulaFalsi";
import { NewtonRaphson } from "../NonLinear/Metodos/NewtonRaphson";
import { RaicesMultiples } from "../NonLinear/Metodos/RaicesMultiples" 
import { Secante } from "../NonLinear/Metodos/Secante";
import { MetodosIterativos } from "../Linear/metodos/MetodosIterativos";

const BigRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/graficar" element={<Graph/>}/>
        <Route path="/ecuaciones-no-lineales" element={<HomeNonLinear/>} />        
        <Route path="/ecuaciones-lineales" element={<HomeLinear/>} />
        {/* RUTAS PARA METODO DE NLE */}
        <Route path="/ecuaciones-no-lineales/biseccion" element={<Biseccion/>} />
        <Route path="/ecuaciones-no-lineales/punto-fijo" element={<PuntoFijo/>} />
        <Route path="/ecuaciones-no-lineales/regula-Falsi" element={<RegulaFalsi/>} />
        <Route path="/ecuaciones-no-lineales/newton-raphson" element={<NewtonRaphson/>} />
        <Route path="/ecuaciones-no-lineales/raices-multiples" element={<RaicesMultiples/>} />
        <Route path="/ecuaciones-no-lineales/secante" element={<Secante/>} />
      
      {/* RUTAS PARA METODOS EL */}
      <Route path="/ecuaciones-lineales/iterativos" element={<MetodosIterativos/>} />
      </Routes>
    </Router>
  );
};

export { BigRouter };
