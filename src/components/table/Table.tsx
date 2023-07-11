import { ICurrency } from "@/interfaces/currency";
import styled from "styled-components";


interface Props {
  data: Array<ICurrency>
}

const StyledTable = styled.table`
  width: 90%;
  margin: 0 auto;
  padding: 20px 50px;
`;

const StyledTh = styled.th`
  flex: 1;
  padding: 20px 10px 20px;
  text-align: left;
`;

const StyledTd = styled.td`
  flex: 1;
`;

const StyledTr = styled.tr`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  column-gap: 20px;
  border-bottom: 1px solid lightgray;
  padding: 10px 0;
`;

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
    <StyledTable>
      <thead>
        <StyledTr>
          <StyledTh>Name</StyledTh>
          <StyledTh >Price, $</StyledTh>
          <StyledTh>Circulating Supply</StyledTh>
          <StyledTh>Market Cap</StyledTh>
          <StyledTh>Category</StyledTh>
          <StyledTh>From ATH, %</StyledTh>
          <StyledTh>To ATH, %</StyledTh>
        </StyledTr>
      </thead>
      <tbody>
        {data?.map((currency) => (
          <StyledTr key={currency?.id}>
            <StyledTd>{currency?.name}</StyledTd>
            <StyledTd>{currency?.values?.USD?.price.toFixed(2)}</StyledTd>
            <StyledTd>{currency?.circulatingSupply}</StyledTd>
            <StyledTd>{currency?.values?.USD?.marketCap.toFixed(2)}</StyledTd>
            <StyledTd>{currency?.category}</StyledTd>
            <StyledTd>{currency?.fromAth?.toFixed(2)}</StyledTd>
            <StyledTd>{currency?.toAth?.toFixed(2)}</StyledTd>
          </StyledTr>
        ))}
      </tbody>
    </StyledTable>
  )
}