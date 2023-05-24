import React from "react";
import { Router } from "@reach/router";

import MethodsDashboard from "../components/MethodsDashboard";

import { methods } from "../data/methods";

import FuncEval from "../components/methods/0funcEval/FuncEval.jsx";
import IncSearch from "../components/methods/1incSearch/IncSearch.jsx";
import Bisection from "../components/methods/2bisection/Bisection";
import FalsePosition from "../components/methods/3falsePosition/FalsePosition";
import FixedPoint from "../components/methods/4fixedPoint/FixedPoint.jsx";
import Newton from "../components/methods/5newton/Newton";
import Secante from "../components/methods/6secant/Secant";
import MultipleRoots from "../components/methods/7multipleroots/MultipleRoots";
import GaussSimple from "../components/methods/8gaussSimple/GaussSimple";
import GaussPartial from "../components/methods/9gaussPartial/GaussPartial";
import GaussTotal from "../components/methods/10gaussTotal/GaussTotal";
import LuSimple from "../components/methods/11LuSimple/LuSimple";
import LuPartial from "../components/methods/12LuPartial/LuPartial";
import Croult from "../components/methods/13Croult/Croult";
import Doolittle from "../components/methods/14Doolittle/Doolittle";
import Cholesky from "../components/methods/15Cholesky/Cholesky";
import IterativeMethods from "../components/methods/16-18IterativeMethods/IterativeMethods";
import Vandermonde from "../components/methods/19Vandermonde/Vandermonde";
import NewtonInterpolation from "../components/methods/20NewtonInterpolation/NewtonInterpolation";
import Lagrange from "../components/methods/21Lagrange/Lagrange";
import Splines from "../components/methods/22Splines/Splines";
import Page404 from "../components/Page404";

const MethodsRouter = () => {
  return (
    <Router>
      <MethodsDashboard path="/" />
      <FuncEval
        path={methods.find(method => method.index === 0).id}
        name={methods.find(method => method.index === 0).name}
      />
      <IncSearch
        path={methods.find(method => method.index === 1).id}
        name={methods.find(method => method.index === 1).name}
      />
      <Bisection
        path={methods.find(method => method.index === 2).id}
        name={methods.find(method => method.index === 2).name}
      />
      <FalsePosition
        path={methods.find(method => method.index === 3).id}
        name={methods.find(method => method.index === 3).name}
      />
      <FixedPoint
        path={methods.find(method => method.index === 4).id}
        name={methods.find(method => method.index === 4).name}
      />
      <Newton
        path={methods.find(method => method.index === 5).id}
        name={methods.find(method => method.index === 5).name}
      />
      <Secante
        path={methods.find(method => method.index === 6).id}
        name={methods.find(method => method.index === 6).name}
      />
      <MultipleRoots
        path={methods.find(method => method.index === 7).id}
        name={methods.find(method => method.index === 7).name}
      />
      <GaussSimple
        path={methods.find(method => method.index === 8).id}
        name={methods.find(method => method.index === 8).name}
      />
      <GaussPartial
        path={methods.find(method => method.index === 9).id}
        name={methods.find(method => method.index === 9).name}
      />
      <GaussTotal
        path={methods.find(method => method.index === 10).id}
        name={methods.find(method => method.index === 10).name}
      />
      <LuSimple
        path={methods.find(method => method.index === 11).id}
        name={methods.find(method => method.index === 11).name}
      />
      <LuPartial
        path={methods.find(method => method.index === 12).id}
        name={methods.find(method => method.index === 12).name}
      />
      <Croult
        path={methods.find(method => method.index === 13).id}
        name={methods.find(method => method.index === 13).name}
      />
      <Doolittle
        path={methods.find(method => method.index === 14).id}
        name={methods.find(method => method.index === 14).name}
      />
      <Cholesky
        path={methods.find(method => method.index === 15).id}
        name={methods.find(method => method.index === 15).name}
      />
      <IterativeMethods
        path={methods.find(method => method.index === 16).id}
        name={methods.find(method => method.index === 16).name}
      />
      <Vandermonde
        path={methods.find(method => method.index === 19).id}
        name={methods.find(method => method.index === 19).name}
      />
      <NewtonInterpolation
        path={methods.find(method => method.index === 20).id}
        name={methods.find(method => method.index === 20).name}
      />
      <Lagrange
        path={methods.find(method => method.index === 21).id}
        name={methods.find(method => method.index === 21).name}
      />
      <Splines
        path={methods.find(method => method.index === 22).id}
        name={methods.find(method => method.index === 22).name}
      />
      <Page404 default />
    </Router>
  );
};

export default MethodsRouter;
