import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Close from "asserts/img/close.svg";
import BetValue from './BetValue';
import BetValueInfinity from './BetValueInfinity';
import AutoOptions from './AutoOptions';

type AO = {
    betAmount: number,
    stopLoss: number,
    number: number,
    stopWin: number,
    onLoss: {
        changeAmount: number,
        change: boolean,
        reset: boolean,
        stop: boolean
    },
    onWin: {
        changeAmount: number,
        change: boolean,
        reset: boolean,
        stop: boolean
    },
}
interface ABProps {
    show: boolean,
    offShow: () => void,
    start: (x: AO) => void
}

const AutoBetModal = ({ show, offShow, start }: ABProps) => {
    const [vis, setVis] = useState(false);
    const [vis2, setVis2] = useState(false);

    const aRef = useRef<HTMLInputElement | null>(null);
    const nRef = useRef<Object>({});
    const slRef = useRef<HTMLInputElement | null>(null);
    const swRef = useRef<HTMLInputElement | null>(null);
    const opsLRef = useRef<Object>({});
    const opsWRef = useRef<Object>({});

    useEffect(() => {
        if (show) {
            setVis2(true);
            setTimeout(() => { setVis(true) }, 0)
        } else {
            setVis(false);
            setTimeout(() => { setVis2(false) }, 500)
        }
    }, [show])

    const startAuto = () => {
        if (aRef.current && nRef.current && slRef.current && swRef.current && opsLRef.current && opsWRef.current) {
            start({
                betAmount: Number(aRef.current.value),
                stopLoss: Number(slRef.current.value),
                number: nRef.current.number,
                stopWin: Number(swRef.current.value),
                onLoss: {
                    changeAmount: opsLRef.current.changeAmount,
                    change: opsLRef.current.change,
                    reset: opsLRef.current.reset,
                    stop: opsLRef.current.stop
                },
                onWin: {
                    changeAmount: opsWRef.current.changeAmount,
                    change: opsWRef.current.change,
                    reset: opsWRef.current.reset,
                    stop: opsWRef.current.stop
                },
            })
        }
        offShow()
    }

    return <AB vis={vis2}>
        <div className={vis ? "ab" : "ab ab2"}>
            <div className="ab_close">
                <img src={Close} alt="" onClick={offShow} />
            </div>
            <div className="ab_title">Auto Bet</div>
            <div className="ab_value">
                <BetValue
                    title="Bet amount"
                    ref={aRef}
                />
                <BetValueInfinity
                    title="Number of bets"
                    ref={nRef}
                />
            </div>
            <div className="ab_value">
                <BetValue
                    title="Stop on loss"
                    ref={slRef}
                />
                <BetValue
                    title="Stop on profit"
                    ref={swRef}
                />
            </div>
            <div className="ab_value">
                <AutoOptions
                    title="On loss"
                    ref={opsLRef}
                />
                <AutoOptions
                    title="On profit"
                    ref={opsWRef}
                />
            </div>
            <button className="ab_start" onClick={startAuto}>Start auto bet</button>
        </div>
    </AB>
}

export default AutoBetModal;

interface ABI {
    vis: boolean
}
const AB = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #000000c3;
    align-items: center;
    justify-content: center;
    z-index: ${({ vis }: ABI) => vis ? "2" : "-1"};
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    .ab {
        width: 988px;
        height: 800px;
        background-color: #262E3F;
        border: 10px solid #45617E;
        border-radius: 15px;
        position: relative;
        margin-top: 45px;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: 0.5s;
        padding-top: 5%;
        .ab_close {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 53px;
            height: 53px;
            img  {
                cursor: pointer;
            }
        }
        .ab_title {
            font-size: 3.1rem;
            font-weight: bold;
            color: #FFFFFF;
        }
        .ab_value {
            width: 80%;
            max-width: 625px;
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
        }
        .ab_start {
            width: 176px;
            height: 40px;
            background: transparent linear-gradient(257deg, #FFAE5D 0%, #FF8467 100%) 0% 0% no-repeat padding-box;
            border-radius: 5px;
            color: #FFFFFF;
            margin-top: 60px;
        }
    }
    .ab2 {
        margin-top: 150px;
        opacity: 0;
    }
`
