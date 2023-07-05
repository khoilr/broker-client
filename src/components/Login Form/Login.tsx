/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

export default function Login() {
  return (
      <div className='bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl'>
          <div className='w-3/5 p-5'>
              <div className='text-left font-bold'>
                  <span className='text-cyan-700'>1C</span> Innovation
              </div>
              <div className='pt-10'>
                  <h2 className='text-3xl font-bold mb-2 text-cyan-700'>Login to Account</h2>
              </div>
              <div className='border-2 w-10 border-cyan-700 inline-block mb-2' />
              <form
                  action='#'
                  method='POST'
              >
                  <div className='text-left mt-2 px-20'>
                      <label
                          htmlFor='email'
                          className='block text-md font-medium leading-6 text-gray-900 pb-2'
                      >
                          Email address
                      </label>
                      <input
                          id='email'
                          name='email'
                          type='email'
                          autoComplete='email'
                          required
                          className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6'
                      />
                  </div>
                  <div className='text-left mt-2 px-20'>
                      <label
                          htmlFor='password'
                          className='block text-md font-medium leading-6 text-gray-900 pb-2'
                      >
                          Password
                      </label>
                      <input
                          id='password'
                          name='password'
                          type='password'
                          autoComplete='current-password'
                          required
                          className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6'
                      />
                      <div className='text-sm justify-between py-4 flex w-20rem mb-5 items-center'>
                        <label className='flex items-center'><input className='mr-1' type='checkbox' name='remember' />
                            Remember me
                        </label>
                          <a
                              href='/homepage'
                              className='text-cyan-700 hover:text-cyan-600'
                          >
                              Forgot password?
                          </a>
                      </div>
                  </div>

                  <div className='px-32'>
                      <button
                          type='submit'
                          className='flex w-full justify-center rounded-md bg-cyan-700 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700'
                      >
                          Login
                      </button>
                  </div>
              </form>
          </div>
          <div className='w-2/5 bg-cyan-700 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12'>
              <h2 className='text-3xl font-bold mb-2'>Hello, Friend!</h2>
              <div className='border-2 w-10 border-white inline-block mb-2' />
              <p className='mb-10'>Fill up personal information to join with us</p>
              <a
                  href='/signup'
                  className='border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-cyan-700'
              >
                  Sign Up
              </a>
          </div>
      </div>
  )
}
