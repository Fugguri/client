import { createContext } from 'react'

export const ColorContext = createContext({
    didRedirect: false,
    isCreator: false,
    playerDidRedirect: () => { },
    playerDidNotRedirect: () => { },
    playerNotIsCreator: () => { },
    playerIsCreator: () => { }
})