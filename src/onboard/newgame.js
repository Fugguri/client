import React from 'react'
import { Redirect } from 'react-router-dom'
import { ColorContext } from '../context/colorcontext'
import { useParams } from 'react-router-dom'
import JoinGame from './joingame'
import ChessGame from '../chess/ui/chessgame'
const addRoom = require('../connection/socket').addRoom
const socket = require('../connection/socket').socket
const rooms = require('../connection/socket').rooms


class CreateNewGame extends React.Component {

    state = {
        didGetUserName: true,
        inputText: "",
        gameId: "",
        didGetColor: false,
        color: "",
        username: "",
        isRoomExist: false,
        join: false,
        isAdmin: true
    }



    constructor(props) {
        super(props);
        this.textArea = React.createRef();
        this.username = this.props.userName
        socket.emit('isGameExist', { gameId: this.props.gameId, userName: this.username })

    }

    isCreator = () => {
        if (this.state.creator) {

            this.setState({
                isRoomExist: true
            })
        }
    }

    send = () => {

        const newGameRoomId = this.props.gameId
        const userName = this.props.userName
        const typedText = this.textArea.current.value

        this.setState({
            inputText: typedText,
            username: userName,
            gameId: newGameRoomId,
            didGetUserName: true
        })
        // addRoom({ gameId: this.props.gameId, creator: this.props.userName })

        // emit an event to the server to create a new room 
        socket.emit('createNewGame', { gameId: newGameRoomId, creator: userName })
        socket.emit('isGameExist', { gameId: this.props.gameId, userName: this.username })


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

        socket.on('isGameExist', (data) => {

            if (data.isExist && data.creator !== undefined && data.creator != this.username) {
                console.log("is exist redir")
                this.setState({
                    join: true,
                    isAdmin: false
                })

            }
        })

        return (<React.Fragment>
            {this.state.join && !this.state.isAdmin ?
                <React.Fragment>
                    <JoinGame userName={this.props.userName} isCreator={false} />
                    <ChessGame myUserName={this.props.userName} />
                </React.Fragment> :
                this.state.didGetColor ?
                    <Redirect to={"/new/" + this.state.gameId + "/" + this.state.username}>
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
                                this.props.setUserName(this.state.username)
                                this.isCreator()
                                this.setState({
                                    didGetColor: true,
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
        setUserName={props.setUserName}
    />
}


export default NewGame