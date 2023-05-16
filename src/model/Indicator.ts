import Parameter from './Parameter'
import Return from './Return'

type Indicator = {
    label: string
    value: string
    parameters: Parameter[]
    returns: Return[]
}

export default Indicator
