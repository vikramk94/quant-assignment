import React from 'react'
import Typography from '@mui/material/Typography'
import ReactSelect from 'react-select'
import { styled } from '@mui/material'
import { borderRadius, fontSize } from '@mui/system'

const DivInputField = styled('div')(({ theme, enableMargin }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginTop: '8px',
  width: '200px',
  borderRadius: '32px',
}))

const DivInputLabelBox = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-start',
  marginBottom: '8px',
}))

const DivInputBox = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: 3,
}))

const TypographyInputLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}))

const StyledSelectField = (props) => {
  const {
    enableMargin,
    label,
    placeHolderText,
    selectedValue,
    selectOptions,
    onChangeHandler,
    isMulti,
    isSearchable,
    isDisabled,
    noOptionsMessage,
    isOptionDisabled,
    isRequired,
    width = '100%',
  } = props

  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: width,
    }),
    control: (provided) => ({
      ...provided,
      borderRadius: '8px',
      backgroundColor: ' #f9fafc',
      boxShadow: '0 2px 7px 0 rgb(18 18 19 / 6%)',
      transition:
        'box-shadow 300ms ease, color 300ms ease, border-color 300ms ease',
      '&:hover': {
        borderColor: '#a8a8b5',
        boxShadow: '0 2px 12px 0 rgb(18 18 19 / 10%)',
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0 12px',
      overflow: 'auto',
      fontSize: '14px',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#121213',
    }),
    multiValue: (provided) => ({
      ...provided,
      fontSize: '8px',
      borderRadius: '8px',
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '8px',
      zIndex: 10,
    }),
    menuList: (provided) => ({
      ...provided,
      borderRadius: '8px',
      backgroundColor: '#fff',
    }),
  }

  return (
    <DivInputField enableMargin={enableMargin || false}>
      {label && (
        <DivInputLabelBox>
          <TypographyInputLabel variant='h5'>
            {label} {isRequired && <sup style={{ fontSize: '8px' }}>*</sup>}
          </TypographyInputLabel>
        </DivInputLabelBox>
      )}
      <DivInputBox>
        <ReactSelect
          isClearable={false}
          isMulti={isMulti}
          isSearchable={isSearchable}
          styles={customStyles}
          placeholder={placeHolderText}
          value={selectedValue}
          options={selectOptions}
          onChange={onChangeHandler}
          isDisabled={isDisabled}
          noOptionsMessage={() => noOptionsMessage}
          isOptionDisabled={isOptionDisabled ? isOptionDisabled : () => false}
          // menuIsOpen={true}//Note: uncomment this for debugging
        />
      </DivInputBox>
    </DivInputField>
  )
}

export default StyledSelectField
