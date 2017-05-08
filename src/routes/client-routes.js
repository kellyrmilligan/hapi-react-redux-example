import React from 'react'
import App from 'components/App'
import Home from 'routes/home/Home'
import Stargazers from 'routes/stargazers/Stargazers'

const NotFound = () => (
  <main>
    <h1>Not found</h1>
    <p>We could not figure out what you wanted!</p>
  </main>
)

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/repos/:owner/:repo/stargazers',
        component: Stargazers
      },
      {
        component: NotFound
      }
    ]
  }
]

export default routes
