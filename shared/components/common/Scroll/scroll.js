import styled from "styled-components";

export const ScrollBarContainer = styled.div`
  width: auto;
  max-height: 280px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) =>
      props.bg === "#C74FEB" ? "#C74FEB" : "#D63626"};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 4px;
  }
`;