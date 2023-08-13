import React from 'react'
import { Redirect } from 'react-router-dom'
import { ColorContext } from '../context/colorcontext'
import { useParams } from 'react-router-dom'
const socket = require('../connection/socket').socket
import JoinGame from './onboard/joingame'
import ChessGame from './chess/ui/chessgame'

class CreateNewGame extends React.Component {

    state = {
        didGetUserName: true,
        inputText: "",
        gameId: "",
        didGetColor: false,
        color: "",
        username: "",
        isRoomExist: false
    }

    constructor(props) {
        super(props);
        this.textArea = React.createRef();
        this.username = this.props.userName
        if (newGameRoomId in this.props.activeRooms) {
            this.setState({
                isRoomExist: true
            })
        } else {
            this.props.setNewActiveRoom([...activeRooms, newGameRoomId])
        }
    }

    send = () => {

        const newGameRoomId = this.props.gameId
        const userName = this.props.userName
        const typedText = this.textArea.current.value

        if (newGameRoomId in this.props.activeRooms) {
            this.setState({
                isRoomExist: true
            })
        } else {
            this.props.setNewActiveRoom([...activeRooms, newGameRoomId])
        }


        this.setState({
            inputText: typedText,
            username: userName,
            gameId: newGameRoomId,
            didGetUserName: true
        })

        // emit an event to the server to create a new room 
        socket.emit('createNewGame', newGameRoomId)

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
            {
                this.state.isRoomExist ?
                    <React.Fragment>
                        <JoinGame userName={this.props.userName} isCreator={false} />
                        <ChessGame myUserName={this.props.userName} />
                    </React.Fragment>
                    :
                    this.state.didGetColor ?
                        <Redirect to={"/new/" + this.props.userName + "/" + this.props.gameId}>
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
                                    this.setState({
                                        username: this.props.userName
                                    })
                                    this.props.didRedirect()
                                    console.log(this.props)
                                    this.props.setUserName(this.props.userName)

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

    return <CreateNewGame userName={username}
        gameId={gameid}
        didRedirect={color.playerDidRedirect}
        activeRooms={activeRooms}
        setNewActiveRoom={setNewActiveRoom} />
}


export default NewGame