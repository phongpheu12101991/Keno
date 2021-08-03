import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import Check from "asserts/img/check.svg";
import NoCheck from "asserts/img/nocheck.svg";


interface ABProps {
    title: string,
}

const AutoOptions = React.forwardRef(({ title }: ABProps, ref) => {
    type State = {
        changeAmount: number,
        change: boolean,
        reset: boolean,
        stop: boolean
    }
    type Action =
        | { type: 'ChangeAmount', data: number }
        | { type: 'Change' }
        | { type: 'Reset' }
        | { type: 'Stop' }

    const dataReducer = (state: State, action: Action) => {
        switch (action.type) {
            case "ChangeAmount":
                return { ...state, changeAmount: action.data };
            case "Change":
                return { ...state, change: true, reset: false, stop: false };
            case "Reset":
                return { ...state, change: false, reset: true, stop: false };
            case "Stop":
                return { ...state, change: false, reset: false, stop: true };
            default:
                throw new Error();
        }
    };

    const [state, dispatch] = useReducer(dataReducer, {
        changeAmount: 0,
        change: false,
        reset: true,
        stop: false
    });


    useEffect(() => {
        ref.current = { ...state };
    })

    return <AR >
        <div className="ar_title">{title}</div>
        <div className="ar_options">
            <div className="ar_check">
                <img src={state.change ? Check : NoCheck} alt="" onClick={() => {
                    if (!state.change) dispatch({ type: "Change" })
                }} />
                <span className={state.change ? "ar_check_text ar_check_text_active" : "ar_check_text"}>Thay đổi cược %</span>
            </div>
            <div className="ar_change_input">
                <NumberFormat
                    value={state.changeAmount}
                    thousandSeparator={true}
                    displayType={state.change ? "input" : "text"}
                    onValueChange={({ floatValue }) => {
                        dispatch({ type: "ChangeAmount", data: floatValue < -99 ? -99 : floatValue > 1000 ? 1000 : floatValue })
                    }}
                    // isAllowed={({ floatValue }) => floatValue <= 1000 && floatValue >= -100}
                    className={state.change ? "check" : ""}
                />
                <div className="dv">%</div>
            </div>
            <div className="ar_check">
                <img src={state.reset ? Check : NoCheck} alt="" onClick={() => {
                    if (!state.reset) dispatch({ type: "Reset" })
                }} />
                <span className={state.reset ? "ar_check_text ar_check_text_active" : "ar_check_text"}>Đặt lại về mức đặt cược cơ bản</span>
            </div>
            <div className="ar_check">
                <img src={state.stop ? Check : NoCheck} alt="" onClick={() => {
                    if (!state.stop) dispatch({ type: "Stop" })
                }} />
                <span className={state.stop ? "ar_check_text ar_check_text_active" : "ar_check_text"}>Dừng đặt cược tự động</span>
            </div>
        </div>
    </AR>
})

export default AutoOptions;

const AR = styled.div`
    width: 47%;
    display: flex;
    flex-direction: column;
    .ar_title {
        color: white;
        height: 40px;
        line-height: 40px;
    }
    .ar_options {
        width: 100%;
        background-color: #293245;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        padding: 30px 15px;
        .ar_check {
            display: flex;
            align-items: center;
            margin-top: 20px;
            img {
                margin-right: 10px;
            }
            .ar_check_text {
                text-align: left;
                color: #798FA6;
                width: 100%;
            }
            .ar_check_text_active {
                color: #FFFFFF;
            }
            &:first-child {
                margin-top: 0px;
            }
        }
        .ar_change_input {
            width: 90%;
            height: 40px;
            background-color: #293245;
            border: 1px solid #45617E;
            border-radius: 5px;
            margin-top: 10px;
            display: flex;
            align-items: center;
            align-self: flex-end;
            padding: 0 15px;
            justify-content: space-between;
            input, span {
                background-color: transparent;
                color : #798FA6;
                width: 80%;
                padding: 0;
            }
            .check {
                color: #FFFFFF;
            }
            .dv {
                color: #FFFFFF;
                padding-left: 15px;
            }
        }
    }
`