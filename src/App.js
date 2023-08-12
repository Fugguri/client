import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import JoinRoom from './onboard/joinroom'
import { ColorContext } from './context/colorcontext'
import Onboard from './onboard/onboard'
import JoinGame from './onboard/joingame'
import NewGame from './onboard/newgame';
import ChessGame from './chess/ui/chessgame'
import Join from './onboard/join';
import './assets/styles/global.css'
function App() {

  const [didRedirect, setDidRedirect] = React.useState(false)

  const playerDidRedirect = React.useCallback(() => {
    setDidRedirect(true)
  }, [])

  const playerDidNotRedirect = React.useCallback(() => {
    setDidRedirect(false)
  }, [])

  const [userName, setUserName] = React.useState('')

  return (
    <ColorContext.Provider value={{ didRedirect: didRedirect, playerDidRedirect: playerDidRedirect, playerDidNotRedirect: playerDidNotRedirect }}>
      <Router>

        <Switch>
          <Route path="/" exact>
            <Onboard setUserName={setUserName} />
          </Route>

          <Route path="/new/:gameid/:username" exact>
            {didRedirect ?
              <React.Fragment>
                <JoinGame myUserName={userName} />
                <ChessGame myUserName={userName} />
              </React.Fragment>
              :
              <NewGame setUserName={setUserName} />
            }

          </Route>

          <Route path="/game/:gameid(/:username)" exact>
            {didRedirect ?
              <React.Fragment>
                <JoinGame userName={userName} isCreator={true} />
                <ChessGame myUserName={userName} />
              </React.Fragment>
              :
              <JoinRoom />
            }
          </Route>
          <Redirect to="/" />

        </Switch>

      </Router>

    </ColorContext.Provider>);
}

export default App;