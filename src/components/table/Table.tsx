import { ICurrency } from "@/interfaces/currency"

interface Props {
  data: Array<ICurrency>
}

export const Table: React.FC<Props> = ({
  data
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price, $</th>
          <th>Circulating Supply</th>
          <th>Market Cap</th>
          <th>Category</th>
          <th>From ATH, %</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((currency) => (
          <tr key={currency?.id}>
            <td>{currency?.name}</td>
            <td>{currency?.values?.USD?.price.toFixed(3)}</td>
            <td>{currency?.circulatingSupply}</td>
            <td>{currency?.values?.USD?.marketCap.toFixed(3)}</td>
            <td>{currency?.category}</td>
            <td>{currency?.fromAth}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}