import DataTable from "react-data-table-component";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 719px;
  padding: 16px;
  /* border: 1px solid tomato; */
  overflow: auto;
`;

export const Image = styled.img`
  width: 16px;
  height: 16px;

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

export const StyledDataTable = styled(DataTable)`
  min-height: 565px;
  th[aria-sort] > * {
    display: none !important;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  gap: 4px;
  position: relative;

  span {
    cursor: default;
  }

  &:hover .sort-text {
    opacity: 1;
    visibility: visible;
  }

  .sort-text {
    position: absolute;
    right: -80px; /* Adjust based on layout */
    font-size: 12px;
    color: #555;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease;
    white-space: nowrap;
  }
`;

export const SortIcon = styled.img`
  width: 12px;
  height: 12px;
  cursor: pointer;
`;
