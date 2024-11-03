export default function GoNextButton({ className, onClick, text }) {
    return (
        <button className={`go-next ${className}`} onClick={onClick}>
            {text}
        </button>
    );
}
