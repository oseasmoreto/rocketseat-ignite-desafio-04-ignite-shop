import { styled, theme } from "../styles"

const Button = styled('button', {
  backgroundColor: '$green500',
  span: {
    fontWeight: 'bold'
  },
  '&:hover': {
    backgroundColor: '#fff'
  }
})

export default function Home() {
  return (
    <Button><span>Teste</span> Enviar</Button>
  )
}
