import { render } from '@testing-library/react';

import DesignSystemStyles from './design-system-styles';

describe('DesignSystemStyles', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DesignSystemStyles />);
    expect(baseElement).toBeTruthy();
  });
});
