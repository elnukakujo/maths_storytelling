export default function GoNextButton({ className, onClick, text }) {
    return (
        <button className={`go-next ${className} button`} onClick={onClick}>
            {text}
        </button>
    );
}
