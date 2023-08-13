let rooms = []

const addRoom = (room) => {
    const roomId = room.roomId
    const creator = room.creator

    const isExist = rooms.find((r) => r.roomId === roomId && r.creator === creator)

    !isExist && rooms.push(room)

    return { isExist: isExist, creator: creator }
}

export default addRoom
