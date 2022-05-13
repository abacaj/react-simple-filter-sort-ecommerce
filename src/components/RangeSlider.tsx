import * as Slider from '@radix-ui/react-slider';
import { useState } from 'react';

export default function RangeSlider({ maxPrice }: { maxPrice: number }) {
  const price = Math.round(maxPrice);
  const [values, setValues] = useState([0, price]);

  return (
    <>
      <div className="flex mb2 justify-center fw5">
        ${values[0]} - ${values[1]}
      </div>
      <Slider.Root
        onValueChange={(values) => {
          const min = values[0] / 100;
          const max = values[1] / 100;
          const minPrice = min * price;
          const maxPrice = max * price;

          setValues([minPrice, maxPrice]);
        }}
        className="flex items-center relative mw-100 slider"
        defaultValue={[0, 100]}
        step={10}
        minStepsBetweenThumbs={1}
      >
        <Slider.Track className="slider__track bg-moon-gray relative flex-auto">
          <Slider.Range className="slider__range bg-light-purple" />
        </Slider.Track>
        <Slider.Thumb className="slider__thumb db w1 h1 bg-white br-100" />
        <Slider.Thumb className="slider__thumb db w1 h1 bg-white br-100" />
      </Slider.Root>
    </>
  );
}
