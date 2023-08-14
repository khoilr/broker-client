/* eslint-disable jsx-a11y/anchor-is-valid */
import { Disclosure, Menu, Transition } from '@headlessui/react'
import NavItem from '../NavItem'
import { Fragment } from 'react'

const navigation = [
    { name: 'Home', href: '/homepage', current: true },
    { name: 'Prediction', href: '/prediction' }
]

export default function Nav() {
    // const logo: string = require('../svg/stock-svgrepo-com.svg').default
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className='min-h-full'>
            <Disclosure
                as='nav'
                className='bg-white border'
            >
                {() => {
                    return (
                        <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start px-12 py-2'>
                            <div className='w-full text-2xl font-bold'>
                                <span className='text-cyan-700'>1C</span> Innovation
                            </div>
                            <div className=' flex items-center justify-center sm:items-stretch sm:justify-start'>
                                <div className='p-2 flex justify-center'>
                                    {navigation.map(item => (
                                        <NavItem
                                            item={item}
                                            key={item.name}
                                        />
                                    ))}
                                    <Menu
                                        as='div'
                                        className='relative ml-2 h-8 w-8'
                                    >
                                        <div>
                                            <Menu.Button className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                                                <span className='absolute -inset-1.5' />
                                                <span className='sr-only'>Open user menu</span>
                                                <img
                                                    className='h-8 w-8 rounded-full'
                                                    src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                                    alt=''
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter='transition ease-out duration-100'
                                            enterFrom='transform opacity-0 scale-95'
                                            enterTo='transform opacity-100 scale-100'
                                            leave='transition ease-in duration-75'
                                            leaveFrom='transform opacity-100 scale-100'
                                            leaveTo='transform opacity-0 scale-95'
                                        >
                                            <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href='#'
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                        >
                                                            Your Profile
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href='#'
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                        >
                                                            Settings
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href='#'
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                        >
                                                            Sign out
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </Disclosure>
        </div>
    )
}
