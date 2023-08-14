import Parameter from './Parameter'
import Return from './Return'

type Indicator = {
    id: string
    label: string
    name: string
    predefined_params: Parameter[]
    predefined_returns?: Return[]
}

export default Indicator
