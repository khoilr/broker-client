const toTitleCase = (str: String) => {
    return str
        .toString()
        .split(' ')
        .map(e => e[0].toUpperCase() + e.slice(1))
        .join(' ')
}

export { toTitleCase }
