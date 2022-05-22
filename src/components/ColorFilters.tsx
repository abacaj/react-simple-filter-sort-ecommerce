import CollapsibleList from 'components/CollapsibleList';
import { getUniqueItems } from 'core/utils';
import { useMemo, useState } from 'react';
import { useItems } from 'core/hooks';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'react-router-dom';
import FilterToggle from 'components/FilterToggle';

export default function ColorFilters() {
  const [search, setSearch] = useSearchParams();
  const [colors, setColors] = useState(search.get('colors')?.split(',') ?? []);
  const getItems = useItems();
  const items = useMemo(() => getItems.data?.products ?? [], [getItems.data]);
  const groupedItems = useMemo(
    () =>
      getUniqueItems(items, 'color')
        .map((item) => ({
          label: item.color,
          name: item.color,
          value: item.color,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [items],
  );
  const onColorChange = (color: string) => (checked: Checkbox.CheckedState) => {
    let _colors = colors.slice();

    if (checked) {
      _colors.push(color);
    } else {
      _colors = _colors.filter((_color) => _color !== color);
    }

    setColors(_colors);
  };
  const checkboxDisabled = search.get('colors') !== null;

  return (
    <CollapsibleList
      title="Color"
      actionButton={
        <FilterToggle
          visible={colors.length > 0}
          active={!!search.get('colors')}
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
      {groupedItems.map((field, key) => (
        <li key={key} className="pv2">
          <div className="flex items-center">
            <Checkbox.Root
              id={field.name}
              name={field.name}
              disabled={checkboxDisabled}
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
