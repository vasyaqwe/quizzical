import { useContext } from 'react'
import { Context } from "../Context"

function Error() {
    const { backToMenu } = useContext(Context)
    return (
        <div className="error-screen">
            <p>Failed to get the quiz :(</p>
            <p>
                Try again with another category or type (Multiple or True/False)
            </p>
            <button onClick={backToMenu} className="btn btn-back-to-menu">Back to Menu</button>
        </div>
    )
}
export default Error