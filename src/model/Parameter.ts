import ParameterType from './ParameterType'

type Parameter = {
    name: string
    label: string
    type: ParameterType
    values?: string[] | number[]
    default: string | number
}

export default Parameter
