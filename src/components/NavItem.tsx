export interface Item {
    name: string
    href: string
    current?: boolean
}

function NavItem({ item }: { item: Item }) {
    const { name, href, current } = item
    return (
        <a
            key={name}
            href={href}
            className={` no-underline
            text-gray-500 hover:bg-gray-300 hover:text-blue-700 rounded-md font-medium  text-base p-2
                        cursor-pointer${current ? 'bg-white text-gray-500' : ''}`}
            aria-current={current ? 'page' : undefined}
        >
            {item.name}
        </a>
    )
}

export default NavItem
