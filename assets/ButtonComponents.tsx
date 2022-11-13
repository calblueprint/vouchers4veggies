import styled from 'styled-components/native';
import { Colors } from './Colors';

/**
 * Styling for white button
 */
// export const ButtonWhite = styled.TouchableOpacity`
//   box-sizing: border-box;
//   width: 59px;
//   height: 25px;
//   font-family: 'Manrope';
//   font-style: normal;
//   font-weight: 600;
//   font-size: 18px;
//   line-height: 25px;
//   text-align: center;
//   color: ${Colors.midBlack};
//   flex: none;
//   order: 0;
//   flex-grow: 0;
//   border: 2px solid ${Colors.magenta};
//   filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
//   border-radius: 5px;
// `;

/**
 * Styling for magenta button
 */
// export const ButtonMagenta = styled.TouchableOpacity`
//   box-sizing: border-box;
//   width: 59px;
//   height: 25px;
//   font-family: 'Manrope';
//   font-style: normal;
//   font-weight: 600;
//   font-size: 18px;
//   line-height: 25px;
//   text-align: center;
//   color: ${Colors.offWhite};
//   flex: none;
//   order: 0;
//   flex-grow: 0;
//   background: ${Colors.magenta};
//   border: 2px solid ${Colors.magenta};
//   border-radius: 5px;
// `;

export const ButtonMagenta = styled.TouchableOpacity`
  text-align: center;
  align-items: center;
  border-width: 2px;
  border-radius: 5px;
  width: 257px;
  background: ${Colors.magenta};
  text-color: white;
  padding: 9px 9px;
  border-color: ${Colors.magenta};
`;
/**
 * Styling for gray button
 */
export const ButtonGray = styled.TouchableOpacity`
  text-align: center;
  align-items: center;
  border-radius: 5px;
  width: 257px;
  background: ${Colors.midGray};
  padding: 9px 9px;
  border: 2px solid ${Colors.midGray};
`;

export const ButtonWhite = styled.TouchableOpacity`
  text-align: center;
  align-items: center;
  border-radius: 5px;
  width: 257px;
  background: ${Colors.offWhite};
  padding: 9px 9px;
  border: 2px solid ${Colors.magenta};
`;
