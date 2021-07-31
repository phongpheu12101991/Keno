import React from 'react';
import styled, { css } from 'styled-components';


interface BProps {
    title: string,
    width: number,
    isDisable: boolean,
    onClick: () => void
}

const Button = ({ title, width, isDisable, onClick }: BProps) => {

    return <BT
        disabled={isDisable}
        status={isDisable}
        wb={width}
        onClick={() => { onClick(); console.log("?") }}
    >
        {title}
    </BT>
}

export default Button;

interface BI {
    status: boolean,
    wb: number
}
const BT = styled.button`
    border-radius: 5px;
    color: white;
    height: 40px;
    ${({ wb, status }: BI) => status ? css`
    width: ${wb}px;
    background-color: #38445D;
    ` : css`
    background-color: transparent;
    background-image: linear-gradient(104deg, #FF8467 0%, #FFAE5D 100%);
    width: ${wb}px;
    `}
    @media screen and (max-width: 1000px) {
        height: 38px;
    }
    @media screen and (max-width: 700px) {
        height: 38px;
        width: 48%;
        height: 100%;
    }
`