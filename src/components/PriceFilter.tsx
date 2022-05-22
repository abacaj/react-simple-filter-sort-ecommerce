import * as Slider from '@radix-ui/react-slider';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CollapsibleList from 'components/CollapsibleList';
import FilterToggle from 'components/FilterToggle';

function PriceFilter({ maxPrice }: { maxPrice: number }) {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useSearchParams();
  const defaultValues = [
    parseInt(search.get('minPrice') ?? '0'),
    parseInt(search.get('maxPrice') ?? `${maxPrice}`),
  ];
  const [values, setValues] = useState(defaultValues);
  const filterActive = search.get('minPrice') !== null;
  const onApplyFilter = () => {
    search.set('minPrice', `${values[0]}`);
    search.set('maxPrice', `${values[1]}`);
    setSearch(search, {
      replace: true,
    });
  };

  return (
    <CollapsibleList
      title="Price"
      actionButton={
        <FilterToggle
          visible={visible}
          active={filterActive}
          onApply={onApplyFilter}
          onClear={() => {
            search.delete('minPrice');
            search.delete('maxPrice');
            // clear local state
            setValues([0, maxPrice]);

            // clear url state
            setSearch(search, {
              replace: true,
            });
          }}
        />
      }
    >
      <li>
        <div className="mv2">
          <div className="flex">
            <div className="flex-auto">
              <div className="flex mb2 justify-center fw5">
                ${values[0]} - ${values[1]}
              </div>
              <Slider.Root
                onValueChange={(values) => {
                  setValues([values[0], values[1]]);
                  setVisible(true);
                }}
                className="flex items-center relative mw-100 slider"
                value={values}
                min={0}
                max={maxPrice}
                step={50}
                minStepsBetweenThumbs={1}
              >
                <Slider.Track className="slider__track bg-moon-gray relative flex-auto">
                  <Slider.Range className="slider__range bg-light-purple" />
                </Slider.Track>
                <Slider.Thumb className="slider__thumb db w1 h1 bg-white br-100" />
                <Slider.Thumb className="slider__thumb db w1 h1 bg-white br-100" />
              </Slider.Root>
            </div>
          </div>
        </div>
      </li>
    </CollapsibleList>
  );
}

export default function PriceFilterContainer({
  maxPrice,
}: {
  maxPrice: number;
}) {
  if (maxPrice === 0) return null;

  return <PriceFilter maxPrice={maxPrice} />;
}
