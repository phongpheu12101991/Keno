import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Goldss from "asserts/img/goldss.svg";
import Close from "asserts/img/close.svg";

interface AMProps {
    show: boolean,
    offShow: () => void,
}

const AlertModal = ({ show, offShow }: AMProps) => {
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
            <div className="rm_title">Cannot Bet!</div>
            <div className="rm_title">
                Bet amount is bigger Your Balance
            </div>
        </div>
    </RM>
}

export default AlertModal;

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
            font: normal normal bold 20px/24px Helvetica;
            color: #FBBC03;
            margin-top: 31px;
        }
        .rm_value {
            display: flex;
            align-items: center;
            font: normal normal bold 50px/60px Helvetica;
            letter-spacing: 0px;
            color: #FBBC03;
            margin-top: 20px;
        }
    }
    .rm2 {
        margin-top: 150px;
        opacity: 0;
    }
`
