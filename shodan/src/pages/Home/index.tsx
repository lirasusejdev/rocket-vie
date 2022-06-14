import './styles.css'
import { Card } from '../../components/Card'

export function Home() {
  return (
    <div className="container">
      <h1>Onboarding Flora</h1>
      <input type="text" placeholder="Digite o nome ... " />
      <button type="button">Adicionar</button>
      <Card name="Victor" time="11:33"></Card>
      <Card name="Eduardo" time="14:15"></Card>
    </div>
  )
}
