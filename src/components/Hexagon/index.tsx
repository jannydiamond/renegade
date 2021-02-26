import styled from 'styled-components/macro'
import { Hexagon as ReactHexagon } from 'react-hexgrid'

type Props = {
  color?: string
  blocked?: boolean
}

const Hexagon = styled(ReactHexagon)<Props>`
  .hexagon {
    stroke: ${(props) => (props.color ? props.color : 'transparent')};
    fill: transparent;
    cursor: ${(props) => (props.blocked ? 'default' : 'pointer')};

    &:hover {
      fill: ${(props) => (props.blocked ? 'transparent' : '#efefef')};
    }
  }
`

export default Hexagon
