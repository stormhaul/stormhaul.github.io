module.exports = function() {
    let ROOT = 'src/';

    let manager = {
        app: {
            path: ROOT,
            events: {
                path: 'Events/',
                dispatcher: {
                    path: 'dispatcher'
                }
            },
            scenes: {
                path: 'Scenes/',
                opening: {
                    path: 'opening'
                },
                parent: {
                    path: 'parent'
                }
            },
            graph: {
                path: 'Graph/',
                grid: {
                    path: 'grid'
                },
                cell: {
                    path: 'cell'
                }
            }
        }
    };


    manager.getDir = function(name) {
        let keys = name.split('.');

        let that = this;

        let path = '';
        that.cur = manager;
        keys.map(function(key) {
            if (that.cur[key] === undefined) {
                throw new Error('Unknown Namespace: ' + key + ' in ' + name);
            }

            that.cur = that.cur[key];
            path += that.cur.path;
        });

        return path + '.js';
    };

    manager.getPath = function(from, to) {
        let fromParts   = from.split('.');
        let toParts     = to.split('.');
        let directories = this.getDir(to).split('/');
        console.log(directories);

        let fileName = toParts[toParts.length - 1];
        let sharedCt = 0;

        for (let i = 0; i < toParts.length; i++) {
            if (toParts[i] === fromParts[i]) {
                sharedCt++;
            }
        }

        let path = '';
        for (let i = 0; i < fromParts.length - sharedCt; i++) {
            path += '../';
        }
        path = path === '' ? './' : path;

        for (let i = sharedCt; i < toParts.length - 1; i++) {
            path += directories[i] + '/';
        }

        path += fileName + '.js';

        return path;
    };

    return manager;
};