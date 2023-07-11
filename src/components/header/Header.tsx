"use client";

import Link from "next/link";
import styled from "styled-components";

const Ul = styled.ul`
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 20px 20px;
  margin-bottom: 50px;
`;

const ListItem = styled.li`
  list-style: none;

  &:hover {
    color: gray
  }
`;

export const Header = () => {
  return (
    <Ul>
      <ListItem>
        <Link href="/">Home</Link>
      </ListItem>
      <ListItem>
        <Link href="/converter">Converter</Link>
      </ListItem>
      <ListItem>
        <Link href="/currencyList">Currencies</Link>
      </ListItem>
    </Ul>
  )
}