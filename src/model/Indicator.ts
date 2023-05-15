import Parameter from './Parameter'
import Return from './Return'

type Indicator = {
    label: String
    value: String
    parameters: Parameter[]
    returns: Return[]
}

export default Indicator
