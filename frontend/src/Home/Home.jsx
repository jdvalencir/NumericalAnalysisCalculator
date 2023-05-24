import React from "react";
import { Spacing } from "../rules";
import { Title, Subtitle } from "./BigContainer";
import { Link } from "react-router-dom"
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Graph } from "./Graph";
import { Navbar } from "./Header";


const Home = () => {
    return (
        <React.Fragment>
            <Navbar/>
            <CenteredTitle></CenteredTitle>
            <CenteredSubTitle className="pt-8">
                Peanut is a website where you'll find several methods used to solve
                numerical analysis problems.{" "}
                <p>
                    <Link to={"/methods"}>
                        <FontAwesomeIcon icon={["fas", "dot-circle"]} />
                        Explore methods
                    </Link>
                </p>
            </CenteredSubTitle>
            <MainContainer>
                <h4>Provide a function for the graph : </h4>
                <Graph />
            </MainContainer>
        </React.Fragment>
    );
};
const CenteredTitle = styled(Title)`
    text-align: center;
    margin: ${Spacing.lg} 0;
`;
const CenteredSubTitle = styled(Subtitle)`
    text-align: center;
    max-width: none;
    @media (max-width: 425px) {
        font-size: 15px;
}
`;
const MainContainer = styled("div")`
    margin: 0 auto ${Spacing.xxl} auto;
    display: flex;
    justify-content: center;
    max-width: 700px;
    flex-direction: column;
    text-align: center;
`;
export { Home };