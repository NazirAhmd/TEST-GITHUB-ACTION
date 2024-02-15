import * as core from '@actions/core'
import { KVDetail } from './models/kVDetail';
import { KeyVaultUtility } from './utilities/keyVaultClient';
import { Input } from './configs/input';

async function run(inputs: Input) {
    console.log("test-github-action is executing......");
    console.log('Retrieving secret from key-vault');
    const secret = await fetchSecretFromKV(inputs);
    console.log('Retrieved secret value is ' + secret);
    core.setOutput('time', new Date().toTimeString())
}

async function fetchSecretFromKV(inputs: Input): Promise<string> {
    const kvDetail: KVDetail = new KVDetail(inputs.keyVaultName, inputs.tenantId, inputs.appId, inputs.appSecret);
    const kvUtility = new KeyVaultUtility(kvDetail);
    const kvSecret = await kvUtility.FetchSecretFromKV(inputs.secretName);
    return kvSecret.value!;
}

function getAllInputs(): Input {
    const appId: string = core.getInput('appId');
    const appSecret: string = core.getInput('appSecret');
    const keyVaultName: string = core.getInput('keyVaultName');
    const tenantId: string = core.getInput('tenantId');
    const secretName: string = core.getInput('secretName');
    return new Input(appId, appSecret, keyVaultName, tenantId, secretName);
}

run(getAllInputs());

//uncomment below for local testing
// run(new Input('29b335c9-08a9-4b5a-af0f-15271edddade', '', 'kv-github-action', 'b1914422-c6d8-4aec-b71b-3aa233f6165e', 'dummy-secret'));