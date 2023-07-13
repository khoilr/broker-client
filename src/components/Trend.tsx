interface props {
    stock: string
    probability: number
}
import Nav from '@/components/Navigation'
export default function PredTag(props: props) {
    const { stock, probability } = props
    let result = (probability > 0.5) ? "Up" : "Down";
    let modified_result = (probability > 0.5) ? probability*100 : (1-probability)*100;
    const arrow = result === 'Up' ? '↑' : result === 'Down' ? '↓' : '';
    const arrowColor = result === 'Up' ? 'text-green-500' : result === 'Down' ? 'text-red-500' : '';
    return  (
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">{stock}</td>
          <td className={`px-6 py-4 whitespace-nowrap ${arrowColor}`}>{result} <span style={{ color: arrowColor }}>{arrow}</span></td>
          <td className="px-6 py-4 whitespace-nowrap">{modified_result}%</td>
        </tr>
      ); 
}