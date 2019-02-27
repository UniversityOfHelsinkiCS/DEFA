import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ProtectedRouteComponent } from '../../src/util/ProtectedRoute'

describe('ProtectedRoute', () => {
  let wrapper

  describe('with incorrect access role', () => {
    beforeEach(() => {
      wrapper = shallow(<ProtectedRouteComponent
        user={{ role: 'STUDENT' }}
        requiredRole={['ADMIN', 'PRIVILEGED']}
        component="placeholder component"
        exact
        path="/upload-credits"
      />)
    })

    it('renders the protectedRoute component', () => {
      const m = wrapper.find(Redirect)
      expect(m.exists()).toEqual(true)
    })

    it('returns redirect to root', () => {
      const route = wrapper.find(Redirect)
      expect(route.props().to).toEqual('/')
    })
  })

  describe('with correct access role', () => {
    beforeEach(() => {
      wrapper.setProps({ user: { role: 'ADMIN' } })
    })

    it('renders the protectedRoute component', () => {
      const m = wrapper.find(Route)
      expect(m.exists()).toEqual(true)
    })

    it('returns redirect to given path', () => {
      const route = wrapper.find(Route)
      expect(route.props().path).toEqual('/upload-credits')
    })
  })

  describe('without user', () => {
    beforeEach(() => {
      wrapper.setProps({ user: null })
    })

    it('returns null', () => {
      expect(wrapper.get(0)).toEqual(null)
    })
  })
})
