import { TestComponent1 } from '@microfrontend-demo/design-system/components';
import { TioComponent } from '@microfrontend-demo/tio/common';

export function Landing() {
    return (
        <>
            <p>Landing Page</p>

            <TestComponent1 />
            <TioComponent />
        </>
    );
}

export default Landing;
