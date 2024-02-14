import * as core from '@actions/core'

async function run(isLocal: boolean) {
    console.log("test-github-action is executing......");

    let waitInMs: string = core.getInput('milliseconds');

    if (isLocal)
        waitInMs = '50000';

    console.log(`Waiting for ${waitInMs}ms`);
    await wait(parseInt(waitInMs));
    console.log('Wait is over.');

    core.setOutput('time', new Date().toTimeString())

    function wait(waitInMs: number): Promise<string> {
        return new Promise<string>(resolve => {
            if (isNaN(waitInMs)) {
                throw new Error('waitInMs is not a number.');
            }
            setTimeout(() => resolve('Done!'), waitInMs);
        });
    }
}

run(false);

// run(true);