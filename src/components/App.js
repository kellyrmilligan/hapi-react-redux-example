import React from 'react'
import TransitionManager from 'react-redux-transition-manager'
import Helmet from 'react-helmet'
import NProgress from 'nprogress'

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
      onFetchStart={() => NProgress.start()}
      onFetchEnd={() => NProgress.done()}
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
