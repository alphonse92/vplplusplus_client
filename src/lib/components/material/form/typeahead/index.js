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
    portal = true
  } = props

  const _onChange = (currentSelected = [], data) => {
    const { action, option } = data
    if (onChange) return onChange(currentSelected, data)
    else if (onSelect && action === 'select-option') return onSelect(option)
    else if (onRemove && action === 'remove-value') return onRemove(option)
    else if (onClear && action === 'clear') return onClear(true)
  }

  const divId = `${name}-select-portal`
  return (
    <React.Fragment>
      <Select
        isMulti
        isSearchable
        isClearable
        name={name}
        options={options}
        isDisabled={isDisabled}
        defaultValue={defaultValue}
        menuPortalTarget={portal ? document.getElementById(divId) : undefined}
        menuPosition='absolute'
        menuPlacement='bottom'
        placeholder={placeholder}
        onChange={_onChange}
      />
      {portal && <div id={divId} />}
    </React.Fragment>

  )
}