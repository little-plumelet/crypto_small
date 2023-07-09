import MOCK_DATA from '../../../mockdata.json';
interface Currency {
  name: string;
  price: number;
  circulatingSupply: number;
  marketCap: number;
  category: string;
};

export const Table = () => {
  // data will be from props
  const data = [MOCK_DATA.data, MOCK_DATA.data, MOCK_DATA.data];
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price, $</th>
          <th>Circulating Supply</th>
          <th>Market Cap</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {data.map((currency) => (
          <tr key={currency?.id}>
            <td>{currency?.name}</td>
            <td>{currency?.values?.USD?.price}</td>
            <td>{currency?.circulatingSupply}</td>
            <td>{currency?.values?.USD?.marketCap}</td>
            <td>{currency?.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}