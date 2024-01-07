import styled from "@emotion/styled";

export const S = {}

export const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 100%;
  height: 132px;
  overflow-y: scroll;
  position: relative;

  // For Chrome, Safari and Opera
  ::-webkit-scrollbar {
    display: none;
  }

`;

export const ListCenter = styled.div`
  box-sizing: border-box;
  height: 44px;
  position: sticky;
  top: 44px;
`;

export const ListItem = styled.li<{ isSelected: boolean }>`
  z-index: 1;
  position: relative;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ isSelected }) => isSelected && "bold"};
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.4)};
`;