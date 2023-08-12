import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { v4 as uuid_v4 } from "uuid";
import { ColorContext } from '../context/colorcontext'
import { useParams } from 'react-router-dom'
const socket = require('../connection/socket').socket

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
        useEffect(() => {
            this.setState({
                inputText: userName,
                gameId: newGameRoomId,
                didGetUserName: true
            });
            this.props.didRedirect()
        }, [this.props]);

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
        console.log('создание')

        return (<React.Fragment>
            {<Redirect to={"/new/" + this.state.userName + "/" + this.state.gameId}>
                <button className="btn btn-success" style={{ marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px" }}>Start Game</button>
            </Redirect>
            }
        </React.Fragment>)
    }
}

const NewGame = (props) => {
    const { gameid, username } = useParams()
    const color = React.useContext(ColorContext)


    return <CreateNewGame userName={username} gameId={gameid} didRedirect={color.playerDidRedirect} />
}


export default NewGame