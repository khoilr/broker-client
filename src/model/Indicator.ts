import Parameter from './Parameter'
import Return from './Return'

type Indicator = {
    id: string
    label: string
    name: string
    parameters: Parameter[]
    returns?: Return[]
}

export default Indicator
