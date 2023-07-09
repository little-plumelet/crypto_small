import Link from "next/link"

export const Header = () => {
  return (
    <ul>
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