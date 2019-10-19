import React from 'react';
import Select from 'react-select';

export const Typeahead = (props) => {

  const { options = [], name,
    onChange,
    onSelect,
    onRemove,
    defaultValue = [],
    onClear,
    isDisabled,
    placeholder,
  } = props

  const _onChange = (currentSelected = [], data) => {
    const { action, option } = data
    if (onChange) return onChange(currentSelected, data)
    else if (onSelect && action === 'select-option') return onSelect(option)
    else if (onRemove && action === 'remove-value') return onRemove(option)
    else if (onClear && action === 'clear') return onClear(true)
  }

  return (
      <Select
        isMulti
        isSearchable
        isClearable
        name={name}
        options={options}
        isDisabled={isDisabled}
        defaultValue={defaultValue}
        menuPortalTarget={document.body}
        menuPosition='absolute'
        menuPlacement='bottom'
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
        placeholder={placeholder}
        onChange={_onChange}
      />
  )
}