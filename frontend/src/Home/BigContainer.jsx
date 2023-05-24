import React from "react";
import styled from "styled-components";
import { BorderRadius, Colors, Shadows, Spacing, Typography } from "../rules";
import { Link } from "react-router-dom";

const BigContainer = ({ children }) => {
    return <Container>{children}</Container>;
    };
const Container = styled("div")`
    margin: ${Spacing.lg} ${Spacing.xxl};
    padding: ${Spacing.lg} ${Spacing.xl};
    border-radius: ${BorderRadius.lg};
    border: 2px solid ${Colors.utility.headline.default};
`;
export const Title = styled("div")`
    font-size: ${Typography.largeTitle.fontSize};
    margin: ${Spacing.xl} ${Spacing.xxl} ${Spacing.xl};
    @media (max-width: 440px) {
        margin: ${Spacing.xl};
    }
    @media (max-width: 340px) {
        margin: ${Spacing.lg};
    }
`;
export const Subtitle = styled("div")`
    max-width: 700px;
    font-size: ${Typography.subTitle.fontSize};
    margin: ${Spacing.lg} ${Spacing.xxl} ${Spacing.xl};
    svg {
        margin-right: ${Spacing.sm};
    }
    @media (max-width: 440px) {
        margin: ${Spacing.xl};
    }
    @media (max-width: 340px) {
        margin: ${Spacing.lg};
    }
`;
export const RowContainer = styled("div")`
    display: flex;
    flex-direction: row;
`;
export const MediaContainer = styled("div")`
    margin-top: ${Spacing.md};
    display: flex;
    flex-direction: row;
    @media (max-width: ${props => (props.width ? props.width : "800px")}) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    justify-content: space-evenly;
    align-items: flex-start;
`;  
export const Eval = styled("div")`
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    ul {
        display: inline-block;
        margin: auto;
    }
`;
export const Parameters = styled("div")`
    padding-bottom: ${Spacing.md};
    p {
        text-align: center;
        max-width: 400px;
    }
    form {
        background-color: white;
        padding: ${Spacing.md};
        display: grid;
        grid-template-columns: 300px;
        grid-template-rows: 75px;
        grid-column-gap: 10px;
        grid-row-gap: 10px;
        @media (max-width: ${props => (props.width ? props.width : "800px")}) {
            grid-template-columns: 300px 300px;
        }
        @media (max-width: 800px) {
            grid-template-columns: 300px;
        }
        @media (max-width: 360px) {
            grid-template-columns: 250px;
        }
        justify-items: left;
        text-align: left;
        align-items: flex-start;
        border-radius: ${BorderRadius.sm};
        border: 1px solid ${Colors.primary.ocean.lighter};
        box-shadow: ${Shadows.level3};
    }
    label {
        display: block;
        font-weight: bold;
    }
    input {
        display: block;
        margin: ${Spacing.sm} 0;
        border: none;
        font-size: inherit;
        padding: 12px 20px;
        box-sizing: border-box;
    }
`;
export const Error = styled("div")`
    border-radius: ${BorderRadius.md};
    background-color: ${Colors.primary.tan.default};
    color: white;
    padding: ${Spacing.md} ${Spacing.lg};
    font-weight: bold;
    margin: ${Spacing.md} 0;
    max-width: 500px;
`;

export const TableStyle = styled("div")`
    table,
    th,
    td {
        border: 1px solid #ccc;
        border-collapse: collapse;
        padding: ${Spacing.xs};
        margin-left: auto;
        margin-right: auto;
    }
    /* Zebra striping */
    tr:nth-of-type(odd) {
        background: #eee;
    }
    th {
        background: ${Colors.primary.ocean.darker};
        color: white;
        font-weight: bold;
    }
    @media (max-width: ${props => (props.width ? props.width : "700px")}) {
        font-size: 12px;
    }
    @media (max-width: ${props => (props.widthTwo ? props.widthTwo : "580px")}) {
        th,
        td {
            padding: 0;
            word-wrap: break-word;
            max-width: 50px;
        }
    }
`;
export const Button = styled("button")`
    font-size: inherit;
    border: 2px solid ${Colors.primary.ocean.default};
    color: ${props =>
        props.primary ? Colors.utility.white.default : Colors.primary.ocean.darker};
    background-color: ${props =>
        props.primary
            ? Colors.primary.ocean.default
            : Colors.utility.white.default};
    border-radius: ${BorderRadius.sm};
    font-weight: bold;
    cursor: pointer;
    grid-column-start: 1;
    padding: 5px;
    border-radius: 8px;
`;
export const LinkIcon = styled(Link)`
    svg {
        padding-left: ${Spacing.xs};
    }
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }`;
export const LinkGraph = styled("div")`
    display: flex;
    justify-content: center;
    a {
        color: ${Colors.utility.white.default} !important;
        text-decoration: none;
        font-weight: bold;
        margin: ${Spacing.xs} 0;
        padding: ${Spacing.xs} ${Spacing.md};
        border-radius: ${BorderRadius.md};
        background-color: ${Colors.primary.tan.default};
        text-align: center;
    }
    a:hover {
        transform: translateY(-1px);
        background-color: ${Colors.primary.tan.darker};
    }
`;
export const MatrixParameters = styled("div")`
    label {
        display: block;
        font-weight: bold;
        margin: ${Spacing.sm} 0 ${Spacing.md} 0;
    }
    input {
        display: block;
        margin: ${Spacing.sm} 0;
        border: none;
        font-size: inherit;
        box-sizing: border-box;
        padding: 13px 0;
        text-align: center;
        margin: 5px;
        height: 12px;
        width: 50px;
    }
    form {
        text-align: center;
    }
    margin-bottom: ${Spacing.xs};
`;
export const Results = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (max-width: 780px) {
        font-size: 13px;
    }
    @media (max-width: 660px) {
        font-size: 11px;
    }
    @media (max-width: 570px) {
        font-size: 9px;
    }
`;
export const Inputs = styled("div")`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    @media (max-width: 570px) {
        flex-direction: column;
    }
`;
export const Column = styled("div")`
    display: flex;
    flex-direction: column;
`;
export const Question = styled("h4")`
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    svg {
        margin-left: ${Spacing.md};
        color: ${props =>
            props.active ? Colors.primary.tan.default : Colors.primary.tan.lighter};
        }
    padding: 0 0 ${Spacing.sm} 0;
    border-bottom: 1px solid rgba(24, 24, 24, 0.3);
`;
export default BigContainer;