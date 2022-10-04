import Image from "next/image"
import Logo from '../public/styfer.png'

export default function StyferLogo() {
  return (
    <Image src={Logo} alt="styfer logo" width={66} height={54} />
  )
}