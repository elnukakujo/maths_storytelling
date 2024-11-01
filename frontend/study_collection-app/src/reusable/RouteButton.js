import { useNavigate } from "react-router-dom";

import '../assets/css/reusable/RouteButton.css';

import { fetchData } from "./api.js";

export default function RouteButton({ path, text, load }) {
    const navigate = useNavigate();

    const handleClick = async () => {
        if (load) {
            const data = await fetchData(load);
            if (data.stories && data.exercises) {
                navigate(path, {
                    state: {
                        stories: data.stories,
                        exercises: data.exercises
                    }
                });
                return;
            }
        }
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