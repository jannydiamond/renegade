import styled from 'styled-components/macro'
import { Text as ReactText } from 'react-hexgrid'

type Props = {
  color?: string
}

const Text = styled(ReactText)<Props>`
  stroke: none;
  fill: ${(props) => (props.color ? props.color : 'black')};
  font-size: 4px;
  user-select: none;
`

export default Text
