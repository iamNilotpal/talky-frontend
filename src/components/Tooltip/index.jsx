import React from 'react';
import ReactTooltip from 'react-tooltip';

const Tooltip = ({
  id,
  effect = 'solid',
  place = 'bottom',
  children,
  ...rest
}) => {
  return (
    <ReactTooltip
      id={id}
      multiline
      textColor="var(--text-color-1)"
      effect={effect}
      place={place}
      backgroundColor="var(--bg-dark-2)"
      arrowColor="var(--bg-dark-2)"
      scrollHide
      {...rest}
    >
      <span style={{ fontWeight: 600 }}>{children}</span>
    </ReactTooltip>
  );
};

export default Tooltip;
