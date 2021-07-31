import React from 'react';
import styled from 'styled-components';

interface HBProps {
    data: Array<number>,
}

const HistoryBet = ({ data }: HBProps) => {

    return <HB>
        {data.length === 0 ? <HB1>Game results will be displayed here.</HB1>
            : <HB2>
                <div className="history_bet">
                    {data.map((item, index) => <div key={index} className={item > 0 ? "BRW" : "BRW BRL"}><span>{item.toFixed(2)}</span></div>)}
                </div>
            </HB2>}
    </HB>



}

export default HistoryBet;

const HB = styled.div`
    width: 100%;
    height: 51px;
    overflow-x: auto;
    display: flex;
    flex-direction: row-reverse;
    &::-webkit-scrollbar {
        width: auto;
        height: 5px;
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
    @media screen and (max-width: 1000px) {
        height: 49px;
    }
`

const HB1 = styled.div`
    background-color: #293245;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 5px;
    width: 100%;
    height: 46px;
    text-align: center;
    line-height: 46px;
    color: #BCCEE2;
    @media screen and (max-width: 1000px) {
        height: 44px;
    }
`
const HB2 = styled.div`
    width: fit-content;
    height: 46px;
    text-align: center;
    .history_bet {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        .BRW {
            width: 69px;
            height: 36px;
            border: 1px solid #28DE44;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #28DE44;
            font: normal normal normal 12px/14px Helvetica;
            margin-right: 10px;
            &:last-child {
                width: 79px;
                height: 100%;
                margin-right: 0;
            }
        }
        .BRL {
            border: 1px solid #EF394A;
            color: #EF394A;
        }
    }
    @media screen and (max-width: 1000px) {
        height: 44px;
        .history_bet {
            .BRW {
                height: 34px;
                &:last-child {
                    width: 79px;
                    height: 40px;
                }
            }
        }
    }
`