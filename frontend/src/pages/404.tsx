import {Meta} from '@/layouts/Meta';
import {Main} from '@/templates/Main';

function NotFound() {
    return (
        <Main meta={<Meta title="404" description="Lorem ipsum"/>}>
            <div>404</div>
        </Main>
    );
}

export default NotFound;
