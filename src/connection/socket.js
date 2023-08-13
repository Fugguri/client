import io from 'socket.io-client'

const socket = io('https://a29f0d485b3e.vps.myjino.ru')
// const socket = io('http://99605bb2fc3e.vps.myjino.ru:49255')

var mySocketId
// register preliminary event listeners here:
let rooms = []


socket.on("createNewGame", statusUpdate => {
    console.log("A new game has been created! Username: " + statusUpdate.userName + ", Game id: " + statusUpdate.gameId + " Socket id: " + statusUpdate.mySocketId)
    mySocketId = statusUpdate.mySocketId
    rooms.push(statusUpdate)
})

const addRoom = (room) => {
    console.log(room)
    console.log(rooms)

    const roomId = room.roomId
    const creator = room.creator

    const isExist = rooms.find((r) => r.roomId === roomId)

    !isExist && rooms.push(room)
    console.log(rooms)
    return { isExist: !!isExist, creator: creator }
}

export {
    socket,
    mySocketId,
    addRoom
}