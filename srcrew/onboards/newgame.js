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
        gameId: "",
        didGetColor: false,
        color: ""
    }

    constructor(props) {
        super(props);

        this.textArea = React.createRef();
    }

    send = () => {

        const newGameRoomId = this.props.gameId
        const userName = this.props.userName

        console.log(userName)
        console.log(newGameRoomId)

        this.setState({
            inputText: userName,
            gameId: newGameRoomId,
            didGetUserName: true
        })


        // emit an event to the server to create a new room 
        // socket.emit('createNewGame', newGameRoomId)

        // const idData = {
        //     gameId: newGameRoomId,
        //     userName: userName,
        //     isCreator: true
        // }
        // socket.emit("playerJoinGame", idData)
    }

    typingColor = () => {
        // grab the input text from the field from the DOM 
        const typedText = this.textArea.current.value

        // set the state with that text
        this.setState({
            color: typedText
        })
    }

    render() {
        // !!! TODO: edit this later once you have bought your own domain. 

        return (<React.Fragment>
            {this.state.didGetColor ?
                <Redirect to={"/new/" + this.state.userName + "/" + this.state.gameId}>
                    <button className="btn btn-success" style={{ marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px" }}>Start Game</button>
                </Redirect>
                :
                <div>
                    <h1 style={{ textAlign: "center", marginTop: String((window.innerHeight / 3)) + "px" }}>select chess color:</h1>

                    <input style={{ marginLeft: String((window.innerWidth / 2) - 120) + "px", width: "240px", marginTop: "62px" }}
                        ref={this.textArea}
                        onInput={this.typingColor}></input>

                    <button className="btn btn-primary"
                        style={{ marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px", marginTop: "62px" }}
                        disabled={!(this.state.color.length > 0)}
                        onClick={() => {

                            this.props.didRedirect()

                            // this.props.setUserName(this.state.userName)

                            this.setState({
                                didGetColor: true
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

    console.log(props)
    console.log(gameid, username)
    props.setUserName(username)

    return <CreateNewGame userName={username} gameId={gameid} didRedirect={color.playerDidRedirect} />
}


export default NewGame