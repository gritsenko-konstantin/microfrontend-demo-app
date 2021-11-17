import { TestComponent1, TestComponent2 } from '@microfrontend-demo/design-system/components';
import { TioComponent } from '@microfrontend-demo/tio/common';

export function Landing() {
    return (
        <>
            <p>Landing Page</p>

            <TestComponent1 />
            <TestComponent2 />
            <TioComponent />
        </>
    );
}

export default Landing;
