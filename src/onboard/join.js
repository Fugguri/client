import React from 'react'
import JoinGame from './joingame'
import ChessGame from '../chess/ui/chessgame'
import { ColorContext } from '../context/colorcontext'
import { useParams } from 'react-router-dom'

/**
 * Onboard is where we create the game room.
 */

class JoinTheGame extends React.Component {

    state = {
        didGetUserName: true,
        inputText: ""
    }

    constructor(props) {
        super(props);

        this.inputText = React.createRef();
    }


    render() {
        console.log('присоединение')
        return (<React.Fragment>
            {
                this.state.didGetUserName ?
                    <React.Fragment>
                        <JoinGame userName={this.props.userName} isCreator={false} />
                        <ChessGame myUserName={this.props.userName} />

                    </React.Fragment>
                    :
                    <div>
                        <h1 style={{ textAlign: "center", marginTop: String((window.innerHeight / 3)) + "px" }}>Enter Your Username:</h1>

                        <input style={{ marginLeft: String((window.innerWidth / 2) - 120) + "px", width: "240px", marginTop: "62px" }}
                            ref={this.textArea}
                            onInput={this.typingUserName}></input>

                        <button className="btn btn-primary"
                            style={{ marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px", marginTop: "62px" }}
                            disabled={!(this.state.inputText.length > 0)}
                            onClick={() => {
                                // When the 'Submit' button gets pressed from the username screen,
                                // We should send a request to the server to create a new room with
                                // the uuid we generate here.
                                this.setState({ didGetUserName: true })
                            }}>Submit</button>
                    </div>
            }
        </React.Fragment>)
    }
}

const Join = (props) => {

    const { username } = useParams()
    const color = React.useContext(ColorContext)
    return <JoinTheGame userName={username} />
}


export default Join