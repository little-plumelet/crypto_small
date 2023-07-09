import Link from "next/link";

const ulStyle = {
  'display': 'flex',
  'justify-content': 'center',
  'gap': 40,
  'padding': '20px 20px',
  'margin-bottom': 50,
  'border-bottom': 'solid 1px',
};

export const Header = () => {
  return (
    <ul style={ulStyle}>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/converter">Converter</Link>
      </li>
      <li>
        <Link href="/currencyList">Currencies</Link>
      </li>
    </ul>
  )
}