import { useNavigate } from "react-router-dom";

import '../assets/css/reusable/RouteButton.css';

import { useGlobal } from "../Context.js";

export default function RouteButton({ path, text }) {
    const navigate = useNavigate();
    const { isLoading } = useGlobal();

    const handleClick = () => {
        if (isLoading) return;
        navigate(path);
    }
    
    return (
        <div className="route-button" onClick={handleClick}>
            <span>
                {text}
            </span>
        </div>
    );
}