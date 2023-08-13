let rooms = []

export const addRoom = (room) => {
    console.log(room)

    const roomId = room.roomId
    const creator = room.creator

    const isExist = rooms.find((r) => r.roomId === roomId)

    !isExist && rooms.push(room)
    console.log(rooms)
    return { isExist: !!isExist, creator: creator }
}

export const findRoom = (room) => {
    const roomId = room.roomId
    const isExist = rooms.find((r) => r.roomId === roomId)

    return !!isExist
}

export default { addRoom, findRoom }
