import React from 'react'
import { Redirect } from 'react-router-dom'
import { v4 as uuid_v4 } from "uuid";
import { ColorContext } from '../context/colorcontext'
import { useParams } from 'react-router-dom'
const socket = require('../connection/socket').socket
/**
 * Onboard is where we create the game room.
 */

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

    send = () => {
        /**
         * This method should create a new room in the '/' namespace
         * with a unique identifier. 
         */
        const newGameRoomId = this.props.gameId
        const userName = this.props.userName
        // set the state of this component with the gameId so that we can
        // redirect the user to that URL later. 
        this.setState({
            inputText: userName,
            gameId: newGameRoomId
        })

        // emit an event to the server to create a new room 
        socket.emit('createNewGame', newGameRoomId)

        const idData = {
            gameId: newGameRoomId,
            userName: userName,
            isCreator: true
        }
        socket.emit("playerJoinGame", idData)
    }

    // typingUserName = () => {
    //     // grab the input text from the field from the DOM 
    //     const typedText = this.textArea.current.value

    //     // set the state with that text
    //     this.setState({
    //         inputText: typedText
    //     })
    // }

    render() {
        // !!! TODO: edit this later once you have bought your own domain. 
        this.send()
        return (<React.Fragment>
            {
                this.state.didGetUserName ?
                    <Redirect to={"/game/" + this.state.gameId}>
                        <button className="btn btn-success" style={{ marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px" }}>Start Game</button>
                    </Redirect>
                    :

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

    const { username, gameid } = useParams()
    const color = React.useContext(ColorContext)
    return <CreateNewGame userName={username} gameId={gameid} didRedirect={color.playerDidRedirect} setUserName={props.setUserName()} />
}


export default NewGame