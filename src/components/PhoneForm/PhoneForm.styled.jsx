import styled from "@emotion/styled";

export const Form = styled.form`
  border: 1px solid ${p => p.theme.colors.textColor}
`;

export const Title = styled.h3`

`;

export const NameInput = styled.input`
  :hover, :focus {
    border-color: ${p => p.theme.colors.inputColor};
  }
`;