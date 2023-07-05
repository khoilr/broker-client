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
            className={`
            text-gray-500 hover:bg-gray-200 hover:text-cyan-700 rounded-lg font-sm text-base p-2
                        cursor-pointer${current ? 'bg-white text-cyan-700' : ''}`}
            aria-current={current ? 'page' : undefined}
        >
            {item.name}
        </a>
    )
}

export default NavItem
