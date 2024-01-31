import React from 'react'
import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

const Swipe = ({items}) => {
    const [cards, setCards] = useState(items);

  const [props, set] = useSpring(() => ({
    x: 0,
    from: { x: 0 },
    config: { tension: 200, friction: 50 },
  }));

  const bind = useDrag(({ movement: [x], down, direction: [dx], velocity }) => {
    const dir = dx < 0 ? -1 : 1; // direction of swipe
    const isGone = down && velocity > 0.2; // card is gone when swipe velocity is high enough

    if (isGone) {
      // remove card from stack
      setCards((prevCards) => prevCards.slice(1));
    }

    set({
      x: isGone ? window.innerWidth * dir : down ? x : 0, // animate card off screen or back to center
      immediate: !down,
    });
  });
  return cards.map((item, i) => (
    <animated.div
      key={i}
      {...bind()}
      style={{
        transform: props.x.interpolate((x) => `translateX(${x}px) rotate(${x / 10}deg)`),
        position: i === 0 ? 'relative' : 'absolute', // only the top card is interactive
      }}
    >
      {item.content}
    </animated.div>
  ));
}

export default Swipe