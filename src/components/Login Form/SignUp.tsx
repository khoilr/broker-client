import React from 'react'

export default function SignUp() {
  return (
      <div className='bg-white rounded-2xl shadow-2xl flex w-[50vh] justify-center'>
          <div className='p-7 w-full'>
              <div className='text-left font-bold'>
                  <span className='text-cyan-700'>1C</span> Innovation
              </div>
              <div className='pt-5'>
                  <h2 className='text-3xl font-bold mb-2 text-cyan-700'>Sign Up</h2>
              </div>
              <div className='border-2 w-10 border-cyan-700 inline-block' />
              <form
                  action='#'
                  method='POST'
              >
                  <div className='mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                      <div className='sm:col-span-3'>
                          <label
                              htmlFor='first-name'
                              className='block text-left text-md font-medium leading-6 text-gray-900'
                          >
                              First name
                          </label>
                          <div className='mt-2'>
                              <input
                                  type='text'
                                  name='first-name'
                                  id='first-name'
                                  autoComplete='given-name'
                                  className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6'
                              />
                          </div>
                      </div>

                      <div className='sm:col-span-3'>
                          <label
                              htmlFor='last-name'
                              className='block text-left text-md font-medium leading-6 text-gray-900'
                          >
                              Last name
                          </label>
                          <div className='mt-2'>
                              <input
                                  type='text'
                                  name='last-name'
                                  id='last-name'
                                  autoComplete='family-name'
                                  className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6'
                              />
                          </div>
                      </div>
                  </div>
                  <div className='text-left mt-2'>
                      <label
                          htmlFor='phonenumber'
                          className='block text-md font-medium leading-6 text-gray-900 pb-2'
                      >
                          Phone Number
                      </label>
                      <input
                          id='phonenumber'
                          name='phonenumber'
                          type='text'
                          required
                          className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6'
                      />
                  </div>
                  <div className='text-left mt-2'>
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
                  <div className='text-left mt-2'>
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
                  </div>
                  <div className='text-left mt-2'>
                      <label
                          htmlFor='confirm-password'
                          className='block text-md font-medium leading-6 text-gray-900 pb-2'
                      >
                          Confirm Password
                      </label>
                      <input
                          id='confirm-password'
                          name='confirm-password'
                          type='password'
                          autoComplete='current-password'
                          required
                          className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6'
                      />
                  </div>
                  <div className='px-28 mt-8'>
                      <button
                          type='submit'
                          className='flex w-full justify-center rounded-md bg-cyan-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700'
                      >
                          Sign Up
                      </button>
                  </div>
              </form>
          </div>
      </div>
  )
}
