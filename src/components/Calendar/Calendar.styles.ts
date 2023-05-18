import styled, { StyledProps } from 'styled-components'

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
  }
`

export const Thead = styled.thead`
  position: sticky;
  top: 50px;
  background: #fff;
  box-shadow: 0 3px 7px rgba(0,0,0,0.1);

  th {
    border-top: none;
    border-left: none;
    border-right: none;
    padding-top: 15px;
    padding-bottom: 15px;

    &:first-child {
      font-size: 12px;
      font-weight: normal;
      color: #000;
      position: relative;
      border-right: 1px solid #ddd;
    }
  }
`

export const Tr = styled.tr`
  
`

export const Th = styled.th`
  
`

export const Tbody = styled.tbody`
  td {
    height: 50px;
  }

  td:hover {
    background: #eee
  }

  td:first-child {
    border-left: none;
    text-align: center;
    width: 70px;
    background: none;
  }
  
  td:last-child {
    border-right: none;
  }
`

export const Td = styled.td`

`

export const Tfoot = styled.tfoot`

`