import { ICurrency } from "@/interfaces/currency"

interface Props {
  data: Array<ICurrency>
}

const tdStyle = {
  flex: 1
}

const thStyle = {
  flex: 1,
  padding: '20px 10px 20px',
  'text-align': 'left'
}

export const Table: React.FC<Props> = ({
  data
}) => {
  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <th style={thStyle}>Name</th>
          <th style={thStyle}>Price, $</th>
          <th style={thStyle}>Circulating Supply</th>
          <th style={thStyle}>Market Cap</th>
          <th style={thStyle}>Category</th>
          <th style={thStyle}>From ATH, %</th>
          <th style={thStyle}>To ATH, %</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((currency) => (
          <tr key={currency?.id}>
            <td style={tdStyle}>{currency?.name}</td>
            <td style={tdStyle}>{currency?.values?.USD?.price.toFixed(2)}</td>
            <td style={tdStyle}>{currency?.circulatingSupply}</td>
            <td style={tdStyle}>{currency?.values?.USD?.marketCap.toFixed(2)}</td>
            <td style={tdStyle}>{currency?.category}</td>
            <td style={tdStyle}>{currency?.fromAth?.toFixed(2)}</td>
            <td style={tdStyle}>{currency?.toAth?.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}