import { render } from '@testing-library/react';
import { DarkModeProvider } from '../components/context/DarkModeContext';

const customRender = (ui, { providerProps, ...renderOptions } = {}) => {
  return render(
    <DarkModeProvider {...providerProps}>
      {ui}
    </DarkModeProvider>,
    renderOptions
  );
};

export * from '@testing-library/react';
export { customRender as render };