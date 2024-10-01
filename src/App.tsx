import { Grid } from '@radix-ui/themes'
import { CalculatorWidget } from './components/CalculatorWidget'
import './App.css'

function App() {

    return (
        <Grid style={{ minHeight: "inherit" }} justify="center" align="center">
            <CalculatorWidget />
        </Grid>
    )
}

export default App

