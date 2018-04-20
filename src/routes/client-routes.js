import React from 'react'
import App from 'components/App'
import Home from 'routes/home/Home'
import Category from './categories/Category';

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
        path: '/categories/:id',
        component: Category
      },
      {
        component: NotFound
      }
    ]
  }
]

export default routes