import styled, { createGlobalStyle, css } from 'styled-components';
import { colours, fontFamily } from '../utils/theme';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: ${fontFamily};
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${colours.text};
    background-color: ${colours.primary};
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
  }

  *, ::after, ::before {
    box-sizing: border-box;
  }

  a {
    color: ${colours.primary};

    :hover {
      color: ${colours.hover};
    }
  }
`;

export const Main = styled.main`
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 420px;
  padding-right: 10px;
  padding-left: 10px;
  margin-right: auto;
  margin-left: auto;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
`;

export const Column = styled.div`
  flex: 1 0;
  width: 100%;
  max-width: 100%;
  margin-left: ${(props) => props.marginLeft ?? '0'};
  margin-right: ${(props) => props.marginRight ?? '0'};
  padding-right: 10px;
  padding-left: 10px;

  ${(props) =>
    props.size &&
    css`
      flex: 0 0 auto;
      width: ${props.size === 'auto' ? props.size : `${(100 / 12) * props.size}%`};
    `}
`;

export const Logo = styled.img`
  display: block;
  width: 200px;
  max-width: 100%;
  margin: 0 auto 1.5rem;
`;

export const Button = styled.button`
  display: inline-block;
  border: 1px solid ${colours.primary};
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background-color: ${colours.primary};
  color: ${colours.white};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;

  :focus {
    box-shadow: 0 0 0 0.25rem ${colours.primary50};
  }

  :hover,
  :active {
    border-color: ${colours.hover};
    background-color: ${colours.hover};
  }

  ${(props) =>
    props.dropdown &&
    css`
      :after {
        display: inline-block;
        margin-left: 0.255em;
        border-top: 0.3em solid;
        border-right: 0.3em solid transparent;
        border-bottom: 0;
        border-left: 0.3em solid transparent;
        vertical-align: 0.255em;
        content: '';
      }
    `}
`;

export const Widget = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: ${colours.white};
  background-clip: border-box;
  border: 1px solid ${colours.black125};
  border-radius: 0.25rem;
  box-shadow: 0 5px 20px 10px ${colours.black125};
`;

export const WidgetHeader = styled.div`
  padding: 0.5rem 1rem;
  margin-bottom: 0;
  background-color: ${colours.black03};
  border-bottom: 1px solid ${colours.black125};
`;

export const WidgetTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.6;
`;

export const WidgetContent = styled.div`
  flex: 1 1 auto;
`;

export const List = styled.nav`
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  border-radius: 0.25rem;
`;

export const ListItem = styled.a`
  display: block;
  position: relative;
  width: 100%;
  padding: 0.5rem 1rem;
  color: ${colours.text};
  text-decoration: none;
  background-color: #fff;
  border-top: 1px solid ${colours.black125};
  border-bottom: 1px solid ${colours.black125};
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;

  :hover,
  :active {
    background-color: ${colours.offWhite};
  }
`;

export const SpinnerWrapper = styled.div`
  padding: 1rem;
  text-align: center;
`;

export const FilterWrapper = styled.div`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
`;

export const FilterMenu = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  min-width: 15.21rem;
  transform: translate(0px, 38px);
  margin: 0;
  border: 1px solid ${colours.black15};
  border-radius: 0.25rem;
  padding: 0.5rem 0;
  background-color: ${colours.white};
  background-clip: padding-box;
  color: ${colours.text};
  font-size: 1rem;
  text-align: left;
  list-style: none;
  inset: 0px auto auto 0px;
  z-index: 1000;
`;

export const FilterItem = styled.button`
  display: block;
  width: 100%;
  border: 0;
  padding: 0.25rem 1rem;
  color: ${colours.text};
  font-weight: 400;
  text-align: inherit;
  text-decoration: none;
  white-space: nowrap;
  background-color: transparent;
  clear: both;
  cursor: pointer;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;

  :hover {
    background-color: ${colours.offWhite};
  }

  :active {
    color: ${colours.white};
    background-color: ${colours.primary};
  }
`;

export const Fade = styled.div`
  transform: scale(${({ state }) => (state === 'entering' ? 0.01 : state === 'entered' ? 1 : 0)});
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  opacity: ${({ state }) => (state === 'entering' ? 0.01 : state === 'entered' ? 1 : 0)};
`;
