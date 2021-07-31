import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import Check from "asserts/img/check.svg";
import NoCheck from "asserts/img/nocheck.svg";


interface ABProps {
    title: string,
}

const AutoOptions = React.forwardRef(({ title }: ABProps, ref) => {
    const [changeAmount, setCA] = useState<Number>(0);
    const [change, setChange] = useState<boolean>(false);
    const [reset, setReset] = useState<boolean>(false);
    const [stop, setStop] = useState<boolean>(false);

    useEffect(() => {
        ref.current = {
            changeAmount: changeAmount,
            change: change,
            reset: reset,
            stop: stop
        }
    })

    return <AR >
        <div className="ar_title">{title}</div>
        <div className="ar_options">
            <div className="ar_check">
                <img src={change ? Check : NoCheck} alt="" onClick={() => {
                    if (change) setChange(false)
                    else {
                        setChange(true);
                        setReset(false);
                        setStop(false);
                    }
                }} />
                <span className={change ? "ar_check_text ar_check_text_active" : "ar_check_text"}>Thay đổi cược %</span>
            </div>
            <div className="ar_change_input">
                <NumberFormat
                    value={changeAmount}
                    thousandSeparator={true}
                    displayType={change ? "input" : "text"}
                    onValueChange={(values) => {
                        setCA(values.floatValue);
                    }}
                    isAllowed={({ floatValue }) => floatValue <= 1000 && floatValue >= 0}
                    className={change ? "check" : ""}
                />
                <div className="dv">%</div>
            </div>
            <div className="ar_check">
                <img src={reset ? Check : NoCheck} alt="" onClick={() => {
                    if (reset) setReset(false)
                    else {
                        setReset(true);
                        setChange(false);
                        setStop(false);
                    }
                }} />
                <span className={reset ? "ar_check_text ar_check_text_active" : "ar_check_text"}>Đặt lại về mức đặt cược cơ bản</span>
            </div>
            <div className="ar_check">
                <img src={stop ? Check : NoCheck} alt="" onClick={() => {
                    if (stop) setStop(false)
                    else {
                        setStop(true);
                        setReset(false);
                        setChange(false);
                    }
                }} />
                <span className={stop ? "ar_check_text ar_check_text_active" : "ar_check_text"}>Dừng đặt cược tự động</span>
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