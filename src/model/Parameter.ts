import ParameterType from './ParameterType'

export type Parameter = {
    name: String
    label: String
    type: ParameterType
    values?: String[] | Number[]
    default: String | Number
}

export default Parameter
