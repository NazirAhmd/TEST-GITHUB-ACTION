import { DefaultAzureCredential } from '@azure/identity';
import { KVDetail } from '../models/kVDetail';
import { KeyVaultSecret, SecretClient } from '@azure/keyvault-secrets';

export class KeyVaultUtility {
   private _kvDetail: KVDetail;

   constructor(kvDetail: KVDetail) {
      this._kvDetail = kvDetail;
   }
 
   public async FetchSecretFromKV(secretName: string): Promise<KeyVaultSecret> {
      let kvUrl: string = `https://${this._kvDetail.name}.vault.azure.net`;
      this.SetCredentialsForRequest(this._kvDetail);
      const credential = new DefaultAzureCredential();
      const secretClient = new SecretClient(kvUrl, credential);
      return await secretClient.getSecret(secretName);
   }

   private SetCredentialsForRequest(kvIdentityConfig: KVDetail) {
      process.env["AZURE_TENANT_ID"] = kvIdentityConfig.tenantId;
      process.env["AZURE_CLIENT_ID"] = kvIdentityConfig.appId;
      process.env["AZURE_CLIENT_SECRET"] = kvIdentityConfig.secret;
   }
}