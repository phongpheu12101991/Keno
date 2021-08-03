import React, { useEffect, useReducer, useContext } from 'react';
import styled from 'styled-components';
import gold from "asserts/img/gold.svg";
import PickNumber from 'components/games/keno/PickNumber';
import NumberFormat from 'react-number-format';
import ResultModal from 'components/games/keno/ResultModal';
import AutoBetModal from 'components/games/keno/AutoBetModal';
import Button from 'components/commons/core/Button';
import PayoutTable from './PayoutTable';
import HistoryBet from './HistoryBet';
import UserContext from 'contexts/UserContext';
import AlertModal from './AlertModal';
import LeaderBoard from './LeaderBoard';
import MyBetBoard from './MyBetBoard';
import RiskPicker from './RiskPicker';


const Keno = () => {
    const { balance, changeBalance } = useContext(UserContext);
    type State = {
        data: Data,
        payout: Payout,
        count: number,
        disable: boolean,
        bet: number,
        originBet: number,
        onBet: boolean,
        result: number | undefined,
        showResult: boolean,
        showAlert: boolean,
        winRate: number,
        winAmount: number,
        hisBet: SBR,
        showAuto: boolean,
        autoBet: boolean,
        autoOptions: AutoOptions,
        autoNumber: number,
        autoStage: number,
        profit: number,
        afterBet: boolean
    };
    type Data = Array<ObjectItem>;
    type Payout = Array<Number>;
    type ObjectItem = {
        id: number,
        status: number
    }

    type SBR = Array<BRI>;
    type BRI = {
        sta: number,
        val: number
    }
    type AutoOptions = {
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

    type Action =
        | { type: 'Start', data: Data }
        | { type: 'Pick', id: number }
        | { type: 'UnPick', id: number }
        | { type: 'Disable' }
        | { type: 'Enable' }
        | { type: 'Random', data: Data }
        | { type: 'Clear', data: Data }
        | { type: 'Bet', data: Data }
        | { type: 'SetDisable', status: boolean }
        | { type: 'SetOnBet', status: boolean }
        | { type: 'SetResult', data: number | undefined }
        | { type: 'Payout', data: Payout }
        | { type: 'Count', data: number }
        | { type: 'SetBet', data: number }
        | { type: 'WinRate', data: number }
        | { type: 'HisBet', data: SBR }
        | { type: 'ShowResult', status: boolean }
        | { type: 'ShowAlert', status: boolean }
        | { type: 'WinAmount', data: number }
        | { type: 'ShowAuto', status: boolean }
        | { type: 'AutoBet', status: boolean, data: AutoOptions }
        | { type: 'SetAutoNumber', data: number }
        | { type: 'SetAutoStage', data: number }
        | { type: 'EndBet', data: Data, result: number | undefined, winRate: number, winAmount: number, hisBet: SBR }
        | { type: 'PickAfterBet', data: Data }
    const dataReducer = (state: State, action: Action) => {
        switch (action.type) {
            case "Start":
                return { ...state, data: action.data };
            case "Pick":
                let new1 = [...state.data]
                new1[action.id - 1].status = 2;
                return { ...state, data: new1, count: state.count + 1 };
            case "UnPick":
                let new2 = [...state.data]
                new2[action.id - 1].status = 1;
                return { ...state, data: new2, count: state.count - 1 };
            case "Disable":
                let new3 = [...state.data];
                for (let xx of new3) {
                    if (xx.status === 1) { xx.status = 3 }
                }
                return { ...state, data: new3 };
            case "Enable":
                let new4 = [...state.data];
                for (let xx of new4) {
                    if (xx.status === 3) { xx.status = 1 }
                }
                return { ...state, data: new4 };
            case "Random":
                return { ...state, data: action.data, count: 10 };
            case "Clear":
                return { ...state, data: action.data, count: 0 };
            case "Bet":
                return { ...state, data: action.data };
            case "SetDisable":
                return { ...state, disable: action.status };
            case "SetOnBet":
                return { ...state, onBet: action.status };
            case "SetResult":
                return { ...state, result: action.data };
            case "Payout":
                return { ...state, payout: action.data };
            case "Count":
                return { ...state, count: action.data };
            case "SetBet":
                return { ...state, bet: action.data };
            case "WinRate":
                return { ...state, winRate: action.data };
            case "HisBet":
                return { ...state, hisBet: action.data };
            case "ShowResult":
                return { ...state, showResult: action.status, onBet: action.status };
            case "ShowAlert":
                return { ...state, showAlert: action.status, autoBet: (action.status && state.autoBet) ? false : state.autoBet };
            case "ShowAuto":
                return { ...state, showAuto: action.status };
            case "AutoBet":
                return {
                    ...state,
                    autoBet: action.status,
                    autoOptions: action.data,
                    autoNumber: 0,
                    bet: action.status ? action.data.betAmount : state.bet,
                    profit: 0,
                    originBet: action.status ? action.data.betAmount : state.bet,
                };
            case "SetAutoNumber":
                return { ...state, autoNumber: action.data };
            case "SetAutoStage":
                return { ...state, autoStage: action.data };
            case "EndBet":
                let SP = state.profit + action.winAmount;
                if (state.autoBet) {
                    if ((SP <= -state.autoOptions.stopLoss && state.autoOptions.stopLoss > 0)
                        || (SP >= state.autoOptions.stopWin && state.autoOptions.stopWin > 0)
                        || state.autoNumber >= state.autoOptions.number
                        || (action.winAmount < 0 && state.autoOptions.onLoss.stop)
                        || (action.winAmount > 0 && state.autoOptions.onWin.stop)
                    ) {
                        return {
                            ...state,
                            winAmount: action.winAmount,
                            profit: SP,
                            autoBet: false,
                            autoNumber: 0,
                            autoOptions: {},
                            data: action.data,
                            result: action.result,
                            winRate: action.winRate,
                            showResult: true,
                            hisBet: action.hisBet,
                            afterBet: true
                        }
                    } else {
                        return {
                            ...state,
                            winAmount: action.winAmount,
                            profit: SP,
                            data: action.data,
                            result: action.result,
                            winRate: action.winRate,
                            showResult: true,
                            hisBet: action.hisBet,
                            bet: (action.winAmount < 0 && state.autoOptions.onLoss.reset) ? state.originBet
                                : (action.winAmount < 0 && !state.autoOptions.onLoss.reset) ? state.autoOptions.onLoss.change ? (state.bet + state.bet * state.autoOptions.onLoss.changeAmount / 100) : state.bet
                                    : (action.winAmount >= 0 && state.autoOptions.onWin.reset) ? state.originBet
                                        : (action.winAmount >= 0 && !state.autoOptions.onWin.reset) ? state.autoOptions.onWin.change ? (state.bet + state.bet * state.autoOptions.onWin.changeAmount / 100) : state.bet
                                            : state.bet,
                            afterBet: true
                        };
                    }
                } else {
                    return {
                        ...state,
                        winAmount: action.winAmount,
                        profit: SP,
                        data: action.data,
                        result: action.result,
                        winRate: action.winRate,
                        showResult: true,
                        hisBet: action.hisBet,
                        afterBet: true
                    };
                }
            case "PickAfterBet":
                return { ...state, data: action.data, count: state.count - 1, afterBet: false }
            default:
                throw new Error();
        }
    };
    const [state, dispatch] = useReducer(dataReducer, {
        data: [],
        payout: [],
        count: 0,
        disable: false,
        bet: 10,
        originBet: 0,
        onBet: false,
        result: undefined,
        showResult: false,
        winRate: 0,
        winAmount: 0,
        hisBet: [],
        showAuto: false,
        autoBet: false,
        autoOptions: {},
        autoNumber: 0,
        autoStage: 0,
        profit: 0,
        afterBet: false
    });

    useEffect(() => {
        dispatch({ type: "Start", data: createData() })
    }, []);

    useEffect(() => {
        if (state.count === 10) {
            dispatch({ type: "SetDisable", status: true })
            dispatch({ type: "Disable" });
        } else {
            if (state.disable) {
                dispatch({ type: "Enable" })
            }
        }
    }, [state.count]);

    useEffect(() => {
        changePayout(state.count);
    }, [state.data]);

    useEffect(() => {
        if (state.autoBet) {
            switch (state.autoStage) {
                case 1:
                    setTimeout(async () => {
                        await RandomPick();
                        await dispatch({ type: "SetAutoStage", data: 2 })
                    }, 1000);
                    break;
                case 2:
                    setTimeout(async () => {
                        await doBet();
                        await dispatch({ type: "SetAutoStage", data: 3 })
                    }, 2000);
                    break;
                case 3:
                    setTimeout(async () => {
                        await dispatch({ type: "ShowResult", status: false })
                        await dispatch({ type: "SetAutoStage", data: 0 })
                        await dispatch({ type: "SetAutoNumber", data: state.autoNumber + 1 })
                    }, 2000);
                    break;
                default:
                    dispatch({ type: "SetAutoStage", data: 1 })
            }
        }
    }, [state.autoStage]);

    const createData = () => {
        let data: Data;
        data = [];
        for (let i = 1; i <= 40; i++) {
            let item: ObjectItem;
            item = { id: i, status: 1 };
            data.push(item);
        }
        return data
    }

    const onPick = async (i: number) => {
        let data = [...state.data];
        if (!state.onBet && !state.autoBet) {
            if (state.count < 10) {
                if (data[i - 1].status === 1) {
                    dispatch({ type: "Pick", id: i })

                } else if (data[i - 1].status === 2 || data[i - 1].status === 5) {
                    if (state.afterBet) {
                        for (let x of data) {
                            if (x.status === 5) { x.status = 2 }
                            else if (x.status === 4 || x.status === 3) {
                                x.status = 1
                            }
                        }
                        data[i - 1].status = 1
                        dispatch({ type: "PickAfterBet", data: data })
                    } else
                        dispatch({ type: "UnPick", id: i })
                }
            } else {
                if (data[i - 1].status === 2 || data[i - 1].status === 5) {
                    if (state.afterBet) {
                        for (let x of data) {
                            if (x.status === 5) { x.status = 2 }
                            else if (x.status === 4 || x.status === 3) {
                                x.status = 1
                            }
                        }
                        data[i - 1].status = 1
                        dispatch({ type: "PickAfterBet", data: data })
                    } else
                        dispatch({ type: "UnPick", id: i })
                }
            }
        }
    };

    type Z = Array<number>;
    const RandomPick = async () => {
        await dispatch({ type: "SetOnBet", status: false });
        await dispatch({ type: "SetResult", data: undefined });
        let x = createData();
        let idList: Z = [];
        for (let i = 1; i <= 40; i++) {
            idList.push(i);
        }
        let rdList: Z = [];
        for (let i = 1; i <= 10; i++) {
            let rd = Math.floor(Math.random() * idList.length);
            rdList.push(idList[rd]);
            idList.splice(rd, 1);
        }
        for (let y of rdList) {
            x[y - 1].status = 2;
        }
        await dispatch({ type: "SetDisable", status: true })
        await dispatch({ type: "Random", data: x })
        await dispatch({ type: "Disable" })
    }

    const ClearPick = async () => {
        await dispatch({ type: "SetOnBet", status: false })
        await dispatch({ type: "SetResult", data: undefined })
        let x = createData();
        dispatch({ type: "Clear", data: x })
    }

    const changePayout = (x: number) => {
        switch (x) {
            case 0:
                dispatch({ type: "Payout", data: [] })
                break;
            case 1:
                dispatch({ type: "Payout", data: [0, 3.96] })
                break;
            case 2:
                dispatch({ type: "Payout", data: [0, 1.9, 4.5] })
                break;
            case 3:
                dispatch({ type: "Payout", data: [0, 1, 3.1, 10.4] })
                break;
            case 4:
                dispatch({ type: "Payout", data: [0, 0.8, 1.8, 5, 22.5] })
                break;
            case 5:
                dispatch({ type: "Payout", data: [0, 0.25, 1.4, 4.1, 16.5, 36] })
                break;
            case 6:
                dispatch({ type: "Payout", data: [0, 0, 1, 3.68, 7, 16.5, 40] })
                break;
            case 7:
                dispatch({ type: "Payout", data: [0, 0, 0.47, 3, 4.5, 14, 31, 60] })
                break;
            case 8:
                dispatch({ type: "Payout", data: [0, 0, 0, 2.2, 4, 13, 22, 55, 70] })
                break;
            case 9:
                dispatch({ type: "Payout", data: [0, 0, 0, 1.55, 3, 8, 15, 44, 60, 85] })
                break;
            case 10:
                dispatch({ type: "Payout", data: [0, 0, 0, 1.4, 2.25, 4.5, 8, 17, 50, 80, 100] })
                break;
            default:
                dispatch({ type: "Payout", data: [] })
        }
    }
    const changeBet = (type: string) => {
        switch (type) {
            case "min":
                dispatch({ type: "SetBet", data: 10 })
                break;
            case "max":
                dispatch({ type: "SetBet", data: 1000 })
                break;
            case "x2":
                if (state.bet * 2 < 1000) { dispatch({ type: "SetBet", data: state.bet * 2 }) }
                else dispatch({ type: "SetBet", data: 1000 })
                break;
            case "/2":
                if (state.bet / 2 > 10) { dispatch({ type: "SetBet", data: state.bet / 2 }) }
                else dispatch({ type: "SetBet", data: 10 });
                break;
            default:
                dispatch({ type: "SetBet", data: 0 });
        }
    }
    const doBet = async () => {
        if (balance >= state.bet) {
            if (!state.onBet) {
                if (state.count > 0) {
                    await dispatch({ type: "Disable" });
                    await dispatch({ type: "SetOnBet", status: true });
                    let idList: Z = [];
                    for (let i = 1; i <= 40; i++) {
                        idList.push(i);
                    }
                    let rdList: Z = [];
                    for (let i = 1; i <= 10; i++) {
                        let rd = Math.floor(Math.random() * idList.length);
                        rdList.push(idList[rd]);
                        idList.splice(rd, 1);
                    }
                    let data = [...state.data];
                    let newR: number = 0;
                    for (let x of rdList) {
                        if (data[x - 1].status === 2 || data[x - 1].status === 5) {
                            data[x - 1].status = 5;
                            newR += 1;
                        }
                        else { data[x - 1].status = 4; }
                    }
                    for (let y of data) {
                        if (rdList.indexOf(y.id) === -1) {
                            if (y.status !== 2 && y.status !== 5) { y.status = 3; }
                            else if (y.status === 5) { y.status = 2; }
                        }
                    }
                    setTimeout(async () => {
                        await changeBalance(balance + state.bet * state.payout[newR] - state.bet);
                        await dispatch({
                            type: "EndBet",
                            data: data,
                            result: newR,
                            winRate: state.payout[newR],
                            winAmount: state.bet * state.payout[newR] - state.bet,
                            hisBet: [...state.hisBet, state.payout[newR]]
                        })
                    }, 1000)
                }
            }
        } else {
            dispatch({ type: "ShowAlert", status: true })
        }
    }

    const startAuto = async (x: AutoOptions) => {
        await dispatch({ type: "AutoBet", status: true, data: x })
        await dispatch({ type: "SetAutoNumber", data: state.autoNumber + 1 })
        await dispatch({ type: "SetAutoStage", data: state.autoStage < 3 ? state.autoStage + 1 : 1 })
    }

    return <Main>
        <AutoBetModal
            start={startAuto}
            show={state.showAuto}
            offShow={() => { dispatch({ type: "ShowAuto", status: false }) }}
        />
        <div className="left_content" >
            <div className="main_container">
                <ResultModal show={state.showResult} profit={state.winAmount} offShow={() => { dispatch({ type: "ShowResult", status: false }) }} rate={state.winRate} />
                <AlertModal show={state.showAlert} offShow={() => { dispatch({ type: "ShowAlert", status: false }) }} />
                <div className="main1"></div>
                <div className="main2">
                    <HistoryBet data={state.hisBet} />
                    <div className="gm">
                        <div className="gm_pick">
                            <div className="gm_pick_title">Pick from 1 to 10 numbers to play</div>
                            <div className="gm_pick_table">
                                {state.data.map((item, index) => <PickNumber key={index} value={item.id} status={item.status} onClick={() => {
                                    onPick(item.id)
                                }} />)}
                            </div>
                            <div className="gm_pick_functions">
                                <RiskPicker />
                                <div className="gm_pick_functions_button">
                                    <Button isDisable={state.autoBet || state.onBet} title="Random picks" width={141} onClick={RandomPick} />
                                    <Button isDisable={state.autoBet || state.onBet} title="Clear table" width={128} onClick={ClearPick} />
                                </div>
                            </div>
                        </div>
                        <PayoutTable count={state.count} data={state.payout} result={state.result} />
                    </div>
                    <div className="gb">
                        <div className="gb_amount">
                            <div className="gb_amount_minmax">
                                <ButtonAmount disabled={state.autoBet || state.onBet} onClick={() => { changeBet("min") }}>Min</ButtonAmount>
                                <ButtonAmount disabled={state.autoBet || state.onBet} onClick={() => { changeBet("max") }}>Max</ButtonAmount>
                            </div>
                            <div className="gb_amount_value">
                                <div className="gb_amount_value_title">Bet amount</div>
                                <div className="gb_amount_value_number">
                                    <img src={gold} alt="X" />
                                    <NumberFormat
                                        value={state.bet}
                                        displayType={state.autoBet ? "text" : "input"}
                                        thousandSeparator={true}
                                        onValueChange={(values) => {
                                            dispatch({
                                                type: "SetBet",
                                                data: values.floatValue < 10 ? 10 :
                                                    values.floatValue > balance && balance >= 10 ? balance :
                                                        values.floatValue > balance && balance < 10 ? 10 :
                                                            values.floatValue
                                            })
                                        }}
                                        // isAllowed={({ floatValue }) => floatValue <= balance && floatValue >= 10}
                                        style={{ width: `${10 * (state.bet.toString().length)}px`, minWidth: "20px" }}
                                        allowEmptyFormatting
                                    />
                                </div>
                            </div>
                            <div className="gb_amount_math">
                                <ButtonAmount disabled={state.autoBet || state.onBet} onClick={() => { changeBet("/2") }}>/2</ButtonAmount>
                                <ButtonAmount disabled={state.autoBet || state.onBet} onClick={() => { changeBet("x2") }}>x2</ButtonAmount>
                            </div>
                        </div>
                        <div className="gb_buttons">
                            <button disabled={state.autoBet} className={state.autoBet ? "gb_buttons_autobet" : "gb_buttons_bet"} onClick={doBet}>Bet</button>
                            <button
                                disabled={state.onBet}
                                className={state.autoBet ? "gb_buttons_bet" : "gb_buttons_autobet"}
                                onClick={() => {
                                    if (!state.autoBet) dispatch({ type: "ShowAuto", status: true })
                                    else dispatch({ type: "AutoBet", status: false, data: {} })
                                }}>{state.autoBet ? "Stop Auto bet" : "Auto bet"}</button>
                        </div>
                    </div>
                </div>
            </div>
            <MyBetBoard />
        </div>
        <div className="right_board">
            <LeaderBoard />
        </div>
    </Main >
}

export default Keno;

const Main = styled.div`
    width: 100%;
    height: fit-content;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    .left_content {
        width: 1001px;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        .main_container {
            width: 1001px;
            height: 793px;
            position: relative;
            perspective: 1000px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 80px;
            .main1 {
                width: 995px;
                height: 786px;
                background: transparent linear-gradient(55deg, #ff8467 0%, #ffa143 100%) 0% 0%;
                border-radius: 15px;
                position: absolute;
                transform-style: preserve-3d;
                transform: rotateX(-1.4deg);
            }
            .main2 {
                position: absolute;
                top: 8px;
                left: 6px;
                width: 989px;
                height: 778px;
                background: #262e3f 0% 0% no-repeat padding-box;
                border: 1px solid #45617e;
                border-radius: 15px;
                padding: 35px 50px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                color: white;
                .gb {
                    width: 100%auto;
                    height: 96px;
                    background: #293245 0% 0% no-repeat padding-box;
                    box-shadow: 0px 3px 6px #00000029;
                    border-radius: 5px;
                    padding: 15px 51px;
                    display: flex;
                    justify-content: space-between;
                    .gb_amount {
                        width: 342px;
                        height: 100%;
                        background: #293245 0% 0% no-repeat padding-box;
                        border: 1px solid #45617E;
                        border-radius: 5px;
                        padding: 7px 10px;
                        display: flex;
                        .gb_amount_minmax {
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            width: 44px;
                        }
                        .gb_amount_value {
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            flex: 1;
                            .gb_amount_value_title {
                                width: 100%;
                                height: 24px;
                                line-height: 24px;
                                text-align: center;
                                font: normal normal normal 16px/19px Helvetica;
                                color: #798FA6;
                            }
                            .gb_amount_value_number {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                width: 100%;
                                height: 24px;
                                img {
                                    margin-right: 6px;
                                }
                                input,span {
                                    background-color: transparent;
                                    border: none;
                                    outline: none;
                                    font: normal normal bold 16px/19px Helvetica;
                                    color: #FFFFFF;
                                    resize: horizontal;
                                    padding: 0;
                                }
                            }
                        }
                        .gb_amount_math {
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            width: 44px;
                        }
                    }
                    .gb_buttons {
                        width: 375px;
                        display: flex;
                        justify-content: space-between;
                        height: 100%;
                        .gb_buttons_bet {
                            width: 180px;
                            height: 100%;
                            background: transparent linear-gradient(72deg, #FF8467 0%, #FFAE5D 100%) 0% 0%;
                            border-radius: 5px;
                            color: white;
                        }
                        .gb_buttons_autobet {
                            width: 180px;
                            height: 100%;
                            border: 1px solid #FF8467;
                            border-radius: 5px;
                            background-color: transparent;
                            color: white;
                        }
                    }
                }
                .gm {
                    flex: 1;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    margin: 11px 0 32px 0;
                    .gm_pick {
                        display: flex;
                        flex-direction: column;
                        flex: 1;
                        margin-right: 40px;
                        .gm_pick_title {
                            font: normal normal normal 16px/19px Helvetica;
                            color: #BCCEE2;
                            height: 48px;
                            width: 100%;
                            line-height: 48px;
                        }
                        .gm_pick_table {
                            width: 100%;
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: space-between;
                            flex: 1;
                        }
                        .gm_pick_functions {
                            height: 40px;
                            width: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            margin-top: 15px;
                            .gm_pick_functions_button {
                                height: 40px;
                                display: flex;
                                width: 289px;
                                justify-content: space-between;
                            }
                        }
                    }
                }
            } 
        }
    }
    .right_board {
        height: fit-content;
        width: 350px;
        margin-left: 5%;
    }
    @media screen and (max-width: 1500px) {
        .right_board {
            display: none;
        }
    }
    @media screen and (max-width: 1000px) {
        padding: 0 30px;
        .left_content {
            width: 100%;
            .main_container {
                width: 685px;
                height: 780px;
                .main1 {
                    width: 686px;
                    height: 770px;
                    transform: rotateX(-2deg);
                }
                .main2 {
                    width: 680px;
                    height: 773px;
                    top: 6px;
                    left: 3px;
                    padding: 30px 43px;
                    .gm {
                        flex-direction: column;
                        margin: 10px 0 10px 0;
                        .gm_pick {
                            margin-right: 0;
                            flex: none;
                            .gm_pick_functions {
                                height: 38px;
                                margin-top: 5px;
                            }                           
                        }
                    }
                    .gb {
                        height: 79px;
                        padding: 10px 0;
                        background: none;
                        box-shadow: none;
                        .gb_buttons {
                            width: 272px;
                            .gb_buttons_bet {
                                width: 130px;
                            }
                            .gb_buttons_autobet {
                                width: 130px;
                            }
                        }
                        .gb_amount {
                            width: 291px;
                            padding: 4px 10px;
                        }
                    }
                }
            }
        } 
    }
    @media screen and (max-width: 700px) {
        padding: 0;
        .left_content {
            width: 100%;
            .main_container {
                width: 100%;
                height: fit-content;
                .main1 {
                    display: none;
                }
                .main2 {
                    width: 100%;
                    position: unset;
                    background: none;
                    border: none;
                    border-radius: 0;
                    padding: 35px 20px;
                    height: auto;
                    .gm {
                        margin-top: 0;
                        flex-direction: column-reverse;
                        height: auto;
                        .gm_pick {
                            .gm_pick_functions {
                                .gm_pick_functions_button {
                                    width: 49%;
                                }
                            }
                        }
                    }
                    .gb {
                        flex-direction: column;
                        height: fit-content;
                        .gb_amount {
                            width: 100%;
                            height: 60px;
                            margin-bottom: 20px;
                        }
                        .gb_buttons {
                            width: 100%;
                            height: 38px;
                            .gb_buttons_autobet, .gb_buttons_bet {
                                width: 49%;
                                max-width: 152px;
                            }
                        }
                    }               
                }
            }
        }
    }
`
const ButtonAmount = styled.button`
    width: 44px;
    height: 24px;
    background: #38445D 0% 0% no-repeat padding-box;
    border-radius: 3px;
    color: white;
    font-family: Helvetica;
`
