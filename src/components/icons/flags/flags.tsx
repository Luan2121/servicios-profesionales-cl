import React from 'react';

import Svg, { Circle, Path } from "react-native-svg"

function ChileFlag(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Circle cx={256} cy={256} fill="#f0f0f0" r={256} />
      <Path
        d="M512 256c0 141.384-114.616 256-256 256S0 397.384 0 256s256 0 256 0h256z"
        fill="#d80027"
      />
      <Path d="M0 256C0 114.616 114.616 0 256 0v256H0z" fill="#0052b4" />
      <Path
        d="M152.389 89.043l16.577 51.018h53.643l-43.398 31.53 16.576 51.018-43.398-31.531-43.398 31.531 16.576-51.018-43.398-31.53h53.643z"
        fill="#f0f0f0"
      />
    </Svg>
  )
}

const FlagsComponent = {
    chile: ChileFlag,
    peru: ChileFlag
}

type FlagProps = {
    name: keyof typeof FlagsComponent
}

const Flags = ({
    name,
    ...restProps
} : FlagProps) => {
    const IconComponent = FlagsComponent[name];
    return <IconComponent {...restProps} />
}

export { Flags };