import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import { SearchStyles, DropDown, DropDownItem } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    filteredProducts: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

/* eslint-disable react/jsx-props-no-spreading */
export default function Search() {
  const router = useRouter();
  const [findItems, { loading, data }] = useLazyQuery(SEARCH_PRODUCTS_QUERY, {
    fetchPolicy: 'no-cache',
  });
  const items = data?.filteredProducts || [];
  const findItemsDebounced = debounce(findItems, 350);
  resetIdCounter();
  const {
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
    isOpen,
  } = useCombobox({
    items,
    onInputValueChange() {
      findItemsDebounced({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      if (selectedItem) {
        router.push(`/product/${selectedItem.id}`);
      }
    },
    itemToString(item) {
      return item?.name || '';
    },
  });
  return (
    <SearchStyles>
      {/* <DisplayError error={error} /> */}
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            id: 'search',
            type: 'search',
            placeholder: 'Search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((x, i) => (
            <DropDownItem
              key={x.id}
              {...getItemProps({ item: x })}
              highlighted={i === highlightedIndex}
            >
              <img
                src={x.photo.image.publicUrlTransformed}
                alt={x.name}
                width={50}
              />
              {x.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry, nothing found</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
