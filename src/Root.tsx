import { useMemo, useState } from 'react';
import SearchBar from 'components/SearchBar';
import RangeSlider from 'components/RangeSlider';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import SelectMenu from 'components/SelectMenu';
import { getUniqueItems } from 'core/utils';
import CollapsibleList from 'components/CollapsibleList';
import axios from 'axios';
import { useEffect } from 'react';
import { Item } from 'core/types';

function useItems(filters: URLSearchParams | null) {
  const [loading, setLoading] = useState(true);
  const [items, setData] = useState<Array<Item>>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/items' + (filters ? `?${filters}` : ''))
      .then((res) => {
        setLoading(false);
        setData(res.data);
      });
  }, [filters]);

  return { loading, items };
}

export default function Root() {
  const [query, setQuery] = useState<URLSearchParams | null>(null);
  const { items } = useItems(query);
  const groupedItems = useMemo(
    () =>
      getUniqueItems(items, 'color').map((item) => ({
        label: item.color,
        name: item.color,
        value: item.color,
      })),
    [items],
  );
  const itemCounts = useMemo(
    () =>
      items.reduce<Record<string, number>>((initial, item) => {
        if (!isNaN(initial[item.category])) {
          initial[item.category] += 1;
        } else {
          initial[item.category] = 1;
        }

        return initial;
      }, {}),
    [items],
  );

  return (
    <div className="mw9 center ph4 bg-white min-vh-100 br bl b--light-gray">
      <div className="flex bb b--black-10 justify-between items-center mb4">
        <h1>New arrivals</h1>

        <div className="mr3 ml-auto">
          <SearchBar />
        </div>

        <SelectMenu
          label="Sort by"
          name="sort"
          options={[
            {
              label: 'Name',
              value: 'name',
            },
            {
              label: 'Price High',
              value: 'priceAsc',
            },
            {
              label: 'Price Low',
              value: 'priceDesc',
            },
          ]}
        />
      </div>

      <div className="flex">
        <div className="w-25 mr4">
          <div style={{ position: 'sticky', top: '20px' }}>
            <ul className="list pa0 ma0 pb3 bb b--black-10">
              <li className="f6 fw5 silver mb2">
                <div className="flex justify-between">
                  Filters
                  <span>{items.length} Products</span>
                </div>
              </li>
              <li>
                <button className="btn fw5 pa0 pv2 w-100 tl bg-transparent hover-light-purple flex justify-between">
                  Bags
                  <span>{itemCounts['bags']}</span>
                </button>
              </li>
              <li>
                <button className="btn fw5 pa0 pv2 w-100 tl bg-transparent hover-light-purple flex justify-between">
                  Shoes
                  <span>{itemCounts['shoes']}</span>
                </button>
              </li>
              <li>
                <button className="btn fw5 pa0 pv2 w-100 tl bg-transparent hover-light-purple flex justify-between">
                  Jackets
                  <span>{itemCounts['jackets']}</span>
                </button>
              </li>
            </ul>

            <CollapsibleList title="Color">
              {groupedItems.map((field, key) => (
                <li key={key} className="pv2">
                  <div className="flex items-center">
                    <Checkbox.Root
                      id={field.name}
                      name={field.name}
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
            <CollapsibleList title="Price">
              <li>
                <div className="mv2">
                  <RangeSlider
                    maxPrice={Math.max(
                      ...items.map((item) => item.price / 100),
                    )}
                  />
                </div>
              </li>
            </CollapsibleList>
          </div>
        </div>

        <div className="w-75">
          <div className="flex flex-wrap item-grid pt2">
            {items.map((item, key) => {
              return (
                <div key={item.name} className="w-100 w-50-l ph3">
                  <a className="link black hover-light-purple" href="/t">
                    <div className="flex flex-column h-100">
                      <img
                        style={{ objectFit: 'cover', height: '420px' }}
                        alt=""
                        loading="lazy"
                        className="img flex-auto bg-gray"
                        src={item.src}
                      />

                      <div className="pt3 pb5 flex flex-column">
                        <b className="mb1">{item.name}</b>
                        <i className="mb3 gray">{item.color}</i>
                        <p className="ma0 b black">${item.price / 100}</p>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
