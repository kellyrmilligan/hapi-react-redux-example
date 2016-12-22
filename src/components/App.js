import React from 'react'
import TransitionManager from 'react-redux-transition-manager'
import Helmet from 'react-helmet'

const ErrorThing = (props) => (
  <div className='Error'>Ooops! there was an error...</div>
)

const LoaderThing = (props) => (
  <div className='Loader'>loading...</div>
)

const App = (props) =>
  <section>
    <Helmet
      htmlAttributes={{ 'lang': 'en-US' }}
      titleTemplate='%s | Hapi react redux example'
    />
    <TransitionManager {...props}
      onFetchStart={() => console.log('started fetching data for routes')}
      onFetchEnd={() => console.log('finished fetching data for routes')}
      onError={(err) => console.log('an error happened while fetching data for routes ', err)}
      FetchingIndicator={<LoaderThing />}
      ErrorIndicator={<ErrorThing />}
  >
      <div className='App'>
        {props.children}
      </div>
    </TransitionManager>
  </section>

export default App
