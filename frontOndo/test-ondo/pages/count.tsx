import useUser from "../store/hooks/userHooks"


export default function Test() {
    const {plus, count} = useUser()
    return (
        <div>
            <h1>count</h1>
            <button onClick={() => plus()}> + </button>
            <p> 값: {count}</p>

        </div>
    )
}