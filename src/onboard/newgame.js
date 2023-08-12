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
        didGetUserName: false,
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

        this.setState({
            didGetUserName: true
        })
        this.props.didRedirect()
        // emit an event to the server to create a new room 
        socket.emit('createNewGame', newGameRoomId)
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
        console.log('создание')

        return (<React.Fragment>
            {

                <Redirect to={"/game/" + this.state.gameId + "/" + this.state.userName} >
                    <button className="btn btn-success" style={{ marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px" }}>Start Game</button>
                </Redirect>

            }
        </React.Fragment>)
    }
}

const NewGame = (props) => {

    const { gameid, username } = useParams()
    const color = React.useContext(ColorContext)
    return <CreateNewGame userName={username} gameId={gameid} didRedirect={color.playerDidRedirect} setUserName={props.setUserName()} />
}


export default NewGame