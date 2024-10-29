import "../assets/css/reusable/OutsideLinkButton.css";

export default function OutsideLinkButton({ link, text }) {
    return (
        <a className="outside-link-button" href={link} target="_blank" rel="noreferrer">
            <span>
                {text}
            </span>
        </a>
    );
}