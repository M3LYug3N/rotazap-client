import { LinearProgress, Paper, Typography, styled } from "@mui/material";

export const StyledHint = styled(Paper)`
  position: absolute;
  bottom: 150%;
  left: 0;
  width: 100%;
  padding: 12px;
  z-index: 10;
  margin-top: 4px;
`;

export const StrengthBar = styled(LinearProgress)`
  height: 4px;
  border-radius: 4px;
  margin-bottom: 8px;
`;

export const Rule = styled(Typography, {
  shouldForwardProp: prop => prop !== "met"
})<{ met: boolean }>`
  font-size: 13px;
  color: ${props => (props.met ? "green" : "#999")};
  font-weight: ${props => (props.met ? 600 : 400)};
  line-height: 1.5;
`;
