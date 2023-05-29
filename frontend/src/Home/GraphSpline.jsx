import React, { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../utils/windowDimensionsHook";
import { Spacing } from "../rules";
import { Button, MediaContainer, Parameters, Eval } from "./BigContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as d3 from "d3";
import styled from "styled-components";
import functionPlot from 'function-plot'
window.d3 = d3;

function GraphSpline(){
  const params = new URLSearchParams(window.location.search);
  const size = useWindowDimensions();
  const node = useRef(null);

  const [functionText, setFunctionText] = useState(
    params.has("function") ? params.get("function") : "x^2",
  );
  const [domain, setDomain] = useState(
    params.has("domain") ? params.get("domain").toString().split(',') : "0,1,2,3",
  );
}
  export { GraphSpline }