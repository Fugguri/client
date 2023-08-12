import React from 'react'
import { Redirect } from 'react-router-dom'
import { ColorContext } from '../context/colorcontext'
import { useParams } from 'react-router-dom'
const socket = require('../connection/socket').socket
/**
 * Onboard is where we create the game room.
 */

const CreateGame = (userName, gameId, props) => {

    // emit an event to the server to create a new room 
    socket.emit('createNewGame', gameId)
}


class CreateNewGame extends React.Component {

    state = {
        didGetUserName: true,
        inputText: "",
        gameId: ""
    }

    constructor(props) {
        super(props);
        this.textArea = React.createRef();

    }

    render() {
        return (
            <React.Fragment>
                {this.state.didGetUserName ?
                    <Redirect to={"/game/" + this.props.gameId + "/" + this.props.userName} >
                        <button className="btn btn-success" style={{ marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px" }}>Start Game</button>
                    </Redirect> :
                    <div>
                        <h1 style={{ textAlign: "center", marginTop: String((window.innerHeight / 3)) + "px" }}>Your Username:</h1>

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
                                this.props.didRedirect()
                                this.props.setUserName(this.state.inputText)
                                this.setState({
                                    didGetUserName: true
                                })
                                this.send()
                            }}>Submit</button>
                    </div>
                }


            </React.Fragment>)
    }
}



const NewGame = (props) => {

    const { gameid, username } = useParams()
    const color = React.useContext(ColorContext)
    CreateGame(username, gameid, props)
    props.setUserName(username)
    return <CreateNewGame userName={username} gameId={gameid} didRedirect={color.playerDidRedirect} />

}


export default NewGame