import React from 'react';
import ReactTooltip from 'react-tooltip';

const Tooltip = ({
  id,
  effect = 'solid',
  place = 'bottom',
  color = 'var(--bg-dark-2)',
  textColor = 'var(--text-color-1)',
  children,
  ...rest
}) => {
  return (
    <ReactTooltip
      id={id}
      textColor="var(--text-color-1)"
      effect={effect}
      place={place}
      backgroundColor={color}
      arrowColor={color}
      scrollHide
      {...rest}
    >
      <span style={{ fontWeight: 600, color: textColor }}>{children}</span>
    </ReactTooltip>
  );
};

export default Tooltip;
