import React from 'react'
import { Redirect } from 'react-router-dom'
import { ColorContext } from '../context/colorcontext'
import { useParams } from 'react-router-dom'
const socket = require('../connection/socket').socket
/**
 * Onboard is where we create the game room.
 */

const CreateNewGame = (userName, gameId, props) => {
    props.didRedirect()
    // emit an event to the server to create a new room 
    socket.emit('createNewGame', gameId)
}



const NewGame = (props) => {

    const { gameid, username } = useParams()
    const color = React.useContext(ColorContext)
    CreateNewGame(username, gameid, props)

    return <React.Fragment>
        {
            <Redirect to={"/game/" + gameId + "/" + userName} >
                <button className="btn btn-success" style={{ marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px" }}>Start Game</button>
            </Redirect>
        }
    </React.Fragment>
}


export default NewGame