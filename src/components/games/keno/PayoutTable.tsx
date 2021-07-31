import React from 'react';
import styled from 'styled-components';
import pimg from "asserts/img/payitem.svg";


interface PTProps {
    count: number,
    data: Array<number>,
    result: number
}

const PayoutTable = ({ count, data, result }: PTProps) => {

    return <PT>
        <div className="gm_payout_title">Payout table</div>
        <div className="gm_payout_table">
            {count === 0 ? <div className="payout_title">Payout table</div> :
                <div className="payout_content">
                    {data.map((item: number, index: number) => <div
                        key={index}
                        className={result === index ? "payout_item payout_item_result" : "payout_item"}
                    >
                        <div className="pi_id">
                            <span>{index} x&nbsp;</span>
                            <div><img src={pimg} alt="X" /></div>
                        </div>
                        <div className="pi_space"></div>
                        <div className="pi_rate">x<b>{item}</b></div>
                        <div className="pi_space_small"></div>
                    </div>)}
                </div>}
        </div>
    </PT>
}

export default PayoutTable;

const PT = styled.div`
    display: flex;
    flex-direction: column;
    width: 191px;
    height: 100%;
    .gm_payout_title {
        font: normal normal normal 16px/19px Helvetica;
        color: #BCCEE2;
        height: 48px;
        width: 100%;
        text-align: center;
        line-height: 48px;
    }
    .gm_payout_table {
        font: normal normal normal 16px/19px Helvetica;
        flex: 1;
        width: 100%;
        background: #293245 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 5px;
        padding: 12.5px 10px;
        display: flex;
        align-items: center;
        .payout_content {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            .payout_item {
                display: flex;
                height: 40px;
                width: 100%;
                align-items: center;
                padding: 10px 12.5px;
                .pi_id {
                    display: flex;
                    align-items: center;
                    flex: 1;
                    height: 100%;
                    color: #BCCEE2;
                    div {
                        height: 100%;
                        width: 21px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .pi_space {
                    width: 15px;
                    height: 1px;
                    background-color: #BCCEE2;
                }
                .pi_space_small {
                    width: 6px;
                    height: 1px;
                    background-color: #798FA6;
                    display: none;
                }
                .pi_rate {
                    flex: 1;
                    height: 100%;
                    text-align: right;
                }
            }
            .payout_item_result {
                background-color: #FFE3CB;
                border: 1px solid #FEA143;
                border-radius: 3px;
                color: #FF9300;
                .pi_id {
                    color: #FF9300;
                }
            }
        }
        .payout_title {
            font: normal normal normal 16px/19px Helvetica;
            color: #BCCEE2;
            margin: 0 auto;
        }
        
    } 
    @media screen and (max-width: 1000px) {
        width: 100%;
        flex: 1;
        .gm_payout_title {
            text-align: left;
        }
        .gm_payout_table {
            height: 53px;
            overflow: hidden;
            overflow-x: scroll;
            padding: 4px 5px 1px 5px;
            &::-webkit-scrollbar {
                width: auto;
                height: 5px;
                margin-top: -5px;
            }
            &::-webkit-scrollbar-track {
                background: transparent; 
            }
            &::-webkit-scrollbar-thumb {
                background: #8888881d;  
            }
            &::-webkit-scrollbar-thumb:hover {
                background: #555; 
            }
            .payout_content {
                flex-direction: row;
                width: fit-content;
                .payout_item {
                    flex-direction: column;
                    width: 53.4px;
                    height: 100%;
                    padding: 2px 4px;
                    font-size: 0.9rem;
                    align-items: flex-end;
                    position: relative;
                    margin-right: 16px;
                    .pi_id {
                        width: max-content;
                        align-self: center;
                        div {
                            height: 12px;
                            width: 15px;
                            display: flex;
                            align-items: center;
                        }
                    }
                    .pi_space {
                        display: none;
                    }
                    .pi_rate {
                        margin-right: 4px;
                    }
                    .pi_space_small {
                        display: block;
                        position: absolute;
                        top: 50%;
                        right: -11px;
                    }
                    &:last-child {
                        margin-right: 0;
                        .pi_space_small {
                            display: none;
                        }
                    }
                }
            }
        }
    }
    @media screen and (max-width: 700px) {
        height: 102px;
        .gm_payout_table {
            height: 54px;
            .payout_title {
                height: 44px;
                line-height: 44px;
            }
            .payout_content {
                height: 44px;
            }
        } 
    }    
`