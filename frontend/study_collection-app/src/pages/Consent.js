import React from "react";

import "../assets/css/pages/Consent.css";

import OutsideLinkButton from "../reusable/OutsideLinkButton.js";
import RouteButton from "../reusable/RouteButton.js";

export default function Consent() {
    return (
        <div className="consent">
            <h1>Consent form</h1>
            <p>
                This form is to ensure that you understand the study and agree to participate. 
                We remind you that your participation is voluntary, and you, as well as your data, may be withdrew at any time 
                without penalty even after the end of the study.
            </p>
            <p>
                If you understand and agree to the terms, please click the button below to access and sign the consent form.
            </p>
            <OutsideLinkButton link="https://docs.google.com/document/d/1DuWCRt3v0KSsmW2CtMOPeyd0kuZRPox6/edit" text="Consent form"/>
            <p>
                Once you read and signed the consent form, please click the button below to start the study. Again if you have any questions, feel free to stop us and ask us anytime.
            </p>
            <RouteButton path="/task" text="Start study" load={'http://127.0.0.1:5288/api/Data/GetData'}/>
        </div>
    );
}