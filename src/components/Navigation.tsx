import { Disclosure } from '@headlessui/react'
import NavItem from './NavItem'
// import logo from '../svg/stock-svgrepo-com.svg'

const navigation = [
    { name: 'Home', href: '/homepage', current: true },
    { name: 'Prediction', href: '/prediction' }
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
                    <div className='mx-auto flex items-center justify-between px-12 py-2'>
                        <div className='w-full text-2xl font-bold'>
                            <span className='text-cyan-700'>1C</span> Innovation
                        </div>
                        <div className='hidden md:block'>
                            <div className='p-2'>
                                {navigation.map(item => (
                                    <NavItem
                                        item={item}
                                        key={item.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Disclosure>
        </div>
    )
}
