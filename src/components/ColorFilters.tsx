import CollapsibleList from 'components/CollapsibleList';
import { getUniqueValues } from 'core/utils';
import { useState } from 'react';
import { useItems } from 'core/hooks';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'react-router-dom';
import FilterToggle from 'components/FilterToggle';
import { Product } from 'core/types';

export default function ColorFilters() {
  const [search, setSearch] = useSearchParams();
  const filteredColors = search.get('colors')?.split(',') ?? [];
  const [colors, setColors] = useState(filteredColors);
  const getItems = useItems();
  const items = getItems.data?.products ?? [];
  const allColors = getUniqueValues<string, Product>(items, 'color');
  const groupedItems = allColors
    .map((color) => ({
      label: color,
      name: color,
      value: color,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
  const onColorChange = (color: string) => (checked: Checkbox.CheckedState) => {
    let _colors = colors.slice();

    if (checked) {
      _colors.push(color);
    } else {
      _colors = _colors.filter((_color) => _color !== color);
    }

    setColors(_colors);
  };
  const hasFilters = filteredColors.length > 0;

  return (
    <CollapsibleList
      defaultVisible={hasFilters}
      title="Color"
      actionButton={
        <FilterToggle
          visible={colors.length > 0}
          active={hasFilters}
          onApply={() => {
            search.set('colors', colors.join(','));
            setSearch(search, {
              replace: true,
            });
          }}
          onClear={() => {
            search.delete('colors');
            setColors([]);
            setSearch(search, {
              replace: true,
            });
          }}
        />
      }
    >
      {groupedItems
        .filter((f) => {
          if (filteredColors.length === 0) {
            return true;
          }

          return filteredColors.includes(f.value);
        })
        .map((field, key) => (
          <li key={key} className="pv2">
            <div className="flex items-center">
              <Checkbox.Root
                id={field.name}
                name={field.name}
                disabled={hasFilters}
                onCheckedChange={onColorChange(field.value)}
                checked={colors.includes(field.value)}
                className="checkbox lh-solid flex items-center justify-center pa0 bg-white w125 h125 br2 bn"
              >
                <Checkbox.Indicator>
                  <CheckIcon className="checkbox__icon w125 h125" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor={field.name} className="ml3 fw5 f5">
                {field.label}
              </label>
            </div>
          </li>
        ))}
    </CollapsibleList>
  );
}
