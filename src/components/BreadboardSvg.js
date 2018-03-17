import React from 'react';

const BreadboardSvg = ({
  unit,
  busCount,
  busSize,
  getRef,
  onPinClick,
  children
}) => {
  const BOARD_WIDTH = unit * busCount / 2;
  const BOARD_HEIGHT = unit * (2 * busSize + 1);
  const PINHOLE_SIZE = 2;

  return (
    <svg viewBox={`0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}`} ref={getRef}>
      <rect width="100%" height="100%" fill="#FFE4B5" />
      <line
        x1="0"
        y1={BOARD_HEIGHT / 2}
        x2={BOARD_WIDTH}
        y2={BOARD_HEIGHT / 2}
        strokeWidth="2"
        stroke="black"
      />
      <g>
        {[...Array(busCount / 2)].map((_, xIndex) =>
          [...Array(busSize)].map((_, yIndex) => [
            <rect
              x={(xIndex + 0.5) * unit - PINHOLE_SIZE / 2}
              y={(yIndex + 0.5) * unit}
              width={PINHOLE_SIZE}
              height={PINHOLE_SIZE}
              key={`${xIndex}_${yIndex}`}
              onClick={() =>
                onPinClick({
                  busId: xIndex,
                  pinId: yIndex,
                  x: (xIndex + 0.5) * unit - PINHOLE_SIZE / 2,
                  y: (yIndex + 0.5) * unit
                })
              }
            />,
            <rect
              x={(xIndex + 0.5) * unit - PINHOLE_SIZE / 2}
              y={(yIndex + busSize + 2 - 0.5) * unit - PINHOLE_SIZE}
              width={PINHOLE_SIZE}
              height={PINHOLE_SIZE}
              key={`${xIndex}_${yIndex}2`}
              onClick={() =>
                onPinClick({
                  busId: busCount - xIndex - 1,
                  pinId: busSize - yIndex - 1,
                  x: (xIndex + 0.5) * unit - PINHOLE_SIZE / 2,
                  y: (yIndex + busSize + 2 - 0.5) * unit - PINHOLE_SIZE
                })
              }
            />
          ])
        )}
      </g>
      {children}
    </svg>
  );
};

export default BreadboardSvg;
