interface props {
    stock: string
    probability_day: number
    probability_week: number
}

export default function PredTag(props: props) {

    const { stock, probability_day , probability_week } = props
    let result_day = (probability_day > 0.5) ? "Up" : "Down";
    let modified_result = (probability_day > 0.5) ? probability_day*100 : (1-probability_day)*100;
    const arrow = result_day === 'Up' ? '↑' : result_day === 'Down' ? '↓' : '';
    const arrowColor = result_day === 'Up' ? 'text-green-500' : result_day === 'Down' ? 'text-red-500' : '';


    let result_week = (probability_week > 0.5) ? "Up" : "Down";
    let modified_result_week = (probability_week > 0.5) ? probability_week*100 : (1-probability_week)*100;
    const arrow_week = result_week === 'Up' ? '↑' : result_week === 'Down' ? '↓' : '';
    const arrowColor_week = result_week === 'Up' ? 'text-green-500' : result_week === 'Down' ? 'text-red-500' : '';
    return  (
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">{stock}</td>
          <td className={`px-6 py-4 whitespace-nowrap ${arrowColor}`}>{result_day} <span style={{ color: arrowColor }}>{arrow}</span></td>
          <td className="px-6 py-4 whitespace-nowrap">{modified_result.toFixed(2)}%</td>
          <td className={`px-6 py-4 whitespace-nowrap ${arrowColor_week}`}>{result_week} <span style={{ color: arrowColor_week }}>{arrow_week}</span></td>
          <td className="px-6 py-4 whitespace-nowrap">{modified_result_week.toFixed(2)}%</td>
        </tr>
      ); 
}
