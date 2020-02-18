export class Config
{
    private config = {

    };

    get(key: string)
    {
        let parts = key.split('.');

        let selected = null;
        parts.map(part => {
            if (selected === null) {
                selected = this.config;
            }

            if (selected[part] == undefined) {
                console.error('Unknown Config value in ', selected, part);
                throw new Error('Configuration Error Occurred');
            }
            selected = selected[part];
        });

        if (selected === null) {
            console.error('Config key was empty');
            throw new Error('Config Lookup Error Occurred');
        }

        return selected;
    }
}