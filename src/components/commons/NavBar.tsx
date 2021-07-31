import React, { useContext } from 'react';
import styled from 'styled-components';
import Logo from "asserts/img/Logo.svg";
import LogoBorder from "asserts/img/logoborder.svg";
import Gold from "asserts/img/gold.svg";
import { Link } from 'react-router-dom';
import UserContext from 'contexts/UserContext';


interface NBProps {

}

const NavBar = ({ }: NBProps) => {
    const { balance } = useContext(UserContext);


    return <NB>
        <Link to="/" className="nb_logo">
            <div className="nb_logo_border"></div>
            <img src={Logo} alt="" />
        </Link>
        <div className="nb_game">
        </div>
        <div className="nb_infor">
            <div className="nb_lang"></div>
            <div className="nb_space"></div>
            <div className="nb_user">
                <img src={Gold} alt="" />
                <span>{balance}</span>
            </div>
        </div>
    </NB>
}

export default NavBar;


const NB = styled.div`
    background-color: #262E3F;
    box-shadow: 0px 3px 6px #0000001A;
    position: sticky;
    z-index: 10;
    top:0;
    left: 0;
    width: 100%;
    height: 90px;
    display: flex;
    align-items: center;
    .nb_logo {
        width: 254px;
        height: 90px;
        padding: 0 54px 0 40px;
        background-image: url(${LogoBorder});
        background-size: 284px 160px;
        background-position: 60% 45%;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .nb_game {
        flex: 1;
        height: 100%;
    }
    .nb_infor {
        width: 450px;
        height: 100%;
        display: flex;
        align-items: center;
        .nb_lang {
            flex: 1;
            height: 100%;
        }
        .nb_user {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            span {
                font: normal normal bold 16px/19px Helvetica;
                color: #FFA143;
                margin-left: 10px;
            }
        }
        .nb_space {
            width: 1px;
            height: 50px;
            background-color: #45617E;
        }
    }
`
