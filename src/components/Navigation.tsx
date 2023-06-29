import { Disclosure } from '@headlessui/react'
import Image from 'next/image'
import NavItem from './NavItem'

const navigation = [
    { name: 'Market', href: '/', current: true },
    { name: 'Notification', href: '/notification' },
    { name: 'About', href: '/' },
    { name: 'Contact', href: '/' }
]

export default function Nav() {
    return (
        <div className='min-h-full'>
            <Disclosure
                as='nav'
                className='bg-white border'
            >
                {() => (
                    <div className='mx-auto px-6'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                                <div className='flex-shrink-0'>
                                    <Image
                                        src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                                        alt='Your Company'
                                        height={32}
                                        width={32}
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