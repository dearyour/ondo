import useUser from "../store/hooks/userHooks"
import AppLayout from '../components/layout/AppLayout'


export default function Test() {
    const {data, count} = useUser()
    return (
        
        <div>
            <AppLayout>
            </AppLayout>
            <h1>count</h1>
            <button onClick={() => data()}> + </button>
            <p> 값: {count}</p>

        </div>
    )
}