import ParameterType from './ParameterType'

type Parameter = {
    id: string
    name: string
    label: string
    type: ParameterType
    values?: string[] | number[]
    default?: string | number
    readOnly?: boolean
}

export default Parameter
