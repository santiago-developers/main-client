import { styled } from "twin.macro";

interface Props {
    isOpen: boolean;
}

export const CalendarWrapper = styled.div`
  z-index: 11;
  position: absolute;
  top: 100%;
  left: -10;
  display: ${(props : Props) => (props.isOpen ? "block" : "none")};
`;

