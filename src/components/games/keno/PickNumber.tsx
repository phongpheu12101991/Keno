import React from 'react';
import styled from 'styled-components';
import pimg from "asserts/img/payitem.svg";

interface PNProps {
    value: number,
    status: number,
    key: number,
    onClick: () => void
}

const PickNumber = ({ value, status, onClick }: PNProps) => {
    return <PN onClick={onClick} status={status}>
        <div className={status === 1 ? "pn_bt"
            : status === 2 ? "pn_bt pn_bt_pick"
                : status === 3 ? "pn_bt pn_bt_disable"
                    : status === 4 ? "pn_bt pn_bt_miss"
                        : "pn_bt pn_bt_match"}>{status === 5 ? <div><img src={pimg} alt="" /></div> : value}</div>
    </PN>
}

export default PickNumber;


interface XP {
    status: number
}
const PN = styled.button`
    width: 74px;
    height: 74px;
    position: relative;
    margin-bottom: 7px;
    color: white;
    background-color: ${({ status }: XP) => (status === 1 || status === 3) ? "#1B2333" : (status === 2 || status === 5) ? "#93591F" : "#080C15"};
    border-radius: 5px;
    .pn_bt {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 70px;
        background-color: #2E394E;
        border-radius: 5px;
        line-height: initial;
        font-weight: bold;
        text-align: center;
        font-size: 1.18rem;
        transition: top 0.1s;
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: center;
        div {
            width: 45px;
            height: 35px;
            display: flex;
            align-items: center;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .pn_bt_pick {
        background-color: #FEA143;
    }
    .pn_bt_disable {
        background-color: transparent;
    }
    .pn_bt_miss {
        background-color: #101726;
        color: #EF394A;
    }
    .pn_bt_match {
        background-color: #FFE3CB;
        border: 2px solid #FEA143;
    }
    &:hover {
        .pn_bt {
            top: -4px;
            transition: top 0.5s;
        }
        .pn_bt_pick,
        .pn_bt_disable,
        .pn_bt_miss,
        .pn_bt_match {
            top: 0px;
            transition: top 0.1s;
        }
    }
    @media screen and (max-width: 1000px) {
       width: 67px;
       height: 67px;
       .pn_bt {
            height: 62px;
            margin-bottom: 4px;
        }
    }
    @media screen and (max-width: 700px) {
       width: calc((100vw - 40px - 28px)/8);
       height: calc((100vw - 40px - 28px)/8);
       .pn_bt {
            height: calc((100vw - 40px - 28px)/8 - 5px);
        }
    }
    @media screen and (max-width: 293px) {
       width: calc((100vw - 40px - 21px)/8);
       height: calc((100vw - 40px - 21px)/8);
       .pn_bt {
            height: calc((100vw - 40px - 21px)/8 - 3px);
        }
    }
`
