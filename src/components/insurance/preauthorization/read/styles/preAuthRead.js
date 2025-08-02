import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 16px;
  gap: 16px;
  background-color: #f0f2f2;
  width: 100%;
  min-height: 719px;
  max-height: 1200px;
  /* height: 100%; */
  /* border: 1px solid tomato; */
  overflow: auto;

  @media (max-width: 768px) {
    padding: 12px;
    gap: 12px;
  }
`;

export const HeaderSection = styled.div`
  display: grid;
  grid-template-columns: 8fr 1fr;

  align-items: center;
  /* border: 1px solid tomato; */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
    text-align: center;
  }
`;

export const Title = styled.h2`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-weight: 700;
  font-family: "Inter", sans-serif;
  font-size: 20px;
  color: #333333;
  /* border: 1px solid tomato; */

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const CreateButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #cf8a4080;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  border: 2px solid #cf8a4080;
  transition: background-color 0.3s;

  &:hover {
    background-color: #cf8a40;
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

export const CreateText = styled.span`
  font-family: "DM Sans", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #003542;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const SearchSection = styled.form`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const SearchInput = styled.input`
  width: 314px;
  height: 40px;
  min-width: 200px;
  max-width: 100%;
  padding: 10px 16px;
  border-radius: 6px;
  border: 2px solid #cf8a4080;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #cf8a40;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 250px;
  }
`;

export const TableWrapper = styled.div`
  height: 594px;
  border-radius: 15px;
  padding: 0 30px;
  overflow-x: auto;
  background-color: #ffffff;

  @media (max-width: 768px) {
    padding: 0 15px;
    height: auto;
    max-height: 500px;
  }
`;

export const TableData = styled.div`
  padding: 20px 0;

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 8px;
    background-color: white;

    th {
      background-color: #d3d6d6; /* Contrasting color */
      padding: 12px 16px;
      font-size: 14px;
      font-weight: 600;
      color: #333;
      text-align: center;
      border-bottom: 2px solid #ddd;
    }

    td {
      padding: 12px 16px; /* Gap between columns */
      border-bottom: 1px solid #ddd;
      text-align: center;
      font-size: 14px;
      color: #555;
    }

    th div {
      display: grid;
      grid-template-columns: auto auto;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    p {
      margin: 0;
      font-size: 14px;
    }
  }

  @media (max-width: 768px) {
    table {
      min-width: 800px; /* Ensures horizontal scrolling on small screens */
    }
  }
`;

export const Image = styled.img`
  width: 24px;
  height: 24px;

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

export const CheckBox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #04a7c3;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  margin: 0 8px; /* Gap around checkbox */

  &:checked {
    background-color: #ffffff; /* White background when checked */
    border: 2px solid #04a7c3;
  }

  &:checked::after {
    content: "";
    position: absolute;
    top: 3px;
    left: 6px;
    width: 6px;
    height: 10px;
    border: solid #04a7c3; /* Blue checkmark */
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  @media (max-width: 768px) {
    width: 18px;
    height: 18px;

    &:checked::after {
      top: 2px;
      left: 5px;
      width: 5px;
      height: 9px;
    }
  }
`;

// Search box with lens
export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 150px;
  }
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 8px 30px 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #cf8a40;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 25px 6px 10px;
  }
`;

export const Icon = styled.img`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  pointer-events: none;
  opacity: 0.6;

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
    right: 10px;
  }
`;

// View Edit Delete
export const VDE = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  justify-items: center;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

export const View = styled.div`
  cursor: pointer;
`;

export const ViewImage = styled.img`
  width: 14px;
  height: 12.25px;

  @media (max-width: 768px) {
    width: 12px;
    height: 10px;
  }
`;

export const Edit = styled.div`
  cursor: pointer;
`;

export const EditImage = styled.img``;

export const Delete = styled.div`
  cursor: pointer;
`;

export const DeleteImage = styled.img``;
