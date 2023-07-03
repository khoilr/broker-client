import { Disclosure } from '@headlessui/react'
import NavItem from './NavItem'
// import logo from '../svg/stock-svgrepo-com.svg'

const navigation = [
    { name: 'Home', href: '/', current: true },
    // { name: 'Notification', href: '/notification' },
    // { name: 'About', href: '/' },
    // { name: 'Contact', href: '/' }
]

export default function Nav() {
    // const logo: string = require('../svg/stock-svgrepo-com.svg').default

    return (
        <div className='min-h-full'>
            <Disclosure
                as='nav'
                className='bg-white border'
            >
                {() => (
                    <div className='mx-auto px-6 py-2'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                                <div className='flex-shrink-0'>
                                    <img
                                        src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                                        alt='Your Company'
                                        className='h-8 w-8'
                                    />
                                </div>
                                <div className='hidden md:block'>
                                    <div className='ml-10 flex items-baseline space-x-4'>
                                        {navigation.map(item => (
                                            <NavItem
                                                item={item}
                                                key={item.name}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Disclosure>
        </div>
    )
}
