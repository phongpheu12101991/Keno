import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Gold from "asserts/img/gold.svg";
import Goldss from "asserts/img/goldss.svg";
import Close from "asserts/img/close.svg";
import NumberFormat from 'react-number-format';

interface RMProps {
    profit: number,
    show: boolean,
    offShow: () => void,
    rate: number
}

const ResultModal = ({ profit, show, offShow, rate }: RMProps) => {
    const [vis, setVis] = useState(false);
    const [vis2, setVis2] = useState(false);

    useEffect(() => {
        if (show) {
            setVis2(true);
            setTimeout(() => { setVis(true) }, 0)
        } else {
            setVis(false);
            setTimeout(() => { setVis2(false) }, 500)
        }
    }, [show])

    return <RM vis={vis2}>
        <div className={vis ? "rm" : "rm rm2"}>
            <div className="rm_close">
                <img src={Close} alt="" onClick={offShow} />
            </div>
            <div className="rm_goldss">
                <img src={Goldss} alt="" />
            </div>
            <div className={profit >= 0 ? "rm_title" : "rm_title2"}>{profit >= 0 ? "Congrats!" : "You lose!"}</div>
            <div className="rm_value">
                {profit >= 0 ? null : <span className="rm_x">-</span>}
                <div className="rm_goldimg">
                    <img src={Gold} alt="" />
                </div>
                <NumberFormat value={profit >= 0 ? profit : -profit} displayType={'text'} thousandSeparator={true} className="rm_value_number" />
            </div>
            {profit >= 0 ? <div className="rm_rate">x {rate}</div> : null}
        </div>
    </RM>
}

export default ResultModal;

interface RMI {
    vis: boolean
}
const RM = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    z-index: ${({ vis }: RMI) => vis ? "2" : "-1"};
    display: flex;
    .rm {
        width: 410px;
        height: 278px;
        background: transparent radial-gradient(closest-side at 50% 50%, #496989 0%, #45617E 0%, #33405A 42%, #1B2333 100%) 0% 0% no-repeat padding-box;
        box-shadow: 0px 0px 40px #171C2A;
        border: 5px solid #45617E;
        position: relative;
        border-radius: 25px;
        margin-top: 45px;
        display: flex;
        flex-direction: column;
        align-items: center;
        opacity: 1;
        transition: 0.5s;
        .rm_close {
            position: absolute;
            top: -20px;
            right: -20px;
            width: 53px;
            height: 53px;
            img  {
                cursor: pointer;
            }
        }
        .rm_goldss {
            margin-top: -65px;
            width: 193px;
            height: 123px;
            img {
                object-fit: contain;
            }
        }
        .rm_title {
            font: normal normal normal 20px/24px Helvetica;
            color: #FFFFFF;
            margin-top: 31px;
        }
        .rm_title2 {
            font: normal normal bold 20px/24px Helvetica;
            color: #EF394A;
            margin-top: 31px;
        }
        .rm_value {
            display: flex;
            align-items: center;
            font: normal normal bold 50px/60px Helvetica;
            letter-spacing: 0px;
            color: #FBBC03;
            margin-top: 20px;
            .rm_goldimg {
                width: 40px;
                height: 40px;
                display: flex;
                margin-right: 12px;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    object-position: center;
                }
            }
            .rm_x {
                color: #EF394A;
                margin: -6px 10px 0 0;
            }
            .rm_value_number {
                max-width: 300px;
                text-overflow: ellipsis;
                white-space: nowrap; 
                overflow: hidden;
                font-size: 50px;
            }
        }
        .rm_rate {
            font: normal normal bold 20px/24px Helvetica;
            margin-top: 10px;
            color: #FFFFFF;
        }
    }
    .rm2 {
        margin-top: 150px;
        opacity: 0;
    }
`
