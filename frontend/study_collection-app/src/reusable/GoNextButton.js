
export default function GoNextButton({ onClick, text }) {
    return (
        <div className="go-next" onClick={onClick}>
            <span>{text}</span>
        </div>
    );
}