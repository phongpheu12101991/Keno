import React, { useState } from 'react';
import styled from 'styled-components';
import arr from "asserts/img/arr.svg";
import Pick from "asserts/img/picked.svg";

interface RPProps {
}

const RiskPicker = ({ }: RPProps) => {

    type RD = Array<string>;
    const [risk, setRisk] = useState<RD>(["Low", "Classic", "Medium", "High"],
    )
    const [isPicked, setPick] = useState<number>(0);
    const [show, setShow] = useState<boolean>(false);


    return <RP >
        <div className="risk_title">Risk:</div>
        <div className="risk_content">
            <div className="risk_value" onClick={() => { setShow(!show) }}>
                <span>{risk[isPicked]}</span>
                <img src={arr} alt="X" className={show ? "down" : ""} />
            </div>
            <div className={show ? "risk_list" : "risk_list risk_list_hidden"}>
                {risk.map((item: string, index: number) => <div key={index} className="risk_list_item" onClick={() => {
                    setPick(index);
                    setShow(false)
                }} >
                    <span>{item}</span>
                    {isPicked === index ? <div><img src={Pick} alt="" /></div> : null}
                </div>)}

            </div>
        </div>
    </RP>
}

export default RiskPicker;

const RP = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    .risk_title {
        width: 51px;
        font: normal normal normal 16px/19px Helvetica;
        color: #BCCEE2;
    }
    .risk_content {
        width: 251px;
        height: 100%;
        position: relative;
        .risk_value {
            width: 100%;
            height: 100%;
            background-color: #293245;
            border: 1px solid #45617E;
            border-radius: 5px;
            padding: 12px 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            img {
                transition: 0.3s;
            }
            .down {
                transform: rotateX(180deg);
            }
        }
        .risk_list {
            width: 100%;
            position: absolute;
            top: 110%;
            left: 0;
            border: 1px solid #45617E;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            display: flex;
            flex-direction: column;
            padding: 0 15px;
            background-color: #293245;
            z-index: 1;
            .risk_list_item {
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #ffffff52;
                height: 42px;
                align-items: center;
                &:last-child {
                    border-bottom: none;
                }
            }
        }
        .risk_list_hidden {
            display: none;
        }
    }
    @media screen and (max-width: 1000px) {
        .risk_content {
            width: 168px;
        }
    }
    @media screen and (max-width: 700px) {
        width: 49%;
        .risk_title {
            width: 42px;
        }
        .risk_content {
            flex: 1;
            max-width: 168px;
        }
    }
`